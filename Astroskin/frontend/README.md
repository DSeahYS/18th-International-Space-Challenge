# AURA-Viz: Astronaut Biometric Visualization

A research-driven web application for simulating and visualizing astronaut physiological data with real-time anomaly detection.

## Features

- **Real-time Simulation**: Multiple physiological scenarios including baseline, cardiovascular deconditioning, infection onset, motion sickness, and signal loss
- **Biometric Visualization**: High-performance Chart.js rendering of waveforms at 256Hz
- **Anomaly Detection**: Hard threshold alerts and data fusion rules for early warning
- **Research-Based**: Grounded in space medicine research for accurate physiological modeling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

- Select a simulation scenario from the panel
- View real-time vitals tiles and waveform charts
- Monitor alerts in the alert rail for anomalies

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Zustand
- **Visualization**: Chart.js
- **Simulation Engine**: Custom scenario-based data generation
- **Alert Rules Engine**: Threshold and fusion-based anomaly detection

## Scenarios

- **Baseline**: Normal astronaut vitals
- **Cardiovascular Deconditioning**: Heart rate and blood pressure changes
- **Infection Onset**: Fever and immune response
- **Motion Sickness**: Vestibular disturbances
- **Signal Loss**: Intermittent data loss

## Development

- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint