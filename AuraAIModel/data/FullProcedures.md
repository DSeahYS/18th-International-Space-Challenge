### SECTION: EMERGENCY PROCEDURES (VALIDATION PROMPTS)

Input: Emergency: suit pressure below 3.0 psi-immediate actions?

Output: Step 1: Freeze movement and switch to controlled breathing; avoid exertion to slow pressure loss.

Step 2: Read wrist gauge and announce current psi; if <2.5 psi treat as CRITICAL and skip to Step 7.

Step 3: Sweep helmet ring and visor latch by touch; push-pull to confirm full lock; reseat once.

Step 4: Palpate reachable torso and limb surfaces for hissing or airflow; if localized, cover with glove and go to patch step.

Step 5: Deploy emergency patch from hip pouch; clean area; apply; hold firm 60 s; recheck psi; if >=3.0 psi proceed to Step 9.

Step 6: If unable to localize or psi continues dropping >0.2 psi per 10 s, announce MAYDAY and proceed to Step 7.

Step 7: Toggle emergency O2 bypass to ON; expect stabilization toward 4.0-4.3 psi within 30 s; if not achieved, ABORT EVA and return immediately.

Step 8: Activate suit beacon; enable minimal UI mode; suppress noncritical overlays.

Step 9: Navigate to airlock along known path; maintain low-exertion cadence; confirm psi every 30 s.

Step 10: On ingress, close outer hatch, initiate repress; log incident code and time-to-critical for debrief.

Input: Pre-EVA: full airlock depressurization checklist

Output: Step 1: Close and dog inner hatch (3 full rotations); confirm four greens on inner seal indicators.

Step 2: Announce "depressurization start"; crack vent valve 0.5 turns CCW; target rate <=0.5 psi/min.

Step 3: Monitor gauge: 14.7→10.0 psi in ~10 s, then continue gradual bleed; watch for noise/vibration.

Step 4: At 5.0 psi, verify suit pressure steady 4.3±0.2 psi; confirm comms intelligibility.

Step 5: At 0.5 psi, pause 10 s; listen for leak cues; scan indicators.

Step 6: At 0.0 psi, wait 15 s; confirm vacuum steady; check outer hatch seal lights.

Step 7: Switch HUD to EVA mode; enable TTAD; set breadcrumb logging.

Step 8: Open outer hatch slowly (<=1 turn/5 s) to limit dust disturbance; verify hinge torque within normal.

Step 9: Egress on tether discipline; confirm partner status; start EVA clock.

Step 10: Record depress time and anomalies in log.

Input: Comms lost: no response on primary and backup-what now?

Output: Step 1: Announce "Comms check, comms check" on primary channel. Wait 10 seconds.

Step 2: If no response, switch to backup channel and announce "Comms check on backup." Wait 10 seconds.

Step 3: If no response, perform comms hardware self-check: confirm comms switch is not in neutral, cycle power on comms panel.

Step 4: If no response after 30 seconds total, declare a Lost Comm condition.

Step 5: Look for EVA partner. If partner is in visual range (within 100 meters), proceed to Step 6.

Step 6: If partner is NOT in visual range, this is a CRITICAL Lost Comm / Lost Partner emergency. Skip to Step 10.

Step 7: (Partner Visual) Navigate to partner. Use standard hand signal for "lost comms" (tapping helmet ear-cup).

Step 8: Partner will attempt to initiate suit-to-suit relay.1

Step 9: If relay fails, ABORT EVA. Navigate back to airlock as a buddy pair, maintaining constant visual contact. Proceed to Step 17.

Step 10: (No Partner Visual) CRITICAL: Activate personal suit beacon immediately.

Step 11: Announce "ABORT, ABORT, ABORT, lost comms, lost visual on partner" in the blind.

Step 12: Stop all task activity.

Step 13: Navigate to the last known "failsafe" landmark or return to airlock via AURA AR navigation "breadcrumb" trail.

Step 14: Move predictably. Pause for 30 seconds every 10 minutes to stop and scan 360 degrees for partner.

Step 15: If visual contact is regained, navigate to partner and proceed from Step 7.

Step 16: If airlock is reached, ingress, repressurize, and wait for partner.

Step 17: On ingress, terminate procedure. Log incident for post-mission debrief.

Input: Suit oxygen pressure critically low-time remaining and actions?

Output: Step 1: CRITICAL: Announce "MAYDAY, MAYDAY, MAYDAY, low oxygen" on primary channel.

Step 2: Read current primary O2 tank pressure (psi) from HUD and announce to partner.

Step 3: If pressure is < 500 psi, this is a CRITICAL state; assume primary O2 is depleted or feeding a leak.

Step 4: CRITICAL: Activate the Oxygen Purge System (OPS) backup 2; rotate chest-mounted actuator 90 degrees to ON position.

Step 5: Verify OPS activation: check for "OPS ACTIVE" on HUD and feel/hear O2 flow.

Step 6: AURA will calculate time remaining based on OPS mode. Announce the conservative time.

Step 7: Expect approximately 39 minutes on High Flow (Purge) or 79.5 minutes on Low Flow (Makeup).2

Step 8: Announce "ABORT, ABORT, ABORT. On backup O2, time remaining approximately 30 minutes."

Step 9: Immediately command AURA "Execute load-shedding." AURA will terminate power to all non-essential systems.3

Step 10: Manually verify termination of glove heaters and tool power; set suit to minimum power mode.

Step 11: CRITICAL: Change metabolic rate. Cease all non-navigation activity; adopt controlled, low-exertion cadence to conserve O2.

Step 12: Navigate to airlock via shortest path. Activate AURA AR "breadcrumb" trail if available.

Step 13: Monitor OPS pressure; if OPS pressure also begins to fall, decrease time-remaining estimate by 50% and increase pace.

Step 14: On airlock ingress, close outer hatch and initiate emergency repressurization.

Step 15: Remain on suit O2 until airlock is > 5.0 psi and O2 content is nominal.

Step 16: Log incident, noting time from primary to backup activation.

Input: Mars EVA: dust storm rapidly approaching-abort protocol?

Output: Step 1: CRITICAL: Announce "ABORT, ABORT, ABORT, dust storm approaching" to partner and in the blind (for habitat).

Step 2: Command AURA: "Display shortest path to habitat airlock."

Step 3: Read time-to-arrival and opacity-rate from AURA HUD.

Step 4: ABORT CRITERIA: If opacity is projected to exceed 80% (visibility < 5 meters) before shelter can be reached, treat as a zero-visibility condition.

Step 5: Immediately terminate all science or maintenance tasks.

Step 6: Secure all loose tools and equipment to suit or rover. Bag all critical samples.

Step 7: If rover is present and > 100m from habitat, ingress rover and drive to habitat.

Step 8: If on foot, begin navigation to airlock along AURA-defined path.

Step 9: Increase cadence to a sustainable, high-exertion pace.

Step 10: If visibility drops to zero (< 1 meter), STOP movement.

Step 11: CRITICAL: If stopped, deploy navigation beacon. Hunker in place to conserve power. DO NOT attempt to navigate blind.5

Step 12: On airlock ingress, close outer hatch.

Step 13: Initiate full "Post-EVA Regolith Contamination Control" procedure.6

Step 14: Do not repressurize until airlock dust particle count is < 10 ppm.

Step 15: Verify airlock particle count is nominal.

Step 16: Do not doff suit until habitat is confirmed secure from dust intrusion.

### SECTION: EVA CORE OPERATIONS

Input: How do I perform a full EMU donning procedure?

Output: Step 1: Don Liquid Cooling and Ventilation Garment (LCVG).7 Ensure all zippers are secure.

Step 2: Don LCVG water connector 8; verify secure "click" and no leaks.

Step 3: Don Lower Torso Assembly (LTA).9

Step 4: Using donning handles 10, "dive" into the Hard Upper Torso (HUT).9

Step 5: Engage and lock waist ring; verify "LTA Donning Handles" 10 are stowed.

Step 6: Connect LCVG and comms umbilicals to HUT.

Step 7: Don Communications Carrier Assembly (CCA) ("Snoopy Cap") 9; perform pre-comms check.

Step 8: Don helmet and lock helmet ring 9; perform "push-pull" check to verify hard seal.

Step 9: Don comfort gloves.9

Step 10: Don EVA gloves and lock wrist rings; perform "push-pull" check on both gloves.

Step 11: Initiate LCVG coolant flow from habitat; verify cooling water is circulating (temp drop > 3 deg C within 60 seconds).

Step 12: Initiate suit ventilation; verify O2 flow.

Step 13: Perform initial suit pressure and leak check per {1.XX EMU LEAK CHECK}.

Step 14: ABORT CRITERIA: ABORT donning if leak check fails > 0.3 psi drop in 1 min.11

Step 15: Verify all steps complete and announce "Ready for prebreathe."

Input: What is the full procedure for the 8-hour Campout prebreathe protocol?

Output: Step 1: This protocol 12 is used to reduce in-suit prebreathe time by purging nitrogen overnight.

Step 2: All EV crew ingresses the ISS Joint Airlock (Quest) 13 approximately 10 hours before planned EVA start.

Step 3: Seal the inner hatch between the airlock and the main cabin.

Step 4: Initiate airlock depressurization from 14.7 psi to 10.2 psi.12

Step 5: Once at 10.2 psi, adjust atmospheric composition to 26.5% O2.12

Step 6: Verify atmosphere is stable at 10.2 psi and 26.5% O2.

Step 7: Begin "Campout" (sleep) period.

Step 8: CRITICAL: Crew must remain at 10.2 psi for a minimum of 8 hours and 40 minutes.12

Step 9: Post-sleep period, crew performs standard EMU donning procedure {1.XX EMU DONNING}.7

Step 10: Perform EMU purge 14 with 100% O2 for 8-12 minutes.15

Step 11: Perform final in-suit prebreathe. This period can be as short as 40 minutes.15

Step 12: ABORT CRITERIA: If campout duration was < 8 hours 40 minutes, you must revert to the 4-hour in-suit prebreathe protocol.12

Step 13: After 40-minute prebreathe is complete, perform final EMU leak check {1.XX EMU LEAK CHECK}.14

Step 14: Verify leak check passed (<= 0.3 psi drop/min).

Step 15: Proceed with {1.01 PRE-EVA: FULL AIRLOCK DEPRESSURIZATION CHECKLIST}.

Input: How do I perform an EMU leak check?

Output: Step 1: This procedure is performed after donning 9 and EMU purge.14

Step 2: Ensure suit is pressurized to nominal 4.3 psi (+/- 0.2 psi).15

Step 3: Announce "Initiating EMU leak check."

Step 4: Set suit O2 to "IV" (Internal Vent).14

Step 5: Read and record exact suit pressure to two decimal places (e.g., "4.32 psi").

Step 6: Wait for 30 seconds for pressure to stabilize.14

Step 7: If pressure is unstable, re-check all seals (helmet, wrist, waist).9

Step 8: Once stable, record "Leak Check Start Pressure" and "GMT Start Time."

Step 9: Hold breath and remain still for 1 minute.11

Step 10: Record "Leak Check Stop Pressure" and "GMT Stop Time."

Step 11: Calculate pressure drop.

Step 12: CRITICAL (No-Go Criteria): If pressure drop is > 0.3 psi 11, the leak check is FAILED.

Step 13: If leak check is FAILED, announce "Failed leak check" and perform {2.XX FAILED LEAK CHECK} procedure.14

Step 14: If pressure drop is <= 0.3 psi, announce "Passed leak check."

Step 15: Verify "Passed" status is logged.

Step 16: Proceed with prebreathe protocol.

Input: Procedure for emergency SAFER activation and flight to safety?

Output: Step 1: This procedure is for emergency self-rescue from tether failure or separation.16

Step 2: CRITICAL: Immediately activate SAFER "Attitude Hold" feature 18 to arrest uncontrolled rotation or tumble.

Step 3: Grip the SAFER Hand Controller Module.19

Step 4: Verify SAFER system is "Go" on EMU display; check propellant level (3 lbs nominal).

Step 5: Visually acquire the station/habitat. This is your primary target.

Step 6: Announce "MAYDAY, MAYDAY, separated from station, on SAFER."

Step 7: Initiate controlled translation thrust toward the station.

Step 8: Use short, 1-second bursts from thrusters. DO NOT apply continuous thrust.

Step 9: Monitor "Time-to-Empty" (TTE) on HUD; total delta-V is limited to approx 10 ft/s (3 m/s).18

Step 10: ABORT CRITERIA: If TTE projects 0 remaining before station contact, cease thrusting, announce "MAYDAY, no-prop," and await partner rescue.

Step 11: As you approach within 10 meters of the station, orient body feet-first.

Step 12: Use translation bursts to kill all relative velocity; target velocity < 0.1 ft/s for final contact.

Step 13: Make contact with a stable handrail or structure.

Step 14: Immediately apply two tethers.

Step 15: Verify both tethers are secure (push-pull check).

Step 16: Announce "Tethered and secure."

Step 17: Power down SAFER unit.

### SECTION: SUIT LIFE-SUPPORT

Input: My LCVG coolant loop has failed and I am overheating.

Output: Step 1: Announce "WARNING, LCVG coolant loop failure, I am overheating."

Step 2: Read LCVG inlet/outlet temperatures on HUD. Verify coolant flow rate is at 0 lb/hr.

Step 3: Perform immediate actions: reduce metabolic load; stop all physical activity.

Step 4: Attempt to reset coolant pump: Cycle pump switch from ON to OFF, wait 3 seconds, then to ON.

Step 5: If flow does not restart, attempt to clear potential ice-blockage: set manual coolant valve (TCV) to MAX flow 10 for 30 seconds, then MIN flow for 30 seconds.

Step 6: If flow remains at 0 lb/hr, announce "Pump reset failed, no coolant flow."

Step 7: Check for water in helmet 21; if water is present, this is a CRITICAL loop contamination event, skip to Step 10.

Step 8: If no water in helmet, this is a pump failure.22 You are now on a time limit.

Step 9: ABORT CRITERIA: Announce "ABORT, ABORT, ABORT." Your remaining EVA time is limited to < 15-20 minutes based on metabolic heat buildup.

Step 10: If water is in helmet, activate emergency O2 purge 2 to clear visor and proceed with ABORT.

Step 11: Navigate to airlock via shortest path.

Step 12: On ingress, connect to habitat cooling umbilical 22 immediately.

Step 13: Verify umbilical connection is secure and coolant flow is re-established.

Step 14: Log incident. Do not use EMU until pump is serviced.22

Input: How do I swap the METOX CO2 scrubber cartridge?

Output: Step 1: This is a post-EVA, intra-vehicular maintenance procedure.20

Step 2: Confirm EMU is powered down and connected to service umbilical.

Step 3: Access the Portable Life Support System (PLSS) 10 maintenance bay.

Step 4: Identify the METOX (Metal Oxide) canister.23

Step 5: Rotate the canister locking handle 90 degrees CCW to disengage.

Step 6: Extract the depleted METOX canister from the PLSS.

Step 7: Place the depleted canister into the METOX regenerator bay.20

Step 8: Initiate regeneration cycle per {3.XX METOX REGENERATION}. Cycle time is approximately 14 hours.

Step 9: Retrieve a fully regenerated METOX canister from the "Ready" stowage.

Step 10: Verify the new canister's seals are intact and the status indicator is GREEN.

Step 11: ABORT CRITERIA: Do not install if status indicator is RED or seals are compromised.

Step 12: Insert the new METOX canister into the PLSS.

Step 13: Rotate the locking handle 90 degrees CW until it clicks into the locked position.

Step 14: Perform a "push-pull" check to verify the canister is secure.

Step 15: Close the PLSS maintenance bay.

Step 16: Update the suit maintenance log with the new canister's serial number and cycle count.

Input: How do I replace the LCVG coolant filter cartridge?

Output: Step 1: This is an intra-vehicular maintenance procedure to remediate coolant loop contamination.22

Step 2: Confirm EMU is powered down.

Step 3: Connect the Airlock Coolant Loop Remediation (ALCLR) system 26 to the EMU LCVG umbilical ports.22

Step 4: Ensure ALCLR system is off and depressurized before connection.

Step 5: Place a drip tray to collect any excess liquid.

Step 6: Locate the filter cartridge housing on the ALCLR unit.28

Step 7: Remove the sump (housing cover) by rotating CCW.

Step 8: Remove the old LCVG filter cartridge.28

Step 9: Bag and stow the old filter for post-mission analysis.

Step 10: Clean the inside of the housing with an approved cleaning cloth.28

Step 11: Verify the Part Number (PN) of the new filter cartridge.26

Step 12: Install the new cartridge, ensuring it snaps into place.29

Step 13: Replace the sump and tighten by hand until snug.

Step 14: Initiate ALCLR "Scrubbing Configuration" 27 and run for 4 hours.

Step 15: Verify flow rate is nominal (e.g., > 1.0 GPM) and check for leaks.

Step 16: ABORT CRITERIA: If leaks are > 1 drop/min, stop system and reseat sump.

Step 17: Log the filter replacement in the EMU maintenance record.

### SECTION: TASK PROCEDURES

Input: What is the procedure for removing a panel fastener?

Output: Step 1: Identify fastener type (e.g., hex, tri-groove) and required tool (e.g., PGT).

Step 2: Select correct socket/bit for the PGT 30 and lock in place.

Step 3: Set PGT to "REVERSE" (CCW) and select a torque setting.

Step 4: CRITICAL: Initial torque (breakaway torque) 31 setting should be between 20-90% of the PGT's full scale.32

Step 5: Engage fastener head fully; ensure tool is perpendicular to surface.

Step 6: Apply steady pressure and activate PGT.

Step 7: If fastener does not break loose within 3 seconds, STOP.

Step 8: Increase PGT torque setting by 10% (e.g., from 15 ft-lbs to 17 ft-lbs). Do not exceed 90% of max torque.32

Step 9: Re-attempt removal.

Step 10: If fastener still does not move after 3 attempts, ABORT. This is a jammed fastener.

Step 11: Log the fastener as "jammed" and do not proceed. Forcing it risks tool/fastener fracture.

Step 12: Once fastener is free-spinning 31, remove it.

Step 13: Place fastener in a "small parts" tethered bag immediately.

Step 14: Verify fastener threads are clean and not stripped.

Step 15: Announce "Fastener removed and stowed."

Input: How do I perform an aseptic planetary sample collection?

Output: Step 1: This procedure is for collecting samples while maintaining planetary protection.33

Step 2: Identify target sample location (e.g., soil, rock surface).

Step 3: Retrieve EVA Swab Kit 33 or sample caddy from tool carrier.

Step 4: Retrieve aseptic swab tool 35 from its sterile canister.

Step 5: CRITICAL: Do not allow swab to touch any surface other than the target.

Step 6: Perform an "environmental control" sample 36: open canister, expose swab to environment for 5 seconds without contact, and re-stow.

Step 7: Retrieve a new sterile swab for the primary sample.

Step 8: Swab the target surface (e.g., 10cm x 10cm area) using a cross-hatch pattern.

Step 9: Immediately re-stow the swab in its individual aluminum canister.35

Step 10: Verify the canister is sealed (e.g., 0.2 um Teflon filter is intact).35

Step 11: Label the canister using the AURA AR interface or a physical tethered tag.

Step 12: Place canister in the -80 deg C sample freezer 34 or return container.

Step 13: ABORT CRITERIA: If swab is compromised (e.g., dropped, touched glove), discard and use a new swab.

Step 14: Log sample ID, location, and time in the AURA science log.

Step 15: Verify sample is secure in freezer.

Input: What is the procedure for swapping a glove heater battery?

Output: Step 1: This procedure is for an external, worksite-replaceable battery.37

Step 2: Announce "Swapping left glove heater battery."

Step 3: Retrieve new battery (e.g., 7.4V 2200mAh Li-ion pack) 39 from battery pouch.

Step 4: Verify new battery is fully charged (e.g., GREEN indicator).

Step 5: Locate the battery compartment on the glove cuff.

Step 6: Open the battery pouch (e.g., Velcro or zip).

Step 7: Disconnect the power connector from the old battery.

Step 8: Remove the old battery and stow it in a "depleted" pouch.

Step 9: CRITICAL: Do not leave depleted battery unsecured (tether or stow).

Step 10: Connect the power connector to the new battery.

Step 11: Verify connection is secure; check for "Glove Heat ON" indication on HUD.

Step 12: Stow the new battery in the cuff pouch.

Step 13: Secure the pouch (close Velcro/zip).

Step 14: ABORT CRITERIA: If new battery does not show "ON" status, assume connector fault. Abort swap and use old battery if functional.

Step 15: Announce "Battery swap complete. Glove heat is nominal."

Step 16: Verify "Glove Heat ON" status on HUD after 60 seconds.

### SECTION: ENVIRONMENTAL HAZARDS

Input: What is the post-EVA procedure for lunar regolith contamination control?

Output: Step 1: This procedure begins prior to airlock ingress.40

Step 2: At the "Airlock Staging Area," perform 60 seconds of self-stamping and shaking to remove gross particles.

Step 3: Perform 120 seconds of buddy-brushing.41 Partner brushes all suit surfaces, focusing on seals (helmet, wrist, waist) and LCVG ports.

Step 4: Use specialized boot brushes 40 or sticky mats 40 at the airlock threshold.

Step 5: Ingress airlock.42 Secure outer hatch.

Step 6: CRITICAL: Do not repressurize. The airlock is still in vacuum.

Step 7: Initiate active dust removal system 42, such as an Electrostatic Precipitator or CO2 shower.6

Step 8: Run active removal system for a minimum of 5 minutes.

Step 9: Monitor airlock particle sensor.

Step 10: ABORT CRITERIA: Do not repressurize until particle count is below 50 ppm.

Step 11: If particle count remains high, repeat active removal cycle (Step 7).

Step 12: Once < 50 ppm, initiate slow repressurization.

Step 13: Perform "aided doffing" procedure: partner assists in suit removal to prevent skin-to-suit contact.6

Step 14: Immediately bag all suit components.40

Step 15: All crew perform dermal and airway cleaning (e.g., saline rinse).6

Step 16: Verify all components are stowed and airlock filters are activated.

Input: I have an MMOD impact alert on my suit.

Output: Step 1: CRITICAL: Announce "MMOD impact alert" on comms.

Step 2: Freeze all motion.

Step 3: Read AURA HUD: locate the impacted area (e.g., "Right Thigh") and check suit pressure trend.

Step 4: If suit pressure is dropping > 0.1 psi/min, this is a LEAK. Proceed to {1.01 EMERGENCY: SUIT PRESSURE BELOW 3.0 PSI}.

Step 5: If suit pressure is stable, announce "Pressure stable, inspecting for damage."

Step 6: Visually inspect the impacted area. Use cuff mirror 10 or partner's camera.

Step 7: Look for penetration of the Thermal Micrometeoroid Garment (TMG).43

Step 8: If only the outer TMG layer is damaged and no pressure loss, the suit is stable.

Step 9: Apply a contingency TMG patch 10 over the damaged area to prevent thermal issues.

Step 10: Announce "Damage inspected, TMG patch applied, suit is stable."

Step 11: ABORT CRITERIA: Terminate EVA and return to airlock. Any MMOD impact compromises the suit's redundancy.44

Step 12: Continue to monitor suit pressure every 5 minutes for the remainder of the EVA.

Step 13: Log incident for mandatory post-EVA suit inspection.

Step 14: Verify pressure remains stable at 4.3 psi (+/- 0.2 psi).

Input: We have a radiation storm alert. What is the shelter-in-place procedure?

Output: Step 1: CRITICAL: Announce "Radiation storm alert, shelter-in-place" on all channels.

Step 2: AURA will display radiation levels (mSv/hr) and time-to-limit.

Step 3: ABORT CRITERIA: All EVAs are immediately terminated.45

Step 4: Secure all external equipment and samples.

Step 5: Navigate to the primary habitat/station airlock via shortest path.

Step 6: Ingress airlock and perform emergency repress (dust mitigation protocols 6 may be waived if time-to-limit is < 15 minutes).

Step 7: Doff suits and secure airlock.

Step 8: Proceed immediately to the designated "radiation storm shelter" area.

Step 9: On ISS, this is the Zvezda Service Module 46 due to its reinforced structure.

Step 10: On a lunar/Mars habitat, this is the area with maximum shielding (e.g., water tanks, food stores, or a dedicated shelter).48

Step 11: All crew must remain in the shelter until AURA or ground control announces "All Clear."

Step 12: Monitor personal dosimeters every 30 minutes.

Step 13: Do not leave the shelter. Non-essential habitat systems may be powered down to conserve energy.46

Step 14: Verify all crew are present and accounted for in the shelter.

### SECTION: AURA SYSTEM USAGE

<sup>49</sup>

Input: How do I use the ACE module scan-to-solution pipeline to repair a damaged bracket?

Output: Step 1: Announce "AURA, initiating Adaptive Contingency Engineering, freeform repair.".49

Step 2: Retrieve handheld structured-light 3D scanner.

Step 3: Initiate scan of the damaged bracket; AURA AR will show point cloud generation.

Step 4: Ensure > 95% scan coverage of the damaged area and all interfacing points.49

Step 5: Stow scanner. Announce "AURA, scan complete. Defining constraints via NLP.".49

Step 6: State constraints clearly: "AURA, design a replacement bracket. Material is PEEK.49 Interface with scanned mounting points A and B. Must withstand 50 Nm operational torque.49"

Step 7: AURA will confirm: "Constraints received. Generating design."

Step 8: AURA's Generative Engineering Model (GEM) will perform FEA and optimize for PEEK material properties.49

Step 9: The new 3D model will appear in the AR display.

Step 10: Manually overlay the AR model onto the physical worksite.

Step 11: Verify fit: "AURA, confirm fit, alignment is correct."

Step 12: ABORT CRITERIA: If model does not align or fit, announce "AURA, abort generation, fit is incorrect."

Step 13: If fit is correct, announce "AURA, design validated. Send to onboard 3D printer."

Step 14: AURA will concurrently generate a new AR-guided installation procedure for the new part.49

Step 15: Wait for print completion (e.g., < 120 minutes).49

Step 16: Retrieve part and proceed with AURA-guided installation.

Input: My haptic patch is vibrating in a 3-pulse pattern on my right wrist. What does that mean?

Output: Step 1: A 3-pulse haptic pattern is a CRITICAL, non-visual alert.

Step 2: This haptic cue is semantically mapped to the Tactical Team Awareness Display (TTAD).49

Step 3: This specific cue signifies that your EVA partner (EV-2) has a CRITICAL biometric or suit alert (e.g., suit pressure < 3.0 psi, O2 pressure < 500 psi, or a 'Partner Incapacitation' state).

Step 4: Your AURA AR display will automatically "Auto-Dashboard" 49; non-essential data will fade, and EV-2's critical telemetry will be highlighted.

Step 5: Verbally acknowledge the alert: "AURA, haptic alert acknowledged."

Step 6: Immediately establish visual contact with your partner.

Step 7: Initiate immediate voice contact: "EV-2, status check! I have a critical alert for you."

Step 8: If EV-2 responds and is coherent, assist with their procedure.

Step 9: If EV-2 does not respond within 5 seconds, this is a confirmed Partner Incapacitation.

Step 10: ABORT CRITERIA: Immediately terminate your current task.

Step 11: Proceed to {1.XX PARTNER IS INCAPACITATED} rescue procedure.50

Step 12: Verify you are tethered to your partner before initiating rescue.

Input: How do I use AURA to read my Tactical Team Awareness Display (TTAD)?

Output: Step 1: The TTAD is an AURA AR feature 49 providing partner and environmental data.

Step 2: By default, the TTAD is a persistent, non-intrusive HUD element.49

Step 3: To access the full display, announce "AURA, maximize TTAD."

Step 4: The display will show live vitals (HR, SpO2) and key suit telemetry (O2, Batt) for all EVA partners.49

Step 5: Partner status is color-coded: GREEN (Nominal), YELLOW (Warning), RED (Critical).49

Step 6: The display also includes a 3D radar minimap showing partner proximity, based on UWB positioning.49

Step 7: To check a specific partner, announce "AURA, focus EV-2 telemetry."

Step 8: This will display EV-2's full data panel.

Step 9: To check a biometric trend, announce "AURA, show me EV-2's heart rate over the last 10 minutes."

Step 10: AURA will render a time-series graph.

Step 11: To close the maximized display, announce "AURA, minimize TTAD."

Step 12: Verify the display is minimized and your primary task overlays are restored.

### SECTION: DIGITAL TWIN CYCLE

<sup>49</sup>

Input: How do I package and uplink my daily logs for the Digital Twin?

Output: Step 1: This procedure is initiated post-EVA from the habitat terminal.

Step 2: Connect your EMU data port to the terminal.

Step 3: Announce "AURA, initiate daily log packaging for Digital Twin uplink."

Step 4: The onboard Space Side Orchestrator 49 is automatically triggered.49

Step 5: The workflow ingests all new logs from the /Triage directory.49

Step 6: AURA calculates a SHA256 checksum for the data package.49

Step 7: The local LLM analyzes the log and generates a criticality rating (0-10) and reasoning JSON.49

Step 8: The workflow compresses the log, checksum, and JSON into a single.zip package.49

Step 9: Based on the criticality rating (e.g., >= 7), the package is moved to /Sync_Critical or /Sync_NonCritical.49

Step 10: The Syncthing P2P tool 49 detects the new package and adds it to the uplink queue.

Step 11: Verify on the AURA dashboard: "Package \[filename\] queued for DSN uplink."

Step 12: The package will be transmitted automatically during the next scheduled communications window.

Step 13: The Orchestrator cleans the /Triage directory, removing all files except the.zip.49

Step 14: Verify the /Triage directory is clean post-procedure.

Input: Procedure for receiving and loading a new AI model update from Earth.

Output: Step 1: The Earth Side Orchestrator 49 prepares and cryptographically signs a new AI model package.49

Step 2: After a DSN downlink, AURA dashboard will display "AI Model Update Received. Pending Verification."

Step 3: This procedure must be run from a habitat terminal, not during an EVA.

Step 4: Announce "AURA, begin AI model update verification."

Step 5: The onboard system (Space Side Orchestrator) retrieves the package.

Step 6: CRITICAL: AURA verifies the package's cryptographic signature using the onboard public key.49

Step 7: ABORT CRITERIA: If signature verification FAILED, AURA will report "CRITICAL: Model update signature mismatch. Deleting package." The procedure is terminated.

Step 8: If signature is VALID, AURA will report "Model verified. Ready to install. Estimated downtime: 60 seconds."

Step 9: Announce "AURA, confirm and install new AI model."

Step 10: AURA will enter maintenance mode. All AR/Haptic features will be offline.

Step 11: After reload, AURA will announce "System reload complete."

Step 12: Verify the update: Announce "AURA, read current model version."

Step 13: Confirm the new model version number matches the uplink manifest.

Step 14: Log the model update event.

### SECTION: LEGAL & SAFETY GOVERNANCE

Input: What are the 'Go/No-Go' criteria for starting an EVA?

Output: Step 1: This is the final checklist prior to airlock depressurization.

Step 2: (CREW) Verify all EV crew are medically "Go" (no illness, fatigue < 2.0 on 5-pt scale).

Step 3: (SUIT) Verify all EMUs are "Go": Suit pressure stable at 4.3 psi 15; O2 > 95%; Battery > 100%; Coolant loop nominal; METOX canister cycle < 8 hours.

Step 4: (SUIT) Verify EMU Leak Check PASSED (pressure drop <= 0.3 psi/min).11 This is a hard "No-Go."

Step 5: (COMMS) Verify comms are "Go": "Loud and clear" on primary and backup channels.

Step 6: (ENVIRONMENT) Verify environment is "Go": No active solar radiation storm alerts 45; MMOD impact risk "Green"; target worksite is not in eclipse (unless planned).

Step 7: (AURA) Verify AURA system is "Go": AR overlays aligned; TTAD receiving partner data; haptics nominal.

Step 8: (FLIGHT RULES) Verify all governing Flight Rules (FRs) are "Go".51

Step 9: The EVA Director and Flight Controller must both verbally confirm "Go for EVA."

Step 10: A "No-Go" on any CRITICAL item (Suit Pressure, Leak Check, Rad Storm) requires a full abort and waiver from the Flight Director.51

Step 11: Verify "Go" status is logged by AURA.

Input: How do I execute a Human-in-Command override of an AURA recommendation?

Output: Step 1: This procedure is governed by the "Human-in-Command" HCI principle.49

Step 2: AURA provides a recommendation (e.g., "ABORT: high metabolic rate detected").

Step 3: AURA will provide its reasoning (XAI): "Reason: Heart rate has exceeded 160 bpm for 3 minutes."

Step 4: Assess this recommendation against your personal situational awareness (e.g., "I am performing a high-exertion task, this is expected").

Step 5: To initiate an override, state the clear, deterministic command: "AURA, override."

Step 6: AURA will respond with a confirmation challenge: "Confirm override. You are assuming Human-in-Command authority for this action. This is a loggable event.".52

Step 7: State clearly: "Confirm override."

Step 8: AURA will respond: "Override acknowledged. Human-in-Command protocol active for this event."

Step 9: You MUST provide a verbal rationale for the incident log: "Override reason: Metabolic rate is high due to a temporary 300-ft-lb torque task.32 Situation is stable and expected."

Step 10: AURA will log the override, the rationale, and all associated telemetry for post-incident review.49

Step 11: CRITICAL: You are now fully accountable for the consequences of this decision, as per Flight Rules.51

Step 12: AURA will suppress this specific alert for 15 minutes before re-evaluating.

Step 13: Verify the alert is suppressed on the HUD.

Input: Partner is incapacitated and not responding-what is the rescue procedure?

Output: Step 1: CRITICAL: Announce "MAYDAY, MAYDAY, MAYDAY, partner incapacitated" on all channels.

Step 2: If untethered, activate SAFER 18 and fly to partner. If tethered, pull tether to retrieve partner.50

Step 3: Secure partner: attach two (2) safety tethers from your suit to theirs.

Step 4: Perform rapid buddy-check: Position partner to view their HUD or wrist gauge.

Step 5: Read partner's suit pressure, O2 level, and biometric status.50 Announce all readings.

Step 6: If suit pressure is < 3.0 psi, proceed to {1.01 EMERGENCY SUIT PRESSURE} actions on partner's suit.

Step 7: If O2 is low, activate partner's OPS/emergency O2.50

Step 8: Manually operate partner's suit controls as needed.50

Step 9: Announce "ABORT, ABORT, ABORT. Returning to airlock with incapacitated partner."

Step 10: Configure partner for travel: secure limbs, stow all tools.

Step 11: Navigate to airlock, pulling partner. This is a high-exertion task; monitor your own metabolic rate.

Step 12: On airlock ingress, pull partner in, then ingress yourself.

Step 13: Close outer hatch and initiate CRITICAL emergency repressurization.50

Step 14: Once repressurized to 14.7 psi, open inner hatch and move partner into habitat for medical aid.

Step 15: Verify partner is transferred to medical care.

### SECTION: TEAM COORDINATION

Input: How do I perform an EVA buddy check?

Output: Step 1: This procedure is performed prior to airlock egress and at 60-minute intervals during EVA.

Step 2: Announce "EV-1, initiating EV-2 buddy check."

Step 3: Position yourself facing your partner (EV-2).

Step 4: (HEAD) Visually inspect helmet and visor; check for fogging, ice, or scratches. Verify visor is locked.

Step 5: (HUT) Visually inspect Hard Upper Torso. Verify all tethers are secure and routed correctly.

Step 6: (DCM) Visually inspect Display and Controls Module. Verify no caution/warning lights. Read O2, H2O, and Battery percentages aloud.

Step 7: (ARMS) Visually inspect arm and glove seals. Verify wrist rings are locked.

Step 8: (LEGS) Visually inspect Lower Torso Assembly. Verify no tears in TMG.

Step 9: (PLSS) Visually inspect PLSS backpack. Verify no ice on sublimator, antennas are secure.

Step 10: (SAFER) Verify SAFER pack is secure and hand controller is stowed.20

Step 11: Announce "EV-2, your check is complete. You are Go."

Step 12: Partner (EV-2) repeats steps 2-11 for EV-1.

Step 13: ABORT CRITERIA: If any critical seal (helmet, wrist) is not secure, or C&W light is on, return to airlock.

Step 14: Verify check is complete and log "Buddy Check" in AURA.

Input: Procedure for post-incident debrief logging.

Output: Step 1: This procedure follows any "Warning" or "Critical" event (e.g., suit leak, high CO2, partner incapacitation).

Step 2: This procedure is typically performed post-EVA inside the habitat.

Step 3: Announce "AURA, open new incident log for post-incident review."

Step 4: AURA will load the telemetry from the incident (e.g., "14:32:15 GMT - SUIT PRESSURE LOW").

Step 5: Provide a verbal narrative of the incident from your perspective.

