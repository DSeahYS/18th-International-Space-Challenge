import React from 'react';
import { WaveformData } from '../../lib/models/WaveformData';
import { VitalMeasurement } from '../../lib/models/VitalMeasurement';
import { WaveformCanvas } from '../charts/WaveformCanvas';
import { colors } from '../../lib/design-tokens/colors';

interface RespiratoryPanelProps {
  respirationWaveform: WaveformData | null;
  vitals: VitalMeasurement[];
  showThresholds?: boolean;
}

export const RespiratoryPanel: React.FC<RespiratoryPanelProps> = ({
  respirationWaveform,
  vitals,
  showThresholds = false
}) => {
  // Calculate RR and SpO2 from vitals
  const calculateRespiratoryMetrics = () => {
    const rrVitals = vitals.filter(v => v.sensorId === 'respiration-rate').slice(-5);
    const spo2Vitals = vitals.filter(v => v.sensorId === 'oxygen-saturation').slice(-5);

    const avgRR = rrVitals.length > 0
      ? rrVitals.reduce((sum, v) => sum + v.value, 0) / rrVitals.length
      : null;

    const avgSpO2 = spo2Vitals.length > 0
      ? spo2Vitals.reduce((sum, v) => sum + v.value, 0) / spo2Vitals.length
      : null;

    return {
      rr: avgRR ? Math.round(avgRR) : null,
      spo2: avgSpO2 ? Math.round(avgSpO2) : null
    };
  };

  const metrics = calculateRespiratoryMetrics();

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
          Respiratory System
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
              {metrics.rr || '--'}
            </span> /min
          </div>
          <div>
            <span style={{ color: colors.textPrimary, fontWeight: 'bold' }}>
              {metrics.spo2 || '--'}
            </span>% SpO2
          </div>
        </div>
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
  );
};