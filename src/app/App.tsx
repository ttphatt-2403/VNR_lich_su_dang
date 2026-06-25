import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { C } from "@/tokens";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { HeroCover } from "@/app/components/sections/HeroCover";
import { Section1 } from "@/app/components/sections/Section1";
import { Section2 } from "@/app/components/sections/Section2";
import { Section3 } from "@/app/components/sections/Section3";
import { Section4 } from "@/app/components/sections/Section4";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [showTop, setShowTop]       = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [issue] = useState({ num: "05", date: "Tháng 5/2024" });

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

  return (
    <div style={{ fontFamily: C.body, background: C.desk, color: C.dark, minHeight: "100vh" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg2}; }
        ::-webkit-scrollbar-thumb { background: ${C.red}; border-radius: 99px; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Interactive Elements styling */
        .toc-link {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
        }
        .toc-link:hover {
          transform: translateX(8px);
          color: ${C.red} !important;
        }
        
        .circle-badge-container {
          transition: all 0.3s ease;
        }
        .circle-badge-container:hover .circle-badge {
          transform: scale(1.08) rotate(6deg);
          border-color: ${C.accent} !important;
          color: ${C.accent} !important;
          box-shadow: 0 6px 15px rgba(212, 163, 69, 0.25) !important;
        }
        .circle-badge-container:hover h4 {
          color: ${C.accent} !important;
        }

        .timeline-item {
          transition: all 0.3s ease;
          border-left: 2px solid transparent;
          padding-left: 0;
        }
        .timeline-item:hover {
          border-left-color: ${C.red};
          padding-left: 8px;
          background: rgba(122, 26, 28, 0.02);
        }
      `}</style>

      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} issue={issue}/>

      {/* Thin scroll progress indicator */}
      <div style={{
        position: "fixed",
        top: 54,
        left: 0,
        width: `${scrollProgress}%`,
        height: 3.5,
        background: `linear-gradient(to right, ${C.red}, ${C.accent})`,
        zIndex: 100,
        transition: "width 0.1s ease-out"
      }} />

      <HeroCover/>

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "8px 16px" }}>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
      </main>

      <Footer issue={issue}/>

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
    </div>
  );
}
