import React, { useState, useEffect } from "react";
import { X, CheckCircle, XCircle, Clock } from "lucide-react";
import { C } from "@/tokens";
import { imgDaihoi2ToanCanh } from "@/assets/images";
import { GAME_QUESTIONS } from "@/data/gameQuestions";

interface PuzzleGameProps {
  onClose: () => void;
}

export function PuzzleGame({ onClose }: PuzzleGameProps) {
  const [revealedPieces, setRevealedPieces] = useState<number[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  
  // States cho việc trả lời câu hỏi
  const [textAnswer, setTextAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const totalPieces = 20;
  const isWinner = revealedPieces.length === totalPieces;

  const handleAnswerSubmit = (submittedAnswer: string) => {
    if (cooldown > 0) return;
    
    const q = GAME_QUESTIONS.find((q) => q.id === selectedPiece);
    if (!q) return;

    let isCorrect = false;

    if (q.type === "text") {
      // answer là 'A', 'B', 'C', 'D'
      // submittedAnswer là string đầy đủ ví dụ "A. Đảng Cộng sản Việt Nam"
      if (submittedAnswer.startsWith(q.answer)) {
        isCorrect = true;
      }
    } else if (q.type === "image") {
      // Helper function to remove Vietnamese diacritics and punctuation
      const normalizeStr = (str: string) => {
        return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // remove accents
          .replace(/đ/g, "d").replace(/Đ/g, "D")
          .replace(/[^a-zA-Z0-9\s]/g, " ") // replace punctuation (like dashes) with space
          .trim()
          .replace(/\s+/g, " ") // collapse multiple spaces
          .toLowerCase();
      };

      const normalizedSubmit = normalizeStr(submittedAnswer);
      const normalizedAnswer = normalizeStr(q.answer);
      
      // Cho phép khớp một phần hoặc khớp chính xác không dấu
      if (normalizedSubmit === normalizedAnswer || normalizedAnswer.includes(normalizedSubmit)) {
         // Yêu cầu người chơi gõ phải dài ít nhất 4 ký tự
         if (normalizedSubmit.length >= 4) {
           isCorrect = true;
         }
      }
      
      if (normalizedSubmit === normalizedAnswer) {
          isCorrect = true;
      }
    }

    if (isCorrect) {
      if (selectedPiece !== null && !revealedPieces.includes(selectedPiece)) {
        setRevealedPieces([...revealedPieces, selectedPiece]);
      }
      setSelectedPiece(null);
      setErrorMsg("");
      setTextAnswer("");
      setCooldown(0);
    } else {
      setErrorMsg("Câu trả lời chưa chính xác, hãy thử lại sau");
      setCooldown(5);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: 100, // Để không bị navbar che
        paddingBottom: 60,
        background: C.desk,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontFamily: C.serif,
          color: C.red,
          fontSize: 36,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          textAlign: "center",
          fontWeight: 900
        }}
      >
        Trò Chơi Khám Phá Hình Ẩn
      </h2>

      <button
        onClick={onClose}
        style={{
          background: C.brown,
          color: "#fff",
          border: `1.5px solid ${C.accent}`,
          padding: "8px 20px",
          borderRadius: 4,
          fontFamily: C.sans,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 32,
          transition: C.tr,
          boxShadow: "0 4px 10px rgba(100,70,34,0.2)"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#7a5835"}
        onMouseLeave={e => e.currentTarget.style.background = C.brown}
      >
        ← Trở về Trang chủ
      </button>

      {/* Main Game Container */}
      <div
        style={{
          position: "relative",
          width: "90vw",
          maxWidth: 1000,
          aspectRatio: "16 / 9",
          border: `4px solid ${C.accent}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <img
          src={imgDaihoi2ToanCanh}
          alt="Bức tranh bí ẩn"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "sepia(0.3) contrast(1.1)",
          }}
        />

        {/* CSS Grid for Pieces */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
          }}
        >
          {Array.from({ length: totalPieces }).map((_, index) => {
            const pieceNumber = index + 1;
            const isRevealed = revealedPieces.includes(pieceNumber);

            return (
              <div
                key={pieceNumber}
                onClick={() => {
                  if (!isRevealed) setSelectedPiece(pieceNumber);
                }}
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: isRevealed
                    ? "transparent"
                    : "linear-gradient(135deg, rgba(122,26,28,0.95), rgba(62,20,20,0.95))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isRevealed ? "default" : "pointer",
                  transition: "background 0.4s ease, opacity 0.4s ease",
                  opacity: isRevealed ? 0 : 1,
                  backdropFilter: isRevealed ? "none" : "blur(4px)",
                }}
                onMouseEnter={(e) => {
                  if (!isRevealed) {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(150,40,40,0.95), rgba(80,25,25,0.95))";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isRevealed) {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(122,26,28,0.95), rgba(62,20,20,0.95))";
                  }
                }}
              >
                {!isRevealed && (
                  <span
                    style={{
                      fontFamily: C.sans,
                      fontSize: 32,
                      fontWeight: 900,
                      color: C.accent,
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {pieceNumber}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Victory Banner Overlay */}
        {isWinner && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "fadeUp 1s ease forwards",
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: "rgba(122, 26, 28, 0.9)",
                padding: "24px 48px",
                border: `3px solid ${C.accent}`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontFamily: C.serif,
                  fontSize: "clamp(24px, 4vw, 42px)",
                  color: C.accent,
                  margin: 0,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC
                <br />
                LẦN THỨ II CỦA ĐẢNG
              </h1>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, color: "rgba(255,255,255,0.6)", fontFamily: C.sans, fontSize: 14 }}>
        Số mảnh ghép đã mở: {revealedPieces.length} / {totalPieces}
      </div>

      {/* Question Modal for Selected Piece */}
      {selectedPiece !== null && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#f5eedc",
              padding: 40,
              borderRadius: 8,
              border: `2px solid ${C.brown}`,
              maxWidth: 600,
              width: "90%",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <h3 style={{ fontFamily: C.serif, fontSize: 24, color: C.red, marginBottom: 16 }}>
              Câu hỏi mảnh ghép số {selectedPiece}
            </h3>
            
            {(() => {
              const q = GAME_QUESTIONS.find((q) => q.id === selectedPiece);
              if (!q) return <p>Nội dung câu hỏi đang được cập nhật...</p>;
              
              return (
                <div style={{ textAlign: "left", marginBottom: 32 }}>
                  <p style={{ fontFamily: C.body, fontSize: 20, color: C.dark, marginBottom: 16, lineHeight: 1.5, fontWeight: 600 }}>
                    {q.question}
                  </p>
                  
                  {q.type === "image" && q.image_file && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                      <img 
                        src={`/game_images/${q.image_file}`} 
                        alt="Question hint" 
                        style={{ maxWidth: "100%", maxHeight: 250, border: `2px solid ${C.brown}`, borderRadius: 4 }} 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<p style="color:red; font-style:italic; font-size: 14px; text-align:center;">(Không tìm thấy hình ảnh. Vui lòng thêm ảnh vào thư mục public/game_images)</p>';
                        }}
                      />
                    </div>
                  )}

                  {q.options && q.options.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 12 }}>
                      {q.options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleAnswerSubmit(opt)}
                          disabled={cooldown > 0}
                          style={{ 
                            fontFamily: C.body, 
                            fontSize: 18, 
                            color: cooldown > 0 ? "#999" : C.dark,
                            background: cooldown > 0 ? "#f0f0f0" : "#fff",
                            border: `2px solid ${cooldown > 0 ? "#ccc" : C.brown}`,
                            borderRadius: 6,
                            padding: "12px 16px",
                            textAlign: "left",
                            cursor: cooldown > 0 ? "not-allowed" : "pointer",
                            transition: C.tr,
                            opacity: cooldown > 0 ? 0.7 : 1
                          }}
                          onMouseEnter={e => {
                            if (cooldown === 0) {
                              e.currentTarget.style.background = "rgba(100,70,34,0.1)";
                              e.currentTarget.style.transform = "translateX(5px)";
                            }
                          }}
                          onMouseLeave={e => {
                            if (cooldown === 0) {
                              e.currentTarget.style.background = "#fff";
                              e.currentTarget.style.transform = "translateX(0)";
                            }
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === "image" && (
                     <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                        <p style={{ fontFamily: C.sans, fontSize: 16, fontWeight: 600, color: C.dark }}>Nhập đáp án của bạn:</p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <input 
                            type="text" 
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') handleAnswerSubmit(textAnswer) }}
                            placeholder="Nhập tên sự kiện / chiến dịch..."
                            disabled={cooldown > 0}
                            style={{
                               flex: 1,
                               padding: "12px 16px",
                               fontSize: 18,
                               fontFamily: C.body,
                               border: `2px solid ${cooldown > 0 ? "#ccc" : C.brown}`,
                               borderRadius: 6,
                               outline: "none",
                               background: cooldown > 0 ? "#f0f0f0" : "#fff",
                               color: cooldown > 0 ? "#999" : C.dark,
                            }}
                          />
                          <button
                            onClick={() => handleAnswerSubmit(textAnswer)}
                            disabled={cooldown > 0}
                            style={{
                              background: cooldown > 0 ? "#ccc" : C.red,
                              color: "#fff",
                              border: "none",
                              padding: "0 24px",
                              fontSize: 16,
                              fontFamily: C.sans,
                              fontWeight: 700,
                              borderRadius: 6,
                              cursor: cooldown > 0 ? "not-allowed" : "pointer",
                              transition: C.tr,
                            }}
                            onMouseEnter={e => { if (cooldown === 0) e.currentTarget.style.background = C.redMid }}
                            onMouseLeave={e => { if (cooldown === 0) e.currentTarget.style.background = C.red }}
                          >
                            Gửi
                          </button>
                        </div>
                     </div>
                  )}
                </div>
              );
            })()}
            
            {errorMsg && (
              <div style={{ padding: "12px", background: "rgba(220,53,69,0.1)", color: "#dc3545", borderRadius: 4, marginBottom: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {errorMsg}
                {cooldown > 0 && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#dc3545", color: "#fff", padding: "2px 8px", borderRadius: 12, fontSize: 14 }}>
                    <Clock size={14} /> {cooldown}s
                  </span>
                )}
              </div>
            )}
            
            <button
              onClick={() => {
                setSelectedPiece(null);
                setErrorMsg("");
                setTextAnswer("");
                setCooldown(0);
              }}
              style={{
                background: "rgba(0,0,0,0.1)",
                border: "none",
                padding: "8px 24px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: C.sans,
                fontWeight: 700,
                color: C.dark,
                transition: C.tr
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
            >
              Đóng / Bỏ qua mảnh này
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
