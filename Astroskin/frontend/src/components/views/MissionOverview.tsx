import React from 'react';
import { VitalsTile } from '../vitals/VitalsTile';
import { AlertRail } from '../alerts/AlertRail';
import { ActivityLevelGauge } from '../indicators/ActivityLevelGauge';
import { StressLevelGauge } from '../indicators/StressLevelGauge';
import { useDataStore } from '../../stores/dataStore';
import { colors } from '../../lib/design-tokens/colors';

export const MissionOverview: React.FC = () => {
  const { vitals, alerts } = useDataStore();

  // Create labels for vitals based on sensorId
  const getVitalLabel = (sensorId: string) => {
    switch (sensorId) {
      case 'heart-rate': return 'Heart Rate';
      case 'temperature': return 'Temperature';
      case 'oxygen-saturation': return 'SpO2';
      case 'respiration-rate': return 'Respiration';
      default: return sensorId.replace('-', ' ').toUpperCase();
    }
  };

  return (
    <div className="mission-overview">
      {/* Master Indicators - Top Row */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <ActivityLevelGauge />
        <StressLevelGauge />
      </div>

      {/* System Status Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <h3 style={{
            fontSize: '16px',
            fontFamily: 'Inter',
            margin: '0 0 12px 0',
            color: colors.textPrimary
          }}>
            Cardiovascular Status
          </h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {vitals.filter(v => ['heart-rate'].includes(v.sensorId)).map((vital, index) => (
              <VitalsTile
                key={`${vital.sensorId}-${index}`}
                vital={vital}
                label={getVitalLabel(vital.sensorId)}
              />
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: colors.bgSurface,
          borderRadius: '8px',
          padding: '16px',
          border: `1px solid ${colors.borderSubtle}`
        }}>
          <h3 style={{
            fontSize: '16px',
            fontFamily: 'Inter',
            margin: '0 0 12px 0',
            color: colors.textPrimary
          }}>
            Respiratory Status
          </h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {vitals.filter(v => ['respiration-rate', 'oxygen-saturation'].includes(v.sensorId)).map((vital, index) => (
              <VitalsTile
                key={`${vital.sensorId}-${index}`}
                vital={vital}
                label={getVitalLabel(vital.sensorId)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alert Summary */}
      <AlertRail alerts={alerts} />
    </div>
  );
};