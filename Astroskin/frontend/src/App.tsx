import React, { useState, useEffect, useRef } from 'react'
import { useDataStore } from './stores/dataStore'
import { SimulationEngine, AstronautProfile } from './lib/simulation-engine/SimulationEngine'
import { AlertRulesEngine } from './lib/alert-rules/AlertRulesEngine'
import { SimulationScenario } from './lib/models/SimulationScenario'
import { VitalMeasurement } from './lib/models/VitalMeasurement'
import { WaveformData } from './lib/models/WaveformData'
import { DiagnosticView } from './components/views/DiagnosticView'
import { colors } from './lib/design-tokens/colors'

const scenarios: SimulationScenario[] = [
  { id: 'baseline', name: 'Normal Baseline', description: 'Normal astronaut vitals within nominal resting ranges', active: false },
  { id: 'respiratory-distress', name: 'Respiratory Distress (Hypoxia)', description: 'High breathing rate with dropping SpO2 and compensatory HR increase', active: false },
  { id: 'motion-sickness', name: 'Motion Sickness (SMS)', description: 'Neurovestibular stress with HR instability at rest', active: false },
  { id: 'signal-loss', name: 'Signal Loss via Motion Artifact', description: 'Extreme movement corrupts data quality and waveforms', active: false },
  { id: 'cardiovascular-deconditioning', name: 'Cardiovascular Deconditioning', description: 'Disproportionate cardiovascular response to exercise', active: false }
]

const App: React.FC = () => {
  const { addVital, addWaveform, addAlert, clearAlert } = useDataStore()
  const [vitals, setVitals] = useState<VitalMeasurement[]>([]) // Local state for alert checking
  const [isPlaying] = useState(true) // Always playing
  const [astronautProfile, setAstronautProfile] = useState<AstronautProfile>(AstronautProfile.MALE)
  const simulationEngineRef = useRef(new SimulationEngine())
  const alertEngineRef = useRef(new AlertRulesEngine())

  // Always use baseline scenario
  const currentScenario = scenarios.find(s => s.id === 'baseline')!

  useEffect(() => {
    // Set astronaut profile on simulation engine
    simulationEngineRef.current.setProfile(astronautProfile)
  }, [astronautProfile])

  // Automatically trigger alert spike after 5 seconds for testing
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('⏰ Auto-triggering alert spike for testing')
      handleAlertTrigger()
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      simulationEngineRef.current.startScenario(currentScenario, (data: VitalMeasurement | WaveformData) => {
        if ('value' in data) {
          const vital = data as VitalMeasurement
          console.log('📊 Adding vital:', vital.sensorId, '=', vital.value)
          addVital(vital) // Add to store for UI components
          const newVitals = [...vitals, vital]
          setVitals(newVitals) // Add to local state for alert checking
          console.log('📊 Vitals array length after add:', newVitals.length)

          // Check alerts with all recent vitals and current activity level
          const recentVitals = newVitals.slice(-20) // Look at last 20 vitals
          const activityLevel = recentVitals.find(v => v.sensorId === 'accelerometer')?.value || 0

          console.log('🔍 Checking alerts, recent vitals:', recentVitals.length, 'activity:', activityLevel)
          console.log('🔍 Recent HR:', recentVitals.find(v => v.sensorId === 'heart-rate')?.value)
          console.log('🔍 Recent RR:', recentVitals.find(v => v.sensorId === 'respiration-rate')?.value)
          console.log('🔍 Recent SpO2:', recentVitals.find(v => v.sensorId === 'oxygen-saturation')?.value)
          const newAlerts = alertEngineRef.current.checkAlerts(recentVitals, activityLevel, clearAlert)
          if (newAlerts.length > 0) {
            console.log('📢 Adding alerts to store:', newAlerts.length, newAlerts.map(a => a.message))
            newAlerts.forEach(addAlert)
          }
        } else {
          const waveform = data as WaveformData
          addWaveform(waveform)
        }
      })
    } else {
      simulationEngineRef.current.pause()
    }

    return () => simulationEngineRef.current.stop()
  }, [isPlaying]) // Only depend on isPlaying

  const handleProfileChange = (profile: AstronautProfile) => {
    setAstronautProfile(profile)
  }

  const handleAlertTrigger = () => {
    console.log('🚨 Alert trigger button clicked!')
    simulationEngineRef.current.triggerAlertSpike()
  }

  const hasCriticalAlerts = alertEngineRef.current.isCriticalAlertActive()

  return (
    <div className="app" style={{ backgroundColor: colors.bgBase, color: colors.textPrimary, minHeight: '100vh' }}>
      <header className="header">
        <h1 style={{
          fontSize: '32px',
          fontFamily: 'Inter',
          margin: 0,
          color: colors.interactiveCyan
        }}>
          AURA-Viz
        </h1>
        <p style={{
          fontSize: '16px',
          color: colors.textSecondary,
          margin: '8px 0 0 0'
        }}>
          Astronaut Biometric Visualization & Anomaly Detection
        </p>
      </header>

      {/* Simple Control Panel */}
      <div style={{
        backgroundColor: colors.bgSurface,
        borderRadius: '12px',
        padding: '20px',
        margin: '24px',
        border: `1px solid ${colors.borderSubtle}`
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <select
            value={astronautProfile}
            onChange={(e) => handleProfileChange(e.target.value as AstronautProfile)}
            style={{
              padding: '10px',
              backgroundColor: colors.bgBase,
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: '6px',
              color: colors.textPrimary,
              fontSize: '14px',
              fontFamily: 'Inter'
            }}
          >
            <option value={AstronautProfile.MALE}>Male Astronaut (60-85 BPM HR)</option>
            <option value={AstronautProfile.FEMALE}>Female Astronaut (65-90 BPM HR)</option>
          </select>

          <button
            onClick={handleAlertTrigger}
            style={{
              padding: '12px 20px',
              backgroundColor: colors.statusCaution,
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'Inter',
              cursor: 'pointer'
            }}
          >
            ⚠️ Trigger Alert (5s)
          </button>

          <div style={{
            marginLeft: 'auto',
            padding: '8px 12px',
            backgroundColor: colors.statusNormal,
            borderRadius: '4px',
            fontSize: '12px',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            🔴 LIVE SIMULATION
          </div>
        </div>
      </div>

      <div className="dashboard" style={{
        backgroundColor: colors.bgSurface,
        borderRadius: '12px',
        padding: '24px',
        margin: '0 24px 24px 24px',
        border: hasCriticalAlerts ? `2px solid ${colors.statusCritical}` : `1px solid ${colors.borderSubtle}`
      }}>
        {hasCriticalAlerts && (
          <div className="critical-banner" style={{
            backgroundColor: colors.statusCritical,
            color: colors.textPrimary,
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontWeight: 'bold'
          }}>
            ⚠️ CRITICAL ALERTS DETECTED - Immediate attention required
          </div>
        )}

        <DiagnosticView />
      </div>
    </div>
  )
}

export default App