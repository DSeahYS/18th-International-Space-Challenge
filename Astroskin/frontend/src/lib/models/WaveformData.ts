export interface WaveformData {
  sensorId: string
  dataPoints: { timestamp: number; value: number }[]
  artifacts: { start: number; end: number; type: string }[]
}