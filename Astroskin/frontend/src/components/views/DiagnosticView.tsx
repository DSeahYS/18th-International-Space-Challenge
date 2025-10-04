import React from 'react';
import { AlertLog } from '../alerts/AlertLog';
import { ActivityLevelGauge } from '../indicators/ActivityLevelGauge';
import { StressLevelGauge } from '../indicators/StressLevelGauge';
import { ThresholdToggle } from '../ui/ThresholdToggle';
import { WaveformCanvas } from '../charts/WaveformCanvas';
import { useDataStore } from '../../stores/dataStore';
import { colors } from '../../lib/design-tokens/colors';

export const DiagnosticView: React.FC = () => {
  const { waveforms, alerts, showThresholds, toggleThresholds } = useDataStore();

  // Find all waveforms
  const ecgWaveform = waveforms.find(w => w.sensorId.includes('ecg')) || null;
  const respirationWaveform = waveforms.find(w => w.sensorId.includes('respiration')) || null;
  const accelerometerWaveform = waveforms.find(w => w.sensorId.includes('accelerometer-waveform')) || null;
  const temperatureWaveform = waveforms.find(w => w.sensorId.includes('temperature-waveform')) || null;
  const bloodPressureWaveform = waveforms.find(w => w.sensorId.includes('blood-pressure-waveform')) || null;

  return (
    <div className="diagnostic-view">
      {/* Controls Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
        <ThresholdToggle showThresholds={showThresholds} onToggle={toggleThresholds} />
        <ActivityLevelGauge />
        <StressLevelGauge />
      </div>

      {/* Waveform Panels Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {/* Cardiovascular Panel */}
        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: colors.textPrimary,
            marginBottom: '12px',
            fontFamily: 'Inter'
          }}>
            Cardiovascular System
          </div>
          <div style={{ position: 'relative', height: '200px' }}>
            {ecgWaveform ? (
              <WaveformCanvas waveform={ecgWaveform} showThresholds={showThresholds} />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: colors.textSecondary,
                fontFamily: 'Inter'
              }}>
                No ECG data available
              </div>
            )}
          </div>
        </div>

        {/* Respiratory Panel */}
        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: colors.textPrimary,
            marginBottom: '12px',
            fontFamily: 'Inter'
          }}>
            Respiratory System
          </div>
          <div style={{ position: 'relative', height: '200px' }}>
            {respirationWaveform ? (
              <WaveformCanvas waveform={respirationWaveform} showThresholds={showThresholds} />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: colors.textSecondary,
                fontFamily: 'Inter'
              }}>
                No respiration data available
              </div>
            )}
          </div>
        </div>

        {/* Accelerometer Panel */}
        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: colors.textPrimary,
            marginBottom: '12px',
            fontFamily: 'Inter'
          }}>
            Movement & Activity
          </div>
          <div style={{ position: 'relative', height: '200px' }}>
            {accelerometerWaveform ? (
              <WaveformCanvas waveform={accelerometerWaveform} showThresholds={showThresholds} />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: colors.textSecondary,
                fontFamily: 'Inter'
              }}>
                No accelerometer data available
              </div>
            )}
          </div>
        </div>

        {/* Temperature Panel */}
        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: colors.textPrimary,
            marginBottom: '12px',
            fontFamily: 'Inter'
          }}>
            Skin Temperature
          </div>
          <div style={{ position: 'relative', height: '200px' }}>
            {temperatureWaveform ? (
              <WaveformCanvas waveform={temperatureWaveform} showThresholds={showThresholds} />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: colors.textSecondary,
                fontFamily: 'Inter'
              }}>
                No temperature data available
              </div>
            )}
          </div>
        </div>

        {/* Blood Pressure Panel */}
        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: colors.textPrimary,
            marginBottom: '12px',
            fontFamily: 'Inter'
          }}>
            Arterial Pressure
          </div>
          <div style={{ position: 'relative', height: '200px' }}>
            {bloodPressureWaveform ? (
              <WaveformCanvas waveform={bloodPressureWaveform} showThresholds={showThresholds} />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: colors.textSecondary,
                fontFamily: 'Inter'
              }}>
                No blood pressure data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Alert Log */}
      <AlertLog alerts={alerts} />
    </div>
  );
};