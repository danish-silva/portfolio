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
| Resume PDF | `public/Danish-Silva-Resume.pdf` | done | launch | In place, with the typo, date format and em dash corrected. |
| Favicon | `public/favicon.svg` | generate | launch | Initials mark unless you want something else. |
| Open Graph image, 1200 by 630 | `public/og-default.png` | generate | launch | Name, tagline, location on a plain background. Shows when the link is shared on LinkedIn. Absolute URLs resolve against `https://danishsilva.com`, now set in the Astro config. |
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

Written up. Files go in `src/content/projects/mems-step-tracker-pcb/`, beside `index.md`.

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: Altium 3D render or a photo of the assembled shield | exists | launch | You have both. Pick whichever reads better small; the render is usually cleaner as a card cover. |
| Schematic crop: 3.3V regulator with over-current and over-voltage protection | exists | strong | The part you owned, and the part the writeup spends most time on. Crop to the PSU section rather than exporting the whole sheet. |
| Photo: fabricated board seated on the ESP32 dev board | exists | strong | Shows the size constraint the whole project turned on, which no render conveys. |
| Plot: LTspice current draw and protection thresholds | missing | nice | You no longer have the simulation. Only worth redoing if you happen to rebuild the model; the writeup stands without it. |
| Photo: OLED showing a live step count | photograph | strong | You have the board. A shot of the menu or a step count on the display is the one asset that proves the firmware runs, which no render or schematic can do. |
| Layout screenshot: top and bottom copper | software | nice | Altium 2D export, if you want to show the routing you did. |

### BrickPickNPlace

Written up. Files go in `src/content/projects/brickpicknplace/`, beside `index.md`.

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: annotated detection frame | regenerate | launch | Your node already publishes exactly this on `detection_image`: boxes, the build-zone perimeter, studs and legal slots in one frame. Run it in continuous mode and grab the window. No lab booking needed if you have a bag or any recorded frames. |
| Screenshot: detection with colour labels and confidence | regenerate | strong | Same source, cropped to the pickup side. Shows the shape and stud tests doing their work. |
| Screenshot: build-zone grid with occupancy and free slots | regenerate | strong | The half of the node that is not object detection, and the harder half. Worth its own image. |
| Video: one full pick and place cycle | lab or confirm | strong | Needs the arm. Check your phone and the unit submission folder first. |
| Photo: the physical setup, arm, overhead camera, plate | lab or confirm | nice | Gives the reader the scale and the camera geometry the writeup describes. |

### Pitwall

Written up. Files go in `src/content/projects/pitwall-rl/`, beside `index.md`; the video goes in `public/media/pitwall-rl/`.

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: the agent mid-lap on the track | regenerate | launch | Run a saved checkpoint and screenshot a frame. Pick one where the car is clearly on the racing line. |
| Video: one completed lap | regenerate | strong | The evaluation harness already renders rollouts. 15 to 30 seconds, under 10 MB, no audio needed. This is the asset that proves the agent drives. |
| Plot: racing line over the track geometry | regenerate | strong | Your own evaluation tooling produces this, and the writeup names it as the tool that exposed the spin-in-place failure, so it earns its place. |
| Plot: tyre wear across a race with lap boundaries | regenerate | strong | Also produced by the evaluation harness. Shows the wear model driving the decision. |
| Plot: reward curve from TensorBoard | regenerate | nice | Only worth including if it shows the shift after the reward redesign; a smooth curve on its own says little. |

### FireRed RL Agent

Written up. Files go in `src/content/projects/firered-rl-agent/`, beside `index.md`.

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: TensorBoard per-component reward breakdown | regenerate | launch | The one asset that carries this project, because it is the evidence the reward function works. Re-run a short training job or open an existing log. |
| Plot: unique tiles and distinct maps over training steps | regenerate | strong | Exploration climbing is the specific claim the writeup makes. This is the picture of it. |
| Video: a short rollout of the agent playing | regenerate | nice | A smoke-test run is enough. Do not include game audio, and keep it brief. |

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
