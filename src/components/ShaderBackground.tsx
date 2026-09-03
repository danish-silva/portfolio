import { useEffect, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { background as bg } from '../data/background';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const SMALL_SCREEN = '(max-width: 48rem)';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * react-three-fiber measures its container once, when the canvas mounts, and
 * does not recover if that measurement comes back empty. A page opened in a
 * background tab lays out at zero size, so the canvas is left at the default
 * 300 by 150 drawing buffer and stays there, painting a stretched black
 * rectangle once the tab is finally shown.
 *
 * Re-announcing the size whenever the document actually changes shape fixes
 * it. This deliberately avoids requestAnimationFrame, which never fires while
 * a tab is hidden, which is the exact case being guarded against.
 */
function useCanvasResizeGuard() {
  useEffect(() => {
    const notify = () => window.dispatchEvent(new Event('resize'));

    let last = '';
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      const size = `${Math.round(width)}x${Math.round(height)}`;
      if (size === last) return;
      last = size;
      notify();
    });
    observer.observe(document.documentElement);

    // A tab restored from the back/forward cache, or shown for the first
    // time, may not change size and so may not trip the observer.
    document.addEventListener('visibilitychange', notify);
    window.addEventListener('pageshow', notify);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', notify);
      window.removeEventListener('pageshow', notify);
    };
  }, []);
}

/**
 * Live gradient behind the page. Rendered client side only, since it needs
 * WebGL. The CSS gradient in global.css shows underneath until this mounts,
 * and stays visible if WebGL is unavailable, so nothing here is load bearing.
 */
export default function ShaderBackground() {
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const smallScreen = useMediaQuery(SMALL_SCREEN);
  useCanvasResizeGuard();

  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      pointerEvents="none"
      pixelDensity={smallScreen ? bg.pixelDensityMobile : bg.pixelDensity}
      powerPreference="low-power"
      fov={bg.fov}
      // Defaults to true, which gates the canvas behind an IntersectionObserver.
      // This layer is fixed at z-index -1 behind the whole page, so that
      // observer fires unreliably and the background is sometimes never drawn.
      lazyLoad={false}
    >
      <ShaderGradient
        control="props"
        // Holding the surface still is the reduced motion equivalent here:
        // the gradient still reads, it just stops drifting.
        animate={reducedMotion ? 'off' : bg.animate}
        type={bg.type}
        color1={bg.color1}
        color2={bg.color2}
        color3={bg.color3}
        uSpeed={bg.uSpeed}
        uStrength={bg.uStrength}
        uDensity={bg.uDensity}
        uAmplitude={bg.uAmplitude}
        uFrequency={bg.uFrequency}
        range={bg.range}
        rangeStart={bg.rangeStart}
        rangeEnd={bg.rangeEnd}
        cAzimuthAngle={bg.cAzimuthAngle}
        cPolarAngle={bg.cPolarAngle}
        cDistance={bg.cDistance}
        cameraZoom={bg.cameraZoom}
        positionX={bg.positionX}
        positionY={bg.positionY}
        positionZ={bg.positionZ}
        rotationX={bg.rotationX}
        rotationY={bg.rotationY}
        rotationZ={bg.rotationZ}
        reflection={bg.reflection}
        lightType={bg.lightType}
        brightness={bg.brightness}
        grain={bg.grain}
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
