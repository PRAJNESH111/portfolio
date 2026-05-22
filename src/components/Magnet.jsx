import { useEffect, useRef, useState } from "react";
import { useVisualEffectsEnabled } from "../hooks/useUserPreferences";

function Magnet({
  children,
  padding = 36,
  disabled = false,
  magnetStrength = 8,
  activeTransition = "transform 160ms ease-out",
  inactiveTransition = "transform 220ms ease-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) {
  const effectsEnabled = useVisualEffectsEnabled();
  const magnetRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const shouldDisable = disabled || !effectsEnabled;

  useEffect(() => {
    if (shouldDisable) {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
      return undefined;
    }

    const handleMouseMove = (event) => {
      if (!magnetRef.current) {
        return;
      }

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      const withinX = Math.abs(deltaX) < width / 2 + padding;
      const withinY = Math.abs(deltaY) < height / 2 + padding;

      if (withinX && withinY) {
        setIsActive(true);
        setPosition({
          x: deltaX / magnetStrength,
          y: deltaY / magnetStrength,
        });
        return;
      }

      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [magnetStrength, padding, shouldDisable]);

  const transition = isActive ? activeTransition : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Magnet;
