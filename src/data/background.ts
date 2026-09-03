// Page background. Export the gradient from https://www.shadergradient.co/
// (dark purple to violet to pink, low brightness), drop the files into
// public/bg/ and set the paths here. See ASSETS.md for the export settings.
//
// Until a file is set, the CSS gradient in global.css stands in.

export const background = {
  // Still image. Shown on its own, and as the poster behind the video.
  // e.g. '/bg/gradient.png'
  image: null as string | null,
  // Optional looping video. Not shown when the visitor prefers reduced motion.
  // e.g. '/bg/gradient.mp4'
  video: null as string | null,
  // 0 = no darkening, 1 = black. Lowers the brightness of the export.
  dim: 0.35,
};
