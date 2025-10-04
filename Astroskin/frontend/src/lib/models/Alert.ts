export interface Alert {
  id: string
  type: 'HARD_THRESHOLD' | 'DATA_FUSION' | 'CONTEXT_AWARE'
  severity: 'WARNING' | 'CRITICAL'
  message: string
  timestamp: Date
  triggeredSensors: string[]
}