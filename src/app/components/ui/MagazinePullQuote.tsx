import { C } from "@/tokens";

export function MagazinePullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <div style={{
      borderLeft: `4px solid ${C.red}`,
      paddingLeft: 24, paddingRight: 8,
      paddingTop: 4, paddingBottom: 4,
      margin: "24px 0",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: -20, left: 12,
        fontFamily: C.serif, fontSize: 96, lineHeight: 1,
        color: C.red, opacity: 0.25, userSelect: "none", fontWeight: 900,
        pointerEvents: "none",
      }}>❝</div>
      <p style={{
        fontFamily: C.serif, fontSize: 20, fontStyle: "italic",
        fontWeight: 500, color: C.dark, lineHeight: 1.65,
        position: "relative", zIndex: 1,
      }}>{text}</p>
      {attribution && (
        <p style={{
          fontFamily: C.sans, fontSize: 11, fontWeight: 600,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: C.brown, opacity: 0.7, marginTop: 10,
        }}>— {attribution}</p>
      )}
    </div>
  );
}
