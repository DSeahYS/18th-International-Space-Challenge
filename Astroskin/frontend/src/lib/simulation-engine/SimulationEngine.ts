import { VitalMeasurement } from '../models/VitalMeasurement'
import { WaveformData } from '../models/WaveformData'
import { SimulationScenario } from '../models/SimulationScenario'

export enum AstronautProfile {
  MALE = 'male',
  FEMALE = 'female'
}

export enum PhysiologicalState {
  RESTING = 'Resting',
  LIGHT_ACTIVITY = 'Light Activity',
  MODERATE_ACTIVITY = 'Moderate Activity',
  VIGOROUS_ACTIVITY = 'Vigorous Activity',
  RECOVERY = 'Recovery'
}

export enum ConditioningLevel {
  CONDITIONED = 'Conditioned',
  DECONDITIONED = 'Deconditioned'
}

export class SimulationEngine {
  private interval: NodeJS.Timeout | null = null
  private time = 0
  private isPlaying = false
  private profile: AstronautProfile = AstronautProfile.MALE
  private conditioning: ConditioningLevel = ConditioningLevel.CONDITIONED
  private currentState: PhysiologicalState = PhysiologicalState.RESTING
  private currentHR: number = 75
  private currentRR: number = 16
  private currentActivityLevel: number = 5 // Start with low activity
  private alertSpikeActive = false
  private alertSpikeEndTime = 0

  startScenario(scenario: SimulationScenario, onData: (data: VitalMeasurement | WaveformData) => void) {
    this.stop() // Ensure any existing simulation is stopped
    this.time = 0
    this.isPlaying = true

    this.interval = setInterval(() => {
      if (!this.isPlaying) return

      this.time += 0.1 // 100ms intervals
      const data = this.generateDataForScenario(scenario, this.time)
      onData(data)
    }, 100) // 10Hz for vitals
  }

  pause() {
    this.isPlaying = false
  }

  resume() {
    this.isPlaying = true
  }

