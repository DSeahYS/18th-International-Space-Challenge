import React from 'react';
import { ViewMode } from '../../lib/models/ViewMode';
import { colors } from '../../lib/design-tokens/colors';

interface ViewModeToggleProps {
  currentMode: ViewMode;
  onToggle: () => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ currentMode, onToggle }) => {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: colors.bgSurface,
      borderRadius: '8px',
      padding: '4px',
      border: `1px solid ${colors.borderSubtle}`
    }}>
      <button
        onClick={currentMode === ViewMode.DIAGNOSTIC_VIEW ? onToggle : undefined}
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: currentMode === ViewMode.MISSION_OVERVIEW ? colors.interactiveCyan : 'transparent',
          color: currentMode === ViewMode.MISSION_OVERVIEW ? '#fff' : colors.textPrimary,
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.2s ease'
        }}
      >
        Mission Overview
      </button>
      <button
        onClick={currentMode === ViewMode.MISSION_OVERVIEW ? onToggle : undefined}
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: currentMode === ViewMode.DIAGNOSTIC_VIEW ? colors.interactiveCyan : 'transparent',
          color: currentMode === ViewMode.DIAGNOSTIC_VIEW ? '#fff' : colors.textPrimary,
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          transition: 'all 0.2s ease'
        }}
      >
        Diagnostic View
      </button>
    </div>
  );
};