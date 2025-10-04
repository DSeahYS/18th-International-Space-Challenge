import { VitalMeasurement } from '../models/VitalMeasurement'
import { Alert } from '../models/Alert'

enum PhysiologicalState {
  RESTING = 'Resting',
  LIGHT_ACTIVITY = 'Light Activity',
  SUSTAINED_EXERCISE = 'Sustained Exercise'
}

interface AlertState {
  alertId: string
  startTime: number
  lastUpdate: number
  severity: 'WARNING' | 'CRITICAL'
  active: boolean
}

export class AlertRulesEngine {
  private alertStates: Map<string, AlertState> = new Map()
  private criticalAlertActive = false
  private criticalAlertStartTime = 0
  private recoveryStartTime = 0

  checkAlerts(vitals: VitalMeasurement[], activityLevel: number, clearAlert?: (alertId: string) => void): Alert[] {
    const alerts: Alert[] = []
    const currentTime = Date.now()

    console.log('🔍 ALERT ENGINE: checking', vitals.length, 'vitals, activity:', activityLevel)
    const hr = vitals.find(v => v.sensorId === 'heart-rate')
    const rr = vitals.find(v => v.sensorId === 'respiration-rate')
    console.log('🔍 ALERT ENGINE: HR =', hr?.value, 'RR =', rr?.value)

    // Determine physiological state
    const physiologicalState = this.determinePhysiologicalState(activityLevel)

    // Check sustained alerts
    const sustainedAlerts = this.checkSustainedAlerts(vitals, physiologicalState, currentTime)
    alerts.push(...sustainedAlerts)

    // Check data fusion alerts
    const fusionAlerts = this.checkDataFusionAlerts(vitals, physiologicalState, currentTime, clearAlert)
    alerts.push(...fusionAlerts)

    // Check for alert recovery
    this.checkAlertRecovery(vitals, currentTime, clearAlert)

    if (alerts.length > 0) {
      console.log('🚨 ALERTS GENERATED:', alerts.length, alerts.map(a => `${a.type}: ${a.message}`))
    } else {
      console.log('✅ No alerts generated this cycle')
    }

    return alerts
  }

  private determinePhysiologicalState(activityLevel: number): PhysiologicalState {
    if (activityLevel > 40) return PhysiologicalState.SUSTAINED_EXERCISE
    if (activityLevel > 15) return PhysiologicalState.LIGHT_ACTIVITY
    return PhysiologicalState.RESTING
  }

  private checkSustainedAlerts(vitals: VitalMeasurement[], state: PhysiologicalState, currentTime: number): Alert[] {
    const alerts: Alert[] = []

    vitals.forEach(vital => {
      const alertCheck = this.checkVitalThreshold(vital, state)
      if (alertCheck) {
        const alertId = vital.sensorId
        const existingState = this.alertStates.get(alertId)

        if (!existingState) {
          // New alert - start tracking
          this.alertStates.set(alertId, {
            alertId,
            startTime: currentTime,
            lastUpdate: currentTime,
            severity: alertCheck.severity as 'WARNING' | 'CRITICAL',
            active: false
          })
        } else {
          existingState.lastUpdate = currentTime

          // Check if sustained for 1 second (reduced for demo purposes)
          if (currentTime - existingState.startTime >= 1000 && !existingState.active) {
            existingState.active = true
            alerts.push({
              id: alertId,
              type: alertCheck.type,
              severity: alertCheck.severity,
              message: alertCheck.message,
              timestamp: new Date(currentTime),
              triggeredSensors: alertCheck.triggeredSensors
            })

            // Set critical alert flag
            if (alertCheck.severity === 'CRITICAL') {
              this.criticalAlertActive = true
              this.criticalAlertStartTime = currentTime
            }
          }
        }
      } else {
        // Vital is normal - clear any existing alert
        const alertId = vital.sensorId
        this.alertStates.delete(alertId)
      }
    })

    return alerts
  }

