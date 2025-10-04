import React from 'react';
import { WaveformData } from '../../lib/models/WaveformData';
import { VitalMeasurement } from '../../lib/models/VitalMeasurement';
import { WaveformCanvas } from '../charts/WaveformCanvas';
import { colors } from '../../lib/design-tokens/colors';

interface CardiovascularPanelProps {
  ecgWaveform: WaveformData | null;
  vitals: VitalMeasurement[];
  showThresholds?: boolean;
}

export const CardiovascularPanel: React.FC<CardiovascularPanelProps> = ({
  ecgWaveform,
  vitals,
  showThresholds = false
}) => {
  // Calculate HR and HRV from vitals
  const calculateCardiovascularMetrics = () => {
    const hrVitals = vitals.filter(v => v.sensorId === 'heart-rate').slice(-10);
    if (hrVitals.length === 0) return { hr: null, hrv: null };

    const avgHR = hrVitals.reduce((sum, v) => sum + v.value, 0) / hrVitals.length;

    // Simple HRV calculation (RMSSD)
    let sumSquaredDiffs = 0;
    for (let i = 1; i < hrVitals.length; i++) {
      const diff = hrVitals[i].value - hrVitals[i-1].value;
      sumSquaredDiffs += diff * diff;
    }
    const hrv = hrVitals.length > 1 ? Math.sqrt(sumSquaredDiffs / (hrVitals.length - 1)) : null;

    return { hr: Math.round(avgHR), hrv: hrv ? Math.round(hrv * 10) / 10 : null };
  };

  const metrics = calculateCardiovascularMetrics();

  return (
    <div style={{
      backgroundColor: colors.bgSurface,
      borderRadius: '8px',
      padding: '16px',
      border: `1px solid ${colors.borderSubtle}`,
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: colors.textPrimary,
          fontFamily: 'Inter'
        }}>
          Cardiovascular System
        </div>
        <div style={{
          display: 'flex',
          gap: '24px',
          fontSize: '14px',
          color: colors.textSecondary,
          fontFamily: 'Roboto Mono'
        }}>
          <div>
            <span style={{ color: colors.textPrimary, fontWeight: 'bold' }}>
              {metrics.hr || '--'}
            </span> bpm
          </div>
          <div>
            <span style={{ color: colors.textPrimary, fontWeight: 'bold' }}>
              {metrics.hrv || '--'}
            </span> ms HRV
          </div>
        </div>
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
  );
};