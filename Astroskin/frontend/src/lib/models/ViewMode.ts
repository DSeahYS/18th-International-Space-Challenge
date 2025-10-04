/**
 * View mode enumeration for Mission Overview vs Diagnostic View decoupling
 * Mission Overview: Summary tiles with key metrics and master indicators
 * Diagnostic View: Detailed waveform charts with full signal analysis
 */
export enum ViewMode {
  MISSION_OVERVIEW = 'mission-overview',
  DIAGNOSTIC_VIEW = 'diagnostic-view'
}

/**
 * View mode state interface
 */
export interface ViewModeState {
  currentMode: ViewMode;
  toggleMode: () => void;
}