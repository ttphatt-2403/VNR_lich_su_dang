import { C } from "@/tokens";

export function ArticleHeader({ category, headline, sub, intro, period }: {
  category: string; headline: string; sub?: string; intro: string; period: string;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Kicker */}
      <p style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: C.brown, marginBottom: 10, opacity: 0.9 }}>
        {category}
      </p>
      {/* Giant headline */}
      <h2 style={{
        fontFamily: C.serif, fontSize: "clamp(40px,5.5vw,72px)",
        fontWeight: 900, color: C.dark, lineHeight: 0.95,
        letterSpacing: "-0.035em", marginBottom: 6,
        textTransform: "uppercase",
      }}>{headline}</h2>
      {sub && <h3 style={{ fontFamily: C.serif, fontSize: "clamp(22px,3vw,34px)", fontWeight: 600, color: C.brown, lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 16 }}>{sub}</h3>}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{ height: 3, width: 48, background: C.red }}/>
        <span style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>{period}</span>
        <div style={{ flex: 1, height: 1, background: C.border }}/>
      </div>
      {/* Lead text with drop-cap effect */}
      <p style={{
        fontFamily: C.body, fontSize: 22.5, lineHeight: 1.85, color: C.dark, opacity: 0.96,
        maxWidth: 680,
      }}>{intro}</p>
    </div>
  );
}
