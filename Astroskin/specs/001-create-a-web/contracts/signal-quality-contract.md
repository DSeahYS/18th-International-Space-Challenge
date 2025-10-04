# Signal Quality Contract

## Overview
Defines the interface for signal quality assessment and UI state management.

## Data Structure

### SignalQuality
```typescript
interface SignalQuality {
  sensorId: string
  currentQuality: number // 0-100
  threshold: number // Default: 40
  status: 'GOOD' | 'DEGRADED' | 'LOST'
  lastUpdate: Date
}
```

## State Transitions

### Quality Assessment Rules
- GOOD: quality >= threshold
- DEGRADED: threshold > quality >= 20
- LOST: quality < 20

### UI State Triggers
- DEGRADED: Show warning overlay on affected components
- LOST: Show "SIGNAL LOSS" overlay with data blur
- GOOD: Clear all overlays

## Integration Points

### Simulation Engine
Must generate realistic signal quality values that occasionally drop below threshold.

### UI Components
- VitalsTile: Show quality indicator
- WaveformCanvas: Apply blur overlay when LOST
- AlertRail: Generate quality-related alerts

## Error Handling
- Invalid sensorId: Return 404
- Quality out of range: Clamp to 0-100
- Missing data: Use last known quality</content>
<parameter name="filePath">C:\VSCode Folder\Astroskin\specs\001-create-a-web\contracts\signal-quality-contract.md