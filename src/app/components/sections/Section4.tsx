import { C } from "@/tokens";
import { Reveal } from "@/app/components/ui/Reveal";
import { MagazinePullQuote } from "@/app/components/ui/MagazinePullQuote";
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

export function Section4() {
  return (
    <MagazinePage id="phan-4" pageNum={26}>
      <Reveal>
        <ArticleHeader
          category="Chương II · Phần IV"
          headline="Thảo luận chuyên đề"
          sub="Phân tích phản biện về nghệ thuật quân sự"
          period="Điện Biên Phủ 1954"
          intro="Đánh giá tính sáng tạo của phương châm chiến lược tại Điện Biên Phủ từ góc nhìn học thuật khách quan — vượt qua thiên kiến kết quả để nhìn nhận đúng bản chất của quyết định lịch sử."
        />
      </Reveal>

      {/* Scenario Box */}
      <Reveal>
        <div style={{ background: C.dark, padding: "28px 36px", marginBottom: 32, position: "relative", overflow: "hidden", border: `1.5px solid ${C.accent}` }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(212,163,69,0.06) 1px, transparent 1px)`, backgroundSize: "24px 24px" }}/>
          <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: C.accent, marginBottom: 12, position: "relative", zIndex: 1 }}>
            Câu hỏi thảo luận phản biện · Điện Biên Phủ 1954
          </p>
          <p style={{
            fontFamily: C.serif, fontSize: "clamp(16px,2vw,20px)", fontStyle: "italic",
            color: "rgba(252,249,242,0.92)", lineHeight: 1.65,
            borderLeft: `4px solid ${C.red}`, paddingLeft: 20,
            position: "relative", zIndex: 1,
            margin: 0,
          }}>
            Lịch sử thường được viết bởi người chiến thắng. Nếu ngày đó ta giữ nguyên phương châm{" "}
            <strong style={{ color: C.accent, fontStyle: "normal" }}>"đánh nhanh, thắng nhanh"</strong>{" "}
            và vẫn chiến thắng dù tổn thất nặng nề, liệu cách đánh đó có được ca ngợi là đỉnh cao sáng tạo?
            Phải chăng ta đang đề cao <strong style={{ color: C.accent, fontStyle: "normal" }}>"đánh chắc, tiến chắc"</strong> phần lớn là vì dựa vào kết quả đã rồi?
          </p>
        </div>
      </Reveal>

      {/* Analysis — 2 col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0 }}>
        {/* Left Column */}
        <div style={{ paddingRight: 24 }}>
          <Reveal>
            <RibbonHeader label="Đỉnh cao sáng tạo?" />
          </Reveal>
          {[
            { num: "01", title: "Sự thấu hiểu bản chất kẻ thù", body: '"Đánh nhanh" giả định đột phá trong vài đêm. Khi trinh sát kỹ, Bộ Chỉ huy nhận ra: đánh nhanh mất đi lợi thế duy nhất — bảo toàn lực lượng duy trì chiến tranh lâu dài.' },
            { num: "02", title: "Chuyển hóa thế trận", body: '"Đánh chắc" biến trận quyết chiến thành cuộc vây ép — "bóc vỏ" từng cứ điểm, cắt tiếp viện, làm địch yếu đi trước khi ta mạnh lên.' },
            { num: "03", title: "Huy động sức mạnh toàn dân", body: "Cho phép huy động hàng chục vạn dân công tiếp tế trong thời gian dài — điều đánh nhanh không bao giờ thực hiện được." },
          ].map((pt, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ borderTop: `1px dotted rgba(122,26,28,0.25)`, paddingTop: 12, paddingBottom: 12 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 24, color: C.red, opacity: 0.3, lineHeight: 1, flexShrink: 0 }}>{pt.num}</span>
                  <div>
                    <p style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 4, margin: "0 0 4px 0" }}>{pt.title}</p>
                    <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.6, color: C.dark, opacity: 0.8, margin: 0 }}>{pt.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dotted separator */}
        <DottedRule vertical/>

        {/* Right Column */}
        <div style={{ paddingLeft: 24 }}>
          <Reveal>
            <RibbonHeader label="Quyết định lịch sử" />
          </Reveal>
          <Reveal>
            <MagazinePullQuote
              text='"Đánh chắc, tiến chắc" là quyết định khó khăn nhất trong cuộc đời cầm quân của tôi. Dám phủ nhận chính mình để tìm ra phương án tối ưu trước một kẻ thù mạnh.'
              attribution="Đại tướng Võ Nguyên Giáp"
            />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontFamily: C.body, fontSize: 15.5, lineHeight: 1.7, color: C.dark, opacity: 0.85, margin: "16px 0 20px" }}>
              Thành công của Điện Biên Phủ không chỉ được tôn vinh vì kết quả cuối cùng, mà vì cách
              ta đã <strong>định nghĩa lại nghệ thuật quân sự</strong> — nơi sự thận trọng, tính toán khoa học
              và sự thấu hiểu yếu tố con người đã thực sự khuất phục được hỏa lực công nghệ vượt trội
              của đế quốc hùng mạnh.
            </p>
            <DottedRule my={16}/>
            
            {/* Visual indicators */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                ["Đánh vận động", "Đánh công kiên"],
                ["Quả cảm thuần túy", "Khoa học + kiên trì"],
                ["Sức mạnh vũ khí", "Sức mạnh toàn dân"]
              ].map(([from, to], i) => (
                <div key={i} style={{ textAlign: "center", borderTop: `2px solid ${C.accent}`, paddingTop: 8 }}>
                  <p style={{ fontFamily: C.sans, fontSize: 9.5, color: "rgba(122,26,28,0.45)", textDecoration: "line-through", marginBottom: 2, margin: "0 0 2px 0" }}>{from}</p>
                  <p style={{ fontFamily: C.sans, fontSize: 10, fontWeight: 700, color: C.red, margin: 0 }}>{to}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </MagazinePage>
  );
}
