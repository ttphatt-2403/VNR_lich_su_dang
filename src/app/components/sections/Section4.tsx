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
      <span className="shimmer-star" style={{ color: C.accent, marginRight: 8, fontSize: 13 }}>★</span>
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
          <p style={{ fontFamily: C.sans, fontSize: 11, fontWeight: 700, color: C.accent, marginTop: 14, margin: "14px 0 0 0" }}>
            Gợi ý: Chứng minh Vì sao nói "đánh chắc, tiến chắc" là sự sáng tạo của nghệ thuật quân sự Việt Nam trong quyết chiến chiến lược Điện Biên Phủ - "lừng lẫy năm châu, chấn động địa cầu"?
          </p>
        </div>
      </Reveal>

      {/* Analysis — 2 col layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, marginBottom: 32 }}>
        {/* Left Column */}
        <div style={{ paddingRight: 24 }}>
          <Reveal>
            <RibbonHeader label="1. Tại sao &quot;đánh chắc, tiến chắc&quot; là đỉnh cao sáng tạo?" />
            <p style={{ fontFamily: C.body, fontSize: 15, fontStyle: "italic", color: C.brown, marginBottom: 16, marginTop: 0 }}>
              Sự sáng tạo không nằm ở việc chọn phương án "an toàn", mà nằm ở khả năng đảo ngược tư duy chiến thuật ngay tại thời điểm áp lực nhất.
            </p>
          </Reveal>
          {[
            { num: "01", title: "Sự thấu hiểu bản chất kẻ thù", body: "Tại Điện Biên Phủ, thực dân Pháp đã xây dựng một tập đoàn cứ điểm \"không thể công phá\" với hỏa lực cực mạnh, hệ thống sân bay và sự hỗ trợ từ không quân. \"Đánh nhanh, thắng nhanh\" – phương án ban đầu – giả định rằng ta có thể dùng sức mạnh đột phá để kết thúc trận đánh trong vài đêm. Nhưng khi trinh sát kỹ lưỡng, Bộ Chỉ huy nhận ra rằng nếu đánh nhanh, ta sẽ mất đi lợi thế duy nhất: sự bảo toàn lực lượng để duy trì chiến tranh lâu dài." },
            { num: "02", title: "Chuyển hóa thế trận", body: "Việc chuyển sang \"đánh chắc, tiến chắc\" chính là quá trình biến một trận quyết chiến chiến lược thành một cuộc vây ép kéo dài. Thay vì dùng lực lượng tấn công trực diện vào hỏa lực mạnh, ta dùng chiến thuật \"bóc vỏ\" từng cứ điểm, cắt đứt đường tiếp viện, làm tê liệt tâm lý và hậu cần của đối phương. Đây là cách làm cho địch \"yếu đi\" trước khi ta \"mạnh lên\"." },
            { num: "03", title: "Huy động sức mạnh toàn dân", body: "Nghệ thuật quân sự Việt Nam không chỉ là đánh giặc bằng vũ khí, mà là đánh bằng hậu cần và ý chí. \"Đánh chắc, tiến chắc\" cho phép huy động hàng chục vạn dân công, mở đường, tiếp tế trong thời gian dài – điều mà một trận \"đánh nhanh\" không bao giờ thực hiện được. Đây là sự kết hợp giữa quân sự chuyên nghiệp và sức mạnh dân tộc." },
          ].map((pt, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ borderTop: `1px dotted rgba(122,26,28,0.25)`, paddingTop: 12, paddingBottom: 12 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 24, color: C.red, opacity: 0.3, lineHeight: 1, flexShrink: 0 }}>{pt.num}</span>
                  <div>
                    <p style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.dark, margin: "0 0 4px 0" }}>{pt.title}</p>
                    <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, opacity: 0.85, margin: 0 }}>{pt.body}</p>
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
            <RibbonHeader label="2. Phải chăng ta chỉ ca ngợi vì kết quả đã rồi?" />
          </Reveal>
          <Reveal>
            <MagazinePullQuote
              text="Có một sự thật lịch sử là: Nếu ta &quot;đánh nhanh&quot; và thắng, đó sẽ được gọi là &quot;quyết đoán táo bạo&quot;; nếu &quot;đánh chắc&quot; mà thua, đó sẽ bị gọi là &quot;do dự, bỏ lỡ thời cơ&quot;."
            />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontFamily: C.body, fontSize: 15, color: C.dark, opacity: 0.9, margin: "16px 0 16px" }}>
              Tuy nhiên, việc đề cao "đánh chắc, tiến chắc" không chỉ dựa vào kết quả, mà dựa trên các giá trị bền vững sau:
            </p>
            {[
              { num: "01", title: "Tránh sự mạo hiểm phiêu lưu", body: "Nếu thực hiện \"đánh nhanh\" và thất bại, toàn bộ chủ lực của Quân đội nhân dân Việt Nam có nguy cơ bị tiêu diệt hoặc tổn thất quá lớn, dẫn đến đổ vỡ toàn bộ cục diện chiến trường Đông Dương. \"Đánh chắc, tiến chắc\" là sự chọn lựa trách nhiệm với sinh mạng binh sĩ và vận mệnh dân tộc." },
              { num: "02", title: "Tính kế thừa và phát triển", body: "\"Đánh chắc, tiến chắc\" không phải là \"đánh chậm\". Đó là sự vận dụng linh hoạt tư tưởng \"trường kỳ kháng chiến\" của Chủ tịch Hồ Chí Minh vào một trận đánh cụ thể. Nó khẳng định rằng nghệ thuật quân sự Việt Nam không chạy theo lối đánh áp đặt, mà là lối đánh biết người biết ta." },
            ].map((pt, i) => (
              <div key={i} style={{ borderTop: `1px dotted rgba(122,26,28,0.25)`, paddingTop: 12, paddingBottom: 12 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 24, color: C.accent, opacity: 0.5, lineHeight: 1, flexShrink: 0 }}>{pt.num}</span>
                  <div>
                    <p style={{ fontFamily: C.serif, fontSize: 15, fontWeight: 700, color: C.dark, margin: "0 0 4px 0" }}>{pt.title}</p>
                    <p style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.dark, opacity: 0.85, margin: 0 }}>{pt.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Conclusion box */}
      <DottedRule my={16}/>
      <Reveal>
        <div style={{ background: C.bg2, padding: "24px 28px", borderLeft: `4px solid ${C.red}`, borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, borderTop: `1px solid ${C.border}` }}>
          <h4 style={{ fontFamily: C.serif, fontSize: 16, fontWeight: 700, color: C.red, margin: "0 0 12px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>Kết luận</h4>
          <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.7, color: C.dark, opacity: 0.9, margin: "0 0 14px 0" }}>
            "Đánh chắc, tiến chắc" không đơn thuần là một lựa chọn chiến thuật, mà là đỉnh cao của tư duy quân sự phản ánh trình độ làm chủ tình hình ở mức độ chiến lược. Như Đại tướng Võ Nguyên Giáp từng khẳng định, đây là "quyết định khó khăn nhất" trong cuộc đời cầm quân của ông. Việc thay đổi phương châm không phải là chọn con đường dễ dàng, mà là dám phủ nhận chính mình để tìm ra phương án tối ưu nhất trước một kẻ thù mạnh, thể hiện sự bản lĩnh và tầm nhìn sắc bén.
          </p>
          <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.7, color: C.dark, opacity: 0.9, margin: "0 0 14px 0" }}>
            Nếu giả định ta thực hiện "đánh nhanh, thắng nhanh" và vẫn chiến thắng dù tổn thất nặng nề, lịch sử có thể ghi nhận đó là một chiến tích của lòng quả cảm, nhưng chắc chắn sẽ không được suy tôn là đỉnh cao sáng tạo. Bởi lẽ, sự sáng tạo của "đánh chắc, tiến chắc" nằm ở việc ta đã chủ động thay đổi toàn bộ hình thái chiến tranh: chuyển từ lối đánh vận động sang đánh công kiên vây lấn quy mô lớn; chuyển từ việc dựa vào sự quả cảm thuần túy sang kết hợp chặt chẽ giữa khoa học quân sự, sự kiên trì bền bỉ và sức mạnh hậu cần toàn dân.
          </p>
          <p style={{ fontFamily: C.body, fontSize: 14.5, lineHeight: 1.7, color: C.dark, opacity: 0.9, margin: 0 }}>
            Chính sự chuyển dịch này đã làm phá sản hoàn toàn kế hoạch Navarre, tạo nên một thắng lợi "lừng lẫy năm châu, chấn động địa cầu". Thành công của Điện Biên Phủ không chỉ được tôn vinh vì kết quả thắng lợi cuối cùng, mà còn vì cách chúng ta đã định nghĩa lại nghệ thuật quân sự: một cuộc chiến nơi sự thận trọng, tính toán khoa học và sự thấu hiểu sâu sắc yếu tố con người đã thực sự khuất phục được hỏa lực công nghệ vượt trội của một đế quốc hùng mạnh.
          </p>
        </div>
      </Reveal>
    </MagazinePage>
  );
}
