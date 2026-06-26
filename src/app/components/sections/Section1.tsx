import { C } from "@/tokens";
import {
  P1_MILESTONES,
  P1_SIGNIFICANCE,
  P1_LESSONS,
  P1_MODERN_EVIDENCE,
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
import { Users, TrendingUp, Shield, Globe, Award } from "lucide-react";

function RibbonHeader({ label }: { label: string }) {
  return (
    <div
      className="ribbon-box"
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
      <span className="shimmer-star" style={{ color: C.accent, marginRight: 8, fontSize: 13 }}>★</span>
      {label}
    </div>
  );
}

// Map categories to corresponding Lucide icons
const categoryIcons: Record<string, React.ReactNode> = {
  "Chính trị": <Users size={24} color={C.red} />,
  "Kinh tế": <TrendingUp size={24} color={C.red} />,
  "Quốc phòng - An ninh": <Shield size={24} color={C.red} />,
  "Đối ngoại": <Globe size={24} color={C.red} />,
  "Xây dựng Đảng": <Award size={24} color={C.red} />,
};

export function Section1() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 22 — PHẦN I: LÝ THUYẾT LỊCH SỬ (1945–1954)
          ───────────────────────────────────────────────────────────────────────────── */}
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
            <Reveal effect="fade-left">
              <RibbonHeader label="Các cột mốc lịch sử" />
            </Reveal>
            {P1_MILESTONES.map((m, i) => (
              <Reveal key={i} delay={i * 60} effect="fade-left">
                <TimelineEntry date={m.date} title={m.title} body={m.body}/>
              </Reveal>
            ))}

            <DottedRule my={20}/>

            <Reveal effect="fade-left">
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
            <Reveal effect="rotate-in">
              <Polaroid
                src={imgDaihoi2ToanCanh}
                alt="Toàn cảnh Đại hội II"
                caption="Toàn cảnh hội trường Đại hội II — Chiêm Hóa, Tuyên Quang, tháng 2/1951"
                rotate={-1.5}
                darkCaption
              />
            </Reveal>
            <Reveal delay={120} effect="rotate-in">
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
            <Reveal effect="rotate-in">
              <Polaroid
                src={imgDBP_CamCo}
                alt="Cắm cờ Điện Biên Phủ"
                caption="Bộ đội cắm cờ chiến thắng trên nóc hầm De Castries — 17h30 ngày 7/5/1954"
                rotate={-1}
                darkCaption
                height={170}
              />
            </Reveal>
            <Reveal delay={120} effect="rotate-in">
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
            <Reveal effect="fade-right">
              <RibbonHeader label="Ý nghĩa lịch sử &amp; Kinh nghiệm" />
            </Reveal>
            <Reveal effect="fade-right">
              <h3 style={{ fontFamily: C.serif, fontSize: 21, fontWeight: 800, color: C.dark, marginBottom: 14 }}>Ba ý nghĩa lịch sử lớn</h3>
              {P1_SIGNIFICANCE.map((sig, i) => (
                <Reveal key={i} delay={i * 60} effect="fade-left">
                  <div className="sig-row" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 30, color: C.accent, opacity: 0.45, lineHeight: 1, flexShrink: 0, userSelect: "none", transition: "all 0.3s ease" }}>{i + 1}</span>
                    <p style={{ fontFamily: C.body, fontSize: 19, lineHeight: 1.65, color: C.dark, opacity: 0.96, paddingTop: 2 }}>{sig}</p>
                  </div>
                </Reveal>
              ))}
            </Reveal>
            <DottedRule my={16}/>
            <Reveal delay={60} effect="fade-right">
              <h3 style={{ fontFamily: C.serif, fontSize: 20, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Năm kinh nghiệm lãnh đạo</h3>
              {P1_LESSONS.map((l, i) => <Reveal key={i} delay={i * 40} effect="fade-right"><LessonRow num={l.num} title={l.title} desc={l.desc}/></Reveal>)}
            </Reveal>
          </div>
        </div>

        <DottedRule my={24}/>

        {/* DBP polaroid trio */}
        <Reveal effect="scale-up" duration={900}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.1fr 1fr", gap: 20, alignItems: "center" }}>
            <Polaroid src={imgDBP_HopBan} alt="Bộ Chỉ huy họp bàn" caption='Bộ Chỉ huy họp bàn với phương châm "đánh chắc, tiến chắc"' rotate={-1.2} darkCaption={false} height={150}/>
            <Polaroid src={imgGVR_HoiNghi} alt="Hội nghị Giơ-ne-vơ" caption="Toàn cảnh Hội nghị Giơ-ne-vơ 1954" rotate={0.8} darkCaption={false} height={150}/>
            <div style={{ padding: "0 10px" }}>
              <MagazinePullQuote text="Hòa bình được lập lại ở Đông Dương — thắng lợi ngoại giao xuất phát từ thắng lợi quân sự quyết định."/>
            </div>
          </div>
        </Reveal>
      </MagazinePage>

      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 23 — PHẦN I: DẪN CHỨNG TỪ BỐI CẢNH HIỆN NAY
          ───────────────────────────────────────────────────────────────────────────── */}
      <MagazinePage pageNum={23}>
        <Reveal>
          <div style={{ marginBottom: 28, position: "relative" }}>
            <div
              style={{
                background: C.red,
                color: "#fff",
                display: "inline-block",
                padding: "4px 10px",
                fontFamily: C.sans,
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Vận dụng thực tiễn
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 900,
                color: C.red,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                margin: "0 0 16px 0",
              }}
            >
              GIÁ TRỊ THỜI ĐẠI CỦA BÀI HỌC 1945 - 1954
            </h2>
            <p
              style={{
                fontFamily: C.body,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: C.dark,
                opacity: 0.9,
                margin: 0,
                maxWidth: 720,
              }}
            >
              Các bài học kinh nghiệm cốt lõi từ thời kỳ kháng chiến chống Pháp vẫn giữ nguyên giá trị thời đại, được Đảng kế thừa và phát triển sáng tạo trong công cuộc xây dựng và bảo vệ đất nước.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Editorial Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, marginBottom: 32 }}>
          {/* Left Column (Political, Economic, Defense) */}
          <div style={{ paddingRight: 24 }}>
            <Reveal effect="fade-left">
              <RibbonHeader label="Nội chính &amp; Phát triển nội lực" />
            </Reveal>

            {/* Item 1: Chính trị */}
            <Reveal effect="fade-left" delay={50}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 24 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `2px solid ${C.red}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(122, 26, 28, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {categoryIcons["Chính trị"]}
                </div>
                <div>
                  <h4 style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.red, textTransform: "uppercase", margin: "0 0 6px 0" }}>
                    {P1_MODERN_EVIDENCE[0].category} — {P1_MODERN_EVIDENCE[0].title}
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    {P1_MODERN_EVIDENCE[0].desc}
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 2: Kinh tế */}
            <Reveal effect="fade-left" delay={100}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 24 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `2px solid ${C.red}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(122, 26, 28, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {categoryIcons["Kinh tế"]}
                </div>
                <div>
                  <h4 style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.red, textTransform: "uppercase", margin: "0 0 6px 0" }}>
                    {P1_MODERN_EVIDENCE[1].category} — {P1_MODERN_EVIDENCE[1].title}
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    {P1_MODERN_EVIDENCE[1].desc}
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 3: Quốc phòng - An ninh */}
            <Reveal effect="fade-left" delay={150}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `2px solid ${C.red}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(122, 26, 28, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {categoryIcons["Quốc phòng - An ninh"]}
                </div>
                <div>
                  <h4 style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.red, textTransform: "uppercase", margin: "0 0 6px 0" }}>
                    {P1_MODERN_EVIDENCE[2].category} — {P1_MODERN_EVIDENCE[2].title}
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    {P1_MODERN_EVIDENCE[2].desc}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Dotted column rule */}
          <DottedRule vertical />

          {/* Right Column (Diplomacy, Party Building & Highlight Box) */}
          <div style={{ paddingLeft: 24 }}>
            <Reveal effect="fade-right">
              <RibbonHeader label="Đối ngoại &amp; Xây dựng Đảng" />
            </Reveal>

            {/* Item 4: Đối ngoại */}
            <Reveal effect="fade-right" delay={50}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 24 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `2px solid ${C.red}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(122, 26, 28, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {categoryIcons["Đối ngoại"]}
                </div>
                <div>
                  <h4 style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.red, textTransform: "uppercase", margin: "0 0 6px 0" }}>
                    {P1_MODERN_EVIDENCE[3].category} — {P1_MODERN_EVIDENCE[3].title}
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    {P1_MODERN_EVIDENCE[3].desc}
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 5: Xây dựng Đảng */}
            <Reveal effect="fade-right" delay={100}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 24 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `2px solid ${C.red}`,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(122, 26, 28, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {categoryIcons["Xây dựng Đảng"]}
                </div>
                <div>
                  <h4 style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.red, textTransform: "uppercase", margin: "0 0 6px 0" }}>
                    {P1_MODERN_EVIDENCE[4].category} — {P1_MODERN_EVIDENCE[4].title}
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    {P1_MODERN_EVIDENCE[4].desc}
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Quote / Highlight Box */}
            <Reveal effect="scale-up" delay={150}>
              <div style={{ background: C.bg2, padding: "16px 20px", borderLeft: `4px solid ${C.accent}`, marginTop: 10 }}>
                <p style={{ fontFamily: C.serif, fontSize: 15.5, fontStyle: "italic", color: C.dark, opacity: 0.9, lineHeight: 1.6, margin: 0 }}>
                  "Bài học quý giá nhất từ quá khứ không phải là việc lặp lại nguyên bản lịch sử, mà là khả năng vận dụng tinh túy của lịch sử để giải quyết những thách thức mang tính thời đại."
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Accent Banner */}
        <div
          style={{
            background: C.red,
            color: "#fff",
            padding: "16px 24px",
            marginTop: 20,
            display: "flex",
            gap: 16,
            alignItems: "center",
            border: `1px solid ${C.accent}`,
          }}
        >
          <Award size={24} color={C.accent} fill={C.accent} style={{ flexShrink: 0 }} />
          <p
            style={{
              fontFamily: C.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              lineHeight: 1.5,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            ĐOÀN KẾT, TỰ LỰC CÁNH SINH, KẾT HỢP SỨC MẠNH THỜI ĐẠI VÀ CHỈNH ĐỐN ĐẢNG LÀ KIM CHỈ NAM CHO MỌI THẮNG LỢI CỦA CÁCH MẠNG VIỆT NAM QUA CÁC THỜI KỲ.
          </p>
        </div>
      </MagazinePage>
    </>
  );
}
