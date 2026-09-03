---
title: FireRed RL Agent
summary: "A reinforcement learning agent that plays Pokémon FireRed from pixels, with the reward read out of the game's memory rather than off the screen."
# TODO: dates. Roughly which months did you work on this? The grid sorts on
# them and the entry cannot publish without them.
# startDate: 2026-0?-01
# endDate: 2026-0?-01
tags:
  - machine-learning
tools:
  - Python
  - PyTorch
  - Stable Baselines3
  - stable-retro
  - Gymnasium
  - TensorBoard
  - CUDA
links:
  - label: Source Code
    url: https://github.com/danish-silva/FireRedRLAgent
# TODO: the TensorBoard reward breakdown is the asset that carries this one,
# since it is the evidence the reward function works.
# cover:
#   src: ./cover.png
#   alt: TensorBoard showing the per-component reward breakdown during a training run
# gallery:
#   - src: ./exploration.png
#     alt: Unique tiles visited and distinct maps explored rising over training steps
#     caption: Exploration climbing, which is the reward doing its job.
# video:
#   src: /media/firered-rl-agent/rollout.mp4
#   caption: The agent moving through the opening area under its own policy.
order: 15
draft: true
---

## The Problem

This one came after Pitwall, as a personal project, to try reinforcement learning somewhere the reward is not handed to you. CarRacing pays the agent for progress on almost every frame. A role-playing game pays it for almost nothing across hours of play, and the target here, beating the first gym leader, sits a long way behind a wall of walking, talking and levelling that carries no obvious score at all.

So the interesting question is not which algorithm to use. It is what to reward. Nothing on screen reliably tells you whether the last thousand frames were progress or a corridor walked twice, which means reading the picture is the wrong instrument for the job.

## My Role

Solo. Environment, reward design, training setup and monitoring.

## Technical Approach

The agent is PPO through Stable Baselines3 with a NatureCNN over the frames, which come in as 84 by 84 greyscale, stacked three deep so motion is visible, with 24 frames skipped between decisions because a game running at sixty frames a second does not need sixty decisions a second. Actions are eight discrete buttons. The emulator is stable-retro on the libretro mGBA core, run headless, twelve processes in parallel. The repository takes no game with it; it imports a ROM the user already owns.

The reward is where the actual design sits, and it comes from parsing the game's memory rather than the screen. Exploration is scored on the map identifier and the coordinates within it, so entering somewhere genuinely new pays and pacing a corridor does not, with a hash of the frame as a fallback for places the coordinates alone cannot separate. Party level pays out on a square root curve, so early progress is worth more than grinding the same patch of grass indefinitely, and only counts increases, which stops the agent farming a level it lost and regained. Badges pay a bonus, health changes during battle give a dense signal in the fights that matter, and a small per-step cost discourages standing still.

Every component is logged separately to TensorBoard rather than only as a total, alongside unique tiles seen and distinct maps reached. A single reward curve tells you something is working; the breakdown tells you which part.

## Outcome and What I Would Do Differently

It did not beat Brock, and it was never going to on the hardware I had. A full run is fifty million steps across twelve emulators, which is a job shaped for rented compute rather than a desktop that also has to be a desktop. What the training I could run did establish is that the machinery works: the environment steps correctly, the reward components fire when they should, and the monitoring showed exploration widening and levels climbing as the agent played rather than sitting flat. The design was sound and the budget was not.

Knowing that, I would attack the compute rather than the code. Renting GPU time for a single long run is the direct answer. The cheaper one is to make the problem smaller before spending anything on it: start training from a save state near the gym instead of from the title screen, so the agent is not made to rediscover the first hour of the game every episode, and cut the action space to the buttons that matter in that stretch. That is the same idea I would reach for in any long-horizon task, and it is worth building before the training budget, not after.
