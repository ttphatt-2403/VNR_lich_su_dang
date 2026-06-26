import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { C } from "@/tokens";

export function LessonRow({ num, title, desc }: { num: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lesson-item" style={{ borderTop: `1px dotted rgba(139,107,63,0.4)`, paddingTop: 12, paddingBottom: 12 }}>
      <div className="flex items-start gap-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <span style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 16, color: C.accent, minWidth: 32, flexShrink: 0 }}>{num}.</span>
        <p style={{ flex: 1, fontFamily: C.body, fontSize: 20, fontWeight: open ? 600 : 500, color: open ? C.dark : C.brown, lineHeight: 1.4 }}>{title}</p>
        <span style={{ color: C.muted, flexShrink: 0 }}>{open ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}</span>
      </div>
      {open && <p style={{ fontFamily: C.body, fontSize: 18.5, color: C.dark, opacity: 0.96, lineHeight: 1.78, marginTop: 8, paddingLeft: 32, borderLeft: `2px solid ${C.accent}`, paddingRight: 4 }}>{desc}</p>}
    </div>
  );
}
