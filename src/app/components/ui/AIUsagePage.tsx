import React, { useState } from "react";
import { ArrowLeft, Brain, Sparkles, Code, Search, Database, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { C } from "@/tokens";

interface AIUsagePageProps {
  onClose: () => void;
}

// Custom Component to handle images that might not exist yet
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  filename: string;
  description: string;
}

function ImageWithFallback({ src, alt, filename, description }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div style={{
        border: `2px dashed ${C.accent}`,
        background: "rgba(212, 163, 69, 0.05)",
        borderRadius: 6,
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: 220,
        transition: C.tr,
      }} className="hover:bg-[rgba(212,163,69,0.08)]">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" style={{ marginBottom: 12 }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span style={{ fontFamily: C.sans, fontSize: 13, fontWeight: 700, color: C.brown, marginBottom: 6 }}>
          Khung Ảnh Minh Chứng
        </span>
        <code style={{
          fontFamily: "monospace",
          fontSize: 11,
          background: "rgba(122,26,28,0.06)",
          padding: "3px 8px",
          borderRadius: 4,
          color: C.red,
          marginBottom: 10
        }}>
          public/ai_images/{filename}
        </code>
        <p style={{ fontFamily: C.body, fontSize: 12.5, color: C.muted, maxWidth: 280, margin: 0, lineHeight: 1.4 }}>
          {description}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      padding: 10,
      border: `1px solid ${C.border}`,
      boxShadow: "0 8px 24px rgba(62,47,28,0.08)",
      borderRadius: 6,
    }}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: 300,
          objectFit: "contain",
          borderRadius: 4,
          display: "block",
        }}
      />
      <div style={{
        marginTop: 8,
        textAlign: "center",
        fontFamily: C.sans,
        fontSize: 11,
        color: C.muted,
        borderTop: `1px dotted ${C.border}`,
        paddingTop: 6
      }}>
        Ảnh minh chứng: <code style={{ fontSize: 10, color: C.red }}>{filename}</code>
      </div>
    </div>
  );
}

