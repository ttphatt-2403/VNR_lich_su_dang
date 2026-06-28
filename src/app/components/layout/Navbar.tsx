import { Menu, X } from "lucide-react";
import { C } from "@/tokens";
import { CHAPTERS } from "@/data/content";

interface NavbarProps {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  issue: { num: string; date: string };
  onOpenMuseum: () => void;
  onOpenGame: () => void;
  onOpenAIUsage: () => void;
}

export function Navbar({ scrolled, mobileOpen, setMobileOpen, issue, onOpenMuseum, onOpenGame, onOpenAIUsage }: NavbarProps) {
  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(245,230,200,0.98)" : "rgba(245,230,200,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: `2px solid ${C.dark}`,
        boxShadow: scrolled ? "0 4px 20px rgba(62,47,28,0.18)" : "none",
        transition: C.tr,
      }}>
        {/* Main nav row */}
        <div style={{ padding: "0 6%", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <svg className="shimmer-star" width="22" height="22" viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 18.8,10.5 28,10.5 20.8,16 23.4,24.5 16,19.5 8.6,24.5 11.2,16 4,10.5 13.2,10.5" fill={C.accent}/>
            </svg>
            <span style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 17, color: C.dark, letterSpacing: "-0.01em" }}>Lịch sử Đảng</span>
          </a>
          
          {/* Desktop nav with 3D Museum Button */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-0">
              {CHAPTERS.map(ch => (
                <a key={ch.id} href={`#${ch.id}`} className="nav-link" style={{
                  textDecoration: "none", fontFamily: C.sans, fontSize: 12.5,
                  color: C.dark, opacity: 0.85, padding: "8px 16px",
                  borderRight: `1px dotted ${C.border}`,
                  display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                }}>
                  <span style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 11, color: C.accent }}>{ch.roman}.</span>
                  {ch.label}
                </a>
              ))}
            </nav>
            <button
              onClick={onOpenGame}
              style={{
                background: C.brown,
                color: "#fff",
                border: `1.5px solid ${C.accent}`,
                fontFamily: C.sans,
                fontSize: 11,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 16,
                boxShadow: "0 4px 10px rgba(100,70,34,0.2)",
                transition: C.tr,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#7a5835";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = C.brown;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
              Mini Game
            </button>

            <button
              onClick={onOpenMuseum}
              style={{
                background: C.red,
                color: "#fff",
                border: `1.5px solid ${C.accent}`,
                fontFamily: C.sans,
                fontSize: 11,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 16,
                boxShadow: "0 4px 10px rgba(122,26,28,0.2)",
                transition: C.tr,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = C.redMid;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = C.red;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Bảo Tàng 3D
            </button>

            <button
              onClick={onOpenAIUsage}
              style={{
                background: C.bg2,
                color: C.dark,
                border: `1.5px solid ${C.accent}`,
                fontFamily: C.sans,
                fontSize: 11,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 16,
                boxShadow: "0 4px 10px rgba(212,163,69,0.15)",
                transition: C.tr,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#ebdcb9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = C.bg2;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              Báo Cáo AI
            </button>

          </div>

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
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenGame();
            }}
            style={{
              background: C.brown,
              color: "#fff",
              border: `1.5px solid ${C.accent}`,
              fontFamily: C.sans,
              fontSize: 15,
              fontWeight: 800,
              padding: "10px 24px",
              borderRadius: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              boxShadow: "0 6px 16px rgba(100,70,34,0.25)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
            </svg>
            Mini Game Khám Phá
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenMuseum();
            }}
            style={{
              background: C.red,
              color: "#fff",
              border: `1.5px solid ${C.accent}`,
              fontFamily: C.sans,
              fontSize: 15,
              fontWeight: 800,
              padding: "10px 24px",
              borderRadius: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              boxShadow: "0 6px 16px rgba(122,26,28,0.25)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            Tham Quan Bảo Tàng 3D
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAIUsage();
            }}
            style={{
              background: C.bg2,
              color: C.dark,
              border: `1.5px solid ${C.accent}`,
              fontFamily: C.sans,
              fontSize: 15,
              fontWeight: 800,
              padding: "10px 24px",
              borderRadius: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              boxShadow: "0 6px 16px rgba(212,163,69,0.2)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            Báo Cáo Sử Dụng AI
          </button>

        </div>
      )}
    </>
  );
}
