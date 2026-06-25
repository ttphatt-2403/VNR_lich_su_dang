import React from "react";
import useInView from "@/hooks/useInView";

type EffectType = "fade-up" | "fade-left" | "fade-right" | "scale-up" | "rotate-in";

export function Reveal({
  children,
  delay = 0,
  className = "",
  effect = "fade-up",
  duration = 800,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  effect?: EffectType;
  duration?: number;
}) {
  const { ref, inView } = useInView(0.08); // Slightly higher threshold for better trigger timing

  const getStyle = (): React.CSSProperties => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    
    if (!inView) {
      switch (effect) {
        case "fade-left":
          return { opacity: 0, transform: "translateX(-40px)", transition: baseTransition };
        case "fade-right":
          return { opacity: 0, transform: "translateX(40px)", transition: baseTransition };
        case "scale-up":
          return { opacity: 0, transform: "scale(0.92)", transition: baseTransition };
        case "rotate-in":
          return { opacity: 0, transform: "rotate(-4deg) scale(0.95)", transition: baseTransition };
        case "fade-up":
        default:
          return { opacity: 0, transform: "translateY(32px)", transition: baseTransition };
      }
    }

    return {
      opacity: 1,
      transform: "translate(0) scale(1) rotate(0deg)",
      transition: baseTransition,
    };
  };

  return (
    <div ref={ref} className={className} style={getStyle()}>
      {children}
    </div>
  );
}