  private checkDataFusionAlerts(vitals: VitalMeasurement[], _state: PhysiologicalState, currentTime: number, clearAlert?: (alertId: string) => void): Alert[] {
    const alerts: Alert[] = []
    const hr = vitals.find(v => v.sensorId === 'heart-rate')
    const rr = vitals.find(v => v.sensorId === 'respiration-rate')
    const spo2 = vitals.find(v => v.sensorId === 'oxygen-saturation')
    const temp = vitals.find(v => v.sensorId === 'temperature')
    const activity = vitals.find(v => v.sensorId === 'accelerometer')

    // Clear alerts that are no longer active
    // Hypoxia clearing
    const hypoxiaState = this.alertStates.get('hypoxia-critical')
    if (hypoxiaState && hypoxiaState.active && (!spo2 || spo2.value >= 92)) {
      this.alertStates.delete('hypoxia-critical')
      clearAlert?.('hypoxia-critical')
    }

    // Respiratory distress clearing
    const respDistressState = this.alertStates.get('respiratory-distress')
    if (respDistressState && respDistressState.active && (!rr || !spo2 || !activity || rr.value <= 35 || spo2.value >= 94 || activity.value >= 40)) {
      this.alertStates.delete('respiratory-distress')
      clearAlert?.('respiratory-distress')
    }

    // Infection pattern clearing
    const infectionState = this.alertStates.get('infection-pattern')
    if (infectionState && infectionState.active && (!hr || !temp || hr.value <= 90 || temp.value <= 37.5)) {
      this.alertStates.delete('infection-pattern')
      clearAlert?.('infection-pattern')
    }

    // Critical Alert: Hypoxic State (highest priority)
    if (spo2 && spo2.value < 92) {
      const alertId = 'hypoxia-critical'
      const existingState = this.alertStates.get(alertId)

      if (!existingState) {
        // New alert - start tracking
        this.alertStates.set(alertId, {
          alertId,
          startTime: currentTime,
          lastUpdate: currentTime,
          severity: 'CRITICAL',
          active: false
        })
      } else {
        existingState.lastUpdate = currentTime

        // Check if sustained for 1 second (reduced for demo purposes)
        if (currentTime - existingState.startTime >= 1000 && !existingState.active) {
          existingState.active = true
          alerts.push({
            id: alertId,
            type: 'DATA_FUSION',
            severity: 'CRITICAL',
            message: `CRITICAL HYPOXIA: SpO2 critically low at ${spo2.value}%`,
            timestamp: new Date(currentTime),
            triggeredSensors: ['oxygen-saturation']
          })
          this.criticalAlertActive = true
          this.criticalAlertStartTime = currentTime
        }
      }
    }

    // Critical Alert: Respiratory Distress
    if (rr && spo2 && activity && rr.value > 35 && spo2.value < 94 && activity.value < 40) {
      const alertId = 'respiratory-distress'
      const existingState = this.alertStates.get(alertId)

      if (!existingState) {
        // New alert - start tracking
        this.alertStates.set(alertId, {
          alertId,
          startTime: currentTime,
          lastUpdate: currentTime,
          severity: 'CRITICAL',
          active: false
        })
      } else {
        existingState.lastUpdate = currentTime

        // Check if sustained for 1 second (reduced for demo purposes)
        if (currentTime - existingState.startTime >= 1000 && !existingState.active) {
          existingState.active = true
          alerts.push({
            id: alertId,
            type: 'DATA_FUSION',
            severity: 'CRITICAL',
            message: `CRITICAL RESPIRATORY DISTRESS: High RR (${rr.value}/min) with low SpO2 (${spo2.value}%) at rest`,
            timestamp: new Date(currentTime),
            triggeredSensors: ['respiration-rate', 'oxygen-saturation', 'accelerometer']
          })
          this.criticalAlertActive = true
          this.criticalAlertStartTime = currentTime
        }
      }
    }

    // Infection pattern: high HR + high temp
    if (hr && temp && hr.value > 90 && temp.value > 37.5) {
      const alertId = 'infection-pattern'
      const existingState = this.alertStates.get(alertId)

      if (!existingState) {
        // New alert - start tracking
        this.alertStates.set(alertId, {
          alertId,
          startTime: currentTime,
          lastUpdate: currentTime,
          severity: 'CRITICAL',
          active: false
        })
      } else {
        existingState.lastUpdate = currentTime

        // Check if sustained for 1 second (reduced for demo purposes)
        if (currentTime - existingState.startTime >= 1000 && !existingState.active) {
          existingState.active = true
          alerts.push({
            id: alertId,
            type: 'DATA_FUSION',
            severity: 'CRITICAL',
            message: `POTENTIAL INFECTION: Elevated HR (${hr.value} bpm) and temperature (${temp.value}°C)`,
            timestamp: new Date(currentTime),
            triggeredSensors: ['heart-rate', 'temperature']
          })
          this.criticalAlertActive = true
          this.criticalAlertStartTime = currentTime
        }
      }
    }

    return alerts
  }

