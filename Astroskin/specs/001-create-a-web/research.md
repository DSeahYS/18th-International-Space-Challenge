# Research Findings: UI Decoupling & De-duplication

**Date**: October 3, 2025
**Feature**: UI improvements for AURA-Viz astronaut biometric visualization

## Research Questions & Findings

### 1. How to implement efficient view mode switching in React with state persistence?

**Decision**: Use Zustand store with view mode state and URL-based persistence
**Rationale**: Zustand provides simple, performant state management without boilerplate. URL persistence allows bookmarking specific views and browser back/forward navigation.
**Alternatives Considered**:
- React Router: Too heavy for simple view switching
- React Context: More boilerplate than Zustand
- Local storage: Doesn't support URL sharing

**Implementation**: Single store slice for view mode with URL synchronization.

### 2. Best practices for waveform-first data visualization with Chart.js?

**Decision**: Use Chart.js with custom plugins for real-time updates and threshold overlays
**Rationale**: Chart.js is lightweight and extensible. Custom plugins allow efficient threshold rendering without full re-renders.
**Alternatives Considered**:
- D3.js: More powerful but steeper learning curve and heavier
- Canvas API: Too low-level for this use case
- WebGL charts: Overkill for 256Hz data

**Implementation**: Chart.js line chart with streaming plugin and custom threshold annotation plugin.

### 3. Patterns for signal quality indication and data loss states in real-time dashboards?

**Decision**: Semi-transparent overlay with clear text and icon indicators
**Rationale**: Provides immediate visual feedback without removing old data context. Follows common UX patterns in monitoring dashboards.
**Alternatives Considered**:
- Complete data hiding: Loses context of when data was lost
- Color coding only: Not accessible enough
- Modal alerts: Disrupts workflow

**Implementation**: Conditional rendering of overlay component with blur effect and status text.

### 4. Implementation approaches for dynamic threshold visualization on time-series charts?

**Decision**: Chart.js annotation plugin with dynamic position calculation
**Rationale**: Annotations are efficient and can be updated without full chart re-renders. Dynamic calculation ensures accuracy.
**Alternatives Considered**:
- Canvas drawing: More complex to implement and maintain
- Multiple datasets: Inefficient for real-time updates
- CSS overlays: Not synchronized with chart scaling

**Implementation**: Custom annotation plugin that calculates positions based on nominal ranges and multipliers.

### 5. Timeline scrubbing and cross-filtering patterns for multi-stream data?

**Decision**: Shared timeline state with event-driven updates
**Rationale**: Single source of truth for timeline position ensures all charts stay synchronized. Event-driven updates prevent unnecessary re-renders.
**Alternatives Considered**:
- Direct chart manipulation: Leads to synchronization issues
- Redux for timeline state: Overkill for this scope
- Chart.js built-in zooming: Not designed for cross-chart synchronization

**Implementation**: Zustand store for timeline state with event listeners on charts.

### 6. Design patterns for master-level contextual indicators in monitoring dashboards?

**Decision**: Gauge-style indicators with color-coded states
**Rationale**: Gauges provide intuitive visual feedback for continuous values. Color coding follows accessibility standards.
**Alternatives Considered**:
- Text-only indicators: Less visually engaging
- Complex charts: Overwhelming for summary information
- Progress bars: Less appropriate for multi-state indicators

**Implementation**: SVG-based gauge components with configurable ranges and colors.

## Technical Investigation Results

### Chart.js Performance Optimization
- Use `animation: false` for real-time updates
- Implement data streaming with fixed buffer size
- Use `update('none')` for efficient partial updates
- Leverage Chart.js plugins for custom rendering

### React Rendering Optimization
- Use `React.memo` for chart components
- Implement proper dependency arrays in `useEffect`
- Use `useCallback` for event handlers
- Consider `useMemo` for expensive calculations

### Accessibility Standards
- Ensure 4.5:1 contrast ratio for text
- Provide keyboard navigation for interactive elements
- Include ARIA labels for dynamic content
- Support high contrast mode

### WebSocket/Streaming Patterns
- Use exponential backoff for reconnection
- Implement message buffering during disconnections
- Provide connection status indicators
- Handle message ordering and deduplication

## Risk Assessment & Mitigations

### Performance Risks
**Risk**: 256Hz rendering causing frame drops
**Mitigation**: Implement efficient update patterns, use requestAnimationFrame, monitor performance

**Risk**: Memory leaks from real-time data accumulation
**Mitigation**: Implement circular buffers, proper cleanup in useEffect

### Complexity Risks
**Risk**: View mode switching complexity
**Mitigation**: Keep view logic separate, use clear state boundaries

**Risk**: Timeline synchronization issues
**Mitigation**: Single source of truth, comprehensive testing

### Accessibility Risks
**Risk**: Dynamic content not accessible
**Mitigation**: Follow WCAG guidelines, test with screen readers

## Implementation Recommendations

1. **Start with view mode infrastructure** before UI components
2. **Implement signal quality system** early for testing data loss states
3. **Use Chart.js plugins** for threshold visualization
4. **Test performance** with realistic data volumes from the beginning
5. **Prioritize accessibility** in component design
6. **Implement proper error boundaries** for robust operation

## Success Metrics
- 256Hz waveform rendering without frame drops
- <100ms response time for view mode switches
- WCAG AA compliance for all interactive elements
- Clear visual feedback for all system states
- Intuitive timeline scrubbing experience</content>
<parameter name="oldString"># Research: AURA-Viz Dashboard

## Research Concepts Implementation

### Decision: Personalized Baselines
**Rationale**: Establish "normal" baseline for healthy astronaut at rest; anomalies as deviations from personalized norm, reducing false positives in microgravity deconditioning.
**Alternatives Considered**: Static thresholds rejected for not accounting individual variability.

### Decision: Data Fusion Alerting
**Rationale**: Alerts triggered by convergence of evidence (e.g., rising temp + HR + BR) rather than single out-of-range metric, improving accuracy for infection detection.
**Alternatives Considered**: Single-metric thresholds too prone to false alarms during exercise.

### Decision: Contextual Awareness via Accelerometer
**Rationale**: Differentiate physiological changes due to exercise vs. medical issues using activity data, preventing alerts during intentional exertion.
**Alternatives Considered**: Time-based assumptions rejected for not reflecting real activity.

## Simulation Scenarios

### Scenario A: Normal Operations (Baseline)
**Data Signature**: HR 65-75 BPM, BR 14-18, SpO2 97-99%, Skin Temp 34-36°C, Accelerometer <5, all signal qualities >95%.

### Scenario B: Cardiovascular Deconditioning during Exercise
**Data Signature**: Accelerometer 70-80, HR spikes to 170-180 BPM disproportionately, BR 35-40, slow recovery.
**Alert Goal**: "Caution: High Cardiovascular Load" when HR/RR abnormal for activity.

### Scenario C: Onset of Infection (Febrile State)
**Data Signature**: Skin Temp trends 36°C to 37.2°C, HR 70 to 92 BPM, BR 16 to 20 over hours.
**Alert Goal**: "Warning: Potential Febrile State Detected" via data fusion trends.

### Scenario D: Space Motion Sickness (Neurovestibular Stress)
**Data Signature**: Low activity, periodic HR spikes, HRV drop indicating stress.
**Alert Goal**: "Caution: High Sympathetic Nervous System Activation".

## Technical Decisions

### Decision: React SPA with Zustand
**Rationale**: Efficient state management for high-frequency streams; SPA for real-time updates.
**Alternatives Considered**: Vue.js less ecosystem for data viz; Redux overkill for client-side.

### Decision: Chart.js with Streaming Plugins
**Rationale**: Canvas-based, handles 256Hz ECG without drops; streaming for real-time.
**Alternatives Considered**: D3.js too low-level; Plotly too heavy.

### Decision: Client-Side Simulation Engine
**Rationale**: UI-controlled scenarios for testing; generates JSON packets at 1Hz with waveform arrays.
**Alternatives Considered**: Server-side simulation adds latency.

### Decision: Two-Layer Alert Rules Engine
**Rationale**: Hard thresholds for immediate issues, data fusion for contextual anomalies.
**Alternatives Considered**: ML-based rejected for explainability in medical context.

## Performance & Constraints
- **Data Rates**: 1Hz vitals, 256Hz ECG, 128Hz respiration, 64Hz accelerometer.
- **Alert Logic**: Validate every data point; fusion rules check trends over time.
- **UI Updates**: Real-time chart/tile/alert updates without blocking.