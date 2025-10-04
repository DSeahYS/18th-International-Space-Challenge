import React, { useState, useEffect } from 'react';
import { useDataStore } from '../../stores/dataStore';
import { colors } from '../../lib/design-tokens/colors';

export const ActivityLevelGauge: React.FC = () => {
  const { vitals } = useDataStore();
  const [activityLevel, setActivityLevel] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);

  // Calculate activity level from accelerometer data fusion
  // In a real implementation, this would use accelerometer data
  // For now, we'll simulate based on heart rate variability
  const calculateActivityLevel = () => {
    if (vitals.length === 0) return 0;

    // Simple heuristic: higher HRV suggests lower activity (resting)
    // Lower HRV suggests higher activity (exercise/stress)
    const recentVitals = vitals.slice(-10);
    const avgHR = recentVitals
      .filter(v => v.sensorId === 'heart-rate')
      .reduce((sum, v) => sum + v.value, 0) / Math.max(1, recentVitals.filter(v => v.sensorId === 'heart-rate').length);

    // Activity level: 0-10 scale
    // HR < 60: low activity (0-2)
    // HR 60-80: moderate (3-6)
    // HR > 80: high activity (7-10)
    if (avgHR < 60) return Math.floor(Math.random() * 3); // 0-2
    if (avgHR < 80) return 3 + Math.floor(Math.random() * 4); // 3-6
    return 7 + Math.floor(Math.random() * 4); // 7-10
  };

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdate >= 2000) { // Update every 2 seconds
      setActivityLevel(calculateActivityLevel());
      setLastUpdate(now);
    }
  }, [vitals, lastUpdate]);
  const getActivityColor = (level: number) => {
    if (level <= 3) return colors.statusNormal;
    if (level <= 7) return colors.statusCaution;
    return colors.statusCritical;
  };

  const getActivityLabel = (level: number) => {
    if (level <= 3) return 'Resting';
    if (level <= 7) return 'Active';
    return 'High Activity';
  };

  return (
    <div style={{
      backgroundColor: colors.bgSurface,
      borderRadius: '8px',
      padding: '16px',
      border: `1px solid ${colors.borderSubtle}`,
      minWidth: '200px'
    }}>
      <div style={{
        fontSize: '14px',
        color: colors.textSecondary,
        marginBottom: '8px',
        fontFamily: 'Inter'
      }}>
        Activity Level
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          fontSize: '24px',
          fontFamily: 'Roboto Mono',
          color: colors.textPrimary,
          fontWeight: 'bold'
        }}>
          {activityLevel}/10
        </div>
        <div style={{
          flex: 1,
          height: '8px',
          backgroundColor: colors.bgBase,
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(activityLevel / 10) * 100}%`,
            height: '100%',
            backgroundColor: getActivityColor(activityLevel),
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
      <div style={{
        fontSize: '12px',
        color: getActivityColor(activityLevel),
        marginTop: '4px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        {getActivityLabel(activityLevel)}
      </div>
    </div>
  );
};