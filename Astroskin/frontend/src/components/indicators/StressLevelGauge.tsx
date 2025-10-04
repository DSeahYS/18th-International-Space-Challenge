import React, { useState, useEffect } from 'react';
import { useDataStore } from '../../stores/dataStore';
import { colors } from '../../lib/design-tokens/colors';

export const StressLevelGauge: React.FC = () => {
  const { vitals } = useDataStore();
  const [stressLevel, setStressLevel] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(0);

  // Calculate stress level from HRV and other vitals
  const calculateStressLevel = () => {
    if (vitals.length === 0) return 0;

    const recentVitals = vitals.slice(-20); // More data for HRV calculation

    // Get heart rate data for HRV calculation
    const hrVitals = recentVitals.filter(v => v.sensorId === 'heart-rate');
    if (hrVitals.length < 5) return 5; // Default moderate stress

    // Simple RMSSD calculation (Root Mean Square of Successive Differences)
    let sumSquaredDiffs = 0;
    for (let i = 1; i < hrVitals.length; i++) {
      const diff = hrVitals[i].value - hrVitals[i-1].value;
      sumSquaredDiffs += diff * diff;
    }
    const rmssd = Math.sqrt(sumSquaredDiffs / (hrVitals.length - 1));

    // Stress level based on HRV RMSSD:
    // RMSSD > 40ms: low stress (0-3)
    // RMSSD 20-40ms: moderate stress (4-6)
    // RMSSD < 20ms: high stress (7-10)
    let stressLevel;
    if (rmssd > 40) stressLevel = Math.floor(Math.random() * 4); // 0-3
    else if (rmssd > 20) stressLevel = 4 + Math.floor(Math.random() * 3); // 4-6
    else stressLevel = 7 + Math.floor(Math.random() * 4); // 7-10

    // Factor in heart rate
    const avgHR = hrVitals.reduce((sum, v) => sum + v.value, 0) / hrVitals.length;
    if (avgHR > 90) stressLevel = Math.min(10, stressLevel + 2); // Increase stress for high HR
    if (avgHR < 60) stressLevel = Math.max(0, stressLevel - 1); // Decrease stress for low HR

    return stressLevel;
  };

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdate >= 2000) { // Update every 2 seconds
      setStressLevel(calculateStressLevel());
      setLastUpdate(now);
    }
  }, [vitals, lastUpdate]);
  const getStressColor = (level: number) => {
    if (level <= 3) return colors.statusNormal;
    if (level <= 7) return colors.statusCaution;
    return colors.statusCritical;
  };

  const getStressLabel = (level: number) => {
    if (level <= 3) return 'Relaxed';
    if (level <= 7) return 'Moderate';
    return 'High Stress';
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
        Stress Level
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
          {stressLevel}/10
        </div>
        <div style={{
          flex: 1,
          height: '8px',
          backgroundColor: colors.bgBase,
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(stressLevel / 10) * 100}%`,
            height: '100%',
            backgroundColor: getStressColor(stressLevel),
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
      <div style={{
        fontSize: '12px',
        color: getStressColor(stressLevel),
        marginTop: '4px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        {getStressLabel(stressLevel)}
      </div>
    </div>
  );
};