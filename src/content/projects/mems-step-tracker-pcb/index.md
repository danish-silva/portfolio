---
title: MEMS-Based Step Tracker
summary: "A wrist-worn step tracker built end to end: a custom ESP32 shield sized to the dev board it plugs into, and the firmware that turns three analogue axes into a step count."
startDate: 2026-02-01
endDate: 2026-06-01
tags:
  - embedded
  - pcb
tools:
  - Altium Designer
  - LTspice
  - C++
  - PlatformIO
  - ESP32
  - ADXL335
  - Altium 365
links:
  - label: Firmware
    url: https://github.com/danish-silva/StepTracker
# The Altium 365 workspace link redirects to a sign-in page, so anyone without
# a UTS account hits a login wall. Publish the design to a public share link
# from Altium 365 and add it here as a second entry labelled Hardware.
#   - label: Hardware
#     url: https://university-of-technology-sydney-faculty-of-engineering-2.365.altium.com/designs/4C01074D-5049-47C3-92B1-7BAC2B0305B6
# TODO: you have the board, an Altium 3D render and a schematic export. Drop
# them beside this file and uncomment. Cover should be the render or a photo
# of the assembled board.
# cover:
#   src: ./cover.png
#   alt: The assembled ESP32 shield, seen from above
# gallery:
#   - src: ./schematic-psu.png
#     alt: Schematic of the 3.3V regulator with over-current and over-voltage protection
#     caption: The power supply section, with both protection circuits.
#   - src: ./board.jpg
#     alt: The fabricated shield soldered and plugged onto the ESP32 dev board
#     caption: Assembled and seated on the dev board it was sized around.
order: 20
draft: false
---

## The Problem

Embedded Mechatronics Studio set the brief: build a step tracker around an ADXL335 accelerometer. The unit suggested an Arduino as the microcontroller. I used an ESP32 instead and designed a shield that plugs straight onto the dev board, because the smaller assembly is the only version of this that makes sense worn on a wrist.

That decision set the real constraint. The shield had to stay inside the outline of the ESP32 dev board while carrying a complete power supply, three analogue filter channels, the accelerometer connector and the remaining peripherals. Almost every layout decision after that came out of the area budget.

## My Role

A team project. I owned the power supply design and picked up the analogue filter design as well when that work stalled. All of the PCB routing was mine, along with the board file itself, the assembly and soldering of the finished unit, and the firmware it runs.

## Technical Approach

Power is a 3.3V LDO regulator with over-current and over-voltage protection built around it. I modelled the regulator and both protection circuits in LTspice before committing to fabrication, checking the current the board would actually draw and confirming the protection tripped at the thresholds I had designed for rather than somewhere near them.

The ADXL335 puts out three analogue channels, one per axis, so the front end is three matching signal conditioning filters. Each sets the gain the ADC needs and rolls off above 50 Hz, comfortably clear of the one to three hertz a walking step produces while keeping higher frequency noise out of the band that matters.

The rest of the board was integration. Subsystems came from different people, so the schematic had to reconcile them: separating the power domains so the supply and analogue sections did not share a return path, keeping the filter traces short and away from noisy nets, and placing every component so the whole thing still fitted the dev board outline.

The firmware is C++ on the Arduino framework, built with PlatformIO. Rather than trusting any single axis it works from the magnitude of the acceleration vector, so the reading holds up when the wrist rotates. Gravity is removed with an exponential moving average, which tracks the slowly varying component and leaves the movement behind, and the result is smoothed before detection. A step is a peak above a threshold with hysteresis, so one step cannot be counted twice while the signal wobbles around the trigger point, and the timing between peaks gives a cadence, which is what separates idle from walking from running.

Calibration runs on the device rather than being baked in. It walks the user through holding each axis at plus and minus one g, then derives that axis's zero point and sensitivity from the two readings, which is what makes the magnitude figure trustworthy from one board to the next. The menu runs on an OLED driven over I2C with a rotary encoder for input, and both are peripherals the shield had to find room for inside the same outline.

## Outcome and What I Would Do Differently

The board was fabricated, assembled and worked as designed, and the project was graded a High Distinction. The protection behaved on the bench the way LTspice said it would, and the measured filter gain and 50 Hz corner matched the values I had calculated.

The mistake worth recording is in the pin assignment. I chose the ESP32 for its Wi-Fi, intending to serve a small phone app showing a live step count. I routed the filter outputs into ADC2, and on the ESP32 the Wi-Fi radio claims ADC2 for itself, so those channels cannot be read while the radio is running. Counting steps and serving the app at the same time was impossible on the board as built. Moving the three channels to ADC1 would have cost nothing at design time. I now check what a peripheral shares silicon with before assigning a pin, rather than after.
