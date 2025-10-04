/**
 * Signal quality enumeration for real-time quality assessment
 * Quality < 40% triggers signal loss state with visual overlays
 */
export enum SignalQuality {
  EXCELLENT = 'excellent', // > 90%
  GOOD = 'good',          // 70-90%
  FAIR = 'fair',          // 40-70%
  POOR = 'poor',          // 20-40%
  LOSS = 'loss'           // < 20%
}

/**
 * Signal quality thresholds for different sensor types
 */
export const SIGNAL_QUALITY_THRESHOLDS = {
  ecg: {
    excellent: 90,
    good: 70,
    fair: 40,
    poor: 20,
    loss: 0
  },
  respiration: {
    excellent: 85,
    good: 65,
    fair: 35,
    poor: 15,
    loss: 0
  },
  spo2: {
    excellent: 95,
    good: 90,
    fair: 85,
    poor: 80,
    loss: 0
  },
  temperature: {
    excellent: 95,
    good: 90,
    fair: 85,
    poor: 80,
    loss: 0
  }
};

/**
 * Calculate signal quality based on sensor data characteristics
 */
export const calculateSignalQuality = (
  sensorId: string,
  dataPoints: { timestamp: number; value: number }[],
  artifacts: { start: number; end: number; type: string }[]
): SignalQuality => {
  if (dataPoints.length === 0) return SignalQuality.LOSS;

  // Calculate signal-to-noise ratio (simplified)
  const values = dataPoints.map(p => p.value);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  // Signal quality based on coefficient of variation and artifacts
  const cv = stdDev / Math.abs(mean);
  const artifactRatio = artifacts.length / dataPoints.length;

  let qualityScore = 100;

  // Penalize high variability (noise)
  if (cv > 0.5) qualityScore -= 30;
  else if (cv > 0.2) qualityScore -= 15;

  // Penalize artifacts
  qualityScore -= artifactRatio * 50;

  // Get thresholds for sensor type
  const sensorType = sensorId.split('-')[0];
  const thresholds = SIGNAL_QUALITY_THRESHOLDS[sensorType as keyof typeof SIGNAL_QUALITY_THRESHOLDS] || SIGNAL_QUALITY_THRESHOLDS.ecg;

  // Determine quality level
  if (qualityScore >= thresholds.excellent) return SignalQuality.EXCELLENT;
  if (qualityScore >= thresholds.good) return SignalQuality.GOOD;
  if (qualityScore >= thresholds.fair) return SignalQuality.FAIR;
  if (qualityScore >= thresholds.poor) return SignalQuality.POOR;
  return SignalQuality.LOSS;
};