---
title: BrickPickNPlace
summary: "The perception node for a UR3e that builds LEGO figures: it finds and classifies the bricks on the table, and works out where on the plate the next one can legally go."
# TODO: dates. Which semester was Robotics Studio 2? The grid sorts on these,
# and the entry cannot publish without them.
# startDate: 2026-0?-01
# endDate: 2026-0?-01
tags:
  - robotics
tools:
  - Python
  - ROS 2 Humble
  - OpenCV
  - pyrealsense2
  - NumPy
  - Intel RealSense D435i
  - Universal Robots UR3e
links:
  - label: Source Code
    url: https://github.com/danish-silva/BrickPickNPlace
# TODO: the annotated detection image the node already publishes is the ideal
# cover, since it shows detection and the build-zone grid in one frame.
# cover:
#   src: ./cover.png
#   alt: Annotated camera frame showing detected bricks, the build-zone grid and free placement slots
# gallery:
#   - src: ./detection.png
#     alt: Detected bricks with colour labels, bounding boxes and confidence scores
#     caption: Shape matching and stud verification on the pickup side.
#   - src: ./build-zone.png
#     alt: The 12 by 14 stud grid with occupied studs marked and legal slots highlighted
#     caption: Occupancy and the legal 4 by 2 slots found by the sliding window.
# video:
#   src: /media/brickpicknplace/cycle.mp4
#   caption: One full pick and place cycle.
order: 30
draft: true
---

## The Problem

Robotics Studio 2 set the task: a UR3e fitted with a parallel-jaw gripper picks LEGO bricks off a table and assembles a requested figure on a base plate, sorting them by colour or by size. The pattern is chosen from a desktop interface or spoken aloud, and the arm works through it a brick at a time.

Perception has to answer two questions, and only one of them is object detection. The first is what is on the table: which bricks, what colour, what size, and where each one sits in three dimensions. The second is harder and less obvious. Given the plate as it currently stands, where can the next brick legally go? A pick is worth nothing if the arm has nowhere valid to put the piece, so the node has to reason about the plate as a grid of occupied and free positions, not just recognise objects.

## My Role

A team of four. I was solely responsible for the perception and mapping node and the calibration it depends on. The other three owned motion planning through MoveIt Task Constructor, the interaction state machine and its interface, and the voice control.

## Technical Approach

Detection starts with HSV segmentation into colour masks, one per supported colour. White is deliberately absent from those ranges, because the work surface is white and including it would turn the table itself into a candidate. Contours from each mask are then validated against a table of known brick variants on two independent measures, aspect ratio and real-world size, so a 4 by 2 brick at 100 by 50 millimetres is distinguished from a 3 by 2 at 75 by 50 rather than both passing as generic rectangles.

Anything that survives that gets checked for studs. HoughCircles looks inside the candidate for the circles a real brick would show, expecting about eight of them at the known 25 millimetre pitch. The two tests then combine into a single confidence: shape agreement contributes up to 0.65, reduced by how far the aspect ratio and size are from the variant it matched, and stud verification adds up to 0.35 scaled by how many of the eight studs were actually found. A rectangle of the right size and colour with no studs on it never reaches a usable score, which is the point.

Pose comes from the contour moments and the oriented bounding box, with yaw taken from the box angle. Depth is the median of a 21 by 21 pixel window rather than a single reading, because the D435i is noisy enough that one pixel is not worth trusting.

The build-zone half works on a grid instead. The plate is 12 columns by 14 rows, 168 studs at a 25 millimetre pitch, interpolated between two corners fixed during calibration. Each detected brick's oriented box is tested against every stud position to mark it occupied, and then a 4 by 2 window slides across the grid in both orientations. A slot counts as legal only when its own eight studs are free and the single-stud ring around it is free too, or falls outside the plate. That ring is what stops the gripper fouling a brick already placed next to the target.

The node publishes on a trigger rather than streaming. It waits for an empty message, captures five frames, and publishes the best of them, so the arm acts on one settled picture of the table instead of chasing a feed that changes underneath it. Those results are latched, which means a node that subscribes late still receives the most recent snapshot straight away rather than blocking until the next trigger. Everything goes out in the camera optical frame, and the interaction node transforms it into the robot base frame.

Calibration is two interactive steps, saved to disk so it survives a restart. Drag a rectangle around the working area to set the region of interest and sample the surface depth inside it, then click the top-left and bottom-right stud centres of the plate, from which all 168 stud positions are interpolated.

## Outcome and What I Would Do Differently

<!-- TODO: did it run end to end on the real arm, and how reliably did detection hold up in the lab? Any figure at all beats an adjective here. -->

The limitations I would fix first are all in the calibration and the slot search. Registering the grid from two clicked corners assumes the plate is square to the camera, so an oblique plate has to be physically straightened rather than corrected in software; taking four corners instead and solving a perspective transform would remove that constraint entirely. Stud verification degrades past roughly thirty degrees of camera obliquity, where studs project as ellipses and the circle detector stops finding them, which is the same problem from the other direction. The slot search also only ever looks for 4 by 2 footprints, so a plate holding mixed brick sizes cannot be planned properly until the window generalises to the variant table the detector already carries.