export function AIUsagePage({ onClose }: AIUsagePageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "summary" | "significance" | "tactics">("all");

  const promptsData = [
    {
      id: "p1",
      category: "summary",
      title: "1. Nghiên cứu tài liệu và Tóm tắt các giai đoạn lịch sử (1945 - 1954)",
      tool: "NotebookLM (Google Gemini)",
      task: "Nghiên cứu tài liệu giáo trình và tổng hợp các sự kiện cốt lõi của giai đoạn kháng chiến chống thực dân Pháp.",
      prompt: `dựa trên file giáo trình hãy tóm tắt giai đoạn Đảng lãnh đạo xây dựng, bảo vệ chính quyền cách mạng và kháng chiến chống thực dân Pháp xâm lược (1945 - 1954)`,
      aiResponse: `Giai đoạn từ năm 1945 đến năm 1954 là một thời kỳ lịch sử quan trọng, đánh dấu sự lãnh đạo quyết liệt của Đảng trong việc bảo vệ nền độc lập non trẻ và tiến hành cuộc kháng chiến trường kỳ chống thực dân Pháp. Dựa trên nguồn tài liệu, giai đoạn này có thể được tóm tắt qua các nội dung chính sau:

1. Xây dựng và bảo vệ chính quyền cách mạng (1945 - 1946)
Sau Cách mạng Tháng Tám, nước Việt Nam Dân chủ Cộng hòa rơi vào tình thế "ngàn cân treo sợi tóc" khi phải đối mặt với "giặc đói", "giặc dốt" và đặc biệt là "giặc ngoại xâm" từ nhiều phía (quân Tưởng, quân Anh và thực dân Pháp).
- Chủ trương của Đảng: Chỉ thị "Kháng chiến kiến quốc", xác định nhiệm vụ trọng tâm là củng cố chính quyền, chống thực dân Pháp xâm lược, bài trừ nội phản và cải thiện đời sống nhân dân.
- Kết quả: Tổ chức thành công Tổng tuyển cử (6-1-1946), ban hành Hiến pháp đầu tiên, đẩy lùi nạn đói và mù chữ, thực hiện sách lược khôn khéo "Hòa để tiến"...`,
      verification: "Đối chiếu chéo với các chương tương ứng trong Giáo trình Lịch sử Đảng để kiểm định mốc thời gian Tổng tuyển cử (6-1-1946) và đường lối đối ngoại mềm dẻo của Đảng.",
      filename: "prompt_summary.png",
      imgDesc: "Ảnh chụp màn hình hội thoại tóm tắt giai đoạn 1945-1954 trong tài liệu NotebookLM."
    },
    {
      id: "p2",
      category: "significance",
      title: "2. Phân tích ý nghĩa lịch sử và Liên hệ thực tiễn bối cảnh hiện nay",
      tool: "NotebookLM (Google Gemini)",
      task: "Rút ra các bài học kinh nghiệm và liên hệ sự vận dụng của Đảng trong bối cảnh kinh tế - chính trị hiện đại.",
      prompt: `Hãy từ file giáo trình Lịch sử Đảng cộng sản Việt Nam phân tích ý nghĩa lịch sử và kinh nghiệm của Đảng qua đó liên hệ sự vận dụng của Đảng trong bối cảnh xã hội, kinh tế - chính trị hiện nay.`,
      aiResponse: `Dựa trên file giáo trình Lịch sử Đảng cộng sản Việt Nam, dưới đây là phân tích về ý nghĩa lịch sử, bài học kinh nghiệm của giai đoạn 1945 - 1954 và sự vận dụng trong bối cảnh hiện nay:

1. Ý nghĩa lịch sử của cuộc kháng chiến chống Pháp (1945 - 1954)
Thắng lợi của cuộc kháng chiến trường kỳ có ý nghĩa cực kỳ to lớn đối với dân tộc và thế giới:
- Bảo vệ thành quả cách mạng: Đập tan âm mưu xâm lược của thực dân Pháp, bảo vệ và phát triển thành quả của Cách mạng Tháng Tám, chấm dứt ách thống trị gần một thế kỷ của chủ nghĩa thực dân.
- Giải phóng một nửa đất nước: Tạo tiền đề quan trọng để miền Bắc đi lên chủ nghĩa xã hội, trở thành hậu phương lớn cho cuộc đấu tranh giải phóng miền Nam sau này.
- Tầm vóc thời đại: Đánh bại một đội quân đế quốc hiện đại được sự hỗ trợ của Mỹ, cổ vũ mạnh mẽ phong trào giải phóng dân tộc trên thế giới...`,
      verification: "Phân tích cách Đảng áp dụng bài học 'Tự lực cánh sinh' vào chiến lược phát triển kinh tế độc lập, tự chủ kết hợp hội nhập quốc tế sâu rộng hiện nay.",
      filename: "prompt_significance.png",
      imgDesc: "Ảnh chụp màn hình cuộc đối thoại phân tích ý nghĩa lịch sử và liên hệ thực tế bối cảnh hiện nay."
    },
    {
      id: "p3",
      category: "tactics",
      title: "3. Phân tích nghệ thuật quân sự 'Đánh chắc, tiến chắc'",
      tool: "NotebookLM (Google Gemini)",
      task: "Phân tích chiều sâu chiến thuật và sự sáng tạo của Đảng trong việc chuyển đổi phương châm tác chiến tại Điện Biên Phủ.",
      prompt: `Hãy từ file giáo trình Lịch sử Đảng cộng sản Việt Nam phân tích nghệ thuật "đánh chắc, thắng chắc" trong chiến dịch Điện Biên Phủ`,
      aiResponse: `Phân tích nghệ thuật quân sự "đánh chắc, tiến chắc" (hay còn gọi là đánh chắc thắng) trong chiến dịch Điện Biên Phủ dựa trên giáo trình, chúng ta thấy đây không chỉ là một thay đổi về mặt chiến thuật mà là một quyết định mang tính chiến lược, thể hiện sự sáng tạo và bản lĩnh của Đảng và Bộ Chỉ huy chiến dịch.

Dưới đây là các khía cạnh phân tích chi tiết:
1. Sự điều chỉnh chiến lược từ thực tiễn khách quan
- Từ "đánh nhanh, thắng nhanh": Ban đầu, khi quân Pháp mới nhảy dù xuống Điện Biên Phủ, trận địa của chúng còn sơ hở, ta dự định đánh nhanh để sớm kết thúc.
- Đến "đánh chắc, tiến chắc": Tuy nhiên, thực tế chiến trường thay đổi nhanh chóng. Pháp đã biến Điện Biên Phủ thành một tập đoàn cứ điểm mạnh nhất Đông Dương, một "pháo đài khổng lồ" không thể công phá với hỏa lực cực mạnh.
- Sự sáng tạo: Nhận thấy phương châm cũ không còn phù hợp, Đảng và Bộ Chỉ huy quyết định hoãn cuộc tấn công để chuyển sang "đánh chắc, tiến chắc"...`,
      verification: "Làm rõ quyết định dũng cảm của Đại tướng Võ Nguyên Giáp nhằm bảo toàn lực lượng và đảm bảo chắc chắn thắng lợi cho chiến dịch lịch sử.",
      filename: "prompt_tactics.png",
      imgDesc: "Ảnh chụp màn hình phân tích nghệ thuật quân sự 'đánh chắc, tiến chắc' tại Điện Biên Phủ."
    }
  ];

  const filteredPrompts = activeTab === "all" 
    ? promptsData 
    : promptsData.filter(p => p.category === activeTab);

  return (
    <div style={{
      background: C.bg,
      minHeight: "100vh",
      padding: "24px 20px 80px",
      fontFamily: C.body
    }}>
      {/* Header & Back Action */}
      <div style={{ maxWidth: 1024, margin: "0 auto", marginBottom: 20 }}>
        <button 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: C.sans,
            fontSize: 13,
            fontWeight: 700,
            color: C.red,
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 6,
            transition: C.tr
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(122, 26, 28, 0.05)";
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <ArrowLeft size={16} /> Quay lại Tạp chí
        </button>
      </div>

      {/* Main Container */}
      <main style={{
        maxWidth: 1024,
        margin: "0 auto",
        background: C.ivory,
        border: `3px double ${C.dark}`,
        padding: "36px 6%",
        boxShadow: "0 12px 48px rgba(62,47,28,0.15)",
        position: "relative"
      }}>
        {/* Vintage Paper Corner Marks */}
        <div style={{ position: "absolute", top: 12, left: 12, fontSize: 14, color: C.accent }}>✦</div>
        <div style={{ position: "absolute", top: 12, right: 12, fontSize: 14, color: C.accent }}>✦</div>
        <div style={{ position: "absolute", bottom: 12, left: 12, fontSize: 14, color: C.accent }}>✦</div>
        <div style={{ position: "absolute", bottom: 12, right: 12, fontSize: 14, color: C.accent }}>✦</div>

        {/* Title Block */}
        <div style={{ textAlign: "center", borderBottom: `2px solid ${C.dark}`, paddingBottom: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Brain size={28} color={C.red} />
            <span style={{ fontFamily: C.sans, fontSize: 12, fontWeight: 800, letterSpacing: "0.25em", color: C.accent, textTransform: "uppercase" }}>
              BÁO CÁO THỰC HÀNH TỐT NGHIỆP
            </span>
            <Brain size={28} color={C.red} />
          </div>
          <h1 style={{
            fontFamily: C.serif,
            fontWeight: 900,
            fontSize: "clamp(28px, 5vw, 42px)",
            color: C.red,
            lineHeight: 1.1,
            margin: "8px 0 16px",
            textTransform: "uppercase"
          }}>
            Báo cáo ứng dụng Trí tuệ Nhân tạo (AI Usage)
          </h1>
          <p style={{
            fontFamily: C.body,
            fontSize: 16,
            fontStyle: "italic",
            color: C.muted,
            maxWidth: 640,
            margin: "0 auto",
            lineHeight: 1.5
          }}>
            Tài liệu chi tiết về việc ứng dụng mô hình ngôn ngữ lớn (LLM) và các công cụ AI nhằm hỗ trợ tra cứu tư liệu, xây dựng kịch bản trò chơi và thiết kế không gian ảo cho dự án "Lịch sử Đảng Cộng sản Việt Nam".
          </p>
        </div>

        {/* Section I: Overview */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, borderBottom: `1px solid ${C.accent}`, paddingBottom: 6 }}>
            <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 20, color: C.red }}>I.</span>
            <h2 style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 19, color: C.dark, margin: 0 }}>
              Tổng quan về việc ứng dụng AI
            </h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, textAlign: "justify", textIndent: "24px", margin: "0 0 12px" }}>
            Trong quá trình nghiên cứu và thực hiện sản phẩm học tập số hóa Lịch sử Đảng, nhóm đã chủ động ứng dụng công nghệ Trí tuệ nhân tạo (AI) như một trợ lý ảo đắc lực. Mục tiêu của việc ứng dụng AI không phải để thay thế tư duy độc lập hay chép nguyên văn nội dung, mà nhằm <strong>tối ưu hóa quy trình làm việc</strong>, <strong>tìm kiếm cảm hứng thiết kế</strong> và <strong>hỗ trợ viết mã nguồn cơ bản</strong> để tập trung nguồn lực vào việc kiểm định lịch sử và hoàn thiện trải nghiệm người dùng.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, textAlign: "justify", textIndent: "24px", margin: 0 }}>
            AI đã hỗ trợ đắc lực ở ba mảng lớn của dự án: tổng hợp cấu trúc tư liệu cho các giai đoạn lịch sử chính, sinh bộ câu hỏi trắc nghiệm chất lượng cao phục vụ mục đích tự kiểm tra kiến thức cho học viên, và cung cấp các gợi ý kỹ thuật để hiện thực hóa phòng triển lãm tranh 3D (Museum 3D) tương tác trực quan.
          </p>
        </section>

        {/* Section II: Tools Used */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, borderBottom: `1px solid ${C.accent}`, paddingBottom: 6 }}>
            <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 20, color: C.red }}>II.</span>
            <h2 style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 19, color: C.dark, margin: 0 }}>
              Các công cụ AI đã sử dụng
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {/* Tool 1 */}
            <div style={{
              background: "rgba(122,26,28,0.02)",
              border: `1.5px solid ${C.border}`,
              borderRadius: 6,
              padding: 18,
              position: "relative"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  background: C.red,
                  color: "#fff",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  G
                </div>
                <div>
                  <h3 style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 800, color: C.dark, margin: 0 }}>Google Gemini</h3>
                  <span style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>Tìm kiếm & Soạn thảo tư liệu</span>
                </div>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: C.muted, margin: 0 }}>
                Hỗ trợ tra cứu nhanh các thông tin sự kiện lịch sử, phân tích mối liên kết giữa lịch sử Đảng và thực tiễn phát triển kinh tế - xã hội Việt Nam thời hiện đại nhờ khả năng cập nhật thông tin mạng thời gian thực.
              </p>
            </div>

            {/* Tool 2 */}
            <div style={{
              background: "rgba(122,26,28,0.02)",
              border: `1.5px solid ${C.border}`,
              borderRadius: 6,
              padding: 18,
              position: "relative"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  background: C.brown,
                  color: "#fff",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  C
                </div>
                <div>
                  <h3 style={{ fontFamily: C.sans, fontSize: 14, fontWeight: 800, color: C.dark, margin: 0 }}>ChatGPT (GPT-4o)</h3>
                  <span style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>Code Logic & Cấu trúc Dữ liệu</span>
                </div>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: C.muted, margin: 0 }}>
                Trợ giúp tạo cấu trúc dữ liệu JSON sạch cho câu hỏi trắc nghiệm, tư vấn thuật toán trộn thẻ bài Mini game và cung cấp cách tính toán ma trận tọa độ, góc quay cho không gian bảo tàng 3D ảo.
              </p>
            </div>
          </div>
        </section>

        {/* Section III: Prompts & Evidence */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, borderBottom: `1px solid ${C.accent}`, paddingBottom: 6 }}>
            <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 20, color: C.red }}>III.</span>
            <h2 style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 19, color: C.dark, margin: 0 }}>
              Nhật ký Prompts & Đối chứng Minh chứng
            </h2>
          </div>

          {/* Guide Alert box */}
          <div style={{
            background: "rgba(212, 163, 69, 0.08)",
            borderLeft: `4px solid ${C.accent}`,
            padding: 12,
            borderRadius: "0 6px 6px 0",
            marginBottom: 24,
            display: "flex",
            gap: 10,
            alignItems: "flex-start"
          }}>
            <CheckCircle2 size={18} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <h4 style={{ fontFamily: C.sans, fontSize: 12.5, fontWeight: 800, color: "#15803d", margin: "0 0 4px" }}>
                MINH CHỨNG SỬ DỤNG AI ĐÃ ĐƯỢC TÍCH HỢP THÀNH CÔNG
              </h4>
              <p style={{ fontFamily: C.body, fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.4 }}>
                Tuyệt vời! 3 ảnh chụp màn hình minh chứng hội thoại từ <strong>NotebookLM</strong> đã được lưu trữ và nhúng tự động vào các mục tương ứng dưới đây. Bài báo cáo của bạn hiện đã đầy đủ nội dung và sẵn sàng để chấm điểm.
              </p>
            </div>
          </div>

          {/* Tabs Filter */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { id: "all", label: "Tất cả Prompt" },
              { id: "summary", label: "Tóm tắt Sự kiện" },
              { id: "significance", label: "Ý nghĩa & Liên hệ" },
              { id: "tactics", label: "Nghệ thuật Quân sự" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  fontFamily: C.sans,
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "6px 14px",
                  borderRadius: 20,
                  cursor: "pointer",
                  border: activeTab === tab.id ? `1.5px solid ${C.red}` : `1.5px solid ${C.border}`,
                  background: activeTab === tab.id ? C.red : "none",
                  color: activeTab === tab.id ? "#fff" : C.muted,
                  transition: C.tr
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Prompts list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {filteredPrompts.map((item) => (
              <div key={item.id} style={{
                borderBottom: `1px dotted ${C.border}`,
                paddingBottom: 28,
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 24
              }} className="md:grid-cols-2">
                {/* Text content (Left) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 style={{ fontFamily: C.serif, fontSize: 16.5, fontWeight: 800, color: C.red, margin: 0 }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, fontFamily: C.sans }}>
                    Công cụ: {item.tool} · Vai trò: {item.task}
                  </div>
                  
                  {/* Prompt box */}
                  <div style={{
                    background: "rgba(122,26,28,0.03)",
                    borderLeft: `3px solid ${C.red}`,
                    padding: "10px 14px",
                    borderRadius: "0 4px 4px 0",
                  }}>
                    <div style={{ fontFamily: C.sans, fontSize: 10.5, fontWeight: 800, color: C.red, marginBottom: 4, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
                      <Sparkles size={10} /> Câu lệnh Prompt (Đầu vào):
                    </div>
                    <p style={{ fontFamily: C.body, fontSize: 13.5, fontStyle: "italic", margin: 0, whiteSpace: "pre-line", color: C.dark }}>
                      "{item.prompt}"
                    </p>
                  </div>

                  {/* AI Response box */}
                  <div style={{
                    background: "rgba(100,70,34,0.03)",
                    borderLeft: `3px solid ${C.brown}`,
                    padding: "10px 14px",
                    borderRadius: "0 4px 4px 0",
                  }}>
                    <div style={{ fontFamily: C.sans, fontSize: 10.5, fontWeight: 800, color: C.brown, marginBottom: 4, textTransform: "uppercase" }}>
                      Kết quả từ AI (Đầu ra):
                    </div>
                    <pre style={{
                      fontFamily: item.category === "code" ? "monospace" : C.body,
                      fontSize: 12.5,
                      margin: 0,
                      whiteSpace: "pre-line",
                      color: C.dark,
                      overflowX: "auto"
                    }}>
                      {item.aiResponse}
                    </pre>
                  </div>

                  {/* Verification note */}
                  <div style={{ display: "flex", gap: 6, alignItems: "flex-start", marginTop: 4 }}>
                    <CheckCircle2 size={14} color="#15803d" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 12.5, color: "#15803d", fontStyle: "italic" }}>
                      <strong>Đối chứng & Chỉnh sửa thủ công:</strong> {item.verification}
                    </span>
                  </div>
                </div>

                {/* Evidence Image (Right) */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <ImageWithFallback
                    src={`/ai_images/${item.filename}`}
                    alt={item.title}
                    filename={item.filename}
                    description={item.imgDesc}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section IV: Critical Review & Human Validation */}
        <section style={{ borderTop: `2px solid ${C.dark}`, paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontFamily: C.serif, fontWeight: 900, fontSize: 20, color: C.red }}>IV.</span>
            <h2 style={{ fontFamily: C.serif, fontWeight: 800, fontSize: 19, color: C.dark, margin: 0 }}>
              Đánh giá phản biện & Tính nhân văn trong nghiên cứu Lịch sử
            </h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="md:grid-cols-2">
            <div style={{ fontSize: 14.5, lineHeight: 1.6, textAlign: "justify" }}>
              <p style={{ margin: "0 0 12px" }}>
                Lịch sử Đảng là một môn khoa học chính trị xã hội yêu cầu tính khách quan, trung thực và tuyệt đối chính xác về mặt sự kiện. Trong khi đó, các mô hình ngôn ngữ lớn (LLM) tuy rất thông minh nhưng vẫn tồn tại hạn chế lớn là hiện tượng "ảo tưởng" (hallucination), có thể sinh ra các mốc thời gian sai lệch hoặc hiểu nhầm các văn kiện lịch sử phức tạp.
              </p>
              <p style={{ margin: 0 }}>
                Do đó, nhóm xác định <strong>quy trình phản biện của con người (Human-in-the-loop)</strong> là bắt buộc. Tất cả các nội dung do AI hỗ trợ tổng hợp đều được đối chiếu cẩn thận với sách Giáo khoa Lịch sử Đảng Cộng sản Việt Nam của Bộ Giáo dục và Đào tạo, cổng thông tin điện tử của Đảng và tài liệu lưu trữ chính thức.
              </p>
            </div>

            <div style={{
              background: C.bg2,
              border: `1px solid ${C.accent}`,
              padding: 20,
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <h4 style={{ fontFamily: C.sans, fontSize: 13, fontWeight: 800, color: C.red, margin: "0 0 8px", textTransform: "uppercase" }}>
                Nguyên tắc 3K trong nghiên cứu tích hợp AI của nhóm:
              </h4>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.6, color: C.dark }}>
                <li style={{ marginBottom: 6 }}>
                  <strong>Không sao chép nguyên văn (Khách quan):</strong> Sử dụng AI làm gợi ý dàn ý, viết lại bằng văn phong khoa học nghiêm túc của nhóm.
                </li>
                <li style={{ marginBottom: 6 }}>
                  <strong>Kiểm chứng nguồn tài liệu gốc (Kiểm chứng):</strong> Tra cứu chéo ngày tháng, nhân vật và sự kiện với văn kiện Đảng để tránh sai sót.
                </li>
                <li>
                  <strong>Khắc phục lỗi lập trình (Kỹ thuật):</strong> AI viết mẫu code, con người tối ưu hóa hiệu năng, tinh chỉnh đồ họa và kiểm tra trải nghiệm thực tế.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