  stop() {
    this.isPlaying = false
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  reset() {
    this.time = 0
    this.isPlaying = false
    this.alertSpikeActive = false
    this.alertSpikeEndTime = 0
  }

  setProfile(profile: AstronautProfile) {
    this.profile = profile
    // Set conditioning level based on profile (males are more conditioned, females less)
    this.conditioning = profile === AstronautProfile.MALE ? ConditioningLevel.CONDITIONED : ConditioningLevel.DECONDITIONED
  }

  triggerAlertSpike() {
    console.log('🔥 Alert spike triggered in simulation engine!')
    console.log('🔥 Setting alertSpikeActive = true, endTime =', this.time + 5)
    this.alertSpikeActive = true
    this.alertSpikeEndTime = this.time + 5 // 5 seconds of spike
  }

  private isAlertSpikeActive(): boolean {
    if (this.alertSpikeActive && this.time >= this.alertSpikeEndTime) {
      console.log('❌ Alert spike ended')
      this.alertSpikeActive = false
      return false
    }
    if (this.alertSpikeActive) {
      console.log('⚡ Alert spike active, time:', this.time, 'end time:', this.alertSpikeEndTime)
    }
    return this.alertSpikeActive
  }

  private determinePhysiologicalState(activityLevel: number): PhysiologicalState {
    if (activityLevel > 70) {
      return PhysiologicalState.VIGOROUS_ACTIVITY
    } else if (activityLevel > 40) {
      return PhysiologicalState.MODERATE_ACTIVITY
    } else if (activityLevel > 10) {
      return PhysiologicalState.LIGHT_ACTIVITY
    } else if (this.currentState !== PhysiologicalState.RESTING && activityLevel <= 10) {
      // If we were active before but are now at rest, enter recovery
      return PhysiologicalState.RECOVERY
    }
    return PhysiologicalState.RESTING
  }

  private getTargetVitals(state: PhysiologicalState, conditioning: ConditioningLevel) {
    const targets = {
      [ConditioningLevel.CONDITIONED]: {
        [PhysiologicalState.RESTING]: { hr: [65, 85], rr: [14, 18] },
        [PhysiologicalState.RECOVERY]: { hr: [65, 85], rr: [14, 18] },
        [PhysiologicalState.LIGHT_ACTIVITY]: { hr: [90, 110], rr: [18, 22] },
        [PhysiologicalState.MODERATE_ACTIVITY]: { hr: [110, 140], rr: [22, 30] },
        [PhysiologicalState.VIGOROUS_ACTIVITY]: { hr: [140, 170], rr: [30, 40] }
      },
      [ConditioningLevel.DECONDITIONED]: {
        [PhysiologicalState.RESTING]: { hr: [65, 85], rr: [14, 18] },
        [PhysiologicalState.RECOVERY]: { hr: [65, 85], rr: [14, 18] },
        [PhysiologicalState.LIGHT_ACTIVITY]: { hr: [110, 130], rr: [22, 26] },
        [PhysiologicalState.MODERATE_ACTIVITY]: { hr: [140, 160], rr: [30, 38] },
        [PhysiologicalState.VIGOROUS_ACTIVITY]: { hr: [170, 190], rr: [40, 50] }
      }
    }

    const stateTargets = targets[conditioning][state]
    return {
      hr: stateTargets.hr[0] + Math.random() * (stateTargets.hr[1] - stateTargets.hr[0]),
      rr: stateTargets.rr[0] + Math.random() * (stateTargets.rr[1] - stateTargets.rr[0])
    }
  }

  private calculateNextVitals(activityLevel: number) {
    // Determine new state
    const newState = this.determinePhysiologicalState(activityLevel)

    // Get target vitals
    const targets = this.getTargetVitals(newState, this.conditioning)

    // Calculate ramp factor (recovery is slower)
    const rampFactor = newState === PhysiologicalState.RECOVERY ? 0.05 : 0.1

    // Smoothly transition to target values
    const nextHR = this.currentHR + (targets.hr - this.currentHR) * rampFactor
    const nextRR = this.currentRR + (targets.rr - this.currentRR) * rampFactor

    // Update current values and state
    this.currentHR = nextHR
    this.currentRR = nextRR
    this.currentState = newState

    return { hr: nextHR, rr: nextRR, state: newState }
  }

  private generateECGWaveform(length: number, heartRate: number, time: number): number[] {
    const points: number[] = []
    const samplesPerBeat = Math.floor(256 / (heartRate / 60)) // Samples per cardiac cycle

    for (let i = 0; i < length; i++) {
      const beatPosition = (i % samplesPerBeat) / samplesPerBeat
      let value = 0

      // Generate P-QRS-T complex
      if (beatPosition < 0.1) {
        // P wave (atrial depolarization)
        value = 0.1 * Math.sin(beatPosition * Math.PI / 0.1)
      } else if (beatPosition < 0.15) {
        // PR segment
        value = 0
      } else if (beatPosition < 0.2) {
        // Q wave
        value = -0.2 * Math.sin((beatPosition - 0.15) * Math.PI / 0.05)
      } else if (beatPosition < 0.25) {
        // R wave (main ventricular depolarization)
        value = 1.5 * Math.sin((beatPosition - 0.2) * Math.PI / 0.05)
      } else if (beatPosition < 0.3) {
        // S wave
        value = -0.5 * Math.sin((beatPosition - 0.25) * Math.PI / 0.05)
      } else if (beatPosition < 0.4) {
        // ST segment
        value = 0
      } else if (beatPosition < 0.5) {
        // T wave (ventricular repolarization)
        value = 0.3 * Math.sin((beatPosition - 0.4) * Math.PI / 0.1)
      } else {
        // Baseline
        value = 0
      }

      // Add small baseline variation and noise
      value += 0.02 * Math.sin(time * 0.1 + i * 0.01) + (Math.random() - 0.5) * 0.01

      points.push(value)
    }

    return points
  }

  private generateRespirationWaveform(length: number, respirationRate: number, time: number): number[] {
    const points: number[] = []
    const samplesPerBreath = Math.floor(256 / (respirationRate / 60)) // Samples per respiratory cycle

    for (let i = 0; i < length; i++) {
      const breathPosition = (i % samplesPerBreath) / samplesPerBreath

      // Generate realistic breathing pattern (inspiration is faster than expiration)
      let value: number
      if (breathPosition < 0.4) {
        // Inspiration (faster, 40% of cycle)
        value = Math.sin(breathPosition * Math.PI / 0.4) * 0.8
      } else {
        // Expiration (slower, 60% of cycle)
        value = Math.sin((breathPosition - 0.4) * Math.PI / 0.6) * 0.6
      }

      // Add small variations and noise
      value += 0.05 * Math.sin(time * 0.05 + i * 0.005) + (Math.random() - 0.5) * 0.02

      points.push(value)
    }

    return points
  }

  private generateBloodPressureWaveform(length: number, heartRate: number, time: number): number[] {
    const points: number[] = []
    const samplesPerBeat = Math.floor(256 / (heartRate / 60))

    for (let i = 0; i < length; i++) {
      const beatPosition = (i % samplesPerBeat) / samplesPerBeat

      // Generate arterial pressure waveform
      let value: number
      if (beatPosition < 0.1) {
        // Systolic upstroke
        value = 120 + 40 * Math.sin(beatPosition * Math.PI / 0.1)
      } else if (beatPosition < 0.3) {
        // Systolic peak and dicrotic notch
        const notchPos = (beatPosition - 0.1) / 0.2
        value = 160 - 20 * notchPos + 5 * Math.sin(notchPos * Math.PI * 4)
      } else if (beatPosition < 0.6) {
        // Dicrotic wave
        const dicroticPos = (beatPosition - 0.3) / 0.3
        value = 80 + 20 * Math.sin(dicroticPos * Math.PI)
      } else {
        // Diastolic runoff
        const runoffPos = (beatPosition - 0.6) / 0.4
        value = 80 - 10 * runoffPos
      }

      // Add respiratory variation and noise
      value += 5 * Math.sin(time * 0.1 + i * 0.01) + (Math.random() - 0.5) * 2

      points.push(value)
    }

    return points
  }

  private generateDataForScenario(scenario: SimulationScenario, time: number): VitalMeasurement | WaveformData {
    switch (scenario.id) {
      case 'baseline':
        return this.generateBaselineData(time)
      case 'respiratory-distress':
        return this.generateRespiratoryDistressData(time)
      case 'motion-sickness':
        return this.generateMotionSicknessData(time)
      case 'signal-loss':
        return this.generateSignalLossData(time)
      case 'cardiovascular-deconditioning':
        return this.generateCardiovascularDeconditioningData(time)
      default:
        return this.generateBaselineData(time)
    }
  }

  // A. Normal Baseline: Generate vitals using physiological state machine
  private generateBaselineData(time: number): VitalMeasurement | WaveformData {
    const dataType = Math.floor(time * 10) % 12 // Cycle through different data types
    const isSpikeActive = this.isAlertSpikeActive()

    // Update activity level with some natural variation
    this.currentActivityLevel = Math.max(0, Math.min(100,
      this.currentActivityLevel + (Math.random() - 0.5) * 2
    ))

    // Calculate physiological vitals based on activity level
    const physioVitals = this.calculateNextVitals(this.currentActivityLevel)

    switch (dataType) {
      case 0: // Heart Rate (using physiological algorithm)
        const hrValue = isSpikeActive ? physioVitals.hr + 35 : physioVitals.hr // Increased to 35 to cross 100 threshold
        if (isSpikeActive) {
          console.log('💓 HR SPIKE ACTIVE:', hrValue, 'bpm (should trigger >100)')
        }
        return {
          sensorId: 'heart-rate',
          value: hrValue,
          timestamp: new Date(),
          status: hrValue > 100 ? (isSpikeActive ? 'WARNING' : 'NORMAL') : 'NORMAL'
        } as VitalMeasurement

      case 1: // Breathing Rate (using physiological algorithm)
        const rrValue = isSpikeActive ? physioVitals.rr + 15 : physioVitals.rr // Increased to 15 to cross 25 threshold
        if (isSpikeActive) {
          console.log('🫁 RR SPIKE ACTIVE:', rrValue, 'breaths/min (should trigger >25)')
        }
        return {
          sensorId: 'respiration-rate',
          value: rrValue,
          timestamp: new Date(),
          status: rrValue > 25 ? (isSpikeActive ? 'WARNING' : 'NORMAL') : 'NORMAL'
        } as VitalMeasurement

      case 2: // SpO2
        const baseSpO2 = 97.5 + 2.5 * Math.sin(time * 0.2)
        const spo2Value = isSpikeActive ? Math.max(85, baseSpO2 - 8) : baseSpO2 // Drop to 85% during spike
        return {
          sensorId: 'oxygen-saturation',
          value: spo2Value,
          timestamp: new Date(),
          status: spo2Value < 92 ? (isSpikeActive ? 'CRITICAL' : 'NORMAL') : 'NORMAL'
        } as VitalMeasurement

      case 3: // HRV
        const baseHRV = (this.profile === AstronautProfile.MALE ? 45 : 52.5) + 15 * Math.sin(time * 0.4)
        const hrvValue = isSpikeActive ? Math.max(15, baseHRV - 20) : baseHRV // Drop HRV during spike
        return {
          sensorId: 'hrv',
          value: hrvValue,
          timestamp: new Date(),
          status: hrvValue < 25 ? (isSpikeActive ? 'WARNING' : 'NORMAL') : 'NORMAL'
        } as VitalMeasurement

      case 4: // Temperature: 36.5-37.5°C (same for both profiles)
        return {
          sensorId: 'temperature',
          value: 37.0 + 0.5 * Math.sin(time * 0.1),
          timestamp: new Date(),
          status: 'NORMAL'
        } as VitalMeasurement

      case 5: // Accelerometer (activity level)
        return {
          sensorId: 'accelerometer',
          value: this.currentActivityLevel,
          timestamp: new Date(),
          status: this.currentActivityLevel > 20 ? (isSpikeActive ? 'WARNING' : 'NORMAL') : 'NORMAL'
        } as VitalMeasurement

      case 6: // ECG Waveform with realistic P-QRS-T complexes
        const ecgData = this.generateECGWaveform(256, isSpikeActive ? 80 : this.currentHR, time)
        return {
          sensorId: 'ecg',
          dataPoints: ecgData.map((value, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: value
          })),
          artifacts: []
        } as WaveformData

      case 7: // Respiration Waveform with realistic breathing patterns
        const respData = this.generateRespirationWaveform(256, isSpikeActive ? 26 : this.currentRR, time)
        return {
          sensorId: 'respiration',
          dataPoints: respData.map((value, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: value
          })),
          artifacts: []
        } as WaveformData

      case 8: // Accelerometer Waveform (movement patterns)
        return {
          sensorId: 'accelerometer-waveform',
          dataPoints: Array.from({ length: 256 }, (_, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: (isSpikeActive ? 0.8 : 0.2) * Math.sin((i / 256) * 2 * Math.PI * 0.5 + time) + 0.5 + (Math.random() - 0.5) * 0.1
          })),
          artifacts: isSpikeActive ? [{ start: 50, end: 150, type: 'motion' }] : []
        } as WaveformData

