import React from 'react';
import { colors } from '../../lib/design-tokens/colors';

interface ThresholdToggleProps {
  showThresholds: boolean;
  onToggle: () => void;
}

export const ThresholdToggle: React.FC<ThresholdToggleProps> = ({ showThresholds, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '8px 16px',
        backgroundColor: showThresholds ? colors.interactiveCyan : colors.bgBase,
        color: showThresholds ? '#fff' : colors.textPrimary,
        border: `1px solid ${showThresholds ? colors.interactiveCyan : colors.borderSubtle}`,
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'Inter',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <span>{showThresholds ? '✓' : '○'}</span>
      Show Thresholds
    </button>
  );
};