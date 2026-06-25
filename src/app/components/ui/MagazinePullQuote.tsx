import { C } from "@/tokens";

export function MagazinePullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <div className="pull-quote-item" style={{
      borderLeft: `4px solid ${C.red}`,
      paddingLeft: 24, paddingRight: 8,
      paddingTop: 4, paddingBottom: 4,
      margin: "24px 0",
      position: "relative",
    }}>
      <div className="quote-symbol" style={{
        position: "absolute", top: -20, left: 12,
        fontFamily: C.serif, fontSize: 96, lineHeight: 1,
        color: C.red, opacity: 0.25, userSelect: "none", fontWeight: 900,
        pointerEvents: "none",
      }}>❝</div>
      <p style={{
        fontFamily: C.serif, fontSize: 23, fontStyle: "italic",
        fontWeight: 600, color: C.dark, lineHeight: 1.6,
        position: "relative", zIndex: 1,
      }}>{text}</p>
      {attribution && (
        <p style={{
          fontFamily: C.sans, fontSize: 13, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: C.brown, opacity: 0.95, marginTop: 10,
        }}>— {attribution}</p>
      )}
    </div>
  );
}
