# Data Model: UI Decoupling & De-duplication

## Core Entities (Extended from Original)

### Sensor
Represents a biometric sensor channel.
- **Fields**:
  - id: string (API ID, e.g., "19" for Heart Rate)
  - type: enum (HEART_RATE, BREATHING_RATE, SPO2, SKIN_TEMP, ACCELEROMETER, ECG)
  - samplingRate: number (Hz, e.g., 1 for vitals, 256 for ECG)
  - signalQuality: number (0-100, percentage)
  - batteryLevel: number (0-100, percentage)
- **Relationships**: None
- **Validation**: signalQuality 0-100, batteryLevel 0-100

### VitalMeasurement
Represents 1 Hz vital signs.
- **Fields**:
  - sensorId: string (references Sensor.id)
  - value: number
  - timestamp: Date
  - status: enum (NORMAL, WARNING, CRITICAL)
- **Relationships**: Belongs to Sensor
- **Validation**: value within ranges (HR 0-200, etc.)

### WaveformData
Represents high-rate signal streams.
- **Fields**:
  - sensorId: string
  - dataPoints: array of {timestamp: number, value: number}
  - artifacts: array of {start: number, end: number, type: string}
- **Relationships**: Belongs to Sensor
- **Validation**: dataPoints not empty

### Alert
Represents anomaly detection.
- **Fields**:
  - id: string
  - type: enum (HARD_THRESHOLD, DATA_FUSION)
  - severity: enum (WARNING, CRITICAL)
  - message: string
  - timestamp: Date
  - triggeredSensors: string[]
- **Relationships**: References Sensors
- **Validation**: triggeredSensors not empty

## New UI-Specific Entities

### ViewMode
Represents the current UI view state.
- **Fields**:
  - mode: enum (OVERVIEW, DIAGNOSTIC)
  - selectedSensorId: string (null for overview, sensor ID for diagnostic)
  - showThresholds: boolean
- **Relationships**: References Sensor (optional)
- **Validation**: selectedSensorId required when mode is DIAGNOSTIC

### SignalQuality
Represents real-time signal quality assessment.
- **Fields**:
  - sensorId: string
  - currentQuality: number (0-100)
  - threshold: number (40 = warning threshold)
  - status: enum (GOOD, DEGRADED, LOST)
  - lastUpdate: Date
- **Relationships**: Belongs to Sensor
- **Validation**: currentQuality 0-100, threshold > 0

### TimelineState
Represents the current timeline scrubbing position.
- **Fields**:
  - currentTime: Date
  - isScrubbing: boolean
  - crossFilterEnabled: boolean
  - visibleRange: {start: Date, end: Date}
- **Relationships**: None
- **Validation**: currentTime within visibleRange

### ThresholdConfig
Represents dynamic threshold calculations for charts.
- **Fields**:
  - sensorId: string
  - nominalUpper: number
  - nominalLower: number
  - warningMultiplier: number (1.20 for upper, 0.80 for lower)
  - criticalMultiplier: number (1.35 for upper, 0.65 for lower)
  - fixedWarningLower: number (94 for SpO2)
  - fixedCriticalLower: number (92 for SpO2)
- **Relationships**: Belongs to Sensor
- **Validation**: multipliers > 0

### MasterIndicator
Represents high-level contextual gauges.
- **Fields**:
  - type: enum (ACTIVITY_LEVEL, STRESS_LEVEL)
  - value: number (0-100)
  - status: enum (LOW, MODERATE, HIGH, CRITICAL)
  - lastUpdate: Date
- **Relationships**: None
- **Validation**: value 0-100

## State Transitions

### ViewMode Transitions
- OVERVIEW → DIAGNOSTIC: User clicks vitals tile
- DIAGNOSTIC → OVERVIEW: User clicks "Back to Overview" or closes diagnostic
- DIAGNOSTIC → DIAGNOSTIC: User selects different sensor in diagnostic view

### SignalQuality Transitions
- GOOD → DEGRADED: quality < threshold
- DEGRADED → LOST: quality < 20
- DEGRADED → GOOD: quality >= threshold
- LOST → DEGRADED: quality >= 20

### TimelineState Transitions
- Normal playback → Scrubbing: User interacts with timeline
- Scrubbing → Normal: User releases timeline control
- Cross-filter toggle: User enables/disables synchronized chart updates

## Data Flow Relationships

### Real-time Data Pipeline
Sensor → SignalQuality Assessment → VitalMeasurement/WaveformData → ThresholdConfig → Alert Generation → UI Updates

### UI State Pipeline
User Interaction → ViewMode Update → Component Re-rendering → TimelineState Sync → Cross-chart Updates

### Contextual Pipeline
Accelerometer Data → Activity Level Calculation → MasterIndicator Update
HRV Data → Stress Level Calculation → MasterIndicator Update</content>
<parameter name="oldString"># Data Model: A### Vital Measurement
Represents 1 Hz vital signs.
- **Fields**:
  - sensorId: string (references Sensor.id)
  - value: number
  - timestamp: DateTime
  - status: enum (NORMAL, WARNING, CRITICAL)
- **Relationships**: Belongs to Sensor
- **Validation**: value within ranges (HR 0-200, etc.)shboard

## Entities

### Sensor
Represents a biometric sensor channel.
- **Fields**:
  - id: string (API ID, e.g., "19" for Heart Rate)
  - type: enum (HEART_RATE, BREATHING_RATE, SPO2, SKIN_TEMP, ACCELEROMETER, ECG)
  - samplingRate: number (Hz, e.g., 1 for vitals, 256 for ECG)
  - signalQuality: number (0-100, percentage)
  - batteryLevel: number (0-100, percentage)
- **Relationships**: None
- **Validation**: signalQuality 0-100, batteryLevel 0-100

### Vital Measurement
Represents 1 Hz vital signs.
- **Fields**:
  - id: string
  - type: enum (HR, BR, SPO2, SKIN_TEMP, BLOOD_PRESSURE_SYSTOLIC)
  - value: number
  - timestamp: DateTime
  - status: enum (NORMAL, CAUTION, CRITICAL)
- **Relationships**: None
- **Validation**: value within realistic ranges (HR 0-200, etc.), timestamp valid

### Waveform Data
Represents high-rate signal streams.
- **Fields**:
  - sensorId: string (references Sensor.id)
  - dataPoints: array of {timestamp: number, value: number}
  - artifacts: array of {start: number, end: number, type: string}
- **Relationships**: Belongs to Sensor
- **Validation**: dataPoints not empty

### Alert
Represents anomaly detection.
- **Fields**:
  - id: string
  - type: enum (HARD_THRESHOLD, DATA_FUSION)
  - severity: enum (WARNING, CRITICAL)
  - message: string (e.g., "Potential Febrile State")
  - timestamp: DateTime
  - triggeredSensors: array of string (Sensor ids)
- **Relationships**: Links to Sensors
- **Validation**: message not empty

### Simulation Scenario
Represents controllable simulation states.
- **Fields**:
  - id: string
  - name: string (e.g., "Normal Baseline")
  - description: string
  - active: boolean
- **Relationships**: None

## State Transitions
- **Sensor**: ACTIVE → LOW_SIGNAL (quality <40%)
- **Alert**: DETECTED → ACKNOWLEDGED
- **Simulation**: INACTIVE → ACTIVE (user selects scenario)