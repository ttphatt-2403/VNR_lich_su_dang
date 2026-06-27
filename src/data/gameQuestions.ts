export interface GameQuestion {
  id: number;
  type: "text" | "image";
  question: string;
  options?: string[];
  answer: string;
  image_file?: string;
}

export const GAME_QUESTIONS: GameQuestion[] = [
    {
        "id": 1,
        "type": "text",
        "question": "Đại hội đại biểu toàn quốc lần thứ II của Đảng (2-1951) đã quyết định đổi tên Đảng thành gì?",
        "options": [
            "A. Đảng Cộng sản Việt Nam.",
            "B. Đảng Cộng sản Đông Dương.",
            "C. Đảng Lao động Việt Nam.",
            "D. Hội nghiên cứu chủ nghĩa Mác ở Đông Dương."
        ],
        "answer": "C"
    },
    {
        "id": 2,
        "type": "text",
        "question": "Tại Đại hội II (1951), ai được bầu làm Tổng Bí thư của Đảng?",
        "options": [
            "A. Hồ Chí Minh.",
            "B. Trường Chinh.",
            "C. Lê Duẩn.",
            "D. Phạm Văn Đồng."
        ],
        "answer": "B"
    },
    {
        "id": 3,
        "type": "text",
        "question": "Chính cương Đảng Lao động Việt Nam (1951) xác định tính chất của xã hội Việt Nam lúc bấy giờ gồm những gì?",
        "options": [
            "A. Dân chủ nhân dân, một phần thuộc địa và nửa phong kiến.",
            "B. Thuộc địa nửa phong kiến.",
            "C. Cách mạng dân tộc dân chủ nhân dân.",
            "D. Tiền tư bản chủ nghĩa và xã hội chủ nghĩa."
        ],
        "answer": "A"
    },
    {
        "id": 4,
        "type": "text",
        "question": "Đối tượng đấu tranh chính được xác định trong Chính cương của Đảng (1951) là gì?",
        "options": [
            "A. Thực dân Pháp xâm lược và can thiệp Mỹ.",
            "B. Phát xít Nhật và tay sai.",
            "C. Quân đội Tưởng Giới Thạch.",
            "D. Đế quốc Mỹ và chính quyền Ngô Đình Diệm."
        ],
        "answer": "A"
    },
    {
        "id": 5,
        "type": "text",
        "question": "Văn kiện nào của Đảng được coi là “Luật cơ bản” để thực hiện mục tiêu “người cày có ruộng” vào năm 1953?",
        "options": [
            "A. Chính cương Đảng Lao động Việt Nam.",
            "B. Luật Cải cách ruộng đất.",
            "C. Tạm ước 14-9.",
            "D. Cương lĩnh ruộng đất của Đảng."
        ],
        "answer": "B"
    },
    {
        "id": 6,
        "type": "text",
        "question": "Chiến dịch quân sự nào là đỉnh cao của cuộc tiến công chiến lược Đông Xuân 1953-1954?",
        "options": [
            "A. Chiến dịch Việt Bắc.",
            "B. Chiến dịch Biên giới.",
            "C. Chiến dịch Tây Bắc.",
            "D. Chiến dịch Điện Biên Phủ."
        ],
        "answer": "D"
    },
    {
        "id": 7,
        "type": "text",
        "question": "Hiệp định Giơnevơ (21-7-1954) đã công nhận các quyền dân tộc cơ bản của Việt Nam, Lào và Campuchia là gì?",
        "options": [
            "A. Độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ.",
            "B. Quyền tự trị và quyền tự quyết dân tộc.",
            "C. Quyền tự do chính trị và tài chính riêng.",
            "D. Quyền được tham gia khối Liên hiệp Pháp."
        ],
        "answer": "A"
    },
    {
        "id": 8,
        "type": "text",
        "question": "Thắng lợi nào được ghi nhận là “thiên sử vàng của dân tộc”, báo hiệu sự sụp đổ của chủ nghĩa thực dân cũ?",
        "options": [
            "A. Cách mạng Tháng Tám 1945.",
            "B. Chiến dịch Biên giới 1950.",
            "C. Chiến dịch Điện Biên Phủ.",
            "D. Hiệp định Paris 1973."
        ],
        "answer": "C"
    },
    {
        "id": 9,
        "type": "text",
        "question": "Một trong những kinh nghiệm của Đảng trong kháng chiến chống Pháp là gì?",
        "options": [
            "A. Đề ra đường lối “kháng chiến và kiến quốc” phù hợp.",
            "B. Tập trung hoàn toàn vào mặt trận quân sự.",
            "C. Dựa vào sự viện trợ quốc tế là chính.",
            "D. Thực hiện đánh nhanh thắng nhanh ngay từ đầu."
        ],
        "answer": "A"
    },
    {
        "id": 10,
        "type": "text",
        "question": "Sau năm 1954, đế quốc Mỹ đã thực hiện âm mưu gì đối với miền Nam Việt Nam?",
        "options": [
            "A. Phục hồi chế độ thuộc địa của thực dân Pháp.",
            "B. Biến miền Nam thành thuộc địa kiểu mới và căn cứ quân sự.",
            "C. Giúp đỡ Việt Nam thực hiện tổng tuyển cử.",
            "D. Thiết lập chế độ quân chủ lập hiến."
        ],
        "answer": "B"
    },
    {
        "id": 11,
        "type": "text",
        "question": "Nhiệm vụ trọng tâm của miền Bắc trong giai đoạn 1954-1957 là gì?",
        "options": [
            "A. Xây dựng nền sản xuất lớn xã hội chủ nghĩa.",
            "B. Hàn gắn vết thương chiến tranh, phục hồi sản xuất nông nghiệp.",
            "C. Tiến hành ngay kế hoạch 5 năm lần thứ nhất.",
            "D. Hỗ trợ quân sự trực tiếp cho miền Nam."
        ],
        "answer": "B"
    },
    {
        "id": 12,
        "type": "text",
        "question": "Chế độ chiếm hữu ruộng đất phong kiến ở miền Bắc bị xóa bỏ hoàn toàn vào thời gian nào?",
        "options": [
            "A. Sau Cách mạng Tháng Tám 1945.",
            "B. Sau chiến thắng Điện Biên Phủ 1954.",
            "C. Tháng 7-1956, sau cải cách ruộng đất.",
            "D. Cuối năm 1960."
        ],
        "answer": "C"
    },
    {
        "id": 13,
        "type": "text",
        "question": "Nghị quyết nào của Đảng (tháng 1-1959) vạch rõ con đường bạo lực cách mạng để giành chính quyền ở miền Nam?",
        "options": [
            "A. Nghị quyết Trung ương lần thứ 14.",
            "B. Nghị quyết Trung ương lần thứ 15.",
            "C. Nghị quyết Đại hội III của Đảng.",
            "D. Nghị quyết Trung ương lần thứ 9."
        ],
        "answer": "B"
    },
    {
        "id": 14,
        "type": "text",
        "question": "Phong trào “Đồng khởi” (1960) nổ ra tiêu biểu nhất ở địa phương nào?",
        "options": [
            "A. Mỹ Tho.",
            "B. Bến Tre.",
            "C. Tây Ninh.",
            "D. Quảng Ngãi."
        ],
        "answer": "B"
    },
    {
        "id": 15,
        "type": "text",
        "question": "Phương châm tác chiến độc đáo nào được quân dân miền Nam thực hiện để đánh bại “Chiến tranh đặc biệt”?",
        "options": [
            "A. Đánh nhanh thắng nhanh.",
            "B. Vừa đánh vừa đàm.",
            "C. Hai chân (quân sự, chính trị), ba mũi (quân sự, chính trị, binh vận), ba vùng (đô thị, nông thôn đồng bằng, miền núi).",
            "D. Tiêu thổ kháng chiến và vườn không nhà trống."
        ],
        "answer": "C"
    },
    {
        "id": 16,
        "type": "text",
        "question": "Chiến lược “Chiến tranh đặc biệt” của Mỹ ở miền Nam (1961-1965) lấy nội dung nào làm “quốc sách”?",
        "options": [
            "A. “Trực thăng vận” và “thiết xa vận”.",
            "B. Lập “Ấp chiến lược”.",
            "C. Bình định miền Bắc trong 18 tháng.",
            "D. Đưa quân viễn chinh Mỹ tham chiến trực tiếp."
        ],
        "answer": "B"
    },
    {
        "id": 17,
        "type": "text",
        "question": "Mặt trận Dân tộc giải phóng miền Nam Việt Nam được thành lập vào ngày nào?",
        "options": [
            "A. 17-01-1960.",
            "B. 19-05-1959.",
            "C. 20-12-1960.",
            "D. 02-01-1963."
        ],
        "answer": "C"
    },
    {
        "id": 18,
        "type": "image",
        "question": "Dựa vào hình ảnh gợi ý, hãy cho biết đây là sự kiện lịch sử nào?",
        "image_file": "image_8e7896.png",
        "answer": "Hiệp định Giơ-ne-vơ"
    },
    {
        "id": 19,
        "type": "image",
        "question": "Dựa vào hình ảnh gợi ý, hãy cho biết đây là chiến dịch quân sự nào?",
        "image_file": "image_8e789d.png",
        "answer": "Chiến dịch Điện Biên Phủ"
    },
    {
        "id": 20,
        "type": "image",
        "question": "Dựa vào hình ảnh gợi ý, hãy cho biết đây là chiến thắng lịch sử nào?",
        "image_file": "image_8e78d9.png",
        "answer": "Chiến thắng Ấp Bắc"
    }
];
