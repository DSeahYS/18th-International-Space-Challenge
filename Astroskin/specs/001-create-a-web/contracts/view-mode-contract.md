# View Mode Contract

## Overview
Defines the interface for switching between Mission Overview and Diagnostic View modes.

## Endpoints

### POST /ui/view-mode
Switch between UI view modes.

**Request:**
```json
{
  "mode": "OVERVIEW" | "DIAGNOSTIC",
  "selectedSensorId": "string | null",
  "preserveState": "boolean"
}
```

**Response:**
```json
{
  "success": true,
  "currentMode": "OVERVIEW" | "DIAGNOSTIC",
  "selectedSensor": "Sensor | null"
}
```

**Error Responses:**
- 400: Invalid mode or sensor ID
- 500: UI state corruption

### GET /ui/view-mode
Get current view mode state.

**Response:**
```json
{
  "mode": "OVERVIEW" | "DIAGNOSTIC",
  "selectedSensorId": "string | null",
  "availableSensors": ["string"]
}
```

## State Transitions
- OVERVIEW → DIAGNOSTIC: Requires valid selectedSensorId
- DIAGNOSTIC → OVERVIEW: Clears selectedSensorId
- DIAGNOSTIC → DIAGNOSTIC: Allows sensor switching</content>
<parameter name="filePath">C:\VSCode Folder\Astroskin\specs\001-create-a-web\contracts\view-mode-api.json