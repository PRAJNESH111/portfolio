import { useEffect, useMemo, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

function canUseWindow() {
  return typeof window !== "undefined";
}

function readReducedMotion() {
  if (!canUseWindow()) {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function readTouchDevice() {
  if (!canUseWindow()) {
    return false;
  }

  const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const coarsePointer = window.matchMedia(TOUCH_QUERY).matches;

  return hasTouchScreen || coarsePointer;
}

export function useReducedMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(readReducedMotion);

  useEffect(() => {
    if (!canUseWindow()) {
      return undefined;
    }

    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setPrefersReducedMotion(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  return prefersReducedMotion;
}

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(readTouchDevice);

  useEffect(() => {
    if (!canUseWindow()) {
      return undefined;
    }

    const media = window.matchMedia(TOUCH_QUERY);
    const onChange = () => setIsTouchDevice(readTouchDevice());

    onChange();
    media.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);

  return isTouchDevice;
}

export function useVisualEffectsEnabled() {
  const prefersReducedMotion = useReducedMotionPreference();
  const isTouchDevice = useTouchDevice();

  return useMemo(
    () => !(prefersReducedMotion || isTouchDevice),
    [prefersReducedMotion, isTouchDevice],
  );
}