Step 6: AURA will transcribe your narrative and attach it to the log.

Step 7: State the root cause, if known (e.g., "Root cause was MMOD impact on right thigh").

Step 8: State the actions taken (e.g., "Actions taken were suit patch and immediate abort").

Step 9: State the effectiveness of the response (e.g., "Patch was effective, pressure stabilized at 4.0 psi").

Step 10: State any lessons learned or procedural gaps.54

Step 11: State any equipment that needs to be grounded (e.g., "EMU S/N 105 is No-Go for EVA pending TMG repair").

Step 12: Announce "AURA, save and close incident log."

Step 13: AURA will package this log for the Digital Twin uplink.

Step 14: Verify the log is marked "CRITICAL" in the uplink queue.

### SECTION: POWER & ENERGY

Input: How do I perform non-essential load shedding?

Output: Step 1: This procedure is used during a low-battery state (e.g., < 25%) or as part of an emergency (e.g., {1.04 SUIT O2 CRITICAL}).

Step 2: Announce "AURA, initiating manual load shed."

Step 3: AURA will display the Load Priority Table.

Step 4: Priority 1 (CRITICAL) and Priority 2 (CRITICAL) loads (Life Support, Comms) cannot be shed.4

Step 5: Manually power down Priority 7 (ENHANCED) loads: disable all non-essential science AR overlays.

Step 6: Manually power down Priority 6 (TASK) loads: power off PGT and all other tools.

Step 7: Verify on HUD that Priority 6 and 7 loads are "OFF."

Step 8: Manually power down Priority 5 (SAFETY) loads: set glove heaters to "OFF."

Step 9: ABORT CRITERIA: If in thermal eclipse or hand temperature is < 10 deg C, do not shed glove heaters.

Step 10: Manually power down Priority 4 (SAFETY) loads: set suit core heaters to "MIN" or "OFF."

Step 11: ABORT CRITERIA: If core temp is < 36 deg C, do not shed core heaters.

Step 12: Manually power down Priority 3 (MISSION) loads: command "AURA, engage minimal UI mode." This will reduce AI compute load.

Step 13: Verify all non-essential loads are shed.

Step 14: AURA will recalculate "Time-to-Empty" (TTE) based on the new, lower power draw.

Step 15: Announce new TTE to partner and proceed with mission or abort as required.

#### Works cited

- EVA-EXP-0042 EXPLORATION EVA SYSTEM CONCEPT OF OPERATIONS - NASA, accessed November 9, 2025, <https://www.nasa.gov/wp-content/uploads/2017/02/eva-exp-0042_xeva_system_con_ops_rev_b_final_dtd_10192020_ref_doc.pdf>
- WOTM-Oxygen Purge System - NASA, accessed November 9, 2025, <https://www.nasa.gov/history/alsj/WOTM/WOTM-OPS.html>
- What Is A Load Shedding Battery? The Complete Guide For Homeowners - YouthPOWER, accessed November 9, 2025, <https://www.youth-power.net/news/what-is-a-load-shedding-battery-the-complete-guide-for-homeowners/>
- Load Shedding Can Be a Viable Panel Upgrade Alternative for EV Charging | Qmerit, accessed November 9, 2025, <https://qmerit.com/blog/load-shedding-can-be-a-viable-panel-upgrade-alternative-for-ev-charging/>
- Mars Mission Abort Considerations | NASA, accessed November 9, 2025, <https://www.nasa.gov/wp-content/uploads/2024/01/mars-mission-abort-considerations.pdf?emrc=a46442>
- Lunar Dust Mitigation: A Guide and Reference - NASA Technical Reports Server (NTRS), accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20220018746/downloads/TP-20220018746.pdf>
- Spacesuit Guidebook - NASA Technical Reports Server (NTRS), accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/19910009290/downloads/19910009290.pdf>
- Volume 1 of the Apollo 14 EMU Handbook - NASA, accessed November 9, 2025, <https://www.nasa.gov/wp-content/uploads/static/history/alsj/A14EMU-v1.pdf>
- Donning the Spacesuit, accessed November 9, 2025, <https://stao.ca/wp-content/uploads/2019/11/Donning-a-spacesuit-_article.pdf>
- nasa extravehicular mobility unit (emu) lss/ssa data book, accessed November 9, 2025, <https://www.lpi.usra.edu/lunar/artemis/NASA-EMU-Data-Book-JSC-E-DAA-TN55224.pdf>
- What's the normal leakage rate for a space suit? - Space Exploration Stack Exchange, accessed November 9, 2025, <https://space.stackexchange.com/questions/23658/whats-the-normal-leakage-rate-for-a-space-suit>
- OCHMO-TB-037 Decompression Sickness (DCS) - Executive ..., accessed November 9, 2025, <https://www.nasa.gov/wp-content/uploads/2023/12/ochmo-tb-037-decompression-sickness.pdf>
- Quest Joint Airlock - Wikipedia, accessed November 9, 2025, <https://en.wikipedia.org/wiki/Quest_Joint_Airlock>
- NASA ISS EVA Systems Checklist | PDF | Extravehicular Activity - Scribd, accessed November 9, 2025, <https://www.scribd.com/document/18952412/NASA-ISS-EVA-Systems-Checklist>
- 5.4 Extravehicular Activities - NASA, accessed November 9, 2025, <https://www.nasa.gov/wp-content/uploads/2023/03/gernhardt-eva-ops-chp-5.4-2013.pdf>
- Self-rescue strategies for EVA crewmembers equipped with the SAFER backpack - NASA Technical Reports Server (NTRS), accessed November 9, 2025, <https://ntrs.nasa.gov/citations/19940031126>
- What is the protocol if an astronaut gets loose during a tethered spacewalk? - Reddit, accessed November 9, 2025, <https://www.reddit.com/r/space/comments/7seswt/what_is_the_protocol_if_an_astronaut_gets_loose/>
- Simplified Aid For EVA Rescue - Wikipedia, accessed November 9, 2025, <https://en.wikipedia.org/wiki/Simplified_Aid_For_EVA_Rescue>
- Extended Example: Simpli ed Aid for EVA Rescue (SAFER), accessed November 9, 2025, <https://www.cs.toronto.edu/~sme/CSC340F/2005/assignments/inspections/SAFER.pdf>
- Extravehicular Activity (EVA) Hardware & Operations Overview, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20140000238/downloads/20140000238.pdf>
- Failure Analysis Results and Corrective Actions Implemented for the Extravehicular Mobility Unit 3011 Water in the Helmet Mishap, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20150003027/downloads/20150003027.pdf>
- Extravehicular Mobility Unit (EMU) / International Space Station (ISS) Coolant Loop Failure and Recovery - Sma.nasa.gov., accessed November 9, 2025, <https://sma.nasa.gov/SignificantIncidentsEVA/assets/emu-coolant-loop-failure-and-recovery.pdf>
- Rapid cycling CO 2 and H 2 O removal system for EMU - ResearchGate, accessed November 9, 2025, <https://www.researchgate.net/publication/228648669_Rapid_cycling_CO_2_and_H_2_O_removal_system_for_EMU>
- EMU METOX Performance Testing, accessed November 9, 2025, <https://ttu-ir.tdl.org/bitstreams/614c4e85-c431-45a1-84d1-9c2a9b0ac67b/download>
- RAPID CYCLING CO2 and H2O REMOVAL SYSTEM for EMU, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20060020699/downloads/20060020699.pdf>
- MANAGEMENT OF THE POST-SHUTTLE EXTRAVEHICULAR MOBILITY UNIT (EMU) WATER CIRCUITS, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20120003778/downloads/20120003778.pdf>
- Status of the Redesign of the Extravehicular Mobility Unit Airlock Cooling Loop Recovery Assembly, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20170002375/downloads/20170002375.pdf>
- How to Change Out Filter Cartridges, Properly and Safely, accessed November 9, 2025, <https://www.globalfilter.com/blog/how-to-change-out-filter-cartridges-properly-and-safely/>
- How To Replace Pool Cartridge Filter - YouTube, accessed November 9, 2025, <https://www.youtube.com/watch?v=dDNVkUtXeic>
- Extravehicular Activity (EVA) Hardware & Operations Overview, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20120011735/downloads/20120011735.pdf>
- MSFC-STD-486B - NASA Standards, accessed November 9, 2025, <https://standards.nasa.gov/sites/default/files/standards/MSFC/B/0/MSFC-STD-486-B.pdf>
- REQUIREMENTS FOR THREADED FASTENING SYSTEMS IN SPACEFLIGHT HARDWARE - NASA, accessed November 9, 2025, <https://www.nasa.gov/wp-content/uploads/2018/01/nasa-std-5020a_w-chg_1_nasa_fastener_standards.pdf>
- EVA Swab Kit: Tools and Techniques for Collecting Aseptic Samples ..., accessed November 9, 2025, <https://ntrs.nasa.gov/citations/20220003128>
- ISS External Microorganisms: Tools and Techniques for Collecting Planetary Protection Samples During Extravehicular Activity, accessed November 9, 2025, <https://ntrs.nasa.gov/citations/20240015795>
- ISS External Microorganisms: Collecting Planetary Protection Samples During Extravehicular Activity - NASA Technical Reports Server (NTRS), accessed November 9, 2025, <https://ntrs.nasa.gov/citations/20240008743>
- EVA Swab Tool to Support Planetary Protection and Astrobiology Evaluations - NASA Technical Reports Server, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20170010188/downloads/20170010188.pdf>
- EXTRAVEHICULAR ACTIVITY AND HUMAN SURFACE MOBILITY PROGRAM (EHP) EXPLORATION EVA (XEVA) SYSTEM COMPATIBILITY STANDARDS, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20240009010/downloads/EHP-10028%20_Baseline_AdminChg1_Finalwcover.pdf>
- Extravehicular Mobility Unit - Wikipedia, accessed November 9, 2025, <https://en.wikipedia.org/wiki/Extravehicular_Mobility_Unit>
- Help with making a battery pack for heated gloves? - BudgetLightForum.com, accessed November 9, 2025, <https://budgetlightforum.com/t/help-with-making-a-battery-pack-for-heated-gloves/64193>
- Mitigation and Prevention of Lunar Dust on NASA Artemis xEMU Spacesuits - Deep Blue Repositories, accessed November 9, 2025, <https://deepblue.lib.umich.edu/bitstream/handle/2027.42/164446/Mitigation_and_Prevention_of_Lunar_Dust_on_NASA_Artemis_xEMU_Spacesuits.pdf?sequence=1>
- Apollo Dust Lessons Learned For Artemis, accessed November 9, 2025, <https://www3.nd.edu/~cneal/Lunar-L/Apollo_Dust_Lessons_Learned_For_Artemis.pdf>
- Task 4. Request for Proposals: Life Support Systems: Dust Mitigation in Lunar Habitats, accessed November 9, 2025, <https://werc.nmsu.edu/team-info/WERC-2025-Task-4-Dust-Mitigation-in-Lunar-Habitats-10-21-24.pdf>
- Evidence Report: RISK OF INJURY AND COMPROMISED PERFORMANCE DUE TO EVA OPERATIONS - Lunar and Planetary Institute, accessed November 9, 2025, <https://www.lpi.usra.edu/lunar/artemis/ChappellEtAl_NASA-JSC-CN-39092_EVA-Ops-Injuries-And-Compromised-Performance.pdf>
- Micrometeoroid Penetration Hazards Assessment for the Shuttle EMU 1999-01-1963, accessed November 9, 2025, <https://www.sae.org/papers/micrometeoroid-penetration-hazards-assessment-shuttle-emu-1999-01-1963>
- How do we protect the astronauts from space radiation?, accessed November 9, 2025, <https://srag.jsc.nasa.gov/spaceradiation/how/how.cfm>
- NASA's ISS Procedures: Responding to Space Weather - New ..., accessed November 9, 2025, <https://newspaceeconomy.ca/2023/03/28/nasas-iss-procedures-responding-to-space-weather/>
- accessed November 9, 2025, <https://newspaceeconomy.ca/2023/03/28/nasas-iss-procedures-responding-to-space-weather/#:~:text=Protective%20Measures&text=One%20such%20measure%20is%20the,and%20location%20within%20the%20station>.
- RadWorks Storm Shelter Design for Solar Particle Event Shielding, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20170002287/downloads/20170002287.pdf>
- Team PlusTwo 18ISC_Submission.pdf
- ISS Procedures for an Incapacitated Astronaut During an EVA - New ..., accessed November 9, 2025, <https://newspaceeconomy.ca/2024/09/12/iss-procedures-for-an-incapacitated-astronaut-during-an-eva/>
- EVA Operations - NASA Technical Reports Server, accessed November 9, 2025, <https://ntrs.nasa.gov/api/citations/20240005248/downloads/EVA%20Ops%20101%20for%20Artemis%203%20External%20Teams.pdf>
- NPR 8705.2B Human-Rating Requirements for Space Systems (w/change 4 dated 8/21/2012) - NODIS Library - NASA, accessed November 9, 2025, <https://nodis3.gsfc.nasa.gov/displayAll.cfm?Internal_ID=N_PR_8705_002B_&page_name=all>
- Recommended Practices for Human Space Flight Occupant Safety - Federal Aviation Administration, accessed November 9, 2025, <https://www.faa.gov/media/71481>
- A Guide to Post-Incident Review - Cybereason, accessed November 9, 2025, <https://www.cybereason.com/resources/post-incident-review>
- What should you do after a cyber security incident? - Evalian, accessed November 9, 2025, <https://evalian.co.uk/what-should-you-do-after-a-cyber-security-incident/>
- Real-time emergency load shedding for power system transient stability control: A risk-averse deep learning method | Request PDF - ResearchGate, accessed November 9, 2025, <https://www.researchgate.net/publication/356516201_Real-time_emergency_load_shedding_for_power_system_transient_stability_control_A_risk-averse_deep_learning_method>

