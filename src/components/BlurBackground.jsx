import { lazy, Suspense, useEffect, useState } from "react";
import {
  useReducedMotionPreference,
  useTouchDevice,
} from "../hooks/useUserPreferences";

const LazyGalaxy = lazy(() => import("./Galaxy"));

function BlurBackground({ enabled = true, observeId = "hero" }) {
  const prefersReducedMotion = useReducedMotionPreference();
  const isTouchDevice = useTouchDevice();
  const [shouldMountGalaxy, setShouldMountGalaxy] = useState(false);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) {
      return undefined;
    }

    const target = document.getElementById(observeId);

    if (!target || typeof IntersectionObserver === "undefined") {
      setShouldMountGalaxy(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) {
          return;
        }

        setShouldMountGalaxy(true);
        observer.disconnect();
      },
      { rootMargin: "520px 0px" },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [enabled, observeId, prefersReducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="bg-nebula absolute inset-0" />

      {enabled && !prefersReducedMotion && shouldMountGalaxy ? (
        <Suspense fallback={null}>
          <LazyGalaxy
            className="absolute inset-0 h-full w-full"
            autoCenterRepulsion={0}
            density={0.92}
            glowIntensity={0.28}
            hueShift={140}
            mouseInteraction={!isTouchDevice}
            mouseRepulsion={!isTouchDevice}
            repulsionStrength={1.7}
            rotationSpeed={0.06}
            saturation={0.08}
            speed={0.85}
            starSpeed={0.45}
            transparent
            twinkleIntensity={0.26}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

export default BlurBackground;
