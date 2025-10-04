import React from 'react'
import { SimulationScenario } from '../../lib/models/SimulationScenario'
import { colors } from '../../lib/design-tokens/colors'

interface SimulationPanelProps {
  scenarios: SimulationScenario[]
  onSelectScenario: (id: string) => void
  currentScenario: SimulationScenario | null
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({
  scenarios,
  onSelectScenario,
  currentScenario
}) => {
  return (
    <div className="scenario-buttons">
      {scenarios.map(scenario => (
        <button
          key={scenario.id}
          onClick={() => onSelectScenario(scenario.id)}
          className={`scenario-btn ${currentScenario?.id === scenario.id ? 'active' : ''}`}
          style={{
            backgroundColor: currentScenario?.id === scenario.id ? colors.interactiveCyan : colors.bgSurface,
            color: currentScenario?.id === scenario.id ? colors.bgBase : colors.textPrimary,
            border: `1px solid ${colors.borderSubtle}`,
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Inter',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            margin: '0 8px 0 0'
          }}
        >
          {scenario.name}
        </button>
      ))}
    </div>
  )
}