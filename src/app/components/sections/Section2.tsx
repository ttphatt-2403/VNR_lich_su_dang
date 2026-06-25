import { useState } from "react";
import { C } from "@/tokens";
import {
  P2_MILESTONES,
  P2_LESSONS,
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
} from "@/assets/images";
import { Reveal } from "@/app/components/ui/Reveal";
import { Polaroid } from "@/app/components/ui/Polaroid";
import { DottedRule } from "@/app/components/ui/DottedRule";
import { TimelineEntry } from "@/app/components/ui/TimelineEntry";
import { LessonRow } from "@/app/components/ui/LessonRow";
import { MagazinePage } from "@/app/components/ui/MagazinePage";
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

export function Section2() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────────────
          PAGE 23 — DIRECT MATCH TO USER MOCKUP IMAGE
          ───────────────────────────────────────────────────────────────────────────── */}
      <MagazinePage id="phan-2" pageNum={23}>
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
              1.1.
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 900,
                color: C.red,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                margin: "0 0 16px 0",
              }}
            >
              CÁCH MẠNG HAI MIỀN <br />
              GIAI ĐOẠN 1954 - 1960
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
      <MagazinePage pageNum={24}>
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
              1.2.
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(30px, 4.2vw, 44px)",
                fontWeight: 900,
                color: C.red,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                margin: "0 0 16px 0",
              }}
            >
              CÁCH MẠNG HAI MIỀN <br />
              GIAI ĐOẠN 1961 - 1965
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
    </>
  );
}
