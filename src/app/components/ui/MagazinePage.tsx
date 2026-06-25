import React from "react";
import { C } from "@/tokens";
import { Reveal } from "./Reveal";

interface MagazinePageProps {
  id?: string;
  pageNum: number;
  children: React.ReactNode;
}

export function MagazinePage({ id, pageNum, children }: MagazinePageProps) {
  return (
    <Reveal effect="scale-up" duration={950}>
      <article
        id={id}
        className="magazine-page-shadow section-container"
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "64px auto",
          background: C.bg, // Cream paper color
          color: C.dark,
          border: `1.5px solid rgba(122, 26, 28, 0.18)`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
        }}
      >
        {/* Inner double border margin */}
        <div
          style={{
            margin: "16px",
            padding: "24px 28px",
            border: `1px solid rgba(122, 26, 28, 0.25)`,
            outline: `3px double rgba(122, 26, 28, 0.25)`,
            outlineOffset: "-6px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Page Content */}
          <div style={{ flex: 1 }}>{children}</div>

          {/* Bottom Page Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 8,
              borderTop: `1.5px solid ${C.red}`,
              marginTop: 32,
              fontFamily: C.sans,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: C.red,
            }}
          >
            <span>Trang {pageNum}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
