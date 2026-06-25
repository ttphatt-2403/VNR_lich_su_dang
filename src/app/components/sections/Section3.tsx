import { C } from "@/tokens";
import {
  P3_APPLICATIONS,
  P3_REFERENCES,
} from "@/data/content";
import { Reveal } from "@/app/components/ui/Reveal";
import { DottedRule } from "@/app/components/ui/DottedRule";
import { ArticleHeader } from "@/app/components/ui/ArticleHeader";
import { MagazinePage } from "@/app/components/ui/MagazinePage";

function RibbonHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        background: C.red,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 24px 6px 14px",
        fontFamily: C.sans,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        position: "relative",
        marginBottom: 20,
        clipPath: "polygon(0 0, 100% 0, 93% 50%, 100% 100%, 0 100%)",
        borderLeft: `3px solid ${C.accent}`,
      }}
    >
      <span style={{ color: C.accent, marginRight: 8, fontSize: 13 }}>★</span>
      {label}
    </div>
  );
}

export function Section3() {
  return (
    <MagazinePage id="phan-3" pageNum={25}>
      <Reveal>
        <ArticleHeader
          category="Chương II · Phần III"
          headline="Vận dụng sáng tạo"
          sub="Bài học lịch sử vào công cuộc đổi mới hiện nay"
          period="Đương đại"
          intro="Các bài học kinh nghiệm về độc lập tự chủ, kết hợp sức mạnh dân tộc và thời đại vẫn giữ nguyên giá trị lý luận và thực tiễn, định hướng sự phát triển của Việt Nam thời kỳ hội nhập."
        />
      </Reveal>

      {/* 2-col editorial layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, marginBottom: 32 }}>

        {/* Column 1 - Foreign Policy */}
        <div style={{ paddingRight: 24 }}>
          <Reveal>
            <RibbonHeader label={P3_APPLICATIONS[0].domain} />
            <h3 style={{ fontFamily: C.serif, fontSize: 20, fontWeight: 700, color: C.red, marginBottom: 16, lineHeight: 1.25 }}>
              {P3_APPLICATIONS[0].headline}
            </h3>
            <DottedRule my={14}/>
            {P3_APPLICATIONS[0].points.map((pt, pi) => (
              <div key={pi} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, flexShrink: 0, marginTop: 8 }}/>
                <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, opacity: 0.85, margin: 0 }}>{pt}</p>
              </div>
            ))}
            <DottedRule my={14}/>
            <div style={{ background: C.bg2, padding: "12px 16px", borderLeft: `3px solid ${C.red}` }}>
              <p style={{ fontFamily: C.body, fontSize: 14, fontStyle: "italic", color: C.dark, opacity: 0.8, margin: 0 }}>
                <strong style={{ fontFamily: C.sans, fontStyle: "normal", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Liên hệ: </strong>{P3_APPLICATIONS[0].connection}
              </p>
            </div>
            <p style={{ fontFamily: C.sans, fontSize: 10, color: C.muted, opacity: 0.7, marginTop: 10, margin: 0 }}>Nguồn: {P3_APPLICATIONS[0].source}</p>
          </Reveal>
        </div>

        {/* Dotted column rule */}
        <DottedRule vertical/>

        {/* Column 2 - Infrastructure */}
        <div style={{ paddingLeft: 24 }}>
          <Reveal delay={80}>
            <RibbonHeader label={P3_APPLICATIONS[1].domain} />
            <h3 style={{ fontFamily: C.serif, fontSize: 20, fontWeight: 700, color: C.red, marginBottom: 16, lineHeight: 1.25 }}>
              {P3_APPLICATIONS[1].headline}
            </h3>
            <DottedRule my={14}/>
            {P3_APPLICATIONS[1].points.map((pt, pi) => (
              <div key={pi} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, flexShrink: 0, marginTop: 8 }}/>
                <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, opacity: 0.85, margin: 0 }}>{pt}</p>
              </div>
            ))}
            <DottedRule my={14}/>
            <div style={{ background: C.bg2, padding: "12px 16px", borderLeft: `3px solid ${C.red}` }}>
              <p style={{ fontFamily: C.body, fontSize: 14, fontStyle: "italic", color: C.dark, opacity: 0.8, margin: 0 }}>
                <strong style={{ fontFamily: C.sans, fontStyle: "normal", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Liên hệ: </strong>{P3_APPLICATIONS[1].connection}
              </p>
            </div>
            <p style={{ fontFamily: C.sans, fontSize: 10, color: C.muted, opacity: 0.7, marginTop: 10, margin: 0 }}>Nguồn: {P3_APPLICATIONS[1].source}</p>
          </Reveal>
        </div>

      </div>

      <DottedRule my={24}/>

      {/* References Footer Box */}
      <Reveal>
        <div style={{ background: C.bg2, padding: "18px 24px", border: `1.5px solid rgba(122,26,28,0.18)` }}>
          <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.red, marginBottom: 12 }}>
            Danh mục tài liệu tham khảo chính thức
          </p>
          {P3_REFERENCES.map((ref, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 12, color: C.red, flexShrink: 0, minWidth: 16 }}>[{i + 1}]</span>
              <p style={{ fontFamily: C.body, fontSize: 13.5, lineHeight: 1.5, color: C.dark, opacity: 0.7, margin: 0 }}>{ref}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </MagazinePage>
  );
}
