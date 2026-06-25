import { C } from "@/tokens";
import { CHAPTERS } from "@/data/content";
import {
  imgDBP_CamCo,
  imgDaihoi2ToanCanh,
  imgGVR_KyKet,
} from "@/assets/images";
import { StarIcon } from "@/app/components/ui/CustomIcons";

export function HeroCover() {
  return (
    <section
      style={{
        paddingTop: 104,
        background: C.desk, // desk surface color
        paddingBottom: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          background: C.bg, // light ivory paper
          color: C.dark,
          boxShadow: "0 25px 50px rgba(40, 30, 20, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1)",
          border: `1.5px solid rgba(122, 26, 28, 0.2)`,
          position: "relative",
          margin: "0 16px",
        }}
      >
        {/* Inner double border */}
        <div
          style={{
            margin: "16px",
            padding: "36px",
            border: `1px solid rgba(122, 26, 28, 0.3)`,
            outline: `3px double rgba(122, 26, 28, 0.3)`,
            outlineOffset: "-6px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {/* Cover Header Bar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderBottom: `3px solid ${C.red}`,
              paddingBottom: 20,
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: C.sans,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: C.red,
                marginBottom: 10,
              }}
            >
              Tư liệu Lịch sử Đảng Cộng sản Việt Nam
            </p>
            <h1
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(32px, 5.5vw, 44px)",
                fontWeight: 900,
                color: C.dark,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              LỊCH SỬ ĐẢNG
            </h1>
          </div>

          {/* Main Layout Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 36,
              alignItems: "start",
            }}
          >
            {/* Left - Cover Story Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRight: `1px dotted rgba(122, 26, 28, 0.3)`,
                paddingRight: 32,
              }}
            >
              <span
                style={{
                  fontFamily: C.sans,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.red,
                  marginBottom: 8,
                }}
              >
                Chuyên đề Đặc biệt
              </span>

              <h2
                style={{
                  fontFamily: C.serif,
                  fontSize: "clamp(48px, 6vw, 76px)",
                  fontWeight: 900,
                  color: C.red,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  margin: "0 0 16px 0",
                }}
              >
                ĐẢNG <br />
                <span style={{ color: C.dark }}>LÃNH</span> ĐẠO
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <StarIcon size={16} color={C.accent} fill={C.accent} />
                <span
                  style={{
                    fontFamily: C.serif,
                    fontSize: 20,
                    fontStyle: "italic",
                    color: C.brown,
                    fontWeight: 600,
                  }}
                >
                  Hai cuộc kháng chiến hào hùng
                </span>
              </div>

              <p
                style={{
                  fontFamily: C.body,
                  fontSize: 16.5,
                  lineHeight: 1.8,
                  color: C.dark,
                  opacity: 0.85,
                  marginBottom: 32,
                }}
              >
                Ba mươi năm lịch sử vĩ đại — Đảng lãnh đạo nhân dân Việt Nam vừa xây dựng
                chủ nghĩa xã hội ở miền Bắc, vừa kháng chiến chống đế quốc Mỹ xâm lược,
                giải phóng miền Nam, thống nhất Tổ quốc.
              </p>

              {/* Table of Contents list */}
              <div
                style={{
                  borderTop: `1.5px solid ${C.red}`,
                  paddingTop: 20,
                }}
              >
                <h3
                  style={{
                    fontFamily: C.sans,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.dark,
                    marginBottom: 16,
                  }}
                >
                  Mục lục Chuyên đề:
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {CHAPTERS.map(ch => (
                    <a
                      key={ch.id}
                      href={`#${ch.id}`}
                      className="toc-link"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textDecoration: "none",
                        fontFamily: C.sans,
                        fontSize: 12,
                        color: C.dark,
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: C.serif, color: C.accent }}>
                          {ch.roman}.
                        </span>
                        {ch.title}
                      </span>
                      <span style={{ color: C.accent, fontSize: 11 }}>
                        {ch.period}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Magazine Cover Picture collage */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Main Cover Image */}
              <div
                style={{
                  border: `1.5px solid ${C.red}`,
                  padding: "8px",
                  background: "#fff",
                  boxShadow: "0 15px 30px rgba(62,47,28,0.15)",
                }}
              >
                <img
                  src={imgDBP_CamCo}
                  alt="Chiến thắng Điện Biên Phủ"
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    display: "block",
                    filter: "sepia(0.2) contrast(1.1) brightness(0.85)",
                  }}
                />
                <div
                  style={{
                    background: C.red,
                    color: "#fff",
                    padding: "6px 12px",
                    fontFamily: C.sans,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textAlign: "center",
                    textTransform: "uppercase",
                    marginTop: 6,
                    border: `1px solid ${C.accent}`,
                  }}
                >
                  Chiến thắng Điện Biên Phủ lừng lẫy địa cầu — 7/5/1954
                </div>
              </div>

              {/* Smaller double photo strip */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "4px",
                    background: "#fff",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={imgDaihoi2ToanCanh}
                    alt="Đại hội II"
                    style={{
                      width: "100%",
                      height: 110,
                      objectFit: "cover",
                      display: "block",
                      filter: "sepia(0.25) contrast(1.05) brightness(0.9)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: C.body,
                      fontSize: 10,
                      textAlign: "center",
                      color: C.muted,
                      marginTop: 4,
                      fontStyle: "italic",
                    }}
                  >
                    Đại hội II (2/1951)
                  </p>
                </div>

                <div
                  style={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "4px",
                    background: "#fff",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  <img
                    src={imgGVR_KyKet}
                    alt="Hiệp định Giơ-ne-vơ"
                    style={{
                      width: "100%",
                      height: 110,
                      objectFit: "cover",
                      display: "block",
                      filter: "sepia(0.3) contrast(1.05) brightness(0.88)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: C.body,
                      fontSize: 10,
                      textAlign: "center",
                      color: C.muted,
                      marginTop: 4,
                      fontStyle: "italic",
                    }}
                  >
                    Ký kết Giơ-ne-vơ (1954)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gold cover bottom footer strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
              borderTop: `1.5px solid ${C.accent}`,
              paddingTop: 12,
              fontFamily: C.sans,
              fontSize: 10,
              fontWeight: 600,
              color: C.muted,
              letterSpacing: "0.08em",
            }}
          >
            <span>Trang bìa đặc biệt</span>
            <span>Bản quyền lưu hành nội bộ</span>
            <span>Trang 21</span>
          </div>
        </div>
      </div>
    </section>
  );
}