  private checkAlertRecovery(vitals: VitalMeasurement[], currentTime: number, clearAlert?: (alertId: string) => void) {
    // Check if there are any active alerts
    const hasActiveAlerts = Array.from(this.alertStates.values()).some(state => state.active)
    if (!hasActiveAlerts) return

    // Check if all vitals are back to normal for sustained period
    const hr = vitals.find(v => v.sensorId === 'heart-rate')
    const rr = vitals.find(v => v.sensorId === 'respiration-rate')
    const spo2 = vitals.find(v => v.sensorId === 'oxygen-saturation')
    const temp = vitals.find(v => v.sensorId === 'temperature')

    const hrNormal = hr ? hr.value <= 100 : true
    const rrNormal = rr ? rr.value <= 25 : true
    const spo2Normal = spo2 ? spo2.value >= 95 : true
    const tempNormal = temp ? temp.value <= 37.5 : true

    if (hrNormal && rrNormal && spo2Normal && tempNormal) {
      // All vitals normal - start or check recovery timer
      if (this.recoveryStartTime === 0) {
        this.recoveryStartTime = currentTime
      } else if (currentTime - this.recoveryStartTime >= 3000) { // 3 seconds of normalcy
        // Clear all active alerts
        for (const [key, state] of this.alertStates) {
          if (state.active) {
            clearAlert?.(key)
            state.active = false
            state.startTime = 0
            state.lastUpdate = 0
          }
        }
        this.criticalAlertActive = false
        this.recoveryStartTime = 0
      }
    } else {
      // Reset recovery timer if any vital goes abnormal again
      this.recoveryStartTime = 0
    }
  }

  private checkVitalThreshold(vital: VitalMeasurement, state: PhysiologicalState): any {
    switch (vital.sensorId) {
      case 'heart-rate':
        console.log('🔍 Checking HR threshold:', vital.value, 'state:', state)
        if (vital.value > 120) {
          console.log('🚨 HR CRITICAL threshold triggered:', vital.value)
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'CRITICAL' as const,
            message: `Heart rate critically high: ${vital.value} bpm`,
            triggeredSensors: ['heart-rate']
          }
        } else if (vital.value > 100) {
          console.log('⚠️ HR WARNING threshold triggered:', vital.value)
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'WARNING' as const,
            message: `Heart rate elevated: ${vital.value} bpm`,
            triggeredSensors: ['heart-rate']
          }
        }
        break

      case 'respiration-rate':
        console.log('🔍 Checking RR threshold:', vital.value, 'state:', state)
        // Context-aware respiratory thresholds based on activity state
        if (state === PhysiologicalState.RESTING) {
          if (vital.value < 10 || vital.value > 25) {
            console.log('🚨 RR RESTING threshold triggered:', vital.value)
            return {
              type: 'CONTEXT_AWARE' as const,
              severity: (vital.value < 8 || vital.value > 30 ? 'CRITICAL' : 'WARNING') as 'WARNING' | 'CRITICAL',
              message: `Abnormal respiration at rest: ${vital.value} breaths/min`,
              triggeredSensors: ['respiration-rate']
            }
          }
        } else if (state === PhysiologicalState.LIGHT_ACTIVITY) {
          if (vital.value < 12) {
            console.log('🚨 RR LIGHT ACTIVITY threshold triggered:', vital.value)
            return {
              type: 'CONTEXT_AWARE' as const,
              severity: 'CRITICAL' as const,
              message: `Poor respiratory response to light activity: ${vital.value} breaths/min`,
              triggeredSensors: ['respiration-rate']
            }
          }
        } else if (state === PhysiologicalState.SUSTAINED_EXERCISE) {
          if (vital.value < 20) {
            console.log('🚨 RR EXERCISE threshold triggered:', vital.value)
            return {
              type: 'CONTEXT_AWARE' as const,
              severity: 'CRITICAL' as const,
              message: `Inadequate respiration during exercise: ${vital.value} breaths/min`,
              triggeredSensors: ['respiration-rate']
            }
          }
        }
        break

      case 'oxygen-saturation':
        if (vital.value < 92) {
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'CRITICAL' as const,
            message: `SpO2 critically low: ${vital.value}%`,
            triggeredSensors: ['oxygen-saturation']
          }
        } else if (vital.value < 95) {
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'WARNING' as const,
            message: `SpO2 low: ${vital.value}%`,
            triggeredSensors: ['oxygen-saturation']
          }
        }
        break

      case 'temperature':
        if (vital.value > 39) {
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'CRITICAL' as const,
            message: `Temperature critically high: ${vital.value}°C`,
            timestamp: new Date(),
            triggeredSensors: ['temperature']
          }
        } else if (vital.value > 37.5) {
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'WARNING' as const,
            message: `Temperature elevated: ${vital.value}°C`,
            timestamp: new Date(),
            triggeredSensors: ['temperature']
          }
        }
        break

      case 'hrv':
        if (vital.value < 20) {
          return {
            type: 'HARD_THRESHOLD' as const,
            severity: 'WARNING' as const,
            message: `HRV critically low: ${vital.value} ms (stress indicator)`,
            triggeredSensors: ['hrv']
          }
        }
        break
    }
    return null
  }

  isCriticalAlertActive(): boolean {
    return this.criticalAlertActive
  }
}