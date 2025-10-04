# Tasks: AURA-Viz Dashboard

**Input**: Design documents from `/specs/001-create-a-web/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: React SPA, TypeScript, Chart.js, Zustand
2. Load design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: data-api.yaml → contract test tasks
   → research.md: Extract decisions → setup tasks
   → quickstart.md: Extract scenarios → integration test tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, components, engines
   → Integration: data flow, state management
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests? Yes
   → All entities have models? Yes
   → All scenarios have tests? Yes
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `frontend/src/`
- Adjust based on plan.md structure

## Phase 3.1: Setup
- [x] T001 Create project structure per implementation plan
- [x] T002 Initialize React SPA with TypeScript and Vite
- [x] T003 Install core dependencies: React 18, Chart.js, Zustand, TypeScript
- [x] T004 [P] Configure ESLint and Prettier for code quality
- [x] T005 [P] Set up design tokens in frontend/src/lib/design-tokens/
- [x] T006 [P] Configure theme switcher for dark/light modes

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
- [x] T007 [P] Contract test for WebSocket data stream in frontend/tests/contracts/test-data-stream.ts
- [x] T008 [P] Contract test for simulation control endpoint in frontend/tests/contracts/test-simulation-control.ts
- [x] T009 [P] Integration test for baseline scenario in frontend/tests/integration/test-baseline-scenario.ts
- [x] T010 [P] Integration test for cardiovascular deconditioning scenario in frontend/tests/integration/test-cardiovascular-scenario.ts
- [x] T011 [P] Integration test for infection onset scenario in frontend/tests/integration/test-infection-scenario.ts
- [x] T012 [P] Integration test for motion sickness scenario in frontend/tests/integration/test-motion-sickness-scenario.ts
- [x] T013 [P] Integration test for signal loss scenario in frontend/tests/integration/test-signal-loss-scenario.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T014 [P] Sensor model in frontend/src/lib/models/Sensor.ts
- [x] T015 [P] VitalMeasurement model in frontend/src/lib/models/VitalMeasurement.ts
- [x] T016 [P] WaveformData model in frontend/src/lib/models/WaveformData.ts
- [x] T017 [P] Alert model in frontend/src/lib/models/Alert.ts
- [x] T018 [P] SimulationScenario model in frontend/src/lib/models/SimulationScenario.ts
- [x] T019 [P] VitalsTile component in frontend/src/components/vitals/VitalsTile.tsx
- [x] T020 [P] WaveformCanvas component in frontend/src/components/charts/WaveformCanvas.tsx
- [x] T021 [P] AlertRail component in frontend/src/components/alerts/AlertRail.tsx
- [x] T022 [P] SimulationPanel component in frontend/src/components/simulation/SimulationPanel.tsx
- [x] T023 Simulation engine in frontend/src/lib/simulation-engine/SimulationEngine.ts
- [x] T024 Alert rules engine in frontend/src/lib/alert-rules/AlertRulesEngine.ts

## Phase 3.4: Integration
- [x] T025 Zustand data store in frontend/src/stores/dataStore.ts
- [x] T026 Connect simulation engine to data store
- [x] T027 Connect alert rules to data store
- [x] T028 Implement WebSocket data streaming
- [x] T029 Wire UI components to data store

## Phase 3.5: Polish
- [x] T030 [P] Unit tests for design tokens in frontend/tests/unit/test-design-tokens.ts
- [x] T031 [P] Unit tests for models in frontend/tests/unit/test-models.ts
- [x] T032 [P] Unit tests for simulation engine in frontend/tests/unit/test-simulation-engine.ts
- [x] T033 [P] Unit tests for alert rules in frontend/tests/unit/test-alert-rules.ts
- [x] T034 Performance optimization for 256Hz rendering
- [x] T035 Accessibility audit and fixes
- [x] T036 [P] Update README.md with usage instructions
- [x] T037 [P] Add API documentation for simulation scenarios

## Phase 3.6: UI Improvements (Mission Overview vs Diagnostic View)

### View Mode Decoupling
- [x] T038 Implement ViewMode enum and state management in frontend/src/lib/models/ViewMode.ts
- [x] T039 Create MissionOverview component in frontend/src/components/views/MissionOverview.tsx (summary tiles only)
- [x] T040 Create DiagnosticView component in frontend/src/components/views/DiagnosticView.tsx (detailed charts)
- [x] T041 Add view mode toggle button in frontend/src/components/ui/ViewModeToggle.tsx
- [x] T042 Update App.tsx to conditionally render MissionOverview or DiagnosticView based on state

### Waveform-First Representation
- [x] T043 Modify WaveformCanvas to prioritize raw ECG/respiration data as primary display
- [x] T044 Add derived metrics (HR, HRV, RR) as overlay annotations on waveforms
- [x] T045 Implement 256Hz high-frequency rendering for smooth waveform display
- [x] T046 Add waveform zoom controls for detailed signal inspection

### Signal Loss States
- [x] T047 Implement SignalQuality enum and thresholds in frontend/src/lib/models/SignalQuality.ts
- [x] T048 Add signal quality calculation logic (quality < 40% = loss state)
- [x] T049 Create signal loss overlay component in frontend/src/components/ui/SignalLossOverlay.tsx
- [x] T050 Apply blur effect and "SIGNAL LOSS" text when quality < 40%
- [x] T051 Update WaveformCanvas to show signal loss states in real-time

### Dynamic Visual Thresholds
- [x] T052 Create ThresholdToggle component in frontend/src/components/ui/ThresholdToggle.tsx
- [x] T053 Add threshold line rendering to WaveformCanvas (warning yellow, critical red)
- [x] T054 Implement dynamic threshold calculation based on medical formulas:
  - HR: 60-100 bpm normal, 50-59/101-120 warning, <50/>120 critical
  - HRV: RMSSD > 20ms normal, 10-20ms warning, <10ms critical
  - RR: 12-20 bpm normal, 8-11/21-30 warning, <8/>30 critical
  - SpO2: >95% normal, 90-94% warning, <90% critical
- [x] T055 Add threshold toggle state to data store

### Interactive Alert Log
- [x] T056 Create AlertLog component in frontend/src/components/alerts/AlertLog.tsx
- [x] T057 Implement time-coded alert entries with severity indicators
- [x] T058 Add timeline scrubbing functionality (click alert → jump to timestamp)
- [x] T059 Connect alert log to data store for real-time updates
- [x] T060 Add alert filtering and sorting capabilities

### Master Indicators
- [x] T061 Create ActivityLevelGauge component in frontend/src/components/indicators/ActivityLevelGauge.tsx
- [x] T062 Implement activity level calculation from accelerometer data fusion
- [x] T063 Create StressLevelGauge component in frontend/src/components/indicators/StressLevelGauge.tsx
- [x] T064 Implement stress level calculation from HRV and other vitals
- [x] T065 Add master indicators panel to both MissionOverview and DiagnosticView
- [x] T066 Update data store with activity and stress level calculations

## Phase 3.7: Panel Consolidation & Performance Optimization

### Thematic Panel Implementation
- [x] T067 Create CardiovascularPanel component with ECG waveform + HR/HRV overlays in frontend/src/components/panels/CardiovascularPanel.tsx
- [x] T068 Create RespiratoryPanel component with respiration waveform + RR/SpO2 overlays in frontend/src/components/panels/RespiratoryPanel.tsx
- [x] T069 Implement efficient chart initialization (create once, update data) in both panels
- [x] T070 Add 250ms throttling for visual updates (4 updates/second) for smooth performance
- [x] T071 Update DiagnosticView to use CardiovascularPanel and RespiratoryPanel instead of individual WaveformCanvas
- [x] T072 Update MissionOverview with organized system status sections (Cardiovascular, Respiratory)

### Performance Fixes
- [x] T073 Remove chart re-creation on every data update - use chart.update('none') instead
- [x] T074 Implement signal quality blur effects without chart re-initialization
- [x] T075 Add threshold line updates without full chart rebuild
- [x] T076 Optimize data processing to run continuously while visual updates are throttled

## Dependencies
- Setup (T001-T006) before everything
- Tests (T007-T013) before implementation (T014-T029)
- Models (T014-T018) before components (T019-T022)
- Engines (T023-T024) before integration (T025-T029)
- Implementation before polish (T030-T037)
- UI Improvements (T038-T066) depend on core models/components/engines and should be parallelized where possible
- Panel Consolidation (T067-T072) can run in parallel with performance fixes (T073-T076)

## Parallel Example
```
# Launch T007-T008 together:
Task: "Contract test for WebSocket data stream in frontend/tests/contracts/test-data-stream.ts"
Task: "Contract test for simulation control endpoint in frontend/tests/contracts/test-simulation-control.ts"

