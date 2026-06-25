import { Menu, X } from "lucide-react";
import { C } from "@/tokens";
import { CHAPTERS } from "@/data/content";

interface NavbarProps {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  issue: { num: string; date: string };
}

export function Navbar({ scrolled, mobileOpen, setMobileOpen, issue }: NavbarProps) {
  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(245,230,200,0.97)" : "rgba(245,230,200,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `2px solid ${C.dark}`,
        transition: C.tr,
      }}>
        {/* Main nav row */}
        <div style={{ padding: "0 6%", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 18.8,10.5 28,10.5 20.8,16 23.4,24.5 16,19.5 8.6,24.5 11.2,16 4,10.5 13.2,10.5" fill={C.accent}/>
            </svg>
            <span style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 17, color: C.dark, letterSpacing: "-0.01em" }}>Lịch sử Đảng</span>
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0">
            {CHAPTERS.map(ch => (
              <a key={ch.id} href={`#${ch.id}`} style={{
                textDecoration: "none", fontFamily: C.sans, fontSize: 12.5,
                color: C.dark, opacity: 0.7, padding: "8px 16px",
                borderRight: `1px dotted ${C.border}`,
                transition: C.tr, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.color = C.brown; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; (e.currentTarget as HTMLAnchorElement).style.color = C.dark; }}
              >
                <span style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 11, color: C.accent }}>{ch.roman}.</span>
                {ch.label}
              </a>
            ))}
          </nav>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.dark }}>
            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
          style={{ background: "rgba(245,230,200,0.98)", paddingTop: 96 }}>
          {CHAPTERS.map(ch => (
            <a key={ch.id} href={`#${ch.id}`}
              style={{ color: C.dark, textDecoration: "none", fontSize: 22, fontFamily: C.serif, fontWeight: 700 }}
              onClick={() => setMobileOpen(false)}>
              <span style={{ color: C.accent, marginRight: 12 }}>{ch.roman}.</span>{ch.title}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
