import React from 'react';
import { SimulationScenario } from '../../lib/models/SimulationScenario';
import { AstronautProfile } from '../../lib/simulation-engine/SimulationEngine';
import { colors } from '../../lib/design-tokens/colors';

interface SimulationControlPanelProps {
  scenarios: SimulationScenario[];
  currentScenario: SimulationScenario | null;
  isPlaying: boolean;
  astronautProfile: AstronautProfile;
  onSelectScenario: (scenarioId: string) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onProfileChange: (profile: AstronautProfile) => void;
  onAlertTrigger: () => void;
}

export const SimulationControlPanel: React.FC<SimulationControlPanelProps> = ({
  scenarios,
  currentScenario,
  isPlaying,
  astronautProfile,
  onSelectScenario,
  onPlay,
  onPause,
  onReset,
  onProfileChange,
  onAlertTrigger
}) => {
  return (
    <div style={{
      backgroundColor: colors.bgSurface,
      borderRadius: '12px',
      padding: '20px',
      border: `1px solid ${colors.borderSubtle}`,
      marginBottom: '24px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontFamily: 'Inter',
        margin: '0 0 16px 0',
        color: colors.textPrimary
      }}>
        Simulation Control Panel
      </h3>

      {/* Scenario Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          color: colors.textSecondary,
          marginBottom: '8px',
          fontFamily: 'Inter'
        }}>
          Active Scenario:
        </label>
        <select
          value={currentScenario?.id || ''}
          onChange={(e) => onSelectScenario(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: colors.bgBase,
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: '6px',
            color: colors.textPrimary,
            fontSize: '14px',
            fontFamily: 'Inter'
          }}
        >
          <option value="">Select Scenario...</option>
          {scenarios.map(scenario => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
        {currentScenario && (
          <p style={{
            fontSize: '12px',
            color: colors.textSecondary,
            margin: '8px 0 0 0',
            fontStyle: 'italic'
          }}>
            {currentScenario.description}
          </p>
        )}
      </div>

      {/* Astronaut Profile Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          color: colors.textSecondary,
          marginBottom: '8px',
          fontFamily: 'Inter'
        }}>
          Astronaut Profile:
        </label>
        <select
          value={astronautProfile}
          onChange={(e) => onProfileChange(e.target.value as AstronautProfile)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: colors.bgBase,
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: '6px',
            color: colors.textPrimary,
            fontSize: '14px',
            fontFamily: 'Inter'
          }}
        >
          <option value={AstronautProfile.MALE}>Male Astronaut (60-85 BPM HR)</option>
          <option value={AstronautProfile.FEMALE}>Female Astronaut (65-90 BPM HR)</option>
        </select>
      </div>

      {/* Control Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={!currentScenario}
          style={{
            padding: '12px 20px',
            backgroundColor: isPlaying ? colors.statusCaution : colors.interactiveCyan,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Inter',
            cursor: currentScenario ? 'pointer' : 'not-allowed',
            opacity: currentScenario ? 1 : 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>
            {isPlaying ? '⏸️' : '▶️'}
          </span>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={onReset}
          style={{
            padding: '12px 20px',
            backgroundColor: colors.statusCritical,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Inter',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>🔄</span>
          Reset
        </button>

        <button
          onClick={onAlertTrigger}
          disabled={!isPlaying}
          style={{
            padding: '12px 20px',
            backgroundColor: colors.statusCaution,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Inter',
            cursor: isPlaying ? 'pointer' : 'not-allowed',
            opacity: isPlaying ? 1 : 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>⚠️</span>
          Trigger Alert (5s)
        </button>

        {/* Status Indicator */}
        <div style={{
          marginLeft: 'auto',
          padding: '8px 12px',
          backgroundColor: isPlaying ? colors.statusNormal : colors.bgBase,
          borderRadius: '4px',
          fontSize: '12px',
          color: isPlaying ? '#fff' : colors.textSecondary,
          fontWeight: 'bold'
        }}>
          {isPlaying ? '🔴 LIVE' : '⚫ PAUSED'}
        </div>
      </div>
    </div>
  );
};