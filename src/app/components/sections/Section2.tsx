import { useState } from "react";
import { C } from "@/tokens";
import {
  P2_MILESTONES,
  P2_LESSONS,
  P3_APPLICATIONS,
  P3_REFERENCES,
} from "@/data/content";
import {
  imgVT17_ToanCanh,
  imgVT17_Bien,
  imgVT17_NamBac,
  imgBacHo_BHH_1,
  imgBacHo_BHH_2,
  imgNQ15_HoiNghi,
  imgDongKhoi,
  imgMTGPMN,
  imgDaihoi3_1,
  imgDaihoi3_2,
  imgBaDamNhiem,
  imgBaSanSang,
  imgApBac,
  imgBinhGia,
  imgDongXoai,
  imgVuotSong,
  imgToLamUN,
  imgDipBottom1,
  imgDipBottom2,
  imgDipBottom3,
  imgDipBottom4,
  imgVietnamTrain,
  imgVietnamHighwayBridge,
  imgVietnamHighwayTraffic,
  imgVietnamMap,
} from "@/assets/images";
import { Reveal } from "@/app/components/ui/Reveal";
import { Polaroid } from "@/app/components/ui/Polaroid";
import { DottedRule } from "@/app/components/ui/DottedRule";
import { TimelineEntry } from "@/app/components/ui/TimelineEntry";
import { LessonRow } from "@/app/components/ui/LessonRow";
import { MagazinePage } from "@/app/components/ui/MagazinePage";
import { ArticleHeader } from "@/app/components/ui/ArticleHeader";
import {
  FactoryIcon,
  TractorIcon,
  PeopleIcon,
  SeedlingIcon,
  GroupIcon,
  GearIcon,
  StarIcon,
} from "@/app/components/ui/CustomIcons";

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
        fontSize: 12.5,
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

const getFourNoIcon = (idx: number, isHovered: boolean) => {
  const iconColor = isHovered ? C.accent : C.red;
  const accentColor = isHovered ? C.redMid : C.accent;
  const strokeW = 1.8;

  switch (idx) {
    case 0: // Không tham gia liên minh quân sự (Military Alliance)
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transition: C.tr }}>
          {/* Shield base */}
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={iconColor} strokeWidth={strokeW} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Interlocking links representing alliances */}
          <path d="M9 11.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" stroke={accentColor} strokeWidth="1.5" />
          <path d="M15 11.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" stroke={accentColor} strokeWidth="1.5" />
          <path d="M11 13h2" stroke={accentColor} strokeWidth="1.5" />
          {/* Prohibition slash */}
          <line x1="6" y1="6" x2="18" y2="18" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 1: // Không liên kết với nước này để chống nước kia (Neutral balance scale)
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transition: C.tr }}>
          {/* Stand */}
          <path d="M12 4v16M9 20h6" stroke={iconColor} strokeWidth={strokeW} strokeLinecap="round" />
          {/* Crossbar */}
          <path d="M6 8h12" stroke={accentColor} strokeWidth={strokeW} strokeLinecap="round" />
          {/* Left Pan */}
          <path d="M6 8l-2 6h4l-2-6z" stroke={iconColor} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Right Pan */}
          <path d="M18 8l-2 6h4l-2-6z" stroke={iconColor} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Pivot point */}
          <circle cx="12" cy="8" r="1.5" fill={iconColor} />
          {/* Small no-slash or arrow showing neutral/balance */}
          <path d="M12 11l-2-2m2 2l2-2" stroke={C.red} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 2: // Không cho nước ngoài đặt căn cứ quân sự (No military base)
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transition: C.tr }}>
          {/* Military fort tower */}
          <path d="M3 20h18M5 20v-7h2l1 2h8l1-2h2v7" stroke={iconColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" />
          {/* Watchtower top / battlements */}
          <path d="M8 13V8h8v5" stroke={accentColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" />
          {/* Flagpole and flag */}
          <path d="M12 8V4l3 1.5L12 7" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Gate */}
          <path d="M10 20v-4a2 2 0 0 1 4 0v4" stroke={iconColor} strokeWidth={strokeW} strokeLinecap="round" />
          {/* Prohibition slash */}
          <line x1="4" y1="5" x2="20" y2="19" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 3: // Không sử dụng hoặc đe dọa sử dụng vũ lực (Peace dove)
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transition: C.tr }}>
          {/* Elegant peace dove silhouette */}
          <path d="M20 7.5c-1 0-2.5.5-3.5 1.5-1.5 1.5-3.5 1.5-5 0A5.5 5.5 0 0 0 4 13.5c0 2 1.5 3.5 3 3.5.8 0 1.8-.5 2.5-1.2l.5-.5M15.5 10c0-2-1.5-4-4-4" stroke={iconColor} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" />
          {/* Wings */}
          <path d="M12 9c-1-2.5-3-3.5-5.5-3.5M10.5 12.5C9.5 11 8.5 9 8.5 7" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          {/* Olive branch in beak */}
          <path d="M19 8c.5-1 1.5-1.5 2-1.5M18.5 8.5c-.3-.8-.8-1.5-1.5-1.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
          {/* Crossed swords symbol but sheathed/cancelled */}
          <path d="M5 5l4 4M9 5L5 9" stroke={C.red} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

export function Section2() {
  const [hoveredFourNo, setHoveredFourNo] = useState<number | null>(null);
  const [hoveredFlag, setHoveredFlag] = useState<number | null>(null);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 23 — DIRECT MATCH TO USER MOCKUP IMAGE
          ───────────────────────────────────────────────────────────────────────────── */}
      <MagazinePage id="phan-2" pageNum={24}>
        {/* Top Header Block */}
        <Reveal effect="fade-up">
          <div style={{ marginBottom: 28, position: "relative" }}>
            <div
              style={{
                background: C.red,
                color: "#fff",
                display: "inline-block",
                padding: "4px 10px",
                fontFamily: C.sans,
                fontSize: 14,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Phần II.1 · Lý thuyết lịch sử (1954 - 1960)
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 900,
                color: C.red,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                margin: "0 0 16px 0",
              }}
            >
              Khôi phục kinh tế, cải tạo XHCN ở miền Bắc và chuyển <br />
              cách mạng miền Nam sang thế tiến công (1954-1960)
            </h2>
            <p
              style={{
                fontFamily: C.body,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: C.dark,
                opacity: 0.9,
                margin: 0,
                maxWidth: 620,
              }}
            >
              Sau Hiệp định Giơnevơ năm 1954, Việt Nam bị chia làm hai miền với hai chế độ chính trị khác nhau:{" "}
              <strong>miền Bắc hoàn toàn giải phóng</strong>, <strong>miền Nam</strong> trở thành thuộc địa kiểu mới của đế quốc Mỹ.
            </p>
          </div>
        </Reveal>

        {/* Main Grid: left column (Tại miền Bắc) | right column (Tại miền Nam) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            alignItems: "start",
            marginBottom: 28,
          }}
        >
          {/* Left Column — Tại miền Bắc */}
          <div
            style={{
              borderRight: `1px dotted rgba(122,26,28,0.25)`,
              paddingRight: 24,
            }}
          >
            <Reveal effect="fade-left">
              <RibbonHeader label="Tại miền Bắc" />
            </Reveal>

            {/* Item 1: Khôi phục kinh tế */}
            <Reveal effect="fade-left" delay={50}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <FactoryIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Khôi phục kinh tế (1954-1957):
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Nhiệm vụ trọng tâm là hàn gắn vết thương chiến tranh và phục hồi sản xuất nông nghiệp. Đảng đã lãnh đạo nhân dân đấu tranh đòi đối phương rút quân đúng lịch trình và ổn định tình hình chính trị - xã hội. Đến năm 1957, sản xuất nông nghiệp miền Bắc đã đạt mức cao nhất thời Pháp thuộc, nạn đói bị đẩy lùi.
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 2: Cải cách ruộng đất */}
            <Reveal effect="fade-left" delay={100}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <TractorIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Cải cách ruộng đất:
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Đến tháng 7-1956, chế độ chiếm hữu ruộng đất phong kiến đã bị xóa bỏ hoàn toàn. Tuy nhiên, trong quá trình thực hiện đã xảy ra những sai lầm nghiêm trọng do chủ quan, giáo điều. Hội nghị Trung ương 10 (khóa II) đã nghiêm khắc kiểm điểm và tiến hành sửa sai thành công.
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 3: Cải tạo XHCN */}
            <Reveal effect="fade-left" delay={150}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <PeopleIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Cải tạo xã hội chủ nghĩa (1958-1960):
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Miền Bắc chuyển sang giai đoạn cải tạo kinh tế cá thể của nông dân, thợ thủ công và tư bản tư doanh, xây dựng quan hệ sản xuất mới dựa trên sở hữu toàn dân và tập thể.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column — Tại miền Nam */}
          <div style={{ paddingLeft: 12 }}>
            <Reveal effect="fade-right">
              <RibbonHeader label="Tại miền Nam" />
            </Reveal>

            {/* Item 1: Đối phó thực dân mới */}
            <Reveal effect="fade-right" delay={50}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <PeopleIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Đối phó với chính sách thực dân mới:
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Mỹ hất cẳng Pháp, lập nên chính quyền tay sai Ngô Đình Diệm, thực hiện quốc sách "tố cộng, diệt cộng" tàn bạo.
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 2: Chuyển hướng đấu tranh */}
            <Reveal effect="fade-right" delay={100}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <GearIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Chuyển hướng đấu tranh:
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Từ tháng 7-1954, Đảng quyết định chuyển từ đấu tranh quân sự sang đấu tranh chính trị để đòi thi hành Hiệp định.
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 3: Nghị quyết 15 */}
            <Reveal effect="fade-right" delay={150}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <StarIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Nghị quyết 15 (1-1959):
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Ra đời trong Hội nghị TW lần thứ 15 khoá II: Đánh dấu bước ngoặt lớn, Đảng xác định con đường cách mạng miền Nam là sử dụng bạo lực cách mạng, kết hợp đấu tranh chính trị với đấu tranh quân sự để giành chính quyền.
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Item 4: Phong trào Đồng khởi */}
            <Reveal effect="fade-right" delay={200}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <GroupIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Phong trào Đồng khởi (1960):
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Bắt đầu từ Bến Tre, phong trào lan rộng khắp miền Nam, làm tan rã cơ cấu chính quyền cơ sở của địch, chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công. Mặt trận Dân tộc giải phóng miền Nam Việt Nam ra đời (20-12-1960).
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Section Grid: Dấu ấn | Bắc-Hưng-Hải */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 28,
            alignItems: "end",
            borderTop: `1.5px solid rgba(122,26,28,0.25)`,
            paddingTop: 24,
          }}
        >
          {/* Left: Dấu ấn timeline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                background: C.red,
                color: "#fff",
                padding: "6px 14px",
                fontFamily: C.sans,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
                alignSelf: "start",
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
              }}
            >
              Dấu ấn giai đoạn 1954 - 1960
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                paddingLeft: 10,
              }}
            >
              {/* Vertical connector line */}
              <div
                style={{
                  position: "absolute",
                  left: 21,
                  top: 10,
                  bottom: 10,
                  width: 1.5,
                  borderLeft: `1.5px dashed ${C.red}`,
                  opacity: 0.4,
                }}
              />

              {/* Point 1 */}
              <div style={{ display: "flex", gap: 14, alignItems: "center", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: `1.5px solid ${C.red}`,
                    background: C.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.red,
                    flexShrink: 0,
                  }}
                >
                  <SeedlingIcon size={12} color={C.red} />
                </div>
                <span style={{ fontFamily: C.body, fontSize: 14.5, color: C.dark, opacity: 0.9 }}>
                  Kinh tế phục hồi và phát triển, đặc biệt là nông nghiệp.
                </span>
              </div>

              {/* Point 2 */}
              <div style={{ display: "flex", gap: 14, alignItems: "center", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: `1.5px solid ${C.red}`,
                    background: C.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.red,
                    flexShrink: 0,
                  }}
                >
                  <GroupIcon size={12} color={C.red} />
                </div>
                <span style={{ fontFamily: C.body, fontSize: 14.5, color: C.dark, opacity: 0.9 }}>
                  Cải cách ruộng đất xóa bỏ chế độ phong kiến, tạo cơ sở phát triển.
                </span>
              </div>

              {/* Point 3 */}
              <div style={{ display: "flex", gap: 14, alignItems: "center", position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: `1.5px solid ${C.red}`,
                    background: C.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.red,
                    flexShrink: 0,
                  }}
                >
                  <GearIcon size={12} color={C.red} />
                </div>
                <span style={{ fontFamily: C.body, fontSize: 14.5, color: C.dark, opacity: 0.9 }}>
                  Xây dựng nền tảng cho chủ nghĩa xã hội ở miền Bắc.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Bắc-Hưng-Hải Polaroid */}
          <div>
            <Polaroid
              src={imgBacHo_BHH_1}
              alt="Bác Hồ tại Bắc Hưng Hải"
              caption="Chủ tịch Hồ Chí Minh thăm công trình thủy nông Bắc-Hưng-Hải (1958)"
              rotate={1}
              darkCaption
              height={140}
            />
          </div>
        </div>

        {/* Bottom Crimson Banner strip */}
        <div
          style={{
            background: C.red,
            color: "#fff",
            padding: "16px 24px",
            marginTop: 28,
            display: "flex",
            gap: 16,
            alignItems: "center",
            border: `1px solid ${C.accent}`,
          }}
        >
          <StarIcon size={24} color={C.accent} fill={C.accent} style={{ flexShrink: 0 }} />
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
            GIAI ĐOẠN 1954 - 1960 LÀ THỜI KỲ ĐẦY THỬ THÁCH NHƯNG CŨNG HẾT SỨC VẺ VANG CỦA CÁCH MẠNG MIỀN BẮC, ĐẶT NỀN MÓNG VỮNG CHẮC CHO SỰ NGHIỆP GIẢI PHÓNG MIỀN NAM, THỐNG NHẤT ĐẤT NƯỚC.
          </p>
        </div>
      </MagazinePage>

      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 24 — KHÁNG CHIẾN CHỐNG MỸ & THỰC HIỆN HAI CHIẾN LƯỢC (1961 - 1965)
          ───────────────────────────────────────────────────────────────────────────── */}
      <MagazinePage pageNum={25}>
        {/* Top Header Block */}
        <Reveal effect="fade-up">
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                background: C.red,
                color: "#fff",
                display: "inline-block",
                padding: "4px 10px",
                fontFamily: C.sans,
                fontSize: 14,
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Phần II.1 · Lý thuyết lịch sử (1961 - 1965)
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 900,
                color: C.red,
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                margin: "0 0 16px 0",
              }}
            >
              Xây dựng chủ nghĩa xã hội ở miền Bắc và đánh bại <br />
              chiến lược "Chiến tranh đặc biệt" ở miền Nam (1961-1965)
            </h2>
            <p
              style={{
                fontFamily: C.body,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: C.dark,
                opacity: 0.9,
                margin: 0,
                maxWidth: 620,
              }}
            >
              Đại hội đại biểu toàn quốc lần thứ III (9-1960) đã hoàn chỉnh đường lối chiến lược chung cho cách mạng cả nước.
            </p>
          </div>
        </Reveal>

        {/* Grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
            alignItems: "start",
            marginBottom: 28,
          }}
        >
          {/* Left column */}
          <div
            style={{
              borderRight: `1px dotted rgba(122,26,28,0.25)`,
              paddingRight: 24,
            }}
          >
            <Reveal effect="fade-left">
              <RibbonHeader label="Tại miền Bắc" />
            </Reveal>

            {/* Đường lối chung */}
            <Reveal effect="fade-left" delay={50}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <GearIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Đường lối chung &amp; Hai chiến lược:
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Thực hiện đồng thời hai chiến lược cách mạng: cách mạng XHCN ở miền Bắc và cách mạng dân tộc dân chủ nhân dân ở miền Nam.
                    <br />
                    • <strong>Miền Bắc:</strong> Giữ vai trò quyết định nhất đối với sự phát triển của toàn bộ cách mạng Việt Nam.
                    <br />
                    • <strong>Miền Nam:</strong> Giữ vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam.
                    <br />
                    • <strong>Mục tiêu chung:</strong> Giải phóng miền Nam, hòa bình thống nhất đất nước.
                  </p>
                </div>
              </div>
            </Reveal>

            <DottedRule my={16} />

            {/* Kế hoạch 5 năm */}
            <Reveal effect="fade-left" delay={100}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <FactoryIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Kế hoạch 5 năm lần thứ nhất (1961-1965):
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Nhằm xây dựng bước đầu cơ sở vật chất - kỹ thuật cho CNXH. Các phong trào thi đua như "Mỗi người làm việc bằng hai" dấy lên mạnh mẽ. Miền Bắc bắt đầu chi viện lớn về người và của cho miền Nam qua đường Trường Sơn và đường Hồ Chí Minh trên biển.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column */}
          <div style={{ paddingLeft: 12, display: "flex", flexDirection: "column", gap: 20 }}>
            <Reveal effect="fade-right">
              <RibbonHeader label="Tại miền Nam" />
            </Reveal>

            {/* Đánh bại Chiến tranh đặc biệt */}
            <Reveal effect="fade-right" delay={50}>
              <div className="circle-badge-container" style={{ display: "flex", gap: 16, alignItems: "start", marginBottom: 20 }}>
                <div
                  className="circle-badge"
                  style={{
                    width: 56,
                    height: 56,
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
                  <PeopleIcon size={26} color={C.red} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: C.red,
                      textTransform: "uppercase",
                      margin: "0 0 6px 0",
                    }}
                  >
                    Đánh bại Chiến tranh đặc biệt:
                  </h4>
                  <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                    Mỹ thực hiện công thức "cố vấn, vũ khí Mỹ và quân chủ lực Việt Nam Cộng hòa" cùng quốc sách "ấp chiến lược".
                    <br />
                    Đảng chỉ đạo giữ vững thế tiến công, đánh địch bằng "ba mũi giáp công" (quân sự, chính trị, binh vận) trên cả "ba vùng chiến lược" (đô thị, nông thôn đồng bằng, miền núi).
                    <br />
                    Chiến thắng Ấp Bắc (1963) và các chiến dịch Bình Giã, Ba Gia, Đồng Xoài (1964-1965) đã làm phá sản hoàn toàn chiến lược "Chiến tranh đặc biệt" của Mỹ.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bác Hồ / Đại hội III image */}
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "5px",
                background: "#fff",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={imgDaihoi3_2}
                alt="Đại hội Đảng III"
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  display: "block",
                  filter: "sepia(0.2) contrast(1.05) brightness(0.95)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 28,
            alignItems: "end",
            borderTop: `1.5px solid rgba(122,26,28,0.25)`,
            paddingTop: 24,
          }}
        >
          {/* Lessons list */}
          <div>
            <div
              style={{
                background: C.red,
                color: "#fff",
                padding: "6px 14px",
                fontFamily: C.sans,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
                alignSelf: "start",
                clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)",
              }}
            >
              Bốn bài học chiến lược
            </div>
            <div style={{ maxWidth: "100%" }}>
              {P2_LESSONS.map((l, i) => (
                <LessonRow key={i} num={l.num} title={l.title} desc={l.desc} />
              ))}
            </div>
          </div>

          {/* Right: Polaroid of Ấp Bắc / Bình Giã */}
          <div>
            <Polaroid
              src={imgApBac}
              alt="Chiến thắng Ấp Bắc"
              caption="Chiến thắng Ấp Bắc (1963) khẳng định khả năng đánh bại trực thăng vận của Mỹ."
              rotate={-1.5}
              darkCaption
              height={140}
            />
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            background: C.red,
            color: "#fff",
            padding: "16px 24px",
            marginTop: 28,
            display: "flex",
            gap: 16,
            alignItems: "center",
            border: `1px solid ${C.accent}`,
          }}
        >
          <StarIcon size={24} color={C.accent} fill={C.accent} style={{ flexShrink: 0 }} />
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
            ĐƯỜNG LỐI HAI CHIẾN LƯỢC LÀ SÁNG TẠO ĐỘC ĐÁO CỦA ĐẢNG, GIÚP HUY ĐỘNG SỨC MẠNH TOÀN DIỆN CỦA HẬU PHƯƠNG MIỀN BẮC CHI VIỆN CHO TIỀN TUYẾN MIỀN NAM.
          </p>
        </div>
      </MagazinePage>

      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 26 — VẬN DỤNG SÁNG TẠO BÀI HỌC VÀO CÔNG CUỘC ĐỔI MỚI HIỆN NAY
          ─── NỀN NÂU & BE (Brown–Ivory themed) ──────────────────────────────────── */}
      {/* Brown-Ivory themed magazine page — dùng wrapper custom thay vì MagazinePage */}
      <Reveal effect="scale-up" duration={950}>
        <article
          className="magazine-page-shadow section-container"
          style={{
            width: "100%",
            maxWidth: 960,
            margin: "64px auto",
            background: "#f5eedc", // Warm ivory/be background
            color: C.dark,
            border: `1.5px solid rgba(100,70,34,0.30)`, // Brown border
            position: "relative",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.4s ease, transform 0.4s ease",
          }}
        >
          <div
            style={{
              margin: "16px",
              padding: "24px 28px",
              border: `1px solid rgba(100,70,34,0.28)`,
              outline: `3px double rgba(100,70,34,0.22)`,
              outlineOffset: "-6px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }}>

              {/* Top Header Block — HERO BANNER with Tô Lâm background */}
              <Reveal>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    minHeight: 300,
                    overflow: "hidden",
                    marginBottom: 20,
                    borderRadius: 2,
                  }}
                >
                  {/* Background image */}
                  <img
                    src={imgToLamUN}
                    alt="Tổng Bí thư Tô Lâm tại LHQ"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 30%",
                      display: "block",
                    }}
                  />

                  {/* Gradient overlay — đậm ở trái, trong suốt dần sang phải */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to right, rgba(30,15,5,0.88) 0%, rgba(20,10,2,0.72) 45%, rgba(10,5,0,0.45) 70%, rgba(0,0,0,0.20) 100%)",
                    }}
                  />

                  {/* Content overlay — 2 cột */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      display: "grid",
                      gridTemplateColumns: "1.1fr 0.9fr",
                      gap: 0,
                      padding: "24px 28px",
                      minHeight: 300,
                      alignItems: "center",
                    }}
                  >
                    {/* Left — Bamboo + Title */}
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      {/* Bamboo vertical decoration */}
                      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ background: C.red, color: "#fff", fontFamily: C.sans, fontSize: 11, fontWeight: 900, padding: "2px 6px", marginBottom: 6, borderRadius: 1 }}>
                          1.2.
                        </div>
                        <svg width="20" height="110" viewBox="0 0 24 120" fill="none">
                          <path d="M12,5 L12,115 M8,25 Q12,30 18,20 M16,55 Q12,60 6,50 M8,85 Q12,90 18,80" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M18,20 C19,25 17,28 15,25 C13,22 15,18 18,20 Z" fill={C.accent} opacity="0.85" />
                          <path d="M6,50 C5,55 7,58 9,55 C11,52 9,48 6,50 Z" fill={C.accent} opacity="0.85" />
                        </svg>
                      </div>

                      <div>
                        <p style={{ fontFamily: C.sans, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.accent, margin: "0 0 6px 0", letterSpacing: "0.1em" }}>
                          Ví dụ thực tiễn, bối cảnh hiện nay:
                        </p>
                        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                          TRƯỜNG PHÁI <span style={{ color: C.accent }}>"NGOẠI GIAO CÂY TRE"</span> <br />
                          VÀ CHÍNH SÁCH QUỐC PHÒNG <span style={{ color: C.accent }}>"4 KHÔNG"</span>
                        </h2>
                      </div>
                    </div>

                    {/* Right — Quote block */}
                    <div
                      style={{
                        background: "rgba(0,0,0,0.45)",
                        border: `1px solid rgba(${parseInt(C.accent.slice(1, 3), 16)},${parseInt(C.accent.slice(3, 5), 16)},${parseInt(C.accent.slice(5, 7), 16)},0.4)`,
                        backdropFilter: "blur(4px)",
                        padding: "16px 18px",
                        position: "relative",
                      }}
                    >
                      <span style={{ fontSize: 40, fontFamily: C.serif, color: C.accent, lineHeight: 1, position: "absolute", top: 4, left: 10, opacity: 0.5 }}>"</span>
                      <p style={{ fontFamily: C.serif, fontSize: 12.5, fontStyle: "italic", lineHeight: 1.55, color: "#f5eedc", margin: "0 0 10px 8px", opacity: 0.95 }}>
                        "Ngoại giao cây tre Việt Nam là nghệ thuật ứng xử mềm dẻo, linh hoạt nhưng rất kiên cường, kiên định về nguyên tắc và mục tiêu."
                      </p>
                      <div style={{ borderTop: `1px solid rgba(212,163,69,0.4)`, paddingTop: 8 }}>
                        <p style={{ fontFamily: C.sans, fontSize: 10, fontWeight: 700, color: C.accent, margin: "0 0 2px 0" }}>
                          Tổng Bí thư Tô Lâm
                        </p>
                        <p style={{ fontFamily: C.sans, fontSize: 8.5, color: "rgba(245,238,220,0.7)", margin: 0 }}>
                          Phát biểu tại Đại hội đồng LHQ khóa 79 (9/2024)
                        </p>
                      </div>
                      <p style={{ fontFamily: C.sans, fontSize: 7.5, color: "rgba(245,238,220,0.45)", textAlign: "right", margin: "6px 0 0 0" }}>
                        Nguồn: Báo Nhân Dân (10/2024)
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>



              {/* 2-Col Body Layout */}
              <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 24, marginBottom: 20 }}>

                {/* Left Column (Content 1 & 2) */}
                <div>
                  {/* 1. Trường phái Ngoại giao cây tre */}
                  <Reveal effect="fade-left">
                    <h3 style={{ fontFamily: C.serif, fontSize: 17.5, fontWeight: 800, color: C.red, margin: "0 0 10px 0" }}>
                      1. Trường phái "Ngoại giao cây tre"
                    </h3>
                    <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.6, color: C.dark, opacity: 0.95, margin: "0 0 12px 0", textAlign: "justify" }}>
                      Bài học về độc lập, tự chủ và linh hoạt trong quan hệ quốc tế tiếp tục được thể hiện qua trường phái "Ngoại giao cây tre Việt Nam". Trong bối cảnh cạnh tranh chiến lược giữa các nước lớn ngày càng phức tạp, Việt Nam kiên định đường lối đối ngoại độc lập, tự chủ, hòa bình, hợp tác và phát triển; đồng thời thực hiện đa phương hóa, đa dạng hóa quan hệ quốc tế. Ngoại giao Việt Nam được xác định là kiên định về nguyên tắc và mục tiêu nhưng linh hoạt, chủ động về phương pháp, qua đó bảo vệ lợi ích quốc gia – dân tộc và duy trì môi trường hòa bình phục vụ phát triển đất nước (Bộ Ngoại giao, 2024).
                    </p>
                    <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.6, color: C.dark, opacity: 0.95, margin: 0, textAlign: "justify" }}>
                      Tính đến năm 2026, Việt Nam đã thiết lập quan hệ Đối tác chiến lược toàn diện với cả năm nước Ủy viên Thường trực Hội đồng Bảo an Liên Hợp Quốc, gồm Trung Quốc, Nga, Mỹ, Pháp và Anh. Trong đó, quan hệ Việt Nam – Anh được nâng cấp lên Đối tác chiến lược toàn diện vào tháng 10 năm 2025 (Bộ Ngoại giao, 2025). Điều này phản ánh khả năng mở rộng và cân bằng quan hệ với các nước lớn trên cơ sở tôn trọng độc lập, chủ quyền và lợi ích quốc gia.
                    </p>
                  </Reveal>

                  <DottedRule my={16} />

                  {/* 2. Chính sách quốc phòng 4 không */}
                  <Reveal effect="fade-left" delay={80}>
                    <h3 style={{ fontFamily: C.serif, fontSize: 17.5, fontWeight: 800, color: C.red, margin: "0 0 10px 0" }}>
                      2. Chính sách quốc phòng "4 không"
                    </h3>
                    <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.6, color: C.dark, opacity: 0.95, margin: "0 0 16px 0" }}>
                      Bên cạnh đó, chính sách quốc phòng "4 không" của Việt Nam bao gồm:
                    </p>

                    {/* 4 items list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {[
                        "Không tham gia liên minh quân sự",
                        "Không liên kết với nước này để chống nước kia",
                        "Không cho nước ngoài đặt căn cứ quân sự hoặc sử dụng lãnh thổ Việt Nam để chống lại nước khác",
                        "Không sử dụng hoặc đe dọa sử dụng vũ lực trong quan hệ quốc tế"
                      ].map((item, idx) => {
                        const isHovered = hoveredFourNo === idx;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setHoveredFourNo(idx)}
                            onMouseLeave={() => setHoveredFourNo(null)}
                            style={{
                              display: "flex",
                              gap: 14,
                              alignItems: "center",
                              padding: "12px 14px",
                              background: isHovered ? "rgba(122,26,28,0.06)" : "rgba(100,70,34,0.03)",
                              border: `1px solid ${isHovered ? C.red : "rgba(100,70,34,0.12)"}`,
                              borderRadius: 4,
                              transition: C.tr,
                              cursor: "pointer",
                              boxShadow: isHovered ? "0 4px 12px rgba(122,26,28,0.08)" : "none",
                              transform: isHovered ? "translateX(6px)" : "none",
                            }}
                          >
                            <div style={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              border: `1.5px solid ${isHovered ? C.accent : C.red}`,
                              background: isHovered ? "#fff" : "#ede0c8",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              flexShrink: 0,
                              transition: C.tr,
                              boxShadow: isHovered ? "0 2px 8px rgba(122,26,28,0.12)" : "none",
                            }}>
                              {getFourNoIcon(idx, isHovered)}
                            </div>
                            <span style={{
                              fontFamily: C.body,
                              fontSize: 14.5,
                              fontWeight: isHovered ? 600 : 500,
                              lineHeight: 1.45,
                              color: isHovered ? C.red : C.dark,
                              transition: C.tr,
                            }}>
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p style={{ fontFamily: C.sans, fontSize: 9, color: C.muted, margin: "12px 0 0 0" }}>Nguồn: Bộ Quốc phòng (2019)</p>
                  </Reveal>
                </div>

                {/* Right Column (Partners table & Quote) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Partners Table Card */}
                  <Reveal effect="fade-right">
                    <div style={{ border: `1.5px solid rgba(122,26,28,0.25)`, padding: 18, background: "#fff", boxShadow: "0 4px 16px rgba(100,70,34,0.06)", transition: C.tr }}>
                      <p style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: C.red, textAlign: "center", margin: "0 0 16px 0", letterSpacing: "0.04em" }}>
                        VIỆT NAM – ĐỐI TÁC CHIẾN LƯỢC TOÀN DIỆN <br />
                        VỚI CÁC NƯỚC UỶ VIÊN THƯỜNG TRỰC HĐBA LHQ
                      </p>

                      {/* Flags row */}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 18 }}>
                        {[
                          {
                            name: "Trung Quốc",
                            flag: (
                              <svg viewBox="0 0 30 20" style={{ width: 44, height: 28, border: "1.5px solid rgba(100,70,34,0.12)" }}>
                                <rect width="30" height="20" fill="#de2910" />
                                <polygon points="6,6 5.5,4.5 4,4 5.5,3.5 6,2 6.5,3.5 8,4 6.5,4.5" fill="#ffde00" />
                              </svg>
                            )
                          },
                          {
                            name: "Nga",
                            flag: (
                              <svg viewBox="0 0 30 20" style={{ width: 44, height: 28, border: "1.5px solid rgba(100,70,34,0.12)" }}>
                                <rect width="30" height="6.6" fill="#fff" />
                                <rect y="6.6" width="30" height="6.8" fill="#0039a6" />
                                <rect y="13.4" width="30" height="6.6" fill="#d52b1e" />
                              </svg>
                            )
                          },
                          {
                            name: "Mỹ",
                            flag: (
                              <svg viewBox="0 0 30 20" style={{ width: 44, height: 28, border: "1.5px solid rgba(100,70,34,0.12)" }}>
                                <rect width="30" height="20" fill="#fff" />
                                {/* Stripes */}
                                {[...Array(7)].map((_, i) => (
                                  <rect key={i} y={i * 2.8} width="30" height="1.4" fill="#b22234" />
                                ))}
                                <rect width="13" height="11" fill="#3c3b6e" />
                              </svg>
                            )
                          },
                          {
                            name: "Pháp",
                            flag: (
                              <svg viewBox="0 0 30 20" style={{ width: 44, height: 28, border: "1.5px solid rgba(100,70,34,0.12)" }}>
                                <rect width="10" height="20" fill="#002395" />
                                <rect x="10" width="10" height="20" fill="#fff" />
                                <rect x="20" width="10" height="20" fill="#ed2939" />
                              </svg>
                            )
                          },
                          {
                            name: "Anh",
                            flag: (
                              <svg viewBox="0 0 30 20" style={{ width: 44, height: 28, border: "1.5px solid rgba(100,70,34,0.12)" }}>
                                <rect width="30" height="20" fill="#012169" />
                                {/* Diagonals */}
                                <path d="M0,0 L30,20 M0,20 L30,0" stroke="#fff" strokeWidth="2.5" />
                                <path d="M0,0 L30,20 M0,20 L30,0" stroke="#c8102e" strokeWidth="1" />
                                {/* Cross */}
                                <path d="M15,0 L15,20 M0,10 L30,10" stroke="#fff" strokeWidth="4.5" />
                                <path d="M15,0 L15,20 M0,10 L30,10" stroke="#c8102e" strokeWidth="2.5" />
                              </svg>
                            )
                          }
                        ].map((f, i) => {
                          const isHovered = hoveredFlag === i;
                          return (
                            <div
                              key={i}
                              onMouseEnter={() => setHoveredFlag(i)}
                              onMouseLeave={() => setHoveredFlag(null)}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 6,
                                cursor: "pointer",
                                transition: C.tr,
                                transform: isHovered ? "scale(1.15)" : "scale(1)",
                              }}
                            >
                              <div style={{
                                transition: C.tr,
                                boxShadow: isHovered ? "0 6px 16px rgba(122,26,28,0.25)" : "0 2px 6px rgba(0,0,0,0.08)",
                                border: isHovered ? `1.5px solid ${C.accent}` : "1.5px solid rgba(100,70,34,0.15)",
                                borderRadius: 3,
                                overflow: "hidden",
                                display: "flex",
                              }}>
                                {f.flag}
                              </div>
                              <span style={{
                                fontFamily: C.sans,
                                fontSize: 10,
                                fontWeight: isHovered ? 700 : 600,
                                color: isHovered ? C.red : C.dark,
                                opacity: isHovered ? 1 : 0.85,
                                transition: C.tr,
                              }}>
                                {f.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Calendar box */}
                      <div style={{ display: "flex", gap: 12, background: "rgba(212,163,69,0.06)", padding: "12px 14px", border: "1px solid rgba(122,26,28,0.15)", borderRadius: 4, transition: C.tr }}>
                        <div style={{ color: C.red, display: "flex", alignItems: "center", transition: C.tr }}>
                          {/* Simple calendar icon */}
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.5, color: C.dark, margin: 0 }}>
                          <strong style={{ color: C.red }}>Tháng 10/2025:</strong> Quan hệ Việt Nam – Anh được chính thức nâng cấp lên Đối tác chiến lược toàn diện.
                        </p>
                      </div>
                      <p style={{ fontFamily: C.sans, fontSize: 9, color: C.muted, margin: "8px 0 0 0", textAlign: "right" }}>
                        Nguồn: Bộ Ngoại giao (2025)
                      </p>
                    </div>
                  </Reveal>

                  {/* Brown Bamboo Quote Block */}
                  <Reveal effect="fade-right" delay={100}>
                    <div style={{
                      background: C.brown, // Deep warm brown
                      color: "#fff",
                      padding: "20px 24px",
                      position: "relative",
                      overflow: "hidden",
                      borderLeft: `4px solid ${C.accent}`,
                      borderRadius: "0 4px 4px 0",
                      boxShadow: "0 4px 12px rgba(100,70,34,0.12)",
                    }}>
                      {/* Bamboo background vector opacity overlay */}
                      <div style={{ position: "absolute", right: -10, bottom: -10, opacity: 0.15, pointerEvents: "none" }}>
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                          <path d="M50,10 L50,90 M30,40 Q50,45 70,35 M40,70 Q50,75 70,65" stroke="#fff" strokeWidth="3" />
                        </svg>
                      </div>

                      <span style={{ fontSize: 48, fontFamily: C.serif, color: C.accent, lineHeight: 1, position: "absolute", top: 8, left: 14, opacity: 0.35 }}>"</span>
                      <p style={{ fontFamily: C.serif, fontSize: 14.5, fontStyle: "italic", lineHeight: 1.6, margin: "0 0 0 14px", position: "relative", zIndex: 1, textAlign: "justify" }}>
                        Chính sách "4 không" thể hiện sự kế thừa bài học độc lập, tự chủ trong giai đoạn 1954–1965, đồng thời cho thấy Việt Nam không phụ thuộc hoặc bị cuốn vào sự đối đầu giữa các cường quốc nhưng vẫn chủ động mở rộng hợp tác quốc phòng và quốc tế.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Bottom row of 4 photos */}
              <Reveal effect="scale-up" duration={800}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 18 }}>
                  {[imgDipBottom1, imgDipBottom2, imgDipBottom3, imgDipBottom4].map((img, i) => (
                    <div key={i} style={{ border: `1px solid rgba(100,70,34,0.18)`, padding: 4, background: "#fff", boxShadow: "0 2px 6px rgba(100,70,34,0.08)" }}>
                      <img
                        src={img}
                        alt={`Hoạt động đối ngoại ${i + 1}`}
                        style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Bottom Brown Banner */}
              <div
                style={{
                  background: C.brown,
                  color: "#fff",
                  padding: "12px 20px",
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  border: `1.5px solid ${C.accent}`,
                }}
              >
                {/* Bamboo leaf icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2">
                  <path d="M12,2 Q15,10 22,12 Q15,14 12,22 Q9,14 2,12 Q9,10 12,2 Z" fill={C.accent} />
                </svg>
                <p
                  style={{
                    fontFamily: C.sans,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    lineHeight: 1.4,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  BÀI HỌC ĐỘC LẬP, TỰ CHỦ, LINH HOẠT TRONG GIAI ĐOẠN 1954 – 1965 VẪN CÒN NGUYÊN GIÁ TRỊ, ĐƯỢC KẾ THỪA VÀ PHÁT HUY TRONG THỜI ĐẠI MỚI.
                </p>
              </div>

            </div>

            {/* Bottom Page Footer — Brown themed */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 8,
                borderTop: `1.5px solid ${C.brown}`,
                marginTop: 32,
                fontFamily: C.sans,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.brown,
              }}
            >
              <span>Trang 26</span>
            </div>
          </div>
        </article>
      </Reveal>

      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 27 — ĐỘT PHÁ HẠ TẦNG GIAO THÔNG TRÊN TRỤC BẮC – NAM
          ─── NỀN BẢN VẼ / BE (Ivory/Beige themed matching style of Page 26) ────── */}
      <Reveal effect="scale-up" duration={950}>
        <article
          className="magazine-page-shadow section-container"
          style={{
            width: "100%",
            maxWidth: 960,
            margin: "64px auto",
            background: "#f5eedc", // Warm ivory/be background matching page 26
            color: C.dark,
            border: `1.5px solid rgba(100,70,34,0.30)`, // Brown border
            position: "relative",
            display: "flex",
            flexDirection: "column",
            transition: "box-shadow 0.4s ease, transform 0.4s ease",
          }}
        >
          <div
            style={{
              margin: "16px",
              padding: "24px 28px",
              border: `1px solid rgba(100,70,34,0.28)`,
              outline: `3px double rgba(100,70,34,0.22)`,
              outlineOffset: "-6px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }}>
              {/* Header Container with Overlap & Soft Gradient Blend */}
              <div style={{
                position: "relative",
                margin: "-24px -28px 24px -28px", // Pull flush to top, left, and right borders of the double frame
                minHeight: 250,
                display: "flex",
                borderBottom: `1px solid rgba(100,70,34,0.20)`,
                background: "#f5eedc", // Ensure beige base matches the page background
                overflow: "hidden"
              }}>
                {/* Right Image (covers right 55% of width) */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "55%",
                  zIndex: 1
                }}>
                  <img
                    src={imgVietnamTrain}
                    alt="Tàu cao tốc Bắc Nam"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>

                {/* Soft Gradient Overlay in the middle to blend train image to beige background */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "40%", // Starts slightly before the image boundary
                  width: "20%", // Span of the soft fade
                  background: "linear-gradient(to right, #f5eedc 0%, rgba(245,238,220,0.9) 30%, rgba(245,238,220,0.3) 70%, transparent 100%)",
                  zIndex: 2,
                  pointerEvents: "none"
                }} />

                {/* Left Text (covers left 52% of width, overlapping the image fade area) */}
                <div style={{
                  position: "relative",
                  zIndex: 3,
                  width: "52%",
                  padding: "24px 0 24px 28px", // Match left padding of parent frame
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  boxSizing: "border-box"
                }}>
                  <div style={{
                    display: "inline-block",
                    background: C.red, // Red badge to match theme
                    color: "#fff",
                    fontFamily: C.sans,
                    fontSize: 13,
                    fontWeight: 900,
                    padding: "2px 8px",
                    width: "fit-content",
                    marginBottom: 10
                  }}>
                    1.2.
                  </div>
                  <h2 style={{
                    fontFamily: C.serif,
                    fontSize: "clamp(22px, 2.5vw, 26px)",
                    fontWeight: 900,
                    color: C.dark,
                    margin: "0 0 2px 0",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15
                  }}>
                    2. ĐỘT PHÁ HẠ TẦNG GIAO THÔNG
                  </h2>
                  <h2 style={{
                    fontFamily: C.serif,
                    fontSize: "clamp(26px, 3.2vw, 32px)",
                    fontWeight: 900,
                    color: C.brown, // Golden brown title to match design mockup style
                    margin: "0 0 16px 0",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1
                  }}>
                    trên trục Bắc – nam
                  </h2>
                  <p style={{
                    fontFamily: C.body,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: C.dark,
                    opacity: 0.95,
                    textAlign: "justify",
                    margin: 0
                  }}>
                    Tư duy coi giao thông là hệ thống <strong>“mạch máu”</strong> kết nối quốc gia tiếp tục được thể hiện qua việc đầu tư tuyến đường bộ cao tốc Bắc – Nam phía Đông và đường sắt tốc độ cao trên trục Bắc – Nam.
                  </p>
                </div>
              </div>

              {/* Middle 2 Columns Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 24 }}>
                {/* Left Column - Cao Tốc */}
                <div style={{ borderRight: `1px dotted rgba(100,70,34,0.25)`, paddingRight: 24 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: C.red, display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <span style={{ color: "#fff", fontFamily: C.sans, fontWeight: 900, fontSize: 18 }}>A</span>
                    </div>
                    <h4 style={{ fontFamily: C.serif, fontSize: 14.5, fontWeight: 800, color: C.red, textTransform: "uppercase", margin: 0, lineHeight: 1.2 }}>
                      Tuyến đường bộ cao tốc <br /> Bắc – Nam phía Đông
                    </h4>
                  </div>
                  <p style={{ fontFamily: C.body, fontSize: 13.5, lineHeight: 1.55, color: C.dark, opacity: 0.9, textAlign: "justify", margin: "0 0 14px 0" }}>
                    Tuyến cao tốc Bắc – Nam phía Đông được xác định là trục giao thông huyết mạch, có nhiệm vụ kết nối các trung tâm kinh tế, chính trị, khu công nghiệp, cảng biển, cảng hàng không và trung tâm logistics, từ đó tạo động lực phát triển kinh tế – xã hội và góp phần bảo đảm quốc phòng, an ninh quốc gia.
                    <span style={{ display: "block", fontFamily: C.sans, fontSize: 10.5, color: C.muted, marginTop: 4 }}>
                      (Báo Điện tử Chính phủ, 2021)
                    </span>
                  </p>

                  {/* Connectivity Box */}
                  <div style={{
                    background: "rgba(122,26,28,0.03)", // Red theme tint
                    border: `1.5px solid rgba(122,26,28,0.15)`,
                    borderRadius: 4,
                    padding: "12px 14px"
                  }}>
                    <p style={{ fontFamily: C.sans, fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: C.red, textAlign: "center", margin: "0 0 12px 0", letterSpacing: "0.05em" }}>
                      Kết nối toàn diện – Lan tỏa phát triển
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                      {[
                        {
                          label: "Trung tâm kinh tế", icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="20" x2="18" y2="10" />
                              <line x1="12" y1="20" x2="12" y2="4" />
                              <line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                          )
                        },
                        {
                          label: "Khu công nghiệp", icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                              <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                            </svg>
                          )
                        },
                        {
                          label: "Cảng biển", icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M2 12h20M12 2v20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
                            </svg>
                          )
                        },
                        {
                          label: "Cảng hàng không", icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73" />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            </svg>
                          )
                        },
                        {
                          label: "Trung tâm logistics", icon: (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <line x1="9" y1="3" x2="9" y2="21" />
                              <line x1="15" y1="3" x2="15" y2="21" />
                            </svg>
                          )
                        }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "19%", textAlign: "center" }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: C.red, border: `1px solid ${C.red}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", marginBottom: 6,
                            boxShadow: "0 2px 4px rgba(122,26,28,0.15)"
                          }}>
                            {item.icon}
                          </div>
                          <span style={{ fontFamily: C.sans, fontSize: 8.5, fontWeight: 700, color: C.dark, opacity: 0.9, lineHeight: 1.15 }}>
                            {item.label.split(" ").slice(0, 2).join(" ")} <br /> {item.label.split(" ").slice(2).join(" ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Đường Sắt */}
                <div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: C.red, display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
                        <rect x="4" y="3" width="16" height="13" rx="2" />
                        <path d="M4 11h16M8 11v5M16 11v5" />
                        <path d="M6 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2" />
                        <circle cx="8" cy="7" r="1" fill="#fff" />
                        <circle cx="16" cy="7" r="1" fill="#fff" />
                      </svg>
                    </div>
                    <h4 style={{ fontFamily: C.serif, fontSize: 14.5, fontWeight: 800, color: C.red, textTransform: "uppercase", margin: 0, lineHeight: 1.2 }}>
                      Dự án đường sắt tốc độ cao <br /> Bắc – Nam
                    </h4>
                  </div>
                  <p style={{ fontFamily: C.body, fontSize: 13.5, lineHeight: 1.55, color: C.dark, opacity: 0.9, textAlign: "justify", margin: "0 0 14px 0" }}>
                    Nghị quyết số 172/2024/QH15 xác định tuyến đường có chiều dài khoảng 1.541 km, kết nối Hà Nội với Thành phố Hồ Chí Minh. Dự án không chỉ phục vụ nhu cầu vận tải hành khách mà còn được thiết kế theo hướng lưỡng dụng, sẵn sàng phục vụ quốc phòng, an ninh và vận chuyển hàng hóa khi cần thiết.
                    <span style={{ display: "block", fontFamily: C.sans, fontSize: 10.5, color: C.muted, marginTop: 4 }}>
                      (Báo Điện tử Chính phủ, 2024)
                    </span>
                  </p>

                  {/* Map + Detail grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 12, alignItems: "center" }}>
                    {/* Image Map of Vietnam - Detailed with Hoàng Sa and Trường Sa */}
                    <div style={{
                      display: "flex", justifyContent: "center", alignItems: "center",
                      position: "relative",
                      width: "100%"
                    }}>
                      <img
                        src={imgVietnamMap}
                        alt="Bản đồ Việt Nam"
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: 180,
                          objectFit: "contain",
                          display: "block",
                          filter: "drop-shadow(0 3px 6px rgba(100,70,34,0.15))"
                        }}
                      />
                    </div>

                    {/* Detail Card - styling match with Image 1 */}
                    <div style={{
                      background: "rgba(122,26,28,0.03)",
                      border: `1px solid rgba(122,26,28,0.15)`,
                      borderRadius: 4,
                      padding: "10px 14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}>
                      <span style={{ fontFamily: C.sans, fontSize: 9, fontWeight: 800, textTransform: "uppercase", color: C.muted, letterSpacing: "0.02em" }}>Chiều dài tuyến</span>
                      <span style={{ fontFamily: C.serif, fontSize: 20, fontWeight: 900, color: C.red, margin: "2px 0 8px 0" }}>1.541 km</span>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {[
                          {
                            text: "Phục vụ vận tải hành khách", icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                              </svg>
                            )
                          },
                          {
                            text: "Phát triển hành lang kinh tế Bắc – Nam", icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="20" x2="18" y2="10" />
                                <line x1="12" y1="20" x2="12" y2="4" />
                                <line x1="6" y1="20" x2="6" y2="14" />
                              </svg>
                            )
                          },
                          {
                            text: "Lưỡng dụng: phục vụ QP - AN & vận tải", icon: (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              </svg>
                            )
                          }
                        ].map((item, idx) => (
                          <div key={idx} style={{ display: "flex", gap: 6, alignItems: "start" }}>
                            <div style={{ color: C.red, marginTop: 1.5, flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <span style={{ fontFamily: C.sans, fontSize: 9.5, color: C.dark, opacity: 0.9, lineHeight: 1.25 }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote full width block - Dark Red Maroon styled matching Image 1 layout */}
              <div style={{
                background: "#3e1617", // Dark maroon red matching original
                color: "#fff",
                padding: "16px 20px",
                marginBottom: 24,
                display: "grid",
                gridTemplateColumns: "1.45fr 0.55fr",
                gap: 16,
                alignItems: "stretch"
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "start", padding: "4px 0" }}>
                  <span style={{
                    fontFamily: C.serif, fontSize: 44, color: C.accent, opacity: 0.6,
                    lineHeight: 1, marginTop: -8, flexShrink: 0
                  }}>"</span>
                  <p style={{
                    fontFamily: C.serif, 
                    fontSize: 14.5, 
                    fontWeight: 600, 
                    fontStyle: "italic", 
                    lineHeight: 1.6,
                    color: "#f5eedc", 
                    margin: 0, 
                    textAlign: "justify"
                  }}>
                    Như vậy, mặc dù mục đích và hoàn cảnh lịch sử hiện nay khác với thời kỳ kháng chiến, việc phát triển các trục giao thông Bắc – Nam vẫn kế thừa tư duy chiến lược về tăng cường kết nối lãnh thổ, điều phối nguồn lực và củng cố năng lực quốc gia. Nếu các tuyến đường Trường Sơn và đường Hồ Chí Minh trên biển từng phục vụ trực tiếp nhiệm vụ chi viện chiến trường, thì các tuyến giao thông Bắc – Nam hiện nay vừa tạo động lực phát triển kinh tế, vừa góp phần nâng cao khả năng cơ động, ứng phó và bảo vệ Tổ quốc trong tình hình mới.
                  </p>
                </div>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={imgVietnamHighwayBridge}
                    alt="Cầu cao tốc"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: 100,
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>
              </div>

              {/* Bottom 2 columns Grid - Matching Image 1 proportions (landscape road, distributed lists) */}
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 24, alignItems: "stretch" }}>
                {/* Left: Road image with sign overlay */}
                <div style={{
                  position: "relative",
                  border: `1px solid rgba(100,70,34,0.18)`,
                  padding: 4,
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(100,70,34,0.1)",
                  display: "flex"
                }}>
                  <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                    <img
                      src={imgVietnamHighwayTraffic}
                      alt="Đường cao tốc Bắc Nam"
                      style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                    />
                    {/* Green Signs Overlay - Styled nicely and centered like Image 1 */}
                    <div style={{
                      position: "absolute",
                      top: 15,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      gap: 10,
                      pointerEvents: "none"
                    }}>
                      <div style={{
                        background: "#0f6c3f",
                        color: "#fff",
                        border: "1.5px solid #fff",
                        padding: "4px 8px",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                        fontFamily: C.sans,
                        fontSize: 8.5,
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: 1.15
                      }}>
                        CAO TỐC<br />BẮC – NAM<br />PHÍA ĐÔNG
                      </div>
                      <div style={{
                        background: "#0f6c3f",
                        color: "#fff",
                        border: "1.5px solid #fff",
                        padding: "4px 8px",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                        fontFamily: C.sans,
                        fontSize: 8.5,
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: 1.15,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <span>KẾT NỐI</span>
                        <span>PHÁT TRIỂN</span>
                        <span>BỀN VỮNG</span>
                      </div>
                      <div style={{
                        background: "#0f6c3f",
                        color: "#fff",
                        border: "1.5px solid #fff",
                        padding: "4px 6px",
                        boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <line x1="5" y1="19" x2="19" y2="5" />
                          <polyline points="12 5 19 5 19 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Modern infrastructure points - Card background and spacing updated */}
                <div style={{
                  background: "rgba(122,26,28,0.03)",
                  border: `1px solid rgba(122,26,28,0.15)`,
                  borderRadius: 4,
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}>
                  <h5 style={{
                    fontFamily: C.sans, fontSize: 10, fontWeight: 800, color: C.red,
                    textTransform: "uppercase", margin: "0 0 16px 0", lineHeight: 1.35, letterSpacing: "0.03em",
                    textAlign: "center"
                  }}>
                    Hạ tầng giao thông hiện đại – Nền tảng cho phát triển đất nước
                  </h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "space-around" }}>
                    {[
                      {
                        text: "Thúc đẩy tăng trưởng kinh tế – xã hội", icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                          </svg>
                        )
                      },
                      {
                        text: "Tăng cường liên kết vùng miền", icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        )
                      },
                      {
                        text: "Bảo đảm quốc phòng, an ninh quốc gia", icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        )
                      },
                      {
                        text: "Nâng cao năng lực cạnh tranh quốc gia", icon: (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
                          </svg>
                        )
                      }
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: C.red, display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", flexShrink: 0,
                          boxShadow: "0 2px 5px rgba(122,26,28,0.15)"
                        }}>
                          {item.icon}
                        </div>
                        <span style={{ fontFamily: C.sans, fontSize: 11, color: C.dark, opacity: 0.95, fontWeight: 700, lineHeight: 1.25 }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Page Footer — Brown themed */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 8,
                borderTop: `1.5px solid ${C.brown}`,
                marginTop: 32,
                fontFamily: C.sans,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: C.brown,
              }}
            >
              <span>SỐ 05 – THÁNG 5/2024</span>
              <span>Trang 26</span> {/* Match number 26 of original mockup */}
            </div>
          </div>
        </article>
      </Reveal>
    </>
  );
}

