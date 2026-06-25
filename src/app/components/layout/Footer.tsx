import { C } from "@/tokens";
import { CHAPTERS } from "@/data/content";

interface FooterProps {
  issue: { num: string; date: string };
}

export function Footer({ issue }: FooterProps) {
  return (
    <footer style={{ borderTop: `4px solid ${C.red}`, background: C.dark }}>
      {/* Big ending title */}
      <div style={{ padding: "56px 8% 48px", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(201,164,92,0.06) 1px, transparent 1px)`, backgroundSize: "28px 28px" }}/>
        <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,164,92,0.45)", marginBottom: 18 }}>
          Lịch sử Đảng Cộng sản Việt Nam · Chương 2
        </p>
        <h2 style={{
          fontFamily: C.serif, fontWeight: 900,
          fontSize: "clamp(52px,9vw,112px)",
          color: C.bg, lineHeight: 0.9,
          letterSpacing: "-0.04em", textTransform: "uppercase",
          position: "relative", zIndex: 1,
        }}>
          Đảng lãnh đạo<br/>
          <span style={{ color: C.accent }}>hai cuộc</span><br/>
          kháng chiến
        </h2>
      </div>

      {/* Editorial bottom bar */}
      <div style={{ borderTop: `1px solid rgba(201,164,92,0.2)`, padding: "14px 8%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 18.8,10.5 28,10.5 20.8,16 23.4,24.5 16,19.5 8.6,24.5 11.2,16 4,10.5 13.2,10.5" fill={C.accent}/>
          </svg>
          <span style={{ fontFamily: C.sans, fontSize: 11, fontWeight: 700, color: "rgba(245,230,200,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Tư liệu Lịch sử Đảng
          </span>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {CHAPTERS.map(ch => (
            <a key={ch.id} href={`#${ch.id}`} style={{ fontFamily: C.body, fontSize: 12, color: "rgba(201,164,92,0.4)", textDecoration: "none", transition: C.tr }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.accent}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(201,164,92,0.4)"}>
              <span style={{ fontFamily: C.serif, fontWeight: 700, marginRight: 5 }}>{ch.roman}.</span>{ch.label}
            </a>
          ))}
        </div>
        <span style={{ fontFamily: C.sans, fontSize: 11, color: "rgba(201,164,92,0.4)", letterSpacing: "0.1em" }}>
          Đảng Cộng sản Việt Nam
        </span>
      </div>
    </footer>
  );
}
