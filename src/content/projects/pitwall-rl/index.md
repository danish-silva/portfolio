---
title: Pitwall
summary: An F1 inspired racing agent that learns to trade lap time against tyre life, pairing a driving policy with a learned wear model to work out when a pit stop pays for itself.
startDate: 2026-04-01
endDate: 2026-05-01
tags:
  - machine-learning
tools:
  - Python
  - Stable Baselines3
  - Gymnasium
  - scikit-learn
  - Box2D
  - TensorBoard
links:
  - label: Source Code
    url: https://github.com/danish-silva/PitwallAgent
  - label: Documentation
    url: https://danish-silva.github.io/PitwallAgent/
cover:
  src: ./cover.png
  alt: The Pitwall wordmark, Pit set in white and wall in red, on a dark red background
gallery:
  - src: ./on_track.png
    alt: The CarRacing window with the red car mid corner on a grey track, the accumulated reward at the bottom left and the telemetry bars beside it
    caption: The wrapped CarRacing environment the agent drives. The policy sees a 96 by 96 crop of this, stacked four deep, alongside the wear, lap and compound vector, because none of that is visible in the image itself.
  - video: /media/pitwall-rl/training.mp4
    poster: ./training_poster.jpg
    alt: Recording of the trained agent driving the CarRacing track, with the accumulated reward climbing in the corner of the window
    caption: An evaluation episode run from the best checkpoint on a fixed track. Watching a single episode like this is what exposed the failure the aggregate numbers hid, where the agent span on the spot and never completed a lap.
order: 40
draft: false
---

## The Problem

Driving a car around a track is a solved demonstration in reinforcement learning. Built for AI in Robotics at UTS, Pitwall makes the task an economic one instead. The agent runs a multi-lap race on a wrapped CarRacing environment where the tyres degrade as it drives, and a pit stop resets them at a cost. Going faster wears the tyres sooner. Stopping costs time now to save time later. The agent has to decide when that trade is worth taking.

That means two learned systems in one loop rather than one. A policy that drives, and a separate model that predicts how quickly the tyres are wearing, feeding the state the policy sees.

## My Role

A team of four for the subject. I owned the system architecture and the reinforcement learning agent. The environment wrapper, the tyre degradation model and the evaluation harness were owned by the other three, and the documentation site credits each of them.

The architecture decision that mattered was keeping those four pieces loosely coupled behind narrow, typed interfaces. Four people were changing code at once, and a driving policy is slow to retrain, so the model, the environment and the analysis had to be able to move without dragging the agent behind them.

## Technical Approach

The agent is proximal policy optimisation through Stable Baselines3, on a dictionary observation rather than pixels alone. It sees a 96 by 96 camera frame, stacked four deep so motion is visible in a single observation, alongside a three element vector carrying tyre wear, the current lap and the compound fitted. That vector is the part that makes the strategy learnable: wear does not appear in the image, so without it the policy has no way to know a stop is coming due. Actions are continuous steering, throttle and brake, and training runs across eight parallel environments.

Wear comes from a gradient boosting regressor, 300 trees at depth four, trained on 12,000 synthetic samples of stylised F1 physics. It predicts a per-step wear rate from speed, cornering load, lap number, current wear and compound, so wear responds to how the car is being driven rather than ticking down on a timer.

Training runs in two phases. The first spends 1.5 million steps on a single fixed track so the agent learns to drive one sequence of corners without also fighting a new layout every episode. The second resumes from that checkpoint and trains three million more on random tracks. Splitting it that way cuts the variance early, at the price of a real dip in performance when the fixed track is taken away.

## Outcome and What I Would Do Differently

The result that taught me most was a failure. Partway through, the agent found a local optimum where it simply span on the spot: it stayed on the track, took the small per-step penalty, and never completed a lap. The aggregate numbers did not show it. Mean reward looked stable and episode length looked healthy, because surviving without progressing is indistinguishable from surviving while progressing if you only watch the totals. It was obvious within seconds of actually watching an episode.

The fix was the reward, not the network. A bonus for completing a lap gave the policy a terminal goal to aim at, a stagnation rule ended episodes that went 300 steps without reaching new track, and the hard off-track barrier became a soft per-step penalty so leaving the track was expensive rather than fatal. Behaviour changed qualitatively after that: standing still stopped paying.

Two things I would do differently. I would build the visualisation before the agent, not after; the racing line plot that exposed the problem took an afternoon and would have saved days had it existed from the start. And I would exhaust the reward function before touching the architecture. A bigger network only reaches the wrong objective faster.
