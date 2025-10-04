import { create } from 'zustand'
import { VitalMeasurement } from '../lib/models/VitalMeasurement'
import { WaveformData } from '../lib/models/WaveformData'
import { Alert } from '../lib/models/Alert'

interface DataState {
  vitals: VitalMeasurement[]
  waveforms: WaveformData[]
  alerts: Alert[]
  showThresholds: boolean
  addVital: (vital: VitalMeasurement) => void
  addWaveform: (waveform: WaveformData) => void
  addAlert: (alert: Alert) => void
  clearAlert: (id: string) => void
  toggleThresholds: () => void
}

export const useDataStore = create<DataState>((set) => ({
  vitals: [],
  waveforms: [],
  alerts: [],
  showThresholds: false,
  addVital: (vital) => set((state) => ({ vitals: [...state.vitals, vital] })),
  addWaveform: (waveform) => set((state) => {
    const existingIndex = state.waveforms.findIndex(w => w.sensorId === waveform.sensorId);
    if (existingIndex >= 0) {
      // Replace existing waveform with same sensorId
      const newWaveforms = [...state.waveforms];
      newWaveforms[existingIndex] = waveform;
      return { waveforms: newWaveforms };
    } else {
      // Add new waveform
      return { waveforms: [...state.waveforms, waveform] };
    }
  }),
  addAlert: (alert) => set((state) => {
    if (state.alerts.some(a => a.id === alert.id)) {
      return state;
    }
    return { alerts: [...state.alerts, alert] };
  }),
  clearAlert: (id) => {
    console.log('🧹 Clearing alert:', id)
    set((state) => ({ alerts: state.alerts.filter(a => a.id !== id) }))
  },
  toggleThresholds: () => set((state) => ({ showThresholds: !state.showThresholds })),
}))