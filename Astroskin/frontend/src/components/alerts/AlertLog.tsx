import React from 'react';
import { Alert } from '../../lib/models/Alert';
import { colors } from '../../lib/design-tokens/colors';

interface AlertLogProps {
  alerts: Alert[];
}

export const AlertLog: React.FC<AlertLogProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'WARNING': return colors.statusCaution;
      case 'CRITICAL': return colors.statusCritical;
      default: return colors.statusNormal;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'WARNING': return '⚠️';
      case 'CRITICAL': return '🚨';
      default: return 'ℹ️';
    }
  };

  const handleAlertClick = (alert: Alert) => {
    // Timeline scrubbing - jump to alert timestamp
    // This would integrate with waveform timeline in a full implementation
    console.log(`Scrubbing to timestamp: ${alert.timestamp}`);
  };

  if (alerts.length === 0) {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: colors.bgSurface,
        borderRadius: '8px',
        color: colors.textSecondary,
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        No alerts detected
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: colors.bgSurface,
      borderRadius: '8px',
      padding: '16px',
      border: `1px solid ${colors.borderSubtle}`
    }}>
      <h3 style={{
        fontSize: '18px',
        fontFamily: 'Inter',
        margin: '0 0 16px 0',
        color: colors.textPrimary
      }}>
        Alert Log ({alerts.length} alerts)
      </h3>

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {alerts.slice(-10).reverse().map((alert) => ( // Show latest 10, most recent first
          <div
            key={alert.id}
            onClick={() => handleAlertClick(alert)}
            style={{
              backgroundColor: colors.bgBase,
              border: `1px solid ${getSeverityColor(alert.severity)}`,
              borderRadius: '6px',
              padding: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.overlayFocus8;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.bgBase;
            }}
          >
            <span style={{ fontSize: '18px' }}>{getSeverityIcon(alert.severity)}</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                color: colors.textPrimary,
                fontWeight: 'bold',
                marginBottom: '4px'
              }}>
                {alert.message}
              </div>
              <div style={{
                fontSize: '12px',
                color: colors.textSecondary,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                <span>{alert.type.replace('_', ' ')} • {alert.triggeredSensors.join(', ')}</span>
              </div>
            </div>
            <div style={{
              fontSize: '12px',
              color: getSeverityColor(alert.severity),
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {alert.severity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};