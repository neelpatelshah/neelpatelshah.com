"use client";

import { motion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor-snap]';

const SIZE = {
  idle: 18,
  moving: 20,
  snap: 28,
};

const BRACKET = {
  length: 8,
  thickness: 1.5,
};

export function FilmReticleCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [visible, setVisible] = useState(false);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cursorX = useSpring(0, { damping: 30, stiffness: 500, mass: 0.6 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 500, mass: 0.6 });
  const size = useSpring(SIZE.idle, { damping: 22, stiffness: 320 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      setVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsMoving(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const snap = !!el?.closest(INTERACTIVE_SELECTOR);
      setIsSnapped(snap);
      size.set(snap ? SIZE.snap : SIZE.moving);

      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        setIsMoving(false);
        if (!snap) size.set(SIZE.idle);
      }, 140);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.body.style.cursor = "auto";
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, [cursorX, cursorY, size]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        mixBlendMode: "difference",
        opacity: visible ? 1 : 0,
        transition: "opacity 120ms ease",
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Four L-shaped corner brackets */}
        {[
          { top: 0, left: 0, borderTop: true, borderLeft: true },
          { top: 0, right: 0, borderTop: true, borderRight: true },
          { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
          { bottom: 0, right: 0, borderBottom: true, borderRight: true },
        ].map((corner, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              width: BRACKET.length,
              height: BRACKET.length,
              top: corner.top,
              left: corner.left,
              right: corner.right,
              bottom: corner.bottom,
              borderTop: corner.borderTop ? `${BRACKET.thickness}px solid white` : undefined,
              borderLeft: corner.borderLeft ? `${BRACKET.thickness}px solid white` : undefined,
              borderRight: corner.borderRight ? `${BRACKET.thickness}px solid white` : undefined,
              borderBottom: corner.borderBottom ? `${BRACKET.thickness}px solid white` : undefined,
            }}
          />
        ))}

        {/* Center dot — fades out when snapped */}
        <motion.span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 2,
            height: 2,
            background: "white",
            translateX: "-50%",
            translateY: "-50%",
            borderRadius: "50%",
          }}
          animate={{ opacity: isSnapped ? 0 : 1, scale: isMoving ? 1 : 0.9 }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </motion.div>
  );
}
