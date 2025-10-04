import React from 'react'
import { Alert } from '../../lib/models/Alert'
import { colors } from '../../lib/design-tokens/colors'

interface AlertRailProps {
  alerts: Alert[]
}

export const AlertRail: React.FC<AlertRailProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'WARNING': return colors.statusCaution
      case 'CRITICAL': return colors.statusCritical
      default: return colors.statusNormal
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'WARNING': return '⚠️'
      case 'CRITICAL': return '🚨'
      default: return 'ℹ️'
    }
  }

  if (alerts.length === 0) {
    return (
      <div style={{
        color: colors.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
        padding: '16px'
      }}>
        No alerts detected
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {alerts.map(alert => (
        <div
          key={alert.id}
          style={{
            backgroundColor: colors.bgSurface,
            border: `1px solid ${getSeverityColor(alert.severity)}`,
            borderRadius: '6px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
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
              color: colors.textSecondary
            }}>
              {new Date(alert.timestamp).toLocaleTimeString()} • {alert.type.replace('_', ' ')} • {alert.triggeredSensors.join(', ')}
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
  )
}