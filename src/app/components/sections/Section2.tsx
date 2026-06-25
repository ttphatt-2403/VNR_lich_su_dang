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
      <span style={{ color: C.accent, marginRight: 8, fontSize: 13 }}>★</span>
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

        {/* Main Grid: left column (Tại miền Bắc) | right column (Vĩ tuyến 17 + Quote) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
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
            <RibbonHeader label="Tại miền Bắc" />

            {/* Item 1: Khôi phục kinh tế */}
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

            <DottedRule my={16} />

            {/* Item 2: Cải cách ruộng đất */}
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
                  Cải cách ruộng đất (7-1956):
                </h4>
                <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                  Chế độ chiếm hữu ruộng đất phong kiến đã bị xóa bỏ hoàn toàn. Tuy nhiên, trong quá trình thực hiện đã xảy ra những sai lầm nghiêm trọng do chủ quan, giáo điều. Hội nghị Trung ương 10 (khóa II) đã nghiêm khắc kiểm điểm và tiến hành sửa sai thành công.
                </p>
              </div>
            </div>

            <DottedRule my={16} />

            {/* Item 3: Cải tạo XHCN */}
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
          </div>

          {/* Right Column — Vĩ tuyến 17 + Quote + Photo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Vĩ tuyến 17 Image Card */}
            <div
              style={{
                border: `1.5px solid ${C.red}`,
                padding: "6px",
                background: "#fff",
                boxShadow: "0 8px 24px rgba(62,47,28,0.14)",
              }}
            >
              <img
                src={imgVT17_ToanCanh}
                alt="Vĩ tuyến 17"
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  display: "block",
                  filter: "sepia(0.25) contrast(1.08) brightness(0.92)",
                }}
              />
              <div
                style={{
                  background: C.red,
                  color: "#fff",
                  padding: "6px 10px",
                  marginTop: 6,
                  fontFamily: C.body,
                  fontSize: 12.5,
                  fontWeight: 500,
                  textAlign: "center",
                  lineHeight: 1.3,
                  border: `1px solid ${C.accent}`,
                }}
              >
                Vĩ tuyến 17 (Quảng Trị) trở thành giới tuyến tạm thời chia cắt hai miền.
              </div>
            </div>

            {/* Premium Quote Block */}
            <div
              style={{
                background: C.bg2,
                borderLeft: `4px solid ${C.red}`,
                padding: "16px 20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: 10,
                  fontFamily: C.serif,
                  fontSize: 80,
                  lineHeight: 1,
                  color: C.red,
                  opacity: 0.15,
                  userSelect: "none",
                  fontWeight: 900,
                }}
              >
                ❝
              </span>
              <p
                style={{
                  fontFamily: C.serif,
                  fontSize: 14.5,
                  fontStyle: "italic",
                  color: C.dark,
                  lineHeight: 1.6,
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Miền Bắc vừa khắc phục hậu quả chiến tranh, vừa tiến hành cách mạng xã hội chủ nghĩa, đạt nhiều thành tựu to lớn, tạo nền tảng vững chắc cho sự nghiệp xây dựng chủ nghĩa xã hội và đấu tranh thống nhất đất nước.
              </p>
            </div>

            {/* Industrial Chimneys Picture / Bác Hồ with workers */}
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                padding: "5px",
                background: "#fff",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={imgBacHo_BHH_2}
                alt="Khôi phục sản xuất miền Bắc"
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
          PAGE 24 — KHÁNG CHIẾN CHỐNG MỸ & THỰC HIỆN HAI CHIẾN LƯỢC (1960 - 1965)
          ───────────────────────────────────────────────────────────────────────────── */}
      <MagazinePage pageNum={24}>
        {/* Top Header Block */}
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
            ĐỒNG KHỞI VÀ ĐÁNH BẠI <br />
            CHIẾN TRANH ĐẶC BIỆT (1960 - 1965)
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
            Đảng lãnh đạo nhân dân miền Nam bùng lên trong phong trào Đồng Khởi, thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam và đánh bại chiến lược "Chiến tranh đặc biệt" của Mỹ.
          </p>
        </div>

        {/* Grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
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
            <RibbonHeader label="Cách mạng Miền Nam" />

            {/* Nghị quyết 15 & Đồng Khởi */}
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
                  Nghị quyết 15 &amp; Đồng Khởi (1959-1960):
                </h4>
                <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                  Xác định con đường bạo lực cách mạng kết hợp đấu tranh chính trị và quân sự. Phong trào Đồng Khởi bùng nổ từ Bến Tre (17/1/1960) lan rộng khắp miền Nam, phá vỡ hệ thống kìm kẹp của địch.
                </p>
              </div>
            </div>

            <DottedRule my={16} />

            {/* Đại hội III & Kế hoạch 5 năm */}
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
                  Đại hội III &amp; Hai chiến lược (9-1960):
                </h4>
                <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                  Hoàn chỉnh đường lối cách mạng: CMXHCN ở miền Bắc đóng vai trò quyết định nhất; CMDTDCND ở miền Nam đóng vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam.
                </p>
              </div>
            </div>

            <DottedRule my={16} />

            {/* Đánh bại chiến tranh đặc biệt */}
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
                  Chiến thắng quân sự (1961-1965):
                </h4>
                <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, margin: 0 }}>
                  Quân dân miền Nam sử dụng "ba mũi giáp công" để phá tan ấp chiến lược, chiến thắng vang dội tại Ấp Bắc (1963), Bình Giã (1964), Ba Gia và Đồng Xoài (1965), làm phá sản chiến lược "Chiến tranh đặc biệt".
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Đồng Khởi image */}
            <div
              style={{
                border: `1.5px solid ${C.red}`,
                padding: "6px",
                background: "#fff",
                boxShadow: "0 8px 24px rgba(62,47,28,0.14)",
              }}
            >
              <img
                src={imgDongKhoi}
                alt="Phong trào Đồng Khởi"
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  display: "block",
                  filter: "sepia(0.25) contrast(1.08) brightness(0.92)",
                }}
              />
              <div
                style={{
                  background: C.red,
                  color: "#fff",
                  padding: "6px 10px",
                  marginTop: 6,
                  fontFamily: C.body,
                  fontSize: 12.5,
                  fontWeight: 500,
                  textAlign: "center",
                  lineHeight: 1.3,
                  border: `1px solid ${C.accent}`,
                }}
              >
                Nhân dân Bến Tre nổi dậy trong phong trào Đồng Khởi (1960).
              </div>
            </div>

            {/* Quote block */}
            <div
              style={{
                background: C.bg2,
                borderLeft: `4px solid ${C.red}`,
                padding: "16px 20px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: 10,
                  fontFamily: C.serif,
                  fontSize: 80,
                  lineHeight: 1,
                  color: C.red,
                  opacity: 0.15,
                  userSelect: "none",
                  fontWeight: 900,
                }}
              >
                ❝
              </span>
              <p
                style={{
                  fontFamily: C.serif,
                  fontSize: 14.5,
                  fontStyle: "italic",
                  color: C.dark,
                  lineHeight: 1.6,
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Nghị quyết Trung ương 15 mở đường cho cách mạng miền Nam bùng nổ. Sự kết hợp giữa bạo lực vũ trang và chính trị tạo ra thế tiến công mạnh mẽ không thể đảo ngược.
              </p>
            </div>

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
