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

### MEMS-Based Step Tracker

Done. Cover, five gallery images and the system datasheet are all in.

| Asset | Status | Notes |
| --- | --- | --- |
| Cover: Altium 3D render | done | `cover.jpg` |
| Power schematic | done | `power_schematic.png` |
| Filter schematic | done | `filter_schematic.png` |
| PCB layout | done | `pcb_routing.png` |
| Assembled board on the dev board | done | `device_out_of_enclosure.png` |
| Finished device, OLED live | done | `device_in_enclosure.png` |
| System datasheet | done | `public/docs/mems-step-tracker-datasheet.pdf`, linked from the project |
| Plot: LTspice thresholds | missing | Simulation no longer held. The writeup stands without it. |

### BrickPickNPlace

Done. Stills sit in `src/content/projects/brickpicknplace/` beside `index.md`; clips sit in `public/media/brickpicknplace/`.

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: annotated detection frame | done | launch | `cover.png`. Two bricks labelled, verified, over the build-zone grid. |
| Photo: the physical setup | done | nice | `ur3e_image.jpg`. Portrait, so it fills about half the 3:2 frame and the rest is a blurred backdrop. A landscape shot would fill it properly. |
| Screenshot: pre-calibration frame | done | strong | `bricks_placed_snapshot.png`. |
| Video: one full pick and place cycle | done | strong | `demo.mp4`, 42s. Portrait 360x640, so it also only fills part of the frame. Two lab-mates are recognisable in the background, worth a thought before this is public. |
| Video: first iteration | done | nice | `first_iteration.mp4`, 16s. Re-encoded from 27.9 MiB to 1.4 MiB and cropped to the detector window. |
| Screenshot: second setup | done | nice | `rosbag_image_setup2.png`. Still 4:3 rather than 3:2. |

### Pitwall

Done. Stills sit in `src/content/projects/pitwall-rl/` beside `index.md`; the clip sits in `public/media/pitwall-rl/`.

| Asset | Status | Priority | Notes |
| --- | --- | --- | --- |
| Cover: title card | done | launch | `cover.png`, 900x600, exactly the 3:2 the carousel frames at. A frame of the agent driving would say more to a recruiter than a wordmark, if you would rather swap it. |
| Screenshot: the environment | done | strong | `on_track.png`. The pygame window title bar was cropped off. |
| Video: the trained policy driving | done | strong | `training.mp4`, 2m31s. Re-encoded from 159 MiB to 10 MiB, cropped to the pygame window, silent lead-in trimmed, audio dropped. |
| Plot: racing line over track geometry | still missing | nice | The writeup calls this the tool that made the bad behaviour visible, and it is the one asset that would show it. Regenerating it from a saved checkpoint is the cheapest strong addition left. |
| Plot: tyre wear against distance | still missing | nice | Wear across a race with lap boundaries and the pit stop marked. The economic half of the project has no image at all right now. |

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

1. **Robot lab booking** for the visual servoing cover, and for demo videos if none were recorded during the units.
2. **Altium access** for the step tracker 3D render, schematic crop and layout export. Three exports in one sitting.
3. **SolidWorks access** for the Spotify player enclosure render, if the model still exists.
4. **Find out what already exists.** Before booking anything, check your phone, the unit submission folders and any group chats for videos and photos from the UR3e units. Anything found there moves from `lab` to `exists` and may make the booking unnecessary.

## Launch minimum

The site can go live with: resume PDF, favicon, OG image, and one cover per published project. Nothing else on this list blocks launch.
