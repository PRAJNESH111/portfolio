import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  useReducedMotionPreference,
  useTouchDevice,
} from "../src/hooks/useUserPreferences";

const defaultTargetSelector =
  '.cursor-target, a, button, input, textarea, select, summary, [role="button"], [tabindex]:not([tabindex="-1"]), [data-cursor-target]';

function TargetCursor({
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  spinDuration = 2,
  targetSelector = defaultTargetSelector,
}) {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const cornersRef = useRef([]);
  const activeTargetRef = useRef(null);

  const prefersReducedMotion = useReducedMotionPreference();
  const isTouchDevice = useTouchDevice();
  const isEnabled = !prefersReducedMotion && !isTouchDevice;

  useEffect(() => {
    if (!isEnabled || !cursorRef.current) {
      return undefined;
    }

    const cursor = cursorRef.current;
    const corners = cornersRef.current;
    const previousCursorStyle = document.body.style.cursor;

    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
    }

    gsap.set(cursor, {
      x: window.innerWidth / 2,
      xPercent: -50,
      y: window.innerHeight / 2,
      yPercent: -50,
    });

    const spinner = gsap.to(cursor, {
      duration: spinDuration,
      ease: "none",
      repeat: -1,
      rotate: "+=360",
    });

    const resetCorners = () => {
      const size = 12;
      const restingPositions = [
        { x: -size * 1.5, y: -size * 1.5 },
        { x: size * 0.5, y: -size * 1.5 },
        { x: size * 0.5, y: size * 0.5 },
        { x: -size * 1.5, y: size * 0.5 },
      ];

      corners.forEach((corner, index) => {
        gsap.to(corner, {
          duration: 0.2,
          ease: "power2.out",
          opacity: 0.85,
          x: restingPositions[index].x,
          y: restingPositions[index].y,
        });
      });
    };

    resetCorners();

    const updateTargetCorners = (target) => {
      if (!target) {
        activeTargetRef.current = null;
        gsap.to(cursor, { duration: hoverDuration, scale: 1 });
        gsap.to(dotRef.current, { duration: hoverDuration, scale: 1 });
        spinner.play();
        resetCorners();
        return;
      }

      const rect = target.getBoundingClientRect();
      const cursorX = gsap.getProperty(cursor, "x");
      const cursorY = gsap.getProperty(cursor, "y");
      const cornerSize = 12;
      const borderGap = 3;

      const points = [
        { x: rect.left - borderGap, y: rect.top - borderGap },
        { x: rect.right + borderGap - cornerSize, y: rect.top - borderGap },
        {
          x: rect.right + borderGap - cornerSize,
          y: rect.bottom + borderGap - cornerSize,
        },
        { x: rect.left - borderGap, y: rect.bottom + borderGap - cornerSize },
      ];

      spinner.pause();
      gsap.to(cursor, { duration: hoverDuration, rotate: 0, scale: 1.08 });
      gsap.to(dotRef.current, { duration: hoverDuration, scale: 0.65 });

      corners.forEach((corner, index) => {
        gsap.to(corner, {
          duration: parallaxOn ? 0.16 : 0,
          ease: "power1.out",
          x: points[index].x - cursorX,
          y: points[index].y - cursorY,
        });
      });
    };

    const handleMouseMove = (event) => {
      gsap.to(cursor, {
        duration: 0.1,
        ease: "power3.out",
        x: event.clientX,
        y: event.clientY,
      });

      const target = event.target.closest(targetSelector);

      if (target !== activeTargetRef.current) {
        activeTargetRef.current = target;
        updateTargetCorners(target);
      }
    };

    const handleMouseDown = () => {
      gsap.to(dotRef.current, { duration: 0.2, scale: 0.55 });
      gsap.to(cursor, { duration: 0.2, scale: 0.92 });
    };

    const handleMouseUp = () => {
      if (activeTargetRef.current) {
        gsap.to(dotRef.current, { duration: 0.2, scale: 0.65 });
        gsap.to(cursor, { duration: 0.2, scale: 1.08 });
        return;
      }

      gsap.to(dotRef.current, { duration: 0.2, scale: 1 });
      gsap.to(cursor, { duration: 0.2, scale: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      spinner.kill();
      document.body.style.cursor = previousCursorStyle;
    };
  }, [hideDefaultCursor, hoverDuration, isEnabled, parallaxOn, spinDuration, targetSelector]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-0 w-0"
      style={{ willChange: "transform" }}
    >
      <div
        ref={dotRef}
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-pill"
        style={{ background: "var(--color-primary)", willChange: "transform" }}
      />

      <div
        ref={(node) => {
          cornersRef.current[0] = node;
        }}
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 border-[2px] border-r-0 border-b-0 -translate-x-[150%] -translate-y-[150%]"
        style={{ borderColor: "var(--color-primary)", willChange: "transform" }}
      />
      <div
        ref={(node) => {
          cornersRef.current[1] = node;
        }}
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 translate-x-1/2 -translate-y-[150%] border-[2px] border-l-0 border-b-0"
        style={{ borderColor: "var(--color-primary)", willChange: "transform" }}
      />
      <div
        ref={(node) => {
          cornersRef.current[2] = node;
        }}
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 translate-x-1/2 translate-y-1/2 border-[2px] border-l-0 border-t-0"
        style={{ borderColor: "var(--color-primary)", willChange: "transform" }}
      />
      <div
        ref={(node) => {
          cornersRef.current[3] = node;
        }}
        className="target-cursor-corner absolute left-1/2 top-1/2 h-3 w-3 -translate-x-[150%] translate-y-1/2 border-[2px] border-r-0 border-t-0"
        style={{ borderColor: "var(--color-primary)", willChange: "transform" }}
      />
    </div>
  );
}

export default TargetCursor;
