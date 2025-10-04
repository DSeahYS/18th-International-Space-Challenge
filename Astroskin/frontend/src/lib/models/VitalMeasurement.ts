export interface VitalMeasurement {
  sensorId: string
  value: number
  timestamp: Date
  status: 'NORMAL' | 'WARNING' | 'CRITICAL'
}