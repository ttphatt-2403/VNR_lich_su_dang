import React from "react";
import { C } from "@/tokens";

interface MagazinePageProps {
  id?: string;
  pageNum: number;
  children: React.ReactNode;
}

export function MagazinePage({ id, pageNum, children }: MagazinePageProps) {
  return (
    <article
      id={id}
      style={{
        width: "100%",
        maxWidth: 960,
        margin: "64px auto",
        background: C.bg, // Cream paper color
        color: C.dark,
        boxShadow: "0 20px 40px rgba(40, 30, 20, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08)",
        border: `1px solid rgba(122, 26, 28, 0.15)`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        // Smooth fade-in animation
        animation: "fadeUp 0.8s ease-out both",
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
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(122, 26, 28, 0.7)",
          }}
        >
          <span>Trang {pageNum}</span>
        </div>
      </div>
    </article>
  );
}
