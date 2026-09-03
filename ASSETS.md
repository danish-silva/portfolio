# Asset inventory

Every image, render, screenshot, diagram and video the site implies, with where it goes and what it is blocked on. Update the status column as things land.

Status values:

- `exists`: the file already exists somewhere, it just needs to be found, cropped and dropped in
- `generate`: Claude can produce it in this repo with no outside access (diagrams as inline SVG, the favicon, the OG image)
- `regenerate`: you can produce it at home by re-running code or software you already have
- `photograph`: needs a phone camera and the physical object
- `lab`: needs UTS lab access, a UR3e booking, or both
- `software`: needs a licensed tool that may not be installed at home (Altium, SolidWorks, MATLAB)
- `confirm`: I do not know whether it exists; tell me

Priority:

- `launch`: the site should not go live without it
- `strong`: noticeably improves the project; worth chasing
- `nice`: only if cheap

Empty slots render as a clearly labelled bordered box until the asset arrives, so a missing `strong` or `nice` item never blocks a build.

Where files go:

- Project images: `src/content/projects/<slug>/` beside `index.md`, referenced as `./filename.png`. Astro optimises these at build.
- Project videos: `public/media/<slug>/`, referenced as `/media/<slug>/filename.mp4`. Keep each under about 10 MB, H.264, no audio unless the audio matters.
- Site-wide files: `public/`.

---

## Site-wide

| Asset | Where | Status | Priority | Notes |
| --- | --- | --- | --- | --- |
| Resume PDF | `public/Danish-Silva-Resume.pdf` | exists | launch | `Documents/Jobs/Resume_DanishSilva.pdf`. Fix "Adapability", "June 2024" and the em dash before copying it in. |
| Favicon | `public/favicon.svg` | generate | launch | Initials mark unless you want something else. |
| Open Graph image, 1200 by 630 | `public/og-default.png` | generate | launch | Name, tagline, location on a plain background. Shows when the link is shared on LinkedIn. |
| Hero portrait | `src/assets/portrait.jpg` | photograph | nice | Optional. The hero works without one. If included: plain background, shoulders up, square crop. |
| Background gradient | n/a | done | launch | No asset needed. The background is rendered live by @shadergradient/react; its settings live in `src/data/background.ts`. |

## Experience

No images planned. The Optik Consultancy entry is text only, and anything showing the Sensear test rig would need employer sign-off first, so it is out of scope until you have that in writing.

---

## Projects

### UR3e RealSense Visual Servoing

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: UR3e with the RealSense D435 mounted on the tool | exists | launch | A still pulled from your footage is fine. Drop it beside `src/content/projects/ur3e-realsense-visual-servoing/index.md` as `cover.jpg` and uncomment the `cover` block. |
| Demo video: arm tracking a moving checkerboard | exists | strong | You have footage and are uploading it. Put it at `public/media/ur3e-realsense-visual-servoing/demo.mp4`, under about 10 MB, and uncomment the `video` block. The most convincing asset on the site. |
| Screenshot: OpenCV checkerboard detection overlay with depth readout | confirm | strong | Regenerable from a saved rosbag or recorded frames if you have them, otherwise `lab`. |
| Diagram: IBVS pipeline, camera to detection to image error to interaction matrix to Jacobian pseudoinverse to joint velocities | generate | strong | Inline SVG, no access needed. |
| Screenshot: ROS node graph or rosbridge terminal at 15 to 20 Hz | confirm | nice | Only if a screenshot already exists. |

### MEMS-Based Step Tracker PCB

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: Altium 3D render of the assembled shield | software | launch | Altium Designer, View 3D, export PNG on a white or dark background. If you have the fabricated board, a photo can stand in. |
| Photo: fabricated and assembled board | photograph or confirm | strong | Do you have the physical board? |
| Schematic crop: 3.3 V LDO regulation with OCP and OVP | software | strong | Altium schematic export, cropped to the PSU section. This is the part you owned, so it deserves its own image. |
| Plot: LTspice simulation showing current draw and protection threshold behaviour | regenerate or confirm | strong | LTspice is free; needs the .asc file. |
| Layout screenshot: full board, top and bottom layers | software | nice | Altium 2D layout export. |
| Diagram: board block diagram showing PSU, ESP32, accelerometer, signal conditioning, peripherals | generate | nice | Inline SVG. |

### BrickPickNPlace

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: UR3e over the brick work area | lab or confirm | launch | Any clean photo from the project if one exists. |
| Screenshots: vision pipeline stages, raw frame, HSV mask, HoughCircles stud detection, slot detection | confirm | strong | Regenerable from saved frames if you kept any; otherwise `lab`. Three or four small images in a row tell the whole story. |
| Demo video: a full pick and place cycle | lab or confirm | strong | Same note as visual servoing: if it was recorded during the unit, it is `exists`. |
| Diagram: ROS 2 node layout showing where the vision subsystem sits | generate | nice | Inline SVG. |

### Pitwall

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: frame of the trained agent on the CarRacing track | regenerate | launch | Run the saved model, screenshot. |
| Video or GIF: agent completing a lap | regenerate | strong | `gymnasium` render to frames, encode with ffmpeg. Keep under 10 MB. |
| Plot: episode reward over training, ideally showing the curriculum stage boundaries | regenerate or confirm | strong | From TensorBoard logs or the SB3 monitor CSV, if they were kept. |
| Diagram: curriculum stages and save-state injection | generate | nice | Inline SVG. |

### Separately Excited DC Motor Drive Simulation

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: plot of speed, armature current and torque against time through soft start, field weakening and regenerative braking | regenerate | launch | Re-run the MATLAB script, export PNG at 2x. This is the natural cover for a simulation project. |
| Diagram: separately excited DC motor equivalent circuit | generate | nice | Inline SVG. |
| Plot: each mode separately if the combined plot is too busy | regenerate | nice | |

### ESP32 Spotify Player

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: finished player in its enclosure, screen on | photograph | launch | You own it. Natural light, plain surface, landscape. |
| Photo: internals, ESP32, DAC, display and touch wiring | photograph | strong | |
| Render: SolidWorks enclosure | software | strong | If you still have the model. A screenshot of the assembly view is enough. |
| Photo: print on the Bambu bed or the printed parts before assembly | photograph or confirm | nice | |
| Video: touch input changing tracks, display updating | photograph | strong | 10 to 20 seconds on a phone. |

---

## Things that need lead time

These are the items where waiting until week six would hurt. Everything else can be done at a desk.

1. **Robot lab booking** for the visual servoing and BrickPickNPlace covers, and for demo videos if none were recorded during the units. One session covers both projects.
2. **Altium access** for the step tracker 3D render, schematic crop and layout export. Three exports in one sitting.
3. **SolidWorks access** for the Spotify player enclosure render, if the model still exists.
4. **Find out what already exists.** Before booking anything, check your phone, the unit submission folders and any group chats for videos and photos from the UR3e units. Anything found there moves from `lab` to `exists` and may make the booking unnecessary.

## Launch minimum

The site can go live with: resume PDF, favicon, OG image, and one cover per published project. Nothing else on this list blocks launch.