<!-- AMBIGUITY A1: Superscript-style numeric references (e.g., "1", "2", etc.) are preserved as-is; unclear if citations vs. step references. -->
<!-- AMBIGUITY A3: Outline/meta-spec items near the end (e.g., "Power triage trees", "Haptic cues legend") appear to be specification stubs, not executable procedures; left unchanged. -->
<!-- AMBIGUITY A5: References to "Earth Side Orchestrator", "Space Side Orchestrator", "Auto-Dashboard", and "Digital Twin" retain original wording; scope of responsibility remains implicit. -->

### SECTION: EMERGENCY PROCEDURES (VALIDATION PROMPTS)

Input: Emergency: suit pressure below 3.0 psi-immediate actions?

Output: Step 1: Freeze movement and switch to controlled breathing; avoid exertion to slow pressure loss.
Step 2: Read wrist gauge and announce current psi; if < 2.5 psi treat as CRITICAL and skip to Step 7.
Step 3: Sweep helmet ring and visor latch by touch; push-pull to confirm full lock; reseat once.
Step 4: Palpate reachable torso and limb surfaces for hissing or airflow; if localized, cover with glove and go to patch step.
Step 5: Deploy emergency patch from hip pouch; clean area; apply; hold firm 60 s; recheck psi; if >= 3.0 psi proceed to Step 9.
Step 6: If unable to localize or psi continues dropping > 0.2 psi per 10 s, announce MAYDAY and proceed to Step 7.
Step 7: Toggle emergency O2 bypass to ON; expect stabilization toward 4.0-4.3 psi within 30 s; if not achieved, ABORT EVA and return immediately.
Step 8: Activate suit beacon; enable minimal UI mode; suppress noncritical overlays.
Step 9: Navigate to airlock along known path; maintain low-exertion cadence; confirm psi every 30 s.
Step 10: On ingress, close outer hatch, initiate repress; log incident code and time-to-critical for debrief.

Input: Pre-EVA: full airlock depressurization checklist

Output: Step 1: Close and dog inner hatch (3 full rotations); confirm four greens on inner seal indicators.
Step 2: Announce "depressurization start"; crack vent valve 0.5 turns CCW; target rate <= 0.5 psi/min.
Step 3: Monitor gauge: 14.7→10.0 psi in ~10 s, then continue gradual bleed; watch for noise/vibration.
Step 4: At 5.0 psi, verify suit pressure steady 4.3±0.2 psi; confirm comms intelligibility.
Step 5: At 0.5 psi, pause 10 s; listen for leak cues; scan indicators.
Step 6: At 0.0 psi, wait 15 s; confirm vacuum steady; check outer hatch seal lights.
Step 7: Switch HUD to EVA mode; enable TTAD; set breadcrumb logging.
Step 8: Open outer hatch slowly (<= 1 turn/5 s) to limit dust disturbance; verify hinge torque within normal.
Step 9: Egress on tether discipline; confirm partner status; start EVA clock.
Step 10: Record depress time and anomalies in log.

Input: Comms lost: no response on primary and backup-what now?

Output: Step 1: Announce "Comms check, comms check" on primary channel. Wait 10 seconds.
Step 2: If no response, switch to backup channel and announce "Comms check on backup." Wait 10 seconds.
Step 3: If no response, perform comms hardware self-check: confirm comms switch is not in neutral; cycle power on comms panel.
Step 4: If no response after 30 seconds total, declare a Lost Comm condition.
Step 5: Look for EVA partner. If partner is in visual range (within 100 meters), proceed to Step 6.
Step 6: If partner is NOT in visual range, this is a CRITICAL Lost Comm / Lost Partner emergency. Skip to Step 10.
Step 7: (Partner Visual) Navigate to partner. Use standard hand signal for "lost comms" (tapping helmet ear-cup).
Step 8: Partner will attempt to initiate suit-to-suit relay.1
Step 9: If relay fails, ABORT EVA. Navigate back to airlock as a buddy pair, maintaining constant visual contact. Proceed to Step 17.
Step 10: (No Partner Visual) CRITICAL: Activate personal suit beacon immediately.
Step 11: Announce "ABORT, ABORT, ABORT, lost comms, lost visual on partner" in the blind.
Step 12: Stop all task activity.
Step 13: Navigate to the last known "failsafe" landmark or return to airlock via AURA AR navigation "breadcrumb" trail.
Step 14: Move predictably. Pause for 30 seconds every 10 minutes to stop and scan 360 degrees for partner.
Step 15: If visual contact is regained, navigate to partner and proceed from Step 7.
Step 16: If airlock is reached, ingress, repressurize, and wait for partner.
Step 17: On ingress, terminate procedure. Log incident for post-mission debrief.

Input: Suit oxygen pressure critically low-time remaining and actions?

Output: Step 1: CRITICAL: Announce "MAYDAY, MAYDAY, MAYDAY, low oxygen" on primary channel.
Step 2: Read current primary O2 tank pressure (psi) from HUD and announce to partner.
Step 3: If pressure is < 500 psi, this is a CRITICAL state; assume primary O2 is depleted or feeding a leak.
Step 4: CRITICAL: Activate the Oxygen Purge System (OPS) backup 2; rotate chest-mounted actuator 90 degrees to ON position.
Step 5: Verify OPS activation: check for "OPS ACTIVE" on HUD and feel/hear O2 flow.
Step 6: AURA will calculate time remaining based on OPS mode. Announce the conservative time.
Step 7: Expect approximately 39 minutes on High Flow (Purge) or 79.5 minutes on Low Flow (Makeup).2
Step 8: Announce "ABORT, ABORT, ABORT. On backup O2, time remaining approximately 30 minutes."
Step 9: Immediately command AURA "Execute load-shedding." AURA will terminate power to all non-essential systems.3
Step 10: Manually verify termination of glove heaters and tool power; set suit to minimum power mode.
Step 11: CRITICAL: Change metabolic rate. Cease all non-navigation activity; adopt controlled, low-exertion cadence to conserve O2.
Step 12: Navigate to airlock via shortest path. Activate AURA AR "breadcrumb" trail if available.
Step 13: Monitor OPS pressure; if OPS pressure also begins to fall, decrease time-remaining estimate by 50% and increase pace.
Step 14: On airlock ingress, close outer hatch and initiate emergency repressurization.
Step 15: Remain on suit O2 until airlock is > 5.0 psi and O2 content is nominal.
Step 16: Log incident, noting time from primary to backup activation.

Input: Mars EVA: dust storm rapidly approaching-abort protocol?

Output: Step 1: CRITICAL: Announce "ABORT, ABORT, ABORT, dust storm approaching" to partner and in the blind (for habitat).
Step 2: Command AURA: "Display shortest path to habitat airlock."
Step 3: Read time-to-arrival and opacity-rate from AURA HUD.
Step 4: ABORT CRITERIA: If opacity is projected to exceed 80% (visibility < 5 meters) before shelter can be reached, treat as a zero-visibility condition.
Step 5: Immediately terminate all science or maintenance tasks.
Step 6: Secure all loose tools and equipment to suit or rover. Bag all critical samples.
Step 7: If rover is present and > 100 m from habitat, ingress rover and drive to habitat.
Step 8: If on foot, begin navigation to airlock along AURA-defined path.
Step 9: Increase cadence to a sustainable, high-exertion pace.
Step 10: If visibility drops to zero (< 1 meter), STOP movement.
Step 11: CRITICAL: If stopped, deploy navigation beacon. Hunker in place to conserve power. DO NOT attempt to navigate blind.
Step 12: On airlock ingress, close outer hatch.
Step 13: Initiate full "Post-EVA Regolith Contamination Control" procedure.6
Step 14: Do not repressurize until airlock dust particle count is < 10 ppm.
Step 15: Verify airlock particle count is nominal.
Step 16: Do not doff suit until habitat is confirmed secure from dust intrusion.

### SECTION: EVA CORE OPERATIONS
Input: How do I perform a full EMU donning procedure? Output: Step 1: Don Liquid Cooling and Ventilation Garment (LCVG). Ensure all zippers are secure. Step 2: Don LCVG water connector ; verify secure "click" and no leaks. Step 3: Don Lower Torso Assembly (LTA). Step 4: Using donning handles , "dive" into the Hard Upper Torso (HUT). Step 5: Engage and lock waist ring; verify "LTA Donning Handles"  are stowed. Step 6: Connect LCVG and comms umbilicals to HUT. Step 7: Don Communications Carrier Assembly (CCA) ("Snoopy Cap") ; perform pre-comms check. Step 8: Don helmet and lock helmet ring ; perform "push-pull" check to verify hard seal. Step 9: Don comfort gloves. Step 10: Don EVA gloves and lock wrist rings; perform "push-pull" check on both gloves. Step 11: Initiate LCVG coolant flow from habitat; verify cooling water is circulating (temp drop > 3 deg C within 60 seconds). Step 12: Initiate suit ventilation; verify O2 flow. Step 13: Perform initial suit pressure and leak check per {1.XX EMU LEAK CHECK}. Step 14: ABORT CRITERIA: ABORT donning if leak check fails > 0.3 psi drop in 1 min. Step 15: Verify all steps complete and announce "Ready for prebreathe."   

Input: What is the full procedure for the 8-hour Campout prebreathe protocol? Output: Step 1: This protocol  is used to reduce in-suit prebreathe time by purging nitrogen overnight. Step 2: All EV crew ingresses the ISS Joint Airlock (Quest)  approximately 10 hours before planned EVA start. Step 3: Seal the inner hatch between the airlock and the main cabin. Step 4: Initiate airlock depressurization from 14.7 psi to 10.2 psi. Step 5: Once at 10.2 psi, adjust atmospheric composition to 26.5% O2. Step 6: Verify atmosphere is stable at 10.2 psi and 26.5% O2. Step 7: Begin "Campout" (sleep) period. Step 8: CRITICAL: Crew must remain at 10.2 psi for a minimum of 8 hours and 40 minutes. Step 9: Post-sleep period, crew performs standard EMU donning procedure {1.XX EMU DONNING}. Step 10: Perform EMU purge  with 100% O2 for 8-12 minutes. Step 11: Perform final in-suit prebreathe. This period can be as short as 40 minutes. Step 12: ABORT CRITERIA: If campout duration was < 8 hours 40 minutes, you must revert to the 4-hour in-suit prebreathe protocol. Step 13: After 40-minute prebreathe is complete, perform final EMU leak check {1.XX EMU LEAK CHECK}. Step 14: Verify leak check passed (<= 0.3 psi drop/min). Step 15: Proceed with {1.01 PRE-EVA: FULL AIRLOCK DEPRESSURIZATION CHECKLIST}.   

Input: How do I perform an EMU leak check? Output: Step 1: This procedure is performed after donning  and EMU purge. Step 2: Ensure suit is pressurized to nominal 4.3 psi (+/- 0.2 psi). Step 3: Announce "Initiating EMU leak check." Step 4: Set suit O2 to "IV" (Internal Vent). Step 5: Read and record exact suit pressure to two decimal places (e.g., "4.32 psi"). Step 6: Wait for 30 seconds for pressure to stabilize. Step 7: If pressure is unstable, re-check all seals (helmet, wrist, waist). Step 8: Once stable, record "Leak Check Start Pressure" and "GMT Start Time." Step 9: Hold breath and remain still for 1 minute. Step 10: Record "Leak Check Stop Pressure" and "GMT Stop Time." Step 11: Calculate pressure drop. Step 12: CRITICAL (No-Go Criteria): If pressure drop is > 0.3 psi , the leak check is FAILED. Step 13: If leak check is FAILED, announce "Failed leak check" and perform {2.XX FAILED LEAK CHECK} procedure. Step 14: If pressure drop is <= 0.3 psi, announce "Passed leak check." Step 15: Verify "Passed" status is logged. Step 16: Proceed with prebreathe protocol.   

Input: Procedure for emergency SAFER activation and flight to safety? Output: Step 1: This procedure is for emergency self-rescue from tether failure or separation. Step 2: CRITICAL: Immediately activate SAFER "Attitude Hold" feature  to arrest uncontrolled rotation or tumble. Step 3: Grip the SAFER Hand Controller Module. Step 4: Verify SAFER system is "Go" on EMU display; check propellant level (3 lbs nominal). Step 5: Visually acquire the station/habitat. This is your primary target. Step 6: Announce "MAYDAY, MAYDAY, separated from station, on SAFER." Step 7: Initiate controlled translation thrust toward the station. Step 8: Use short, 1-second bursts from thrusters. DO NOT apply continuous thrust. Step 9: Monitor "Time-to-Empty" (TTE) on HUD; total delta-V is limited to approx 10 ft/s (3 m/s). Step 10: ABORT CRITERIA: If TTE projects 0 remaining before station contact, cease thrusting, announce "MAYDAY, no-prop," and await partner rescue. Step 11: As you approach within 10 meters of the station, orient body feet-first. Step 12: Use translation bursts to kill all relative velocity; target velocity < 0.1 ft/s for final contact. Step 13: Make contact with a stable handrail or structure. Step 14: Immediately apply two tethers. Step 15: Verify both tethers are secure (push-pull check). Step 16: Announce "Tethered and secure." Step 17: Power down SAFER unit.   

SECTION: SUIT LIFE-SUPPORT
Input: My LCVG coolant loop has failed and I am overheating. Output: Step 1: Announce "WARNING, LCVG coolant loop failure, I am overheating." Step 2: Read LCVG inlet/outlet temperatures on HUD. Verify coolant flow rate is at 0 lb/hr. Step 3: Perform immediate actions: reduce metabolic load; stop all physical activity. Step 4: Attempt to reset coolant pump: Cycle pump switch from ON to OFF, wait 3 seconds, then to ON. Step 5: If flow does not restart, attempt to clear potential ice-blockage: set manual coolant valve (TCV) to MAX flow  for 30 seconds, then MIN flow for 30 seconds. Step 6: If flow remains at 0 lb/hr, announce "Pump reset failed, no coolant flow." Step 7: Check for water in helmet ; if water is present, this is a CRITICAL loop contamination event, skip to Step 10. Step 8: If no water in helmet, this is a pump failure. You are now on a time limit. Step 9: ABORT CRITERIA: Announce "ABORT, ABORT, ABORT." Your remaining EVA time is limited to < 15-20 minutes based on metabolic heat buildup. Step 10: If water is in helmet, activate emergency O2 purge  to clear visor and proceed with ABORT. Step 11: Navigate to airlock via shortest path. Step 12: On ingress, connect to habitat cooling umbilical  immediately. Step 13: Verify umbilical connection is secure and coolant flow is re-established. Step 14: Log incident. Do not use EMU until pump is serviced.   

Input: How do I swap the METOX CO2 scrubber cartridge? Output: Step 1: This is a post-EVA, intra-vehicular maintenance procedure. Step 2: Confirm EMU is powered down and connected to service umbilical. Step 3: Access the Portable Life Support System (PLSS)  maintenance bay. Step 4: Identify the METOX (Metal Oxide) canister. Step 5: Rotate the canister locking handle 90 degrees CCW to disengage. Step 6: Extract the depleted METOX canister from the PLSS. Step 7: Place the depleted canister into the METOX regenerator bay. Step 8: Initiate regeneration cycle per {3.XX METOX REGENERATION}. Cycle time is approximately 14 hours. Step 9: Retrieve a fully regenerated METOX canister from the "Ready" stowage. Step 10: Verify the new canister's seals are intact and the status indicator is GREEN. Step 11: ABORT CRITERIA: Do not install if status indicator is RED or seals are compromised. Step 12: Insert the new METOX canister into the PLSS. Step 13: Rotate the locking handle 90 degrees CW until it clicks into the locked position. Step 14: Perform a "push-pull" check to verify the canister is secure. Step 15: Close the PLSS maintenance bay. Step 16: Update the suit maintenance log with the new canister's serial number and cycle count.   

Input: How do I replace the LCVG coolant filter cartridge? Output: Step 1: This is an intra-vehicular maintenance procedure to remediate coolant loop contamination. Step 2: Confirm EMU is powered down. Step 3: Connect the Airlock Coolant Loop Remediation (ALCLR) system  to the EMU LCVG umbilical ports. Step 4: Ensure ALCLR system is off and depressurized before connection. Step 5: Place a drip tray to collect any excess liquid. Step 6: Locate the filter cartridge housing on the ALCLR unit. Step 7: Remove the sump (housing cover) by rotating CCW. Step 8: Remove the old LCVG filter cartridge. Step 9: Bag and stow the old filter for post-mission analysis. Step 10: Clean the inside of the housing with an approved cleaning cloth. Step 11: Verify the Part Number (PN) of the new filter cartridge. Step 12: Install the new cartridge, ensuring it snaps into place. Step 13: Replace the sump and tighten by hand until snug. Step 14: Initiate ALCLR "Scrubbing Configuration"  and run for 4 hours. Step 15: Verify flow rate is nominal (e.g., > 1.0 GPM) and check for leaks. Step 16: ABORT CRITERIA: If leaks are > 1 drop/min, stop system and reseat sump. Step 17: Log the filter replacement in the EMU maintenance record.   

SECTION: TASK PROCEDURES
Input: What is the procedure for removing a panel fastener? Output: Step 1: Identify fastener type (e.g., hex, tri-groove) and required tool (e.g., PGT). Step 2: Select correct socket/bit for the PGT  and lock in place. Step 3: Set PGT to "REVERSE" (CCW) and select a torque setting. Step 4: CRITICAL: Initial torque (breakaway torque)  setting should be between 20-90% of the PGT's full scale. Step 5: Engage fastener head fully; ensure tool is perpendicular to surface. Step 6: Apply steady pressure and activate PGT. Step 7: If fastener does not break loose within 3 seconds, STOP. Step 8: Increase PGT torque setting by 10% (e.g., from 15 ft-lbs to 17 ft-lbs). Do not exceed 90% of max torque. Step 9: Re-attempt removal. Step 10: If fastener still does not move after 3 attempts, ABORT. This is a jammed fastener. Step 11: Log the fastener as "jammed" and do not proceed. Forcing it risks tool/fastener fracture. Step 12: Once fastener is free-spinning , remove it. Step 13: Place fastener in a "small parts" tethered bag immediately. Step 14: Verify fastener threads are clean and not stripped. Step 15: Announce "Fastener removed and stowed."   

Input: How do I perform an aseptic planetary sample collection? Output: Step 1: This procedure is for collecting samples while maintaining planetary protection. Step 2: Identify target sample location (e.g., soil, rock surface). Step 3: Retrieve EVA Swab Kit  or sample caddy from tool carrier. Step 4: Retrieve aseptic swab tool  from its sterile canister. Step 5: CRITICAL: Do not allow swab to touch any surface other than the target. Step 6: Perform an "environmental control" sample : open canister, expose swab to environment for 5 seconds without contact, and re-stow. Step 7: Retrieve a new sterile swab for the primary sample. Step 8: Swab the target surface (e.g., 10cm x 10cm area) using a cross-hatch pattern. Step 9: Immediately re-stow the swab in its individual aluminum canister. Step 10: Verify the canister is sealed (e.g., 0.2 um Teflon filter is intact). Step 11: Label the canister using the AURA AR interface or a physical tethered tag. Step 12: Place canister in the -80 deg C sample freezer  or return container. Step 13: ABORT CRITERIA: If swab is compromised (e.g., dropped, touched glove), discard and use a new swab. Step 14: Log sample ID, location, and time in the AURA science log. Step 15: Verify sample is secure in freezer.   

Input: What is the procedure for swapping a glove heater battery? Output: Step 1: This procedure is for an external, worksite-replaceable battery. Step 2: Announce "Swapping left glove heater battery." Step 3: Retrieve new battery (e.g., 7.4V 2200mAh Li-ion pack)  from battery pouch. Step 4: Verify new battery is fully charged (e.g., GREEN indicator). Step 5: Locate the battery compartment on the glove cuff. Step 6: Open the battery pouch (e.g., Velcro or zip). Step 7: Disconnect the power connector from the old battery. Step 8: Remove the old battery and stow it in a "depleted" pouch. Step 9: CRITICAL: Do not leave depleted battery unsecured (tether or stow). Step 10: Connect the power connector to the new battery. Step 11: Verify connection is secure; check for "Glove Heat ON" indication on HUD. Step 12: Stow the new battery in the cuff pouch. Step 13: Secure the pouch (close Velcro/zip). Step 14: ABORT CRITERIA: If new battery does not show "ON" status, assume connector fault. Abort swap and use old battery if functional. Step 15: Announce "Battery swap complete. Glove heat is nominal." Step 16: Verify "Glove Heat ON" status on HUD after 60 seconds.   

SECTION: ENVIRONMENTAL HAZARDS
Input: What is the post-EVA procedure for lunar regolith contamination control? Output: Step 1: This procedure begins prior to airlock ingress. Step 2: At the "Airlock Staging Area," perform 60 seconds of self-stamping and shaking to remove gross particles. Step 3: Perform 120 seconds of buddy-brushing. Partner brushes all suit surfaces, focusing on seals (helmet, wrist, waist) and LCVG ports. Step 4: Use specialized boot brushes  or sticky mats  at the airlock threshold. Step 5: Ingress airlock. Secure outer hatch. Step 6: CRITICAL: Do not repressurize. The airlock is still in vacuum. Step 7: Initiate active dust removal system , such as an Electrostatic Precipitator or CO2 shower. Step 8: Run active removal system for a minimum of 5 minutes. Step 9: Monitor airlock particle sensor. Step 10: ABORT CRITERIA: Do not repressurize until particle count is below 50 ppm. Step 11: If particle count remains high, repeat active removal cycle (Step 7). Step 12: Once < 50 ppm, initiate slow repressurization. Step 13: Perform "aided doffing" procedure: partner assists in suit removal to prevent skin-to-suit contact. Step 14: Immediately bag all suit components. Step 15: All crew perform dermal and airway cleaning (e.g., saline rinse). Step 16: Verify all components are stowed and airlock filters are activated.   

Input: I have an MMOD impact alert on my suit. Output: Step 1: CRITICAL: Announce "MMOD impact alert" on comms. Step 2: Freeze all motion. Step 3: Read AURA HUD: locate the impacted area (e.g., "Right Thigh") and check suit pressure trend. Step 4: If suit pressure is dropping > 0.1 psi/min, this is a LEAK. Proceed to {1.01 EMERGENCY: SUIT PRESSURE BELOW 3.0 PSI}. Step 5: If suit pressure is stable, announce "Pressure stable, inspecting for damage." Step 6: Visually inspect the impacted area. Use cuff mirror  or partner's camera. Step 7: Look for penetration of the Thermal Micrometeoroid Garment (TMG). Step 8: If only the outer TMG layer is damaged and no pressure loss, the suit is stable. Step 9: Apply a contingency TMG patch  over the damaged area to prevent thermal issues. Step 10: Announce "Damage inspected, TMG patch applied, suit is stable." Step 11: ABORT CRITERIA: Terminate EVA and return to airlock. Any MMOD impact compromises the suit's redundancy. Step 12: Continue to monitor suit pressure every 5 minutes for the remainder of the EVA. Step 13: Log incident for mandatory post-EVA suit inspection. Step 14: Verify pressure remains stable at 4.3 psi (+/- 0.2 psi).   

Input: We have a radiation storm alert. What is the shelter-in-place procedure? Output: Step 1: CRITICAL: Announce "Radiation storm alert, shelter-in-place" on all channels. Step 2: AURA will display radiation levels (mSv/hr) and time-to-limit. Step 3: ABORT CRITERIA: All EVAs are immediately terminated. Step 4: Secure all external equipment and samples. Step 5: Navigate to the primary habitat/station airlock via shortest path. Step 6: Ingress airlock and perform emergency repress (dust mitigation protocols  may be waived if time-to-limit is < 15 minutes). Step 7: Doff suits and secure airlock. Step 8: Proceed immediately to the designated "radiation storm shelter" area. Step 9: On ISS, this is the Zvezda Service Module  due to its reinforced structure. Step 10: On a lunar/Mars habitat, this is the area with maximum shielding (e.g., water tanks, food stores, or a dedicated shelter). Step 11: All crew must remain in the shelter until AURA or ground control announces "All Clear." Step 12: Monitor personal dosimeters every 30 minutes. Step 13: Do not leave the shelter. Non-essential habitat systems may be powered down to conserve energy. Step 14: Verify all crew are present and accounted for in the shelter.   

SECTION: AURA SYSTEM USAGE
Input: How do I use the ACE module scan-to-solution pipeline to repair a damaged bracket? Output: Step 1: Announce "AURA, initiating Adaptive Contingency Engineering, freeform repair.". Step 2: Retrieve handheld structured-light 3D scanner. Step 3: Initiate scan of the damaged bracket; AURA AR will show point cloud generation. Step 4: Ensure > 95% scan coverage of the damaged area and all interfacing points. Step 5: Stow scanner. Announce "AURA, scan complete. Defining constraints via NLP.". Step 6: State constraints clearly: "AURA, design a replacement bracket. Material is PEEK. Interface with scanned mounting points A and B. Must withstand 50 Nm operational torque." Step 7: AURA will confirm: "Constraints received. Generating design." Step 8: AURA's Generative Engineering Model (GEM) will perform FEA and optimize for PEEK material properties. Step 9: The new 3D model will appear in the AR display. Step 10: Manually overlay the AR model onto the physical worksite. Step 11: Verify fit: "AURA, confirm fit, alignment is correct." Step 12: ABORT CRITERIA: If model does not align or fit, announce "AURA, abort generation, fit is incorrect." Step 13: If fit is correct, announce "AURA, design validated. Send to onboard 3D printer." Step 14: AURA will concurrently generate a new AR-guided installation procedure for the new part. Step 15: Wait for print completion (e.g., < 120 minutes). Step 16: Retrieve part and proceed with AURA-guided installation.   

Input: My haptic patch is vibrating in a 3-pulse pattern on my right wrist. What does that mean? Output: Step 1: A 3-pulse haptic pattern is a CRITICAL, non-visual alert. Step 2: This haptic cue is semantically mapped to the Tactical Team Awareness Display (TTAD). Step 3: This specific cue signifies that your EVA partner (EV-2) has a CRITICAL biometric or suit alert (e.g., suit pressure < 3.0 psi, O2 pressure < 500 psi, or a 'Partner Incapacitation' state). Step 4: Your AURA AR display will automatically "Auto-Dashboard" ; non-essential data will fade, and EV-2's critical telemetry will be highlighted. Step 5: Verbally acknowledge the alert: "AURA, haptic alert acknowledged." Step 6: Immediately establish visual contact with your partner. Step 7: Initiate immediate voice contact: "EV-2, status check! I have a critical alert for you." Step 8: If EV-2 responds and is coherent, assist with their procedure. Step 9: If EV-2 does not respond within 5 seconds, this is a confirmed Partner Incapacitation. Step 10: ABORT CRITERIA: Immediately terminate your current task. Step 11: Proceed to {1.XX PARTNER IS INCAPACITATED} rescue procedure. Step 12: Verify you are tethered to your partner before initiating rescue.   

Input: How do I use AURA to read my Tactical Team Awareness Display (TTAD)? Output: Step 1: The TTAD is an AURA AR feature  providing partner and environmental data. Step 2: By default, the TTAD is a persistent, non-intrusive HUD element. Step 3: To access the full display, announce "AURA, maximize TTAD." Step 4: The display will show live vitals (HR, SpO2) and key suit telemetry (O2, Batt) for all EVA partners. Step 5: Partner status is color-coded: GREEN (Nominal), YELLOW (Warning), RED (Critical). Step 6: The display also includes a 3D radar minimap showing partner proximity, based on UWB positioning. Step 7: To check a specific partner, announce "AURA, focus EV-2 telemetry." Step 8: This will display EV-2's full data panel. Step 9: To check a biometric trend, announce "AURA, show me EV-2's heart rate over the last 10 minutes." Step 10: AURA will render a time-series graph. Step 11: To close the maximized display, announce "AURA, minimize TTAD." Step 12: Verify the display is minimized and your primary task overlays are restored.   

SECTION: DIGITAL TWIN CYCLE
Input: How do I package and uplink my daily logs for the Digital Twin? Output: Step 1: This procedure is initiated post-EVA from the habitat terminal. Step 2: Connect your EMU data port to the terminal. Step 3: Announce "AURA, initiate daily log packaging for Digital Twin uplink." Step 4: The onboard Space Side Orchestrator  is automatically triggered. Step 5: The workflow ingests all new logs from the /Triage directory. Step 6: AURA calculates a SHA256 checksum for the data package. Step 7: The local LLM analyzes the log and generates a criticality rating (0-10) and reasoning JSON. Step 8: The workflow compresses the log, checksum, and JSON into a single.zip package. Step 9: Based on the criticality rating (e.g., >= 7), the package is moved to /Sync_Critical or /Sync_NonCritical. Step 10: The Syncthing P2P tool  detects the new package and adds it to the uplink queue. Step 11: Verify on the AURA dashboard: "Package [filename] queued for DSN uplink." Step 12: The package will be transmitted automatically during the next scheduled communications window. Step 13: The Orchestrator cleans the /Triage directory, removing all files except the.zip. Step 14: Verify the /Triage directory is clean post-procedure.   

Input: Procedure for receiving and loading a new AI model update from Earth. Output: Step 1: The Earth Side Orchestrator  prepares and cryptographically signs a new AI model package. Step 2: After a DSN downlink, AURA dashboard will display "AI Model Update Received. Pending Verification." Step 3: This procedure must be run from a habitat terminal, not during an EVA. Step 4: Announce "AURA, begin AI model update verification." Step 5: The onboard system (Space Side Orchestrator) retrieves the package. Step 6: CRITICAL: AURA verifies the package's cryptographic signature using the onboard public key. Step 7: ABORT CRITERIA: If signature verification FAILED, AURA will report "CRITICAL: Model update signature mismatch. Deleting package." The procedure is terminated. Step 8: If signature is VALID, AURA will report "Model verified. Ready to install. Estimated downtime: 60 seconds." Step 9: Announce "AURA, confirm and install new AI model." Step 10: AURA will enter maintenance mode. All AR/Haptic features will be offline. Step 11: After reload, AURA will announce "System reload complete." Step 12: Verify the update: Announce "AURA, read current model version." Step 13: Confirm the new model version number matches the uplink manifest. Step 14: Log the model update event.   

SECTION: LEGAL & SAFETY GOVERNANCE
Input: What are the 'Go/No-Go' criteria for starting an EVA? Output: Step 1: This is the final checklist prior to airlock depressurization. Step 2: (CREW) Verify all EV crew are medically "Go" (no illness, fatigue < 2.0 on 5-pt scale). Step 3: (SUIT) Verify all EMUs are "Go": Suit pressure stable at 4.3 psi ; O2 > 95%; Battery > 100%; Coolant loop nominal; METOX canister cycle < 8 hours. Step 4: (SUIT) Verify EMU Leak Check PASSED (pressure drop <= 0.3 psi/min). This is a hard "No-Go." Step 5: (COMMS) Verify comms are "Go": "Loud and clear" on primary and backup channels. Step 6: (ENVIRONMENT) Verify environment is "Go": No active solar radiation storm alerts ; MMOD impact risk "Green"; target worksite is not in eclipse (unless planned). Step 7: (AURA) Verify AURA system is "Go": AR overlays aligned; TTAD receiving partner data; haptics nominal. Step 8: (FLIGHT RULES) Verify all governing Flight Rules (FRs) are "Go". Step 9: The EVA Director and Flight Controller must both verbally confirm "Go for EVA." Step 10: A "No-Go" on any CRITICAL item (Suit Pressure, Leak Check, Rad Storm) requires a full abort and waiver from the Flight Director. Step 11: Verify "Go" status is logged by AURA.   

Input: How do I execute a Human-in-Command override of an AURA recommendation? Output: Step 1: This procedure is governed by the "Human-in-Command" HCI principle. Step 2: AURA provides a recommendation (e.g., "ABORT: high metabolic rate detected"). Step 3: AURA will provide its reasoning (XAI): "Reason: Heart rate has exceeded 160 bpm for 3 minutes." Step 4: Assess this recommendation against your personal situational awareness (e.g., "I am performing a high-exertion task, this is expected"). Step 5: To initiate an override, state the clear, deterministic command: "AURA, override." Step 6: AURA will respond with a confirmation challenge: "Confirm override. You are assuming Human-in-Command authority for this action. This is a loggable event.". Step 7: State clearly: "Confirm override." Step 8: AURA will respond: "Override acknowledged. Human-in-Command protocol active for this event." Step 9: You MUST provide a verbal rationale for the incident log: "Override reason: Metabolic rate is high due to a temporary 300-ft-lb torque task. Situation is stable and expected." Step 10: AURA will log the override, the rationale, and all associated telemetry for post-incident review. Step 11: CRITICAL: You are now fully accountable for the consequences of this decision, as per Flight Rules. Step 12: AURA will suppress this specific alert for 15 minutes before re-evaluating. Step 13: Verify the alert is suppressed on the HUD.   

Input: Partner is incapacitated and not responding—what is the rescue procedure? Output: Step 1: CRITICAL: Announce "MAYDAY, MAYDAY, MAYDAY, partner incapacitated" on all channels. Step 2: If untethered, activate SAFER  and fly to partner. If tethered, pull tether to retrieve partner. Step 3: Secure partner: attach two (2) safety tethers from your suit to theirs. Step 4: Perform rapid buddy-check: Position partner to view their HUD or wrist gauge. Step 5: Read partner's suit pressure, O2 level, and biometric status. Announce all readings. Step 6: If suit pressure is < 3.0 psi, proceed to {1.01 EMERGENCY SUIT PRESSURE} actions on partner's suit. Step 7: If O2 is low, activate partner's OPS/emergency O2. Step 8: Manually operate partner's suit controls as needed. Step 9: Announce "ABORT, ABORT, ABORT. Returning to airlock with incapacitated partner." Step 10: Configure partner for travel: secure limbs, stow all tools. Step 11: Navigate to airlock, pulling partner. This is a high-exertion task; monitor your own metabolic rate. Step 12: On airlock ingress, pull partner in, then ingress yourself. Step 13: Close outer hatch and initiate CRITICAL emergency repressurization. Step 14: Once repressurized to 14.7 psi, open inner hatch and move partner into habitat for medical aid. Step 15: Verify partner is transferred to medical care.   

SECTION: TEAM COORDINATION
Input: How do I perform an EVA buddy check? Output: Step 1: This procedure is performed prior to airlock egress and at 60-minute intervals during EVA. Step 2: Announce "EV-1, initiating EV-2 buddy check." Step 3: Position yourself facing your partner (EV-2). Step 4: (HEAD) Visually inspect helmet and visor; check for fogging, ice, or scratches. Verify visor is locked. Step 5: (HUT) Visually inspect Hard Upper Torso. Verify all tethers are secure and routed correctly. Step 6: (DCM) Visually inspect Display and Controls Module. Verify no caution/warning lights. Read O2, H2O, and Battery percentages aloud. Step 7: (ARMS) Visually inspect arm and glove seals. Verify wrist rings are locked. Step 8: (LEGS) Visually inspect Lower Torso Assembly. Verify no tears in TMG. Step 9: (PLSS) Visually inspect PLSS backpack. Verify no ice on sublimator, antennas are secure. Step 10: (SAFER) Verify SAFER pack is secure and hand controller is stowed. Step 11: Announce "EV-2, your check is complete. You are Go." Step 12: Partner (EV-2) repeats steps 2-11 for EV-1. Step 13: ABORT CRITERIA: If any critical seal (helmet, wrist) is not secure, or C&W light is on, return to airlock. Step 14: Verify check is complete and log "Buddy Check" in AURA.   

Input: Procedure for post-incident debrief logging. Output: Step 1: This procedure follows any "Warning" or "Critical" event (e.g., suit leak, high CO2, partner incapacitation). Step 2: This procedure is typically performed post-EVA inside the habitat. Step 3: Announce "AURA, open new incident log for post-incident review." Step 4: AURA will load the telemetry from the incident (e.g., "14:32:15 GMT - SUIT PRESSURE LOW"). Step 5: Provide a verbal narrative of the incident from your perspective. Step 6: AURA will transcribe your narrative and attach it to the log. Step 7: State the root cause, if known (e.g., "Root cause was MMOD impact on right thigh"). Step 8: State the actions taken (e.g., "Actions taken were suit patch and immediate abort"). Step 9: State the effectiveness of the response (e.g., "Patch was effective, pressure stabilized at 4.0 psi"). Step 10: State any lessons learned or procedural gaps. Step 11: State any equipment that needs to be grounded (e.g., "EMU S/N 105 is No-Go for EVA pending TMG repair"). Step 12: Announce "AURA, save and close incident log." Step 13: AURA will package this log for the Digital Twin uplink. Step 14: Verify the log is marked "CRITICAL" in the uplink queue.   

SECTION: POWER & ENERGY
  
Input: How do I perform non-essential load shedding? Output: Step 1: This procedure is used during a low-battery state (e.g., < 25%) or as part of an emergency (e.g., {1.04 SUIT O2 CRITICAL}). Step 2: Announce "AURA, initiating manual load shed." Step 3: AURA will display the Load Priority Table. Step 4: Priority 1 (CRITICAL) and Priority 2 (CRITICAL) loads (Life Support, Comms) cannot be shed. Step 5: Manually power down Priority 7 (ENHANCED) loads: disable all non-essential science AR overlays. Step 6: Manually power down Priority 6 (TASK) loads: power off PGT and all other tools. Step 7: Verify on HUD that Priority 6 and 7 loads are "OFF." Step 8: Manually power down Priority 5 (SAFETY) loads: set glove heaters to "OFF." Step 9: ABORT CRITERIA: If in thermal eclipse or hand temperature is < 10 deg C, do not shed glove heaters. Step 10: Manually power down Priority 4 (SAFETY) loads: set suit core heaters to "MIN" or "OFF." Step 11: ABORT CRITERIA: If core temp is < 36 deg C, do not shed core heaters. Step 12: Manually power down Priority 3 (MISSION) loads: command "AURA, engage minimal UI mode." This will reduce AI compute load. Step 13: Verify all non-essential loads are shed. Step 14: AURA will recalculate "Time-to-Empty" (TTE) based on the new, lower power draw. Step 15: Announce new TTE to partner and proceed with mission or abort as required.   


nasa.gov
EVA-EXP-0042 EXPLORATION EVA SYSTEM CONCEPT OF OPERATIONS - NASA
Opens in a new window

nasa.gov
WOTM-Oxygen Purge System - NASA
Opens in a new window

youth-power.net
What Is A Load Shedding Battery? The Complete Guide For Homeowners - YouthPOWER
Opens in a new window

qmerit.com
Load Shedding Can Be a Viable Panel Upgrade Alternative for EV Charging | Qmerit
Opens in a new window

nasa.gov
Mars Mission Abort Considerations | NASA
Opens in a new window

ntrs.nasa.gov
Lunar Dust Mitigation: A Guide and Reference - NASA Technical Reports Server (NTRS)
Opens in a new window

ntrs.nasa.gov
Spacesuit Guidebook - NASA Technical Reports Server (NTRS)
Opens in a new window

nasa.gov
Volume 1 of the Apollo 14 EMU Handbook - NASA
Opens in a new window

stao.ca
Donning the Spacesuit
Opens in a new window

lpi.usra.edu
nasa extravehicular mobility unit (emu) lss/ssa data book
Opens in a new window

space.stackexchange.com
What's the normal leakage rate for a space suit? - Space Exploration Stack Exchange
Opens in a new window

nasa.gov
OCHMO-TB-037 Decompression Sickness (DCS) - Executive ...
Opens in a new window

en.wikipedia.org
Quest Joint Airlock - Wikipedia
Opens in a new window

scribd.com
NASA ISS EVA Systems Checklist | PDF | Extravehicular Activity - Scribd
Opens in a new window

nasa.gov
5.4 Extravehicular Activities - NASA
Opens in a new window

ntrs.nasa.gov
Self-rescue strategies for EVA crewmembers equipped with the SAFER backpack - NASA Technical Reports Server (NTRS)
Opens in a new window

reddit.com
What is the protocol if an astronaut gets loose during a tethered spacewalk? - Reddit
Opens in a new window

en.wikipedia.org
Simplified Aid For EVA Rescue - Wikipedia
Opens in a new window

cs.toronto.edu
Extended Example: Simpli ed Aid for EVA Rescue (SAFER)
Opens in a new window

ntrs.nasa.gov
Extravehicular Activity (EVA) Hardware & Operations Overview
Opens in a new window

ntrs.nasa.gov
Failure Analysis Results and Corrective Actions Implemented for the Extravehicular Mobility Unit 3011 Water in the Helmet Mishap
Opens in a new window

sma.nasa.gov
Extravehicular Mobility Unit (EMU) / International Space Station (ISS) Coolant Loop Failure and Recovery - Sma.nasa.gov.
Opens in a new window

researchgate.net
Rapid cycling CO 2 and H 2 O removal system for EMU - ResearchGate
Opens in a new window

ttu-ir.tdl.org
EMU METOX Performance Testing
Opens in a new window

ntrs.nasa.gov
RAPID CYCLING CO2 and H2O REMOVAL SYSTEM for EMU
Opens in a new window

ntrs.nasa.gov
MANAGEMENT OF THE POST-SHUTTLE EXTRAVEHICULAR MOBILITY UNIT (EMU) WATER CIRCUITS
Opens in a new window

ntrs.nasa.gov
Status of the Redesign of the Extravehicular Mobility Unit Airlock Cooling Loop Recovery Assembly
Opens in a new window

globalfilter.com
How to Change Out Filter Cartridges, Properly and Safely
Opens in a new window

youtube.com
How To Replace Pool Cartridge Filter - YouTube
Opens in a new window

ntrs.nasa.gov
Extravehicular Activity (EVA) Hardware & Operations Overview
Opens in a new window

standards.nasa.gov
MSFC-STD-486B - NASA Standards
Opens in a new window

nasa.gov
REQUIREMENTS FOR THREADED FASTENING SYSTEMS IN SPACEFLIGHT HARDWARE - NASA
Opens in a new window

ntrs.nasa.gov
EVA Swab Kit: Tools and Techniques for Collecting Aseptic Samples ...
Opens in a new window

ntrs.nasa.gov
ISS External Microorganisms: Tools and Techniques for Collecting Planetary Protection Samples During Extravehicular Activity
Opens in a new window

ntrs.nasa.gov
ISS External Microorganisms: Collecting Planetary Protection Samples During Extravehicular Activity - NASA Technical Reports Server (NTRS)
Opens in a new window

ntrs.nasa.gov
EVA Swab Tool to Support Planetary Protection and Astrobiology Evaluations - NASA Technical Reports Server
Opens in a new window

ntrs.nasa.gov
EXTRAVEHICULAR ACTIVITY AND HUMAN SURFACE MOBILITY PROGRAM (EHP) EXPLORATION EVA (XEVA) SYSTEM COMPATIBILITY STANDARDS
Opens in a new window

en.wikipedia.org
Extravehicular Mobility Unit - Wikipedia
Opens in a new window

budgetlightforum.com
Help with making a battery pack for heated gloves? - BudgetLightForum.com
Opens in a new window

deepblue.lib.umich.edu
Mitigation and Prevention of Lunar Dust on NASA Artemis xEMU Spacesuits - Deep Blue Repositories
Opens in a new window

www3.nd.edu
Apollo Dust Lessons Learned For Artemis
Opens in a new window

werc.nmsu.edu
Task 4. Request for Proposals: Life Support Systems: Dust Mitigation in Lunar Habitats
Opens in a new window

lpi.usra.edu
Evidence Report: RISK OF INJURY AND COMPROMISED PERFORMANCE DUE TO EVA OPERATIONS - Lunar and Planetary Institute
Opens in a new window

sae.org
Micrometeoroid Penetration Hazards Assessment for the Shuttle EMU 1999-01-1963
Opens in a new window

srag.jsc.nasa.gov
How do we protect the astronauts from space radiation?
Opens in a new window

newspaceeconomy.ca
NASA's ISS Procedures: Responding to Space Weather – New ...
Opens in a new window

newspaceeconomy.ca
Opens in a new window

ntrs.nasa.gov
RadWorks Storm Shelter Design for Solar Particle Event Shielding
Opens in a new window


Team PlusTwo 18ISC_Submission.pdf

newspaceeconomy.ca
ISS Procedures for an Incapacitated Astronaut During an EVA - New ...
Opens in a new window

ntrs.nasa.gov
EVA Operations - NASA Technical Reports Server
Opens in a new window

nodis3.gsfc.nasa.gov
NPR 8705.2B Human-Rating Requirements for Space Systems (w/change 4 dated 8/21/2012) - NODIS Library - NASA
Opens in a new window

faa.gov
Recommended Practices for Human Space Flight Occupant Safety - Federal Aviation Administration
Opens in a new window

cybereason.com
A Guide to Post-Incident Review - Cybereason
Opens in a new window

evalian.co.uk
What should you do after a cyber security incident? - Evalian
Opens in a new window

researchgate.net
Real-time emergency load shedding for power system transient stability control: A risk-averse deep learning method | Request PDF - ResearchGate
Opens in a new window

Radiation storm shelter-in-place

Thresholds: dosimeter µSv/h or RAD monitor levels; time-to-shelter ≤5 min; confirm storm shelter ingress, shielding layers, comms minimal mode, end-of-storm verification.

Lunar/Mars thermal transition

Shadow→sun and sun→shadow: rate of temp rise, visor and heater sequencing, material expansion cautions, glove heater priority, “ABORT if skin temp >38.5°C or LCG outlet >50°F for >2 min”.

MMOD suspected impact

Audible/visual cues, quadrant inspection order, patch decision tree, “if pressure drop >0.2 psi/10 s, ABORT and return”.

Tether failure vs tool tether failure

Self‑recovery without SAFER; with SAFER fuel budgeting (e.g., ≤25% for return), vector sequence, approach to structure.

IPS/UWB positioning outage

Fallback nav via sun azimuth + dead‑reckon pacing; timed-waypoint method; “If visibility <50 m and bearing uncertainty >30°, shelter and beacon”.

Repressurization anomaly

Gauge oscillation, stuck valve, leak-back; isolation steps; “ABORT repress, hold at 5 psi, re-run seal checks”.

CO2 trend-based swap

Not just cartridge swap: trend rate-of-rise thresholds (e.g., >2 mmHg/5 min), earlier swap policy during high workload.

Tool jam / stripped fastener

RPM ceilings, back-out method, heat/cool cycling before retry, “ABORT tool use if handle torque >0.8 N·m”.

Night/low-viz EVA protocol

Breadcrumb logging cadence, light discipline, buddy spacing, “if line-of-sight lost >30 s, pause and re-establish”.

Rescue triangle for partner down

Role assignment: caller, stabilizer, navigator; drag vs carry in low‑g; O2 sharing decision rule.

Completeness gaps by domain

Power triage trees

Battery <15% branches: which subsystems to shed in order; haptics vs heaters trade; UI minimal mode trigger.

Haptic cues legend

AURA‑specific mapping (e.g., rapid triple = CRITICAL, long pulse = torque overlimit, left/right bias = path correction).

Auto-Dashboarding thresholds

Concrete HR/HRV/BP triggers; suppression windows; restoration conditions; “no-suppress” list for life‑critical alarms.

Translation subsystem failover

If ASR confidence <85% during critical tasks, switch to canned callouts; revert conditions.

Digital Twin failure paths

If checksum mismatch or signature invalid on downlink, quarantine model, revert to last-known-good; operator steps.

Logging schema

Minimal fields every Output should instruct: UTC time, event code, thresholds crossed, action taken, verification result.