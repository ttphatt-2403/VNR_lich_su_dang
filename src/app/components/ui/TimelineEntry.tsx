import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { C } from "@/tokens";

export function TimelineEntry({ date, title, body }: { date: string; title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="timeline-item"
      style={{
        paddingTop: 14,
        paddingBottom: 14,
        borderTop: `1px dotted rgba(139,107,63,0.3)`,
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start gap-3">
        <span style={{
          fontFamily: C.serif, fontSize: 13.5, fontWeight: 700,
          color: C.red, letterSpacing: "0.08em", minWidth: 78, flexShrink: 0, marginTop: 3,
        }}>{date}</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: C.serif, fontSize: 18, fontWeight: 800, color: C.dark, lineHeight: 1.35 }}>{title}</p>
          <div style={{
            maxHeight: open ? 500 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s ease-in-out, opacity 0.3s ease",
            opacity: open ? 1 : 0,
          }}>
            <p style={{ fontFamily: C.body, fontSize: 18.5, color: C.dark, opacity: 0.96, lineHeight: 1.7, marginTop: 6, paddingRight: 8 }}>{body}</p>
          </div>
        </div>
        <span style={{ color: C.muted, flexShrink: 0, marginTop: 2 }}>{open ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</span>
      </div>
    </div>
  );
}