      case 9: // Temperature Waveform (skin temperature variations)
        return {
          sensorId: 'temperature-waveform',
          dataPoints: Array.from({ length: 256 }, (_, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: 37.0 + 0.3 * Math.sin((i / 256) * 2 * Math.PI * 0.1 + time) + (Math.random() - 0.5) * 0.05
          })),
          artifacts: []
        } as WaveformData

      case 10: // Blood Pressure Waveform (realistic arterial pressure)
        const bpData = this.generateBloodPressureWaveform(256, isSpikeActive ? 80 : this.currentHR, time)
        return {
          sensorId: 'blood-pressure-waveform',
          dataPoints: bpData.map((value, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: value
          })),
          artifacts: []
        } as WaveformData

      case 11: // EMG Waveform (muscle activity)
        return {
          sensorId: 'emg-waveform',
          dataPoints: Array.from({ length: 256 }, (_, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: (isSpikeActive ? 0.6 : 0.2) * Math.sin((i / 256) * 2 * Math.PI * 2 + time) + 0.5 + (Math.random() - 0.5) * 0.3
          })),
          artifacts: isSpikeActive ? [{ start: 100, end: 200, type: 'muscle-activity' }] : []
        } as WaveformData

      default:
        return this.generateBaselineData(time)
    }
  }


  // B. Respiratory Distress (Hypoxia): High breathing rate + dropping SpO2 + compensatory HR increase
  private generateRespiratoryDistressData(time: number): VitalMeasurement | WaveformData {
    const dataType = Math.floor(time * 10) % 4

    switch (dataType) {
      case 0: // Breathing Rate: > 25 /min (elevated)
        return {
          sensorId: 'respiration-rate',
          value: 28 + 5 * Math.sin(time * 2), // 23-33 bpm
          timestamp: new Date(),
          status: time > 10 ? 'CRITICAL' : 'WARNING'
        } as VitalMeasurement

      case 1: // SpO2: Trends downward from 95% to < 92% over 30 seconds
        const spo2Base = Math.max(88, 95 - (time * 0.23)) // Gradual decline
        return {
          sensorId: 'oxygen-saturation',
          value: spo2Base + 2 * Math.sin(time * 1.5),
          timestamp: new Date(),
          status: spo2Base < 90 ? 'CRITICAL' : 'WARNING'
        } as VitalMeasurement

      case 2: // Heart Rate: Increases to 110+ as compensatory effect
        const hrBase = Math.min(120, 75 + (time * 1.5)) // Gradual increase
        return {
          sensorId: 'heart-rate',
          value: hrBase + 8 * Math.sin(time * 1.2),
          timestamp: new Date(),
          status: hrBase > 100 ? 'WARNING' : 'NORMAL'
        } as VitalMeasurement

      case 3: // Respiration Waveform with increased frequency
        return {
          sensorId: 'respiration',
          dataPoints: Array.from({ length: 256 }, (_, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: Math.sin((i / 256) * 2 * Math.PI * 25 + time * 3) * 0.6 + 0.5 // Faster breathing
          })),
          artifacts: time > 15 ? [{ start: 100, end: 150, type: 'noise' }] : []
        } as WaveformData

      default:
        return this.generateRespiratoryDistressData(time)
    }
  }

  // C. Motion Sickness (SMS): Instability at rest, HR spikes, low HRV
  private generateMotionSicknessData(time: number): VitalMeasurement | WaveformData {
    const dataType = Math.floor(time * 10) % 4

    switch (dataType) {
      case 0: // Accelerometer: < 10 (at rest)
        return {
          sensorId: 'accelerometer',
          value: 5 + 3 * Math.sin(time * 0.5), // Low activity
          timestamp: new Date(),
          status: 'NORMAL'
        } as VitalMeasurement

      case 1: // Heart Rate: Random periodic spikes to 90-100 BPM
        const spikeIntensity = Math.sin(time * 0.7) > 0.7 ? 1 : 0
        const baseHR = 70 + 15 * spikeIntensity
        return {
          sensorId: 'heart-rate',
          value: baseHR + 5 * Math.sin(time * 3), // Volatile HR
          timestamp: new Date(),
          status: spikeIntensity > 0 ? 'WARNING' : 'NORMAL'
        } as VitalMeasurement

      case 2: // HRV: Drops significantly (simulated as separate metric)
        return {
          sensorId: 'hrv',
          value: Math.max(10, 35 - (time * 0.8)), // Declining HRV
          timestamp: new Date(),
          status: 'WARNING'
        } as VitalMeasurement

      case 3: // ECG Waveform with irregular rhythm
        return {
          sensorId: 'ecg',
          dataPoints: Array.from({ length: 256 }, (_, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: Math.sin((i / 256) * 2 * Math.PI * 60 + time + 0.3 * Math.sin(time * 2)) * 0.5 + 0.5
          })),
          artifacts: Math.random() > 0.7 ? [{ start: Math.floor(Math.random() * 200), end: Math.floor(Math.random() * 200) + 20, type: 'irregular' }] : []
        } as WaveformData

      default:
        return this.generateMotionSicknessData(time)
    }
  }

  // D. Signal Loss: Triggered by extreme movement, affects data quality
  private generateSignalLossData(time: number): VitalMeasurement | WaveformData {
    const dataType = Math.floor(time * 10) % 4
    const inSignalLoss = time > 5 && Math.sin(time * 0.3) > 0.5 // Intermittent loss

    if (inSignalLoss) {
      switch (dataType) {
        case 0: // Accelerometer: Spikes to > 90 (extreme movement)
          return {
            sensorId: 'accelerometer',
            value: 95 + 10 * Math.sin(time * 5), // Extreme movement
            timestamp: new Date(),
            status: 'CRITICAL'
          } as VitalMeasurement

        case 1: // Signal Quality: Drops to < 30%
          return {
            sensorId: 'signal-quality',
            value: Math.max(5, 25 - (time * 2)), // Very poor quality
            timestamp: new Date(),
            status: 'CRITICAL'
          } as VitalMeasurement

        case 2: // Heart Rate: Becomes null/unreliable
          return {
            sensorId: 'heart-rate',
            value: 0, // Cannot calculate
            timestamp: new Date(),
            status: 'CRITICAL'
          } as VitalMeasurement

        case 3: // ECG Waveform: Random noisy data
          return {
            sensorId: 'ecg',
            dataPoints: Array.from({ length: 256 }, (_, i) => ({
              timestamp: Date.now() + i * (1000 / 256),
              value: Math.random() * 2 - 1 // Random noise
            })),
            artifacts: [{ start: 0, end: 255, type: 'motion-artifact' }]
          } as WaveformData

        default:
          return this.generateSignalLossData(time)
      }
    } else {
      // Normal data when not in signal loss
      return this.generateBaselineData(time)
    }
  }

  // E. Cardiovascular Deconditioning: Disproportionate response to exercise
  private generateCardiovascularDeconditioningData(time: number): VitalMeasurement | WaveformData {
    const dataType = Math.floor(time * 10) % 4
    const exercisePhase = time > 10 && time < 40 // 30-second exercise period

    switch (dataType) {
      case 0: // Accelerometer: Ramps up to 70-80 during exercise
        const accelValue = exercisePhase ? Math.min(85, 20 + (time - 10) * 2) : 15
        return {
          sensorId: 'accelerometer',
          value: accelValue + 5 * Math.sin(time * 2),
          timestamp: new Date(),
          status: exercisePhase ? 'WARNING' : 'NORMAL'
        } as VitalMeasurement

      case 1: // Heart Rate: Spikes rapidly to 170-180 BPM during exercise
        let hrValue
        if (exercisePhase) {
          hrValue = Math.min(185, 75 + (time - 10) * 3.5) // Rapid spike
        } else if (time > 40) {
          hrValue = Math.max(80, 180 - (time - 40) * 0.8) // Slow recovery
        } else {
          hrValue = 75 + 5 * Math.sin(time * 0.5)
        }
        return {
          sensorId: 'heart-rate',
          value: hrValue,
          timestamp: new Date(),
          status: hrValue > 150 ? 'CRITICAL' : hrValue > 120 ? 'WARNING' : 'NORMAL'
        } as VitalMeasurement

      case 2: // Recovery metrics
        if (time > 40) {
          return {
            sensorId: 'hrv',
            value: Math.min(25, 15 + (time - 40) * 0.3), // Slow HRV recovery
            timestamp: new Date(),
            status: 'WARNING'
          } as VitalMeasurement
        }
        return this.generateCardiovascularDeconditioningData(time)

      case 3: // ECG Waveform with stress patterns
        const heartRate = exercisePhase ? 170 : 75
        return {
          sensorId: 'ecg',
          dataPoints: Array.from({ length: 256 }, (_, i) => ({
            timestamp: Date.now() + i * (1000 / 256),
            value: Math.sin((i / 256) * 2 * Math.PI * (heartRate / 60) + time) * 0.6 + 0.5
          })),
          artifacts: exercisePhase ? [{ start: 50, end: 100, type: 'stress' }] : []
        } as WaveformData

      default:
        return this.generateCardiovascularDeconditioningData(time)
    }
  }
}