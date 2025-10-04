import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { WaveformData } from '../../lib/models/WaveformData'
import { SignalQuality, calculateSignalQuality } from '../../lib/models/SignalQuality'
import { SignalLossOverlay } from '../ui/SignalLossOverlay'
import { colors } from '../../lib/design-tokens/colors'

Chart.register(...registerables)

interface WaveformCanvasProps {
  waveform: WaveformData
  showThresholds?: boolean
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({ waveform, showThresholds = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)
  const [signalQuality, setSignalQuality] = useState<SignalQuality>(SignalQuality.EXCELLENT)


  useEffect(() => {
    // Calculate signal quality
    const quality = calculateSignalQuality(waveform.sensorId, waveform.dataPoints, waveform.artifacts);
    setSignalQuality(quality);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy()
        }

        const dataColor = waveform.sensorId.includes('ecg') ? colors.dataEcg :
                          waveform.sensorId.includes('respiration') ? colors.dataResp :
                          waveform.sensorId.includes('accelerometer') ? colors.interactiveCyan :
                          waveform.sensorId.includes('temperature') ? colors.statusNormal :
                          waveform.sensorId.includes('blood-pressure') ? colors.statusCaution :
                          waveform.sensorId.includes('emg') ? colors.statusCritical :
                          colors.interactiveCyan;

        // Define thresholds based on sensor type
        const getThresholds = (sensorId: string) => {
          if (sensorId.includes('ecg')) {
            return { warning: 1.0, critical: 1.5 }; // ECG amplitude thresholds (mV)
          } else if (sensorId.includes('respiration')) {
            return { warning: 0.6, critical: 0.9 }; // Respiration amplitude thresholds
          } else if (sensorId.includes('accelerometer')) {
            return { warning: 0.7, critical: 0.9 }; // Movement thresholds
          } else if (sensorId.includes('temperature')) {
            return { warning: 37.5, critical: 38.0 }; // Temperature thresholds (°C)
          } else if (sensorId.includes('blood-pressure')) {
            return { warning: 140, critical: 160 }; // BP systolic thresholds (mmHg)
          } else if (sensorId.includes('emg')) {
            return { warning: 0.7, critical: 0.9 }; // EMG activity thresholds
          }
          return null;
        };

        const thresholds = getThresholds(waveform.sensorId);
        const datasets = [{
          label: `${waveform.sensorId} (Raw Data)`,
          data: waveform.dataPoints.map(p => p.value),
          borderColor: dataColor,
          backgroundColor: dataColor + '20',
          borderWidth: 2,
          tension: 0.1,
          pointRadius: 0, // Hide points for performance with 256Hz data
          fill: false
        }];

        // Add threshold lines if enabled
        if (showThresholds && thresholds) {
          datasets.push({
            label: 'Warning Threshold',
            data: Array(waveform.dataPoints.length).fill(thresholds.warning),
            borderColor: colors.statusCaution,
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          } as any);
          datasets.push({
            label: 'Critical Threshold',
            data: Array(waveform.dataPoints.length).fill(thresholds.critical),
            borderColor: colors.statusCritical,
            borderWidth: 2,
            borderDash: [10, 5],
            pointRadius: 0,
            fill: false
          } as any);
        }

        // Apply blur effect for poor signal quality
        const shouldBlur = quality === SignalQuality.POOR || quality === SignalQuality.LOSS;
        if (shouldBlur) {
          ctx.filter = 'blur(1px)';
        } else {
          ctx.filter = 'none';
        }

        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: waveform.dataPoints.map((_, i) => i.toString()),
            datasets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 0 // Disable animations for real-time 256Hz updates
            },
            interaction: {
              intersect: false,
              mode: 'index'
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: colors.textPrimary,
                  font: {
                    family: 'Inter',
                    size: 12
                  }
                }
              },
              tooltip: {
                enabled: true,
                backgroundColor: colors.bgSurface,
                titleColor: colors.textPrimary,
                bodyColor: colors.textSecondary,
                borderColor: colors.borderSubtle,
                borderWidth: 1
              }
            },
            scales: {
              x: {
                display: false, // Hide x-axis for clean waveform view
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: false,
                grid: {
                  color: colors.borderSubtle + '40',
                  lineWidth: 1
                },
                ticks: {
                  color: colors.textSecondary,
                  font: {
                    family: 'Roboto Mono',
                    size: 10
                  },
                  callback: function(value) {
                    const numValue = typeof value === 'string' ? parseFloat(value) : value
                    if (waveform.sensorId.includes('ecg')) {
                      return numValue.toFixed(1) + ' mV'
                    } else if (waveform.sensorId.includes('blood-pressure')) {
                      return Math.round(numValue) + ' mmHg'
                    } else if (waveform.sensorId.includes('temperature')) {
                      return numValue.toFixed(1) + ' °C'
                    }
                    return numValue.toFixed(2)
                  }
                }
              }
            }
          }
        })
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [waveform])

  return (
    <div style={{ position: 'relative', height: '200px' }}>
      <canvas ref={canvasRef} style={{
        width: '100%',
        height: '100%'
      }}></canvas>
      <SignalLossOverlay quality={signalQuality} sensorId={waveform.sensorId} />
    </div>
  )
}