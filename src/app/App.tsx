import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { C } from "@/tokens";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { HeroCover } from "@/app/components/sections/HeroCover";
import { Section1 } from "@/app/components/sections/Section1";
import { Section2 } from "@/app/components/sections/Section2";
import { Section4 } from "@/app/components/sections/Section4";
import { Museum3DModal } from "@/app/components/ui/Museum3DModal";
import { PuzzleGame } from "@/app/components/ui/PuzzleGame";
import { AIUsagePage } from "@/app/components/ui/AIUsagePage";


export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [showTop, setShowTop]       = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos]     = useState({ x: -1000, y: -1000 });
  const [issue] = useState({ num: "05", date: "Tháng 5/2024" });
  const [isMuseumOpen, setIsMuseumOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isAIUsageOpen, setIsAIUsageOpen] = useState(false);


  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 500);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute("href");
        if (!href) return;

        if (href === "#") {
          e.preventDefault();
          setIsGameOpen(false);
          setIsAIUsageOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (href.startsWith("#phan-")) {
          e.preventDefault();
          setIsGameOpen(false);
          setIsAIUsageOpen(false);

          setTimeout(() => {
            const id = href.substring(1);
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              el.classList.remove("section-pulse");
              void el.offsetWidth; // DOM reflow
              el.classList.add("section-pulse");
            }
          }, 80);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div
      style={{ fontFamily: C.body, background: C.desk, color: C.dark, minHeight: "100vh", position: "relative", overflowX: "hidden" }}
      onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Interactive Cursor Spotlight Aura */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 85,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 163, 69, 0.08), transparent 45%), radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(122, 26, 28, 0.05), transparent 55%)`,
          transition: "background 0.04s linear",
        }}
      />

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg2}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}; border-radius: 99px; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes starShimmer {
          0%, 100% { opacity: 0.8; transform: scale(1); filter: drop-shadow(0 0 1px ${C.accent}); }
          50% { opacity: 1; transform: scale(1.25); filter: drop-shadow(0 0 8px ${C.accent}); }
        }

        /* Star shimmer class */
        .shimmer-star {
          display: inline-block;
          animation: starShimmer 2.2s infinite ease-in-out;
        }

        /* Nav link hover effects */
        .nav-link {
          position: relative;
          color: ${C.dark};
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: ${C.red};
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .nav-link:hover {
          color: ${C.red} !important;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        /* Paper textures for magazine pages */
        .magazine-page-shadow {
          position: relative;
          box-shadow: 0 12px 38px rgba(62,47,28,0.12), 0 2px 8px rgba(0,0,0,0.06);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .magazine-page-shadow:hover {
          box-shadow: 0 24px 56px rgba(62,47,28,0.22), 0 6px 16px rgba(0,0,0,0.1);
        }

        /* Interactive Elements styling */
        .toc-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          padding: 6px 8px;
          border-radius: 4px;
        }
        .toc-link:hover {
          transform: translateX(10px);
          color: ${C.red} !important;
          background: rgba(122, 26, 28, 0.04);
        }
        
        .circle-badge-container {
          transition: all 0.3s ease;
        }
        .circle-badge-container:hover .circle-badge {
          transform: scale(1.12) rotate(8deg);
          border-color: ${C.accent} !important;
          color: ${C.accent} !important;
          box-shadow: 0 8px 20px rgba(212, 163, 69, 0.35) !important;
        }
        .circle-badge-container:hover h4 {
          color: ${C.accent} !important;
        }

        .timeline-item {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 3px solid transparent;
          padding-left: 4px;
          border-radius: 0 6px 6px 0;
        }
        .timeline-item:hover {
          border-left-color: ${C.red};
          padding-left: 14px;
          background: linear-gradient(90deg, rgba(122, 26, 28, 0.06) 0%, rgba(212, 163, 69, 0.01) 100%);
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(62,47,28,0.08);
        }

        .lesson-item {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 6px;
          border-left: 3px solid transparent;
        }
        .lesson-item:hover {
          background: rgba(212, 163, 69, 0.09);
          transform: translateX(8px);
          border-left-color: ${C.accent};
          box-shadow: 0 4px 14px rgba(62,47,28,0.06);
        }

        .sig-row {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 6px 10px;
          border-radius: 6px;
          border-left: 3px solid transparent;
        }
        .sig-row:hover {
          transform: translateX(8px);
          background: rgba(122, 26, 28, 0.04);
          border-left-color: ${C.red};
          box-shadow: 0 4px 12px rgba(62,47,28,0.05);
        }
        .sig-row:hover span {
          opacity: 1 !important;
          transform: scale(1.18) rotate(-6deg);
          color: ${C.red} !important;
        }

        .pull-quote-item {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 0 8px 8px 0;
        }
        .pull-quote-item:hover {
          transform: translateX(8px) scale(1.01);
          background: linear-gradient(90deg, rgba(122, 26, 28, 0.05) 0%, transparent 100%);
          box-shadow: 0 8px 24px rgba(122, 26, 28, 0.08);
        }
        .pull-quote-item:hover .quote-symbol {
          transform: scale(1.2) rotate(-8deg);
          opacity: 0.45 !important;
          color: ${C.accent} !important;
          transition: all 0.35s ease;
        }

        .interactive-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 18px 38px rgba(62,47,28,0.25), 0 0 15px rgba(212, 163, 69, 0.3) !important;
          border-color: ${C.accent} !important;
          z-index: 10;
        }

        .ribbon-box {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ribbon-box:hover {
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 8px 22px rgba(122, 26, 28, 0.35);
          filter: brightness(1.1);
        }

        /* Polaroid picture effect */
        figure img {
          transition: filter 0.5s ease;
        }
        figure:hover img {
          filter: sepia(0) contrast(1.1) brightness(1) !important;
        }

        /* Global Typography Readability & Contrast Upgrade */
        main {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        main p {
          color: ${C.dark};
        }

        @keyframes sectionPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 163, 69, 0.75), 0 12px 38px rgba(62,47,28,0.12);
            border-color: ${C.accent};
            transform: scale(1.015);
          }
          45% {
            box-shadow: 0 0 45px 18px rgba(212, 163, 69, 0.45), 0 28px 60px rgba(122, 26, 28, 0.28);
            border-color: ${C.red};
            transform: scale(1.02);
          }
          100% {
            box-shadow: 0 12px 38px rgba(62,47,28,0.12), 0 2px 8px rgba(0,0,0,0.06);
            border-color: rgba(122, 26, 28, 0.15);
            transform: scale(1);
          }
        }
        .section-pulse {
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes starShimmer {
          0%, 100% { opacity: 0.8; transform: scale(1); filter: drop-shadow(0 0 1px ${C.accent}); }
          50% { opacity: 1; transform: scale(1.25); filter: drop-shadow(0 0 8px ${C.accent}); }
        }

        /* Star shimmer class */
        .shimmer-star {
          display: inline-block;
          animation: starShimmer 2.2s infinite ease-in-out;
        }

        /* Nav link hover effects */
        .nav-link {
          position: relative;
          color: ${C.dark};
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: ${C.red};
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .nav-link:hover {
          color: ${C.red} !important;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        /* Paper textures for magazine pages */
        .magazine-page-shadow {
          position: relative;
          box-shadow: 0 12px 38px rgba(62,47,28,0.12), 0 2px 8px rgba(0,0,0,0.06);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .magazine-page-shadow:hover {
          box-shadow: 0 24px 56px rgba(62,47,28,0.22), 0 6px 16px rgba(0,0,0,0.1);
        }

        /* Interactive Elements styling */
        .toc-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          padding: 6px 8px;
          border-radius: 4px;
        }
        .toc-link:hover {
          transform: translateX(10px);
          color: ${C.red} !important;
          background: rgba(122, 26, 28, 0.04);
        }
        
        .circle-badge-container {
          transition: all 0.3s ease;
        }
        .circle-badge-container:hover .circle-badge {
          transform: scale(1.12) rotate(8deg);
          border-color: ${C.accent} !important;
          color: ${C.accent} !important;
          box-shadow: 0 8px 20px rgba(212, 163, 69, 0.35) !important;
        }
        .circle-badge-container:hover h4 {
          color: ${C.accent} !important;
        }

        .timeline-item {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 3px solid transparent;
          padding-left: 4px;
          border-radius: 0 6px 6px 0;
        }
        .timeline-item:hover {
          border-left-color: ${C.red};
          padding-left: 14px;
          background: linear-gradient(90deg, rgba(122, 26, 28, 0.06) 0%, rgba(212, 163, 69, 0.01) 100%);
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(62,47,28,0.08);
        }

        .lesson-item {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 6px;
          border-left: 3px solid transparent;
        }
        .lesson-item:hover {
          background: rgba(212, 163, 69, 0.09);
          transform: translateX(8px);
          border-left-color: ${C.accent};
          box-shadow: 0 4px 14px rgba(62,47,28,0.06);
        }

        .sig-row {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 6px 10px;
          border-radius: 6px;
          border-left: 3px solid transparent;
        }
        .sig-row:hover {
          transform: translateX(8px);
          background: rgba(122, 26, 28, 0.04);
          border-left-color: ${C.red};
          box-shadow: 0 4px 12px rgba(62,47,28,0.05);
        }
        .sig-row:hover span {
          opacity: 1 !important;
          transform: scale(1.18) rotate(-6deg);
          color: ${C.red} !important;
        }

        .pull-quote-item {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 0 8px 8px 0;
        }
        .pull-quote-item:hover {
          transform: translateX(8px) scale(1.01);
          background: linear-gradient(90deg, rgba(122, 26, 28, 0.05) 0%, transparent 100%);
          box-shadow: 0 8px 24px rgba(122, 26, 28, 0.08);
        }
        .pull-quote-item:hover .quote-symbol {
          transform: scale(1.2) rotate(-8deg);
          opacity: 0.45 !important;
          color: ${C.accent} !important;
          transition: all 0.35s ease;
        }

        .interactive-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 18px 38px rgba(62,47,28,0.25), 0 0 15px rgba(212, 163, 69, 0.3) !important;
          border-color: ${C.accent} !important;
          z-index: 10;
        }

        .ribbon-box {
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ribbon-box:hover {
          transform: translateX(8px) scale(1.03);
          box-shadow: 0 8px 22px rgba(122, 26, 28, 0.35);
          filter: brightness(1.1);
        }

        /* Polaroid picture effect */
        figure img {
          transition: filter 0.5s ease;
        }
        figure:hover img {
          filter: sepia(0) contrast(1.1) brightness(1) !important;
        }

        /* Global Typography Readability & Contrast Upgrade */
        main {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        main p {
          color: ${C.dark};
        }

        @keyframes sectionPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 163, 69, 0.75), 0 12px 38px rgba(62,47,28,0.12);
            border-color: ${C.accent};
            transform: scale(1.015);
          }
          45% {
            box-shadow: 0 0 45px 18px rgba(212, 163, 69, 0.45), 0 28px 60px rgba(122, 26, 28, 0.28);
            border-color: ${C.red};
            transform: scale(1.02);
          }
          100% {
            box-shadow: 0 12px 38px rgba(62,47,28,0.12), 0 2px 8px rgba(0,0,0,0.06);
            border-color: rgba(122, 26, 28, 0.15);
            transform: scale(1);
          }
        }
        .section-pulse {
          animation: sectionPulse 1.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          z-index: 60 !important;
        }
      `}</style>

      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} issue={issue}
        onOpenMuseum={() => setIsMuseumOpen(true)}
        onOpenGame={() => {
          setIsGameOpen(true);
          setIsAIUsageOpen(false);
        }}
        onOpenAIUsage={() => {
          setIsAIUsageOpen(true);
          setIsGameOpen(false);
        }}
      />

      {isGameOpen ? (
        <PuzzleGame onClose={() => setIsGameOpen(false)} />
      ) : isAIUsageOpen ? (
        <AIUsagePage onClose={() => setIsAIUsageOpen(false)} />
      ) : (
        <>
          {/* Glowing scroll progress indicator */}
          <div style={{
            position: "fixed",
            top: 54,
            left: 0,
            width: `${scrollProgress}%`,
            height: 4,
            background: `linear-gradient(to right, ${C.red}, ${C.accent})`,
            boxShadow: `0 0 12px ${C.accent}`,
            zIndex: 100,
            transition: "width 0.08s ease-out"
          }} />

      {/* Floating Rotating Scroll Star Badge */}
      <div
        style={{
          position: "fixed",
          bottom: showTop ? 82 : 28,
          right: 28,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: C.bg,
          border: `1.5px solid ${C.accent}`,
          boxShadow: "0 6px 20px rgba(62,47,28,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 48,
          pointerEvents: "none",
          transform: `rotate(${scrollProgress * 9}deg)`,
          transition: "bottom 0.3s ease, transform 0.05s linear",
        }}
      >
        <span style={{ fontSize: 20, color: C.red }}>★</span>
      </div>

      <HeroCover />

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "8px 16px" }}>
        <Section1/>
        <Section2/>
        <Section4/>
      </main>

      <Footer issue={issue} onOpenAIUsage={() => {
        setIsAIUsageOpen(true);
        setIsGameOpen(false);
      }}/>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 28, right: 28, width: 44, height: 44,
            background: C.red, color: "#fff",
            border: `1.5px solid ${C.accent}`,
            cursor: "pointer", boxShadow: "0 6px 20px rgba(62,47,28,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
            borderRadius: "50%",
            transition: C.tr,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = C.redMid;
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = C.red;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <ArrowUp size={18}/>
        </button>
      )}
      </>
      )}

      {/* 3D Museum Modal */}
      <Museum3DModal isOpen={isMuseumOpen} onClose={() => setIsMuseumOpen(false)} />
    </div>
  );
}