# Launch T009-T013 together:
Task: "Integration test for baseline scenario in frontend/tests/integration/test-baseline-scenario.ts"
Task: "Integration test for cardiovascular deconditioning scenario in frontend/tests/integration/test-cardiovascular-scenario.ts"
Task: "Integration test for infection onset scenario in frontend/tests/integration/test-infection-scenario.ts"
Task: "Integration test for motion sickness scenario in frontend/tests/integration/test-motion-sickness-scenario.ts"
Task: "Integration test for signal loss scenario in frontend/tests/integration/test-signal-loss-scenario.ts"

# Launch T038-T042 together (View Mode):
Task: "Implement ViewMode enum and state management"
Task: "Create MissionOverview component"
Task: "Create DiagnosticView component"
Task: "Add view mode toggle button"
Task: "Update App.tsx for conditional rendering"

# Launch T043-T046 together (Waveform-First):
Task: "Modify WaveformCanvas for raw data priority"
Task: "Add derived metrics overlays"
Task: "Implement 256Hz rendering"
Task: "Add waveform zoom controls"

# Launch T047-T051 together (Signal Loss):
Task: "Implement SignalQuality enum"
Task: "Add signal quality calculation"
Task: "Create signal loss overlay"
Task: "Apply blur effects"
Task: "Update WaveformCanvas for loss states"

# Launch T067-T068 together (Panel Creation):
Task: "Create CardiovascularPanel with ECG + HR/HRV overlays"
Task: "Create RespiratoryPanel with respiration + RR/SpO2 overlays"

# Launch T069-T070 together (Performance Optimization):
Task: "Implement efficient chart initialization and updates"
Task: "Add 250ms throttling for visual updates"

# Launch T071-T072 together (View Updates):
Task: "Update DiagnosticView with consolidated panels"
Task: "Update MissionOverview with organized sections"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts
- Medical accuracy critical: Use provided formulas for HR/BPM, HRV/RMSSD, RR thresholds, SpO2 limits
- Data fusion required: Combine multiple sensor inputs for activity/stress calculations
- Performance: 256Hz rendering must remain smooth during signal loss/threshold updates
- UX: Clear visual distinction between Mission Overview (summary) and Diagnostic View (details)
- Testing: Add integration tests for view switching, signal loss detection, threshold visualization
- **Information Overload Solved**: Reduced from 5+ separate graphs to 2 cohesive thematic panels
- **Performance Critical**: Charts initialize once, update efficiently with throttled visual refresh
- **Medical Accuracy Maintained**: All overlays show real-time calculated metrics
- **User Experience**: Clear relationship between raw waveforms and derived vitals
- **Real-time Processing**: Data processing continues at full speed, only visual updates throttled