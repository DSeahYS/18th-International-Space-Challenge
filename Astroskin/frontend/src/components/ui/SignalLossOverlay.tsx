import React from 'react';
import { SignalQuality } from '../../lib/models/SignalQuality';
import { colors } from '../../lib/design-tokens/colors';

interface SignalLossOverlayProps {
  quality: SignalQuality;
  sensorId: string;
}

export const SignalLossOverlay: React.FC<SignalLossOverlayProps> = ({ quality, sensorId }) => {
  // Only show overlay for poor quality or loss
  if (quality !== SignalQuality.POOR && quality !== SignalQuality.LOSS) {
    return null;
  }

  const isLoss = quality === SignalQuality.LOSS;
  const overlayOpacity = isLoss ? 0.8 : 0.6;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      color: colors.statusCritical,
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      zIndex: 10,
      borderRadius: '8px',
      pointerEvents: 'none' // Allow interactions with underlying chart
    }}>
      <div style={{
        backgroundColor: colors.bgSurface,
        padding: '8px 16px',
        borderRadius: '4px',
        border: `2px solid ${colors.statusCritical}`,
        marginBottom: '8px'
      }}>
        ⚠️ SIGNAL {isLoss ? 'LOSS' : 'QUALITY POOR'}
      </div>
      <div style={{
        fontSize: '12px',
        color: colors.textSecondary,
        fontWeight: 'normal'
      }}>
        {sensorId.replace('-', ' ').toUpperCase()}
      </div>
    </div>
  );
};