import React from 'react'
import { VitalMeasurement } from '../../lib/models/VitalMeasurement'
import { colors } from '../../lib/design-tokens/colors'

interface VitalsTileProps {
  vital: VitalMeasurement
  label: string
}

export const VitalsTile: React.FC<VitalsTileProps> = ({ vital, label }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NORMAL': return colors.statusNormal
      case 'WARNING': return colors.statusCaution
      case 'CRITICAL': return colors.statusCritical
      default: return colors.textSecondary
    }
  }

  const formatValue = (value: number, sensorId: string) => {
    if (sensorId === 'temperature') return `${value.toFixed(1)}°C`
    if (sensorId === 'heart-rate') return `${Math.round(value)} bpm`
    return value.toFixed(1)
  }

  return (
    <div style={{
      backgroundColor: colors.bgSurface,
      border: `1px solid ${colors.borderSubtle}`,
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '14px',
        color: colors.textSecondary,
        marginBottom: '8px',
        fontFamily: 'Inter'
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '32px',
        fontFamily: 'Roboto Mono',
        color: colors.textPrimary,
        marginBottom: '8px'
      }}>
        {formatValue(vital.value, vital.sensorId)}
      </div>
      <div style={{
        fontSize: '12px',
        color: getStatusColor(vital.status),
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }}>
        {vital.status}
      </div>
    </div>
  )
}