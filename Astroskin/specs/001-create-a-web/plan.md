
# Implementation Plan: AstroTelemetry Dashboard

**Branch**: `001-create-a-web` | **Date**: October 2, 2025 | **Spec**: spec.md
**Input**: Feature specification from `/specs/001-create-a-web/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Implement UI decoupling with Mission Overview and Diagnostic View modes, waveform-first data representation, signal loss states, visual alert thresholds, interactive alert log, and master-level contextual indicators for the AURA-Viz astronaut biometric visualization system.

## Technical Context
**Language/Version**: TypeScript 5.0, React 18
**Primary Dependencies**: React, Chart.js, Zustand, Vite
**Storage**: In-memory state management with Zustand
**Testing**: Vitest for unit/integration tests
**Target Platform**: Modern web browsers
**Project Type**: Web application (single-page)
**Performance Goals**: 256Hz waveform rendering without frame drops, <150ms chart updates
**Constraints**: Real-time data streaming, accessibility WCAG AA/AAA, dark/light mode support
**Scale/Scope**: Single astronaut monitoring dashboard with multiple sensor streams

**UI Improvements Required**:
1. **Mission Overview vs Diagnostic View**: Two-mode layout with overview summary and detailed diagnostic views
2. **Waveform-First Representation**: Primary focus on raw waveforms (ECG 256Hz, respiration 128Hz) with derived metrics as overlays
3. **Signal Loss States**: Clear visual indication when sensor signal quality drops below 40%
4. **Dynamic Alert Thresholds**: Visual threshold lines on charts with Warning (yellow) and Critical (red) levels
5. **Interactive Alert Log**: Time-coded log with timeline scrubbing functionality
6. **Master-Level Indicators**: Activity Level and Inferred Stress Level gauges for contextual interpretation  

Role | Token Name | HEX | RGB | Notes  
-----|------------|-----|-----|-------  
Base | color-bg-base | #0E0F12 | 14, 15, 18 | Primary background  
color-bg-surface | #1A1D22 | 26, 29, 34 | Component backgrounds  
color-border-subtle | #2A3038 | 42, 48, 56 | Subtle borders, dividers  
color-text-primary | #F7FAFC | 247, 250, 252 | Primary text, headings  
color-text-secondary | #A0AEC0 | 160, 174, 192 | Secondary text, labels  
Interaction | color-interactive-cyan | #00C2FF | 0, 194, 255 | Selection, focus rings  
overlay-focus-4 | - | rgba(0,194,255,0.04) | Subtle hover  
overlay-focus-8 | - | rgba(0,194,255,0.08) | Hover/Focus rails  
overlay-focus-12 | - | rgba(0,194,255,0.12) | Active state  
Status | color-status-normal | #00D18F | 0, 209, 143 | Green - OK, Good Signal  
color-status-caution | #FFC857 | 255, 200, 87 | Amber - Warning, Low Signal  
color-status-critical | #FF4D4F | 255, 77, 79 | Red - Critical, Alarm  
Data Channels | color-data-ecg | #E02424 | 224, 36, 36 | ECG Waveforms  
color-data-resp | #12D6DF | 18, 214, 223 | Respiration Waveforms  
color-data-spo2 | #7A5CFF | 122, 92, 255 | SpO2 Vitals  
color-data-temp | #F0A202 | 240, 162, 2 | Skin Temperature  
color-data-motion | #9BE22D | 155, 226, 45 | Accelerometer  

2. Typography Tokens  
Role | Token Name | Font Family | Size (px) | Line Height | Letter Spacing | Features  
-----|------------|-------------|-----------|------------|---------------|----------  
Headings | type-heading-xl | Inter | 32 | 1.2 | -0.02em | normal  
type-heading-lg | Inter | 24 | 1.3 | -0.01em | normal  
Body | type-body-md | Inter | 16 | 1.5 | normal | normal  
type-body-sm | Source Sans Pro | 14 | 1.4 | normal | normal  
Telemetry | type-numeric-lg | Roboto Mono | 48 | 1.0 | -0.05em | tnum, lnum  
type-numeric-md | Roboto Mono | 18 | 1.2 | normal | tnum, lnum  
type-numeric-sm | Roboto Mono | 12 | 1.2 | normal | tnum, lnum  
Microcopy | type-micro | Source Sans Pro | 11 | 1.3 | 0.01em | normal  

3. Spacing Tokens  
Built on a 4pt base unit.  

Token Name | Value (px) | Usage  
-----------|------------|-------  
space-1 | 4 | Micro-padding  
space-2 | 8 | Icon padding, small gaps  
space-3 | 12 | Gaps between text elements  
space-4 | 16 | Default component padding  
space-6 | 24 | Gaps between components  
space-8 | 32 | Section padding  
space-12 | 48 | Large section padding  
space-16 | 64 | Page-level padding  

Gutters: space-6 (24px) for 1440/1280px breakpoints; space-4 (16px) for 1024px.  

Elevation:  
elevation-1: box-shadow: 0 4px 6px rgba(14, 15, 18, 0.4); (for pop-ups)  
elevation-2: box-shadow: 0 10px 15px rgba(14, 15, 18, 0.6); (for critical modals)  

4. Chart Tokens  
Property | Token Name | Value | Notes  
---------|------------|-------|-------  
Gridlines | chart-grid-major | 1px solid #2A3038 | Major axis lines  
chart-grid-minor | 1px dotted #1A1D22 | Minor subdivision lines  
Axes | chart-axis-ticks | color-text-secondary | Axis label color  
Cursor | chart-cursor-readout | color-bg-surface | Background of data readout  
chart-crosshair | 1px dashed #A0AEC0 | Crosshair line  
Artifacts | chart-artifact-overlay | rgba(255,77,79,0.15) | Transparent red overlay on data  
Downsampling | chart-ds-ecg | LTTB | Largest-Triangle-Three-Buckets for > 1000 pts  
chart-ds-resp | LTTB | " "  
chart-ds-acc | LTTB | " "  
Smoothing | chart-smoothing | Savitzky-Golay | Optional filter toggle for noisy data

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
frontend/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   ├── vitals/
│   │   ├── alerts/
│   │   ├── simulation/
│   │   └── layout/
│   ├── lib/
│   │   ├── design-tokens/
│   │   ├── simulation-engine/
│   │   ├── alert-rules/
│   │   └── utils/
│   ├── stores/
│   │   └── dataStore.ts
│   ├── pages/
│   └── hooks/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

**Structure Decision**: React SPA with Zustand for state management, Chart.js for visualization, client-side simulation engine, and modular component architecture for AURA-Viz design system implementation.

## Phase 0: Research & Analysis
*Deliverable: research.md*

### Research Questions
1. How to implement efficient view mode switching in React with state persistence?
2. Best practices for waveform-first data visualization with Chart.js?
3. Patterns for signal quality indication and data loss states in real-time dashboards?
4. Implementation approaches for dynamic threshold visualization on time-series charts?
5. Timeline scrubbing and cross-filtering patterns for multi-stream data?
6. Design patterns for master-level contextual indicators in monitoring dashboards?

### Technical Investigation
- React state management for complex view modes (Zustand vs Context vs Redux)
- Chart.js plugins for threshold lines and real-time updates
- Accessibility patterns for interactive time-series visualizations
- Performance optimization for 256Hz data rendering
- WebSocket/streaming patterns for real-time quality metrics

### Risk Assessment
- Performance impact of view mode switching on real-time data
- Complexity of timeline scrubbing with multiple synchronized charts
- Browser performance limits for high-frequency waveform rendering
- Accessibility challenges with dynamic threshold visualization

### Research Tasks
- Investigate Chart.js threshold line plugins and custom overlays
- Research React performance patterns for high-frequency updates
- Analyze accessibility standards for time-series data interaction
- Evaluate state management patterns for complex UI modes

## Phase 1: Design & Architecture
*Deliverables: contracts/, data-model.md, quickstart.md*

### System Architecture
- **View Mode Management**: Zustand store for Mission Overview vs Diagnostic View state
- **Data Quality System**: Signal quality assessment with threshold-based UI states
- **Timeline System**: Scrubbing functionality with cross-chart synchronization
- **Threshold System**: Dynamic calculation and visualization of alert boundaries

### Component Architecture
- **App**: Root component with view mode provider
- **MissionOverview**: Grid layout with vitals tiles and master indicators
- **DiagnosticView**: Full-canvas waveform display with controls
- **VitalsTile**: Interactive tiles with click-to-diagnostic functionality
- **WaveformCanvas**: Enhanced Chart.js component with threshold overlays
- **AlertLog**: Scrollable timeline with scrubbing interactions
- **MasterIndicators**: Activity Level and Stress Level gauges

### Data Model Extensions
- **ViewMode**: Enum for OVERVIEW | DIAGNOSTIC
- **SignalQuality**: Interface with threshold, current_value, status
- **TimelineState**: Interface for scrub position and cross-filtering
- **ThresholdConfig**: Interface for dynamic threshold calculations
- **MasterIndicator**: Interface for activity level and stress gauges

### UI State Contracts
- **ViewMode Contract**: State transitions and persistence
- **SignalQuality Contract**: Quality assessment and visual states
- **Timeline Contract**: Scrubbing and synchronization APIs
- **Threshold Contract**: Dynamic calculation and rendering

### Integration Points
- **Simulation Engine**: Enhanced with signal quality simulation
- **Alert Rules Engine**: Updated with dynamic thresholds
- **Data Store**: Extended with view modes, timeline, and quality states
- **Chart.js**: Custom plugins for thresholds and real-time updates

## Phase 2: Task Generation Planning
*Deliverable: tasks.md (created by /tasks command)*

### Task Breakdown Strategy
1. **Foundation Tasks**: View mode switching infrastructure and state management
2. **Data Layer Tasks**: Signal quality assessment, dynamic thresholds, timeline scrubbing
3. **UI Component Tasks**: Mission Overview layout, Diagnostic View components
4. **Interaction Tasks**: Click transitions, alert log interactions, threshold toggles
5. **Integration Tasks**: Connect all components with real-time data flow
6. **Polish Tasks**: Accessibility, performance optimization, testing

### Task Dependencies
- View mode infrastructure must precede component implementations
- Data quality system depends on simulation engine updates
- Timeline scrubbing requires alert log and chart synchronization
- Master indicators depend on accelerometer and HRV data processing
- Performance optimization is final phase after all features working

### Quality Gates
- All view mode transitions must be smooth and preserve state
- Signal loss states must be immediately recognizable
- Alert thresholds must be accurately positioned and toggleable
- Timeline scrubbing must synchronize all relevant charts
- Master indicators must provide clear contextual information
- All interactions must meet accessibility standards

### Implementation Phases
1. **Phase 2.1**: View Mode Infrastructure (state management, routing)
2. **Phase 2.2**: Data Quality & Thresholds (signal assessment, dynamic calculations)
3. **Phase 2.3**: Mission Overview Layout (grid, master indicators)
4. **Phase 2.4**: Diagnostic View Layout (waveform focus, controls)
5. **Phase 2.5**: Interactive Features (alert log, timeline scrubbing)
6. **Phase 2.6**: Integration & Testing (connect all systems, validate performance)

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*Updated by main() during processing*

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed
- [x] Initial Constitution Check
- [x] Phase 0 research.md
- [x] Phase 1 contracts/, data-model.md, quickstart.md
- [x] Post-Design Constitution Check
- [x] Phase 2 task generation planning
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
