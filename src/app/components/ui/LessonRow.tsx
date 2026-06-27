import { C } from "@/tokens";

export function LessonRow({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="lesson-item" style={{ borderTop: `1px dotted rgba(139,107,63,0.4)`, paddingTop: 12, paddingBottom: 12 }}>
      <div className="flex items-start gap-4">
        <span style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 16, color: C.accent, minWidth: 32, flexShrink: 0 }}>{num}.</span>
        <p style={{ flex: 1, fontFamily: C.body, fontSize: 22, fontWeight: 600, color: C.dark, lineHeight: 1.4 }}>{title}</p>
      </div>
      <p style={{ fontFamily: C.body, fontSize: 20.5, color: C.dark, opacity: 0.96, lineHeight: 1.78, marginTop: 8, paddingLeft: 32, borderLeft: `2px solid ${C.accent}`, paddingRight: 4 }}>{desc}</p>
    </div>
  );
}
