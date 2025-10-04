export interface Sensor {
  id: string
  type: 'HEART_RATE' | 'BREATHING_RATE' | 'SPO2' | 'SKIN_TEMP' | 'ACCELEROMETER' | 'ECG'
  samplingRate: number
  signalQuality: number
  batteryLevel: number
}