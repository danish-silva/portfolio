// Page background: a live WebGL gradient from @shadergradient/react.
//
// The shader animates continuously, so there is no loop seam. It is rendered
// client side only, behind everything, and a CSS gradient in global.css paints
// underneath it so the page is never bare while the canvas mounts or when
// WebGL is unavailable.
//
// These are the "mint" preset's values with the chosen overrides applied.
// ShaderGradient merges whatever it is given over its own "halo" preset, not
// over mint, so every mint value has to be passed explicitly. Do not drop a
// field just because it looks like a default.

export const background = {
  // Overrides.
  color1: '#55005e',
  color2: '#96319d',
  color3: '#d79ee1',
  uStrength: 2, // noise strength
  uDensity: 1, // noise density
  brightness: 0.8,
  cDistance: 6,
  pixelDensity: 1.5,
  // Mobile GPUs render this full screen every frame, so they get a lower
  // multiplier. Raise to 1.5 to match desktop exactly.
  pixelDensityMobile: 1,

  // Mint defaults.
  type: 'waterPlane' as 'plane' | 'waterPlane' | 'sphere',
  animate: 'on' as 'on' | 'off',
  uSpeed: 0.2,
  uAmplitude: 0,
  uFrequency: 0,
  range: 'disabled' as 'enabled' | 'disabled',
  rangeStart: 0,
  rangeEnd: 40,
  cAzimuthAngle: 170,
  cPolarAngle: 70,
  cameraZoom: 1,
  positionX: 0,
  positionY: 0.9,
  positionZ: -0.3,
  rotationX: 45,
  rotationY: 0,
  rotationZ: 0,
  reflection: 0.1,
  fov: 45,
  grain: 'off' as 'on' | 'off',
  // '3d' is self contained. 'env' would fetch HDR maps from an external CDN.
  lightType: '3d' as '3d' | 'env',

  // Black overlay on top of the canvas, 0 = none, 1 = black. Text sits
  // directly on this background, so the value is set by contrast, not taste.
  // The shader's measured peak pixel is rgb(129 91 135); 0.40 is the lowest
  // dim that keeps every text and control token above WCAG AA against it, and
  // 0.45 leaves headroom for frames brighter than the ones sampled. Measure
  // again after changing any value above.
  dim: 0.45,
};
