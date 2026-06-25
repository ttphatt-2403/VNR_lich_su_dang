import { C } from "@/tokens";
import {
  P1_MILESTONES,
  P1_SIGNIFICANCE,
  P1_LESSONS,
} from "@/data/content";
import {
  imgDaihoi2ToanCanh,
  imgDaihoi2PhatBieu,
  imgDBP_CamCo,
  imgDBP_HopBan,
  imgGVR_KyKet,
  imgGVR_HoiNghi,
} from "@/assets/images";
import { Reveal } from "@/app/components/ui/Reveal";
import { Polaroid } from "@/app/components/ui/Polaroid";
import { MagazinePullQuote } from "@/app/components/ui/MagazinePullQuote";
import { DottedRule } from "@/app/components/ui/DottedRule";
import { TimelineEntry } from "@/app/components/ui/TimelineEntry";
import { LessonRow } from "@/app/components/ui/LessonRow";
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

export function Section1() {
  return (
    <MagazinePage id="phan-1" pageNum={22}>
      <Reveal>
        <ArticleHeader
          category="Chương II · Phần I"
          headline="Kháng chiến chống Pháp"
          sub="Đẩy mạnh kháng chiến đến thắng lợi"
          period="1945 – 1954"
          intro="Sau Cách mạng Tháng Tám, Việt Nam đối mặt thử thách to lớn. Dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh, cả nước bước vào cuộc kháng chiến trường kỳ 9 năm — kết thúc bằng chiến thắng Điện Biên Phủ lẫy lừng."
        />
      </Reveal>

      {/* Grid: left content | right photos */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1px 0.9fr", gap: 0, marginBottom: 32 }}>
        {/* Left column */}
        <div style={{ paddingRight: 24 }}>
          <Reveal>
            <RibbonHeader label="Các cột mốc lịch sử" />
          </Reveal>
          {P1_MILESTONES.map((m, i) => (
            <Reveal key={i} delay={i * 60}>
              <TimelineEntry date={m.date} title={m.title} body={m.body}/>
            </Reveal>
          ))}

          <DottedRule my={20}/>

          <Reveal>
            <MagazinePullQuote
              text="Chiến thắng Điện Biên Phủ — lừng lẫy năm châu, chấn động địa cầu — là đỉnh cao của nghệ thuật quân sự Việt Nam."
              attribution="Nhận định báo chí quốc tế, 1954"
            />
          </Reveal>
        </div>

        {/* Dotted column rule */}
        <DottedRule vertical/>

        {/* Right column */}
        <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
          <Reveal>
            <Polaroid
              src={imgDaihoi2ToanCanh}
              alt="Toàn cảnh Đại hội II"
              caption="Toàn cảnh hội trường Đại hội II — Chiêm Hóa, Tuyên Quang, tháng 2/1951"
              rotate={-1.5}
              darkCaption
            />
          </Reveal>
          <Reveal delay={80}>
            <Polaroid
              src={imgDaihoi2PhatBieu}
              alt="Phát biểu tại Đại hội II"
              caption="Đại biểu phát biểu — Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam"
              rotate={1}
              darkCaption
            />
          </Reveal>
        </div>
      </div>

      <DottedRule my={24}/>

      {/* Điện Biên Phủ + Giơ-ne-vơ */}
      <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1px 1.1fr", gap: 0, marginBottom: 32 }}>
        <div style={{ paddingRight: 24, display: "flex", flexDirection: "column", gap: 24, justifyContent: "center" }}>
          <Reveal>
            <Polaroid
              src={imgDBP_CamCo}
              alt="Cắm cờ Điện Biên Phủ"
              caption="Bộ đội cắm cờ chiến thắng trên nóc hầm De Castries — 17h30 ngày 7/5/1954"
              rotate={-1}
              darkCaption
              height={170}
            />
          </Reveal>
          <Reveal delay={80}>
            <Polaroid
              src={imgGVR_KyKet}
              alt="Ký kết Hiệp định Giơ-ne-vơ"
              caption="Lễ ký kết Hiệp định Giơ-ne-vơ — Pháp thừa nhận độc lập, chủ quyền Việt Nam, 21/7/1954"
              rotate={1.5}
              darkCaption
              height={170}
            />
          </Reveal>
        </div>

        <DottedRule vertical/>

        <div style={{ paddingLeft: 24 }}>
          <Reveal>
            <RibbonHeader label="Ý nghĩa lịch sử &amp; Kinh nghiệm" />
          </Reveal>
          <Reveal>
            <h3 style={{ fontFamily: C.serif, fontSize: 18, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Ba ý nghĩa lịch sử lớn</h3>
            {P1_SIGNIFICANCE.map((sig, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 28, color: C.accent, opacity: 0.3, lineHeight: 1, flexShrink: 0, userSelect: "none" }}>{i + 1}</span>
                <p style={{ fontFamily: C.body, fontSize: 15, lineHeight: 1.6, color: C.dark, opacity: 0.85, paddingTop: 2 }}>{sig}</p>
              </div>
            ))}
          </Reveal>
          <DottedRule my={16}/>
          <Reveal delay={60}>
            <h3 style={{ fontFamily: C.serif, fontSize: 17, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Năm kinh nghiệm lãnh đạo</h3>
            {P1_LESSONS.map((l, i) => <Reveal key={i} delay={i * 40}><LessonRow num={l.num} title={l.title} desc={l.desc}/></Reveal>)}
          </Reveal>
        </div>
      </div>

      <DottedRule my={24}/>

      {/* DBP polaroid trio */}
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.1fr 1fr", gap: 20, alignItems: "center" }}>
          <Polaroid src={imgDBP_HopBan} alt="Bộ Chỉ huy họp bàn" caption='Bộ Chỉ huy họp bàn với phương châm "đánh chắc, tiến chắc"' rotate={-1.2} darkCaption={false} height={150}/>
          <Polaroid src={imgGVR_HoiNghi} alt="Hội nghị Giơ-ne-vơ" caption="Toàn cảnh Hội nghị Giơ-ne-vơ 1954" rotate={0.8} darkCaption={false} height={150}/>
          <div style={{ padding: "0 10px" }}>
            <MagazinePullQuote text="Hòa bình được lập lại ở Đông Dương — thắng lợi ngoại giao xuất phát từ thắng lợi quân sự quyết định."/>
          </div>
        </div>
      </Reveal>
    </MagazinePage>
  );
}
