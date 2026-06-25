import { useState, useCallback } from "react";

export default function useHover() {
  const [h, set] = useState(false);
  return { hovered: h, onMouseEnter: useCallback(() => set(true), []), onMouseLeave: useCallback(() => set(false), []) };
}
