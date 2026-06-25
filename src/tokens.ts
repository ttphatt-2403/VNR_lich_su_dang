// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
export const C = {
  bg:      "#fcf9f2",   // Light ivory paper color
  bg2:     "#f5eedc",   // Warm highlight cream
  desk:    "#e6dcbd",   // Desk background surface color
  ivory:   "#faf6ed",
  brown:   "#8b6b3f",
  dark:    "#332211",   // Deep charcoal brown for text
  red:     "#7A1A1C",   // Deeper crimson/maroon red
  redMid:  "#932426",   // Slightly brighter red for hover
  accent:  "#d4a345",   // Golden accent star color
  muted:   "#9a8060",
  border:  "rgba(122,26,28,0.18)", // Muted border
  serif:   "'Playfair Display', Georgia, serif",
  body:    "'EB Garamond', Garamond, serif",
  sans:    "'Be Vietnam Pro', sans-serif",
  ease:    "cubic-bezier(0.25,0.8,0.25,1)",
  get tr() { return `all 0.3s ${this.ease}`; },
} as const;

