# Quickstart: UI Decoupling & De-duplication

## Prerequisites
- Node.js 18+
- npm or yarn
- Modern web browser

## Installation
```bash
cd frontend
npm install
```

## Running the Application
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

## First Steps

### 1. Mission Overview Mode (Default)
- View the grid of vital sign tiles
- See master-level activity and stress indicators
- Observe real-time data updates
- Note any critical alerts in the banner

### 2. Switch to Diagnostic View
- Click on any vital sign tile (e.g., "HEART RATE")
- View expands to show detailed waveform
- Toggle "Show Thresholds" to see warning/critical lines
- Use timeline scrubbing to investigate alerts

### 3. Test Signal Loss States
- Switch to "Signal Loss" scenario
- Observe tiles and charts enter "SIGNAL LOSS" state
- Note the blur overlay and clear messaging

### 4. Interact with Alert Log
- Generate alerts by switching scenarios
- Click alert entries to scrub timeline
- Observe cross-chart synchronization

## Key Features to Test

### View Mode Switching
- [ ] Click tiles to enter diagnostic mode
- [ ] Use back navigation to return to overview
- [ ] URL updates to reflect current view

### Signal Quality States
- [ ] Switch to signal loss scenario
- [ ] Verify "SIGNAL LOSS" overlays appear
- [ ] Confirm data is obscured appropriately

### Threshold Visualization
- [ ] Enter diagnostic view
- [ ] Toggle "Show Thresholds" button
- [ ] Verify yellow (warning) and red (critical) lines

### Timeline Scrubbing
- [ ] Generate several alerts
- [ ] Click alert log entries
- [ ] Confirm all charts scrub to event time

### Master Indicators
- [ ] Observe activity level gauge
- [ ] Note stress level changes with scenarios
- [ ] Verify contextual information display

## Test Scenarios

### Scenario A: Normal Baseline
1. Select "Baseline" scenario
2. Verify normal vital ranges and clean waveforms
3. Confirm no alerts triggered

### Scenario B: Cardiovascular Deconditioning
1. Activate "Cardiovascular Deconditioning" scenario
2. Observe elevated heart rate and abnormal patterns
3. Verify critical alerts and threshold violations

### Scenario C: Infection Onset
1. Start "Infection Onset" simulation
2. Monitor rising temperature and heart rate trends
3. Confirm data fusion alerts for infection detection

### Scenario D: Motion Sickness
1. Enable "Motion Sickness" scenario
2. Check irregular vital patterns
3. Ensure appropriate alerts for vestibular stress

### Scenario E: Signal Loss
1. Trigger "Signal Loss" scenario
2. See signal quality drop and UI state changes
3. Verify "SIGNAL LOSS" overlays and messaging

## Troubleshooting

### App doesn't load
- Check console for JavaScript errors
- Verify all dependencies are installed
- Ensure port 5173 is available

### Charts not updating
- Check browser console for Chart.js errors
- Verify simulation engine is running
- Try refreshing the page

### Signal loss not showing
- Ensure "Signal Loss" scenario is selected
- Check that signal quality drops below 40%
- Verify overlay components are rendering

### Performance issues
- Close other browser tabs
- Check browser developer tools performance tab
- Ensure hardware acceleration is enabled