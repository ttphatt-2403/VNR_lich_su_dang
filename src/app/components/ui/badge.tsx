import { C } from "@/tokens";

export function Badge({ label, color = C.brown }: { label: string; color?: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: color, color: "#fff",
      padding: "6px 18px 6px 14px",
      fontFamily: C.sans, fontSize: 12, fontWeight: 700,
      letterSpacing: "0.16em", textTransform: "uppercase",
      marginBottom: 20,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill={C.accent}>
        <polygon points="7,0 8.3,4.5 13,4.5 9.3,7.2 10.6,12 7,9.2 3.4,12 4.7,7.2 1,4.5 5.7,4.5"/>
      </svg>
      {label}
    </div>
  );
}
