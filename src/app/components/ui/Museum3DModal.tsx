import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { X, HelpCircle, Loader2, BookOpen, Film } from "lucide-react";
import { C } from "@/tokens";
import {
  imgVT17_NamBac,
  imgDBP_CamCo,
  imgDaihoi2PhatBieu,
  imgGVR_KyKet,
  imgBacHo_BHH_1,
  imgNQ15_HoiNghi,
  imgDongKhoi,
  imgDaihoi3_1,
  imgDaihoi2ToanCanh,
  imgDBP_HopBan,
  imgGVR_HoiNghi,
  imgApBac,
  imgBinhGia,
  imgDongXoai,
  imgBaSanSang,
  imgVuotSong,
  imgMTGPMN,
  imgBaDamNhiem,
} from "@/assets/images";

interface Museum3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Exhibit {
  id: number;
  title: string;
  part: string;
  type: "image" | "video";
  url: string;
  width: number;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  details: string;
}

export function Museum3DModal({ isOpen, onClose }: Museum3DModalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(true);
  
  // Track active exhibit in proximity and focused detail view
  const [nearExhibit, setNearExhibit] = useState<Exhibit | null>(null);
  const [focusedExhibit, setFocusedExhibit] = useState<Exhibit | null>(null);
  const nearExhibitRef = useRef<Exhibit | null>(null);
  const focusedExhibitRef = useRef<Exhibit | null>(null);

  useEffect(() => {
    focusedExhibitRef.current = focusedExhibit;
  }, [focusedExhibit]);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    // Setup scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#6b7280"); // Slate gray background
    scene.fog = new THREE.FogExp2("#6b7280", 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    // Set up camera rotation order for first-person (YXZ)
    camera.rotation.order = "YXZ";
    camera.position.set(0, 1.8, 2.0); // Eye-level starting position
    camera.rotation.set(0, 0, 0);      // Facing forward

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6; // Higher exposure to brighten dark GLB wall materials

    const currentMount = mountRef.current;
    if (currentMount) {
      currentMount.appendChild(renderer.domElement);
    }

    // --- First-Person Keyboard & Drag Controls ---
    const keysPressed: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed[key] = true;

      if (key === "f") {
        if (nearExhibitRef.current) {
          // Toggle focused exhibit modal
          setFocusedExhibit((prev) => (prev ? null : nearExhibitRef.current));
        }
      }
      if (e.key === "Escape") {
        setFocusedExhibit(null);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Mouse drag to look around
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".no-drag-ui")) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      // If reading detail modal, ignore looking around
      if (focusedExhibitRef.current) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      const sensitivity = 0.0025;
      camera.rotation.y -= deltaX * sensitivity;
      camera.rotation.x -= deltaY * sensitivity;

      // Limit pitch (look up/down) to avoid flipping upside down
      const maxPitch = Math.PI / 2.2;
      camera.rotation.x = Math.max(-maxPitch, Math.min(maxPitch, camera.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch swipe to look around for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest(".no-drag-ui")) return;
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      if (focusedExhibitRef.current) return;

      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      const sensitivity = 0.004;
      camera.rotation.y -= deltaX * sensitivity;
      camera.rotation.x -= deltaY * sensitivity;

      const maxPitch = Math.PI / 2.2;
      camera.rotation.x = Math.max(-maxPitch, Math.min(maxPitch, camera.rotation.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    domElement.addEventListener("touchstart", handleTouchStart);
    domElement.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    // ── Lighting ──────────────────────────────────────────────────────────
    // Photo/video canvases use MeshBasicMaterial — NOT affected by any light.
    // Only wall/floor/ceiling from GLB (MeshStandardMaterial) reacts to lights.
    // So we can boost lights freely without worrying about washing out exhibits.

    // Strong ambient — fills every corner of the room
    const ambientLight = new THREE.AmbientLight("#fff8f0", 3.5);
    scene.add(ambientLight);

    // Strong directional from above (simulates overhead gallery ceiling lights)
    const sunLight = new THREE.DirectionalLight("#fff8e8", 3.0);
    sunLight.position.set(0, 20, 0);
    scene.add(sunLight);

    // Front-fill directional to reduce deep shadows
    const frontLight = new THREE.DirectionalLight("#ffffff", 1.5);
    frontLight.position.set(0, 8, 12);
    scene.add(frontLight);

    // 4 central PointLights hanging from ceiling center — brighten middle of room
    const centralPositions: [number, number, number][] = [
      [0, 4, 0], [3, 4, 3], [-3, 4, 3], [0, 4, -3]
    ];
    centralPositions.forEach((pos) => {
      const pt = new THREE.PointLight("#fff5e0", 2.5, 18);
      pt.position.set(...pos);
      scene.add(pt);
    });

    // Camera-follow light — always see clearly while walking
    const camLight = new THREE.PointLight("#fff8f0", 1.2, 14);
    scene.add(camLight);

    // 8 SpotLights around outer perimeter aimed at wall photos
    const spotRadius = 7.5;
    const spotHeight = 5.5;
    const spotTargetRadius = 8.5;
    const spotConfigs = [0, 45, 90, 135, 180, 225, 270, 315];

    spotConfigs.forEach((deg) => {
      const rad = (deg * Math.PI) / 180;
      const spot = new THREE.SpotLight("#fff5e8", 15.0);
      spot.position.set(
        Math.sin(rad) * spotRadius,
        spotHeight,
        Math.cos(rad) * spotRadius
      );
      spot.angle = Math.PI / 6;
      spot.penumbra = 0.4;
      spot.decay = 1.2;
      spot.distance = 14;

      const target = new THREE.Object3D();
      target.position.set(
        Math.sin(rad) * spotTargetRadius,
        1.5,
        Math.cos(rad) * spotTargetRadius
      );
      scene.add(target);
      spot.target = target;
      scene.add(spot);
    });

    // Setup texture loader & list to keep track of active video tags
    const textureLoader = new THREE.TextureLoader();
    const activeVideos: HTMLVideoElement[] = [];

    // Define 20 structured historical exhibits
    const insideExhibitsData = [
      {
        title: "Phim tư liệu Đại hội II (1951)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "video",
        url: "/BaoTang3D/pic_and_video/Đại hội đại biểu toàn quốc lần thứ II của Đảng tại xã Vinh Quang, Chiêm Hóa, Tuyên Quang, 2-1951.mp4",
        details: "Đoạn phim tư liệu lịch sử vô cùng quý giá ghi lại không khí khẩn trương, trang nghiêm của Đại hội đại biểu toàn quốc lần thứ II của Đảng tại xã Vinh Quang, Chiêm Hóa, Tuyên Quang (2/1951). Đây là Đại hội đầu tiên được tổ chức ở trong nước sau ngày cách mạng thành công và giành độc lập. Thước phim ghi lại chân thực cảnh các đại biểu từ khắp mọi miền Tổ quốc vượt qua đèo dốc hiểm trở về dự Đại hội, hình ảnh Chủ tịch Hồ Chí Minh đọc Báo cáo Chính trị vạch rõ đường lối tiến tới kháng chiến thắng lợi, cùng các phiên thảo luận ngoài trời và hoạt động sinh hoạt giản dị, chan hòa giữa núi rừng chiến khu Việt Bắc."
      },
      {
        title: "Phim tư liệu Chiến thắng Điện Biên Phủ (1954)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "video",
        url: "/BaoTang3D/pic_and_video/(387) Chiến thắng Điện Biên Phủ 1954 - YouTube.mp4",
        details: "Thước phim thời sự chiến trường quý giá tái hiện sinh động 56 ngày đêm 'khoét núi, ngủ hầm, mưa dầm, cơm vắt' đầy gian khổ nhưng vô cùng anh dũng của quân và dân ta trong chiến dịch Điện Biên Phủ lịch sử (1954). Đoạn phim ghi lại cảnh hàng vạn dân công hỏa tuyến thồ hàng, tải đạn qua đèo cao vực sâu, cảnh bộ đội ta kiên cường kéo pháo bằng sức người vào trận địa, đào hàng trăm km đường hào siết chặt vòng vây địch, và đỉnh điểm là đợt tổng công kích chiều ngày 7/5/1954 khi lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm chỉ huy De Castries, chấm dứt hoàn toàn ách đô hộ của thực dân Pháp tại Đông Dương."
      },
      {
        title: "Phim tư liệu Phong trào Đồng Khởi (1960)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "video",
        url: "/BaoTang3D/pic_and_video/(387) Phong trào Đồng Khởi - Bước ngoặt của cách mạng miền Nam - YouTube.mp4",
        details: "Đoạn phim tư liệu ghi lại cao trào của phong trào Đồng Khởi (1960) khởi đầu từ Bến Tre dưới sự lãnh đạo của Đảng và nữ tướng Nguyễn Thị Định. Thước phim phản ánh sinh động hình ảnh 'Đội quân tóc dài' hùng hậu đấu tranh trực diện với chính quyền Mỹ - Diệm, các cuộc mít tinh biểu tình rầm rộ của quần chúng nhân dân đòi quyền tự do dân sinh, phá thế kìm kẹp của địch. Phong trào đã nhanh chóng lan rộng khắp Nam Bộ và Nam Trung Bộ, làm tan rã hệ thống chính quyền cơ sở của địch ở nhiều thôn xã, thiết lập quyền làm chủ của nhân dân và đánh dấu bước chuyển mình của cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công."
      },
      {
        title: "Phim tư liệu Chiến Tranh Đặc Biệt (1961)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "video",
        url: "/BaoTang3D/pic_and_video/(387) Chiến Tranh Đặc Biệt 1961 - YouTube.mp4",
        details: "Thước phim phóng sự chiến trường phản ánh cuộc chiến cam go của quân dân miền Nam chống lại chiến lược 'Chiến tranh đặc biệt' (1961-1965) của đế quốc Mỹ. Đoạn phim chỉ rõ bản chất tàn bạo của các thủ đoạn dồn dân lập 'Ấp chiến lược' (coi đây là xương sống của chiến lược), sử dụng các chiến thuật quân sự hiện đại như 'trực thăng vận' và 'thiết xa vận'. Qua đó, thước phim cũng tôn vinh ý chí quật cường của quân và dân ta trong việc phá ấp chiến lược, kiên trì bám đất đấu tranh chính trị kết hợp đấu tranh vũ trang để từng bước làm phá sản âm mưu thâm độc của kẻ thù."
      }
    ];

    const inside001ExhibitsData = [
      {
        title: "Vĩ tuyến 17 — Ranh giới chia cắt hai miền",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgVT17_NamBac,
        details: "Bức ảnh chụp dòng sông Bến Hải và cầu Hiền Lương tại vĩ tuyến 17 - ranh giới tạm thời chia cắt đất nước thành hai miền Nam - Bắc theo Hiệp định Giơ-ne-vơ 1954. Sự chia cắt đau thương kéo dài hơn 20 năm đã đặt ra cho cách mạng Việt Nam một yêu cầu lịch sử mới chưa từng có tiền lệ. Trước tình hình đó, Đảng đã đề ra hai nhiệm vụ chiến lược song hành: xây dựng chủ nghĩa xã hội ở miền Bắc để làm hậu phương lớn vững mạnh cho cả nước, và tiến hành cách mạng dân tộc dân chủ nhân dân ở miền Nam để đánh đuổi đế quốc Mỹ xâm lược, hoàn thành thống nhất nước nhà."
      },
      {
        title: "Hội nghị Trung ương lần thứ 15 (1-1959)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgNQ15_HoiNghi,
        details: "Bức ảnh tư liệu lịch sử về Hội nghị Ban Chấp hành Trung ương Đảng lần thứ 15 (khoá II) họp vào tháng 1-1959. Đây là hội nghị có ý nghĩa lịch sử đặc biệt quan trọng, vạch ra phương hướng phát triển cho cách mạng miền Nam Việt Nam sau nhiều năm bị khủng bố dưới thời Mỹ - Diệm. Nghị quyết Trung ương 15 khẳng định con đường phát triển cơ bản của cách mạng miền Nam là khởi nghĩa giành chính quyền về tay nhân dân, sử dụng bạo lực cách mạng để đánh đổ chính quyền độc tài tay sai, kết hợp linh hoạt giữa đấu tranh chính trị với đấu tranh quân sự."
      },
      {
        title: "Phong trào Đồng khởi (1960)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgDongKhoi,
        details: "Bức ảnh tư liệu lịch sử ghi lại khí thế sục sôi của quần chúng nhân dân Nam Bộ trong phong trào Đồng khởi năm 1960. Từ những cuộc nổi dậy lẻ tẻ và tiêu biểu nhất là cuộc nổi dậy tại ba xã Định Thủy, Phước Hiệp, Bình Khánh (huyện Mỏ Cày, tỉnh Bến Tre), phong trào đã bùng lên như triều dâng thác đổ khắp Nam Bộ và Tây Nguyên. Bằng sự kết hợp khéo léo giữa đấu tranh vũ trang tự vệ và các mũi giáp công chính trị của binh vận, nhân dân ta đã đập tan từng mảng lớn chính quyền tay sai địch ở nông thôn, mở ra bước ngoặt quyết định đưa cách mạng miền Nam bước sang giai đoạn mới."
      },
      {
        title: "Đại hội đại biểu toàn quốc lần thứ III (9-1960)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgDaihoi3_1,
        details: "Hình ảnh ghi lại không khí làm việc trang nghiêm tại Đại hội đại biểu toàn quốc lần thứ III của Đảng, họp tại Hà Nội vào tháng 9-1960. Đại hội diễn ra trong thời điểm miền Bắc đã hoàn thành thắng lợi công cuộc khôi phục kinh tế và miền Nam đang dấy lên phong trào Đồng khởi mạnh mẽ. Đại hội đã xác định đường lối chiến lược cách mạng của cả nước: khẳng định cách mạng xã hội chủ nghĩa ở miền Bắc có vai trò quyết định nhất đối với sự phát triển của toàn bộ cách mạng Việt Nam, cách mạng dân tộc dân chủ nhân dân ở miền Nam có vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam, thống nhất đất nước."
      }
    ];

    const outsideExhibitsData = [
      {
        title: "Đại hội đại biểu toàn quốc lần thứ II (2-1951)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDaihoi2PhatBieu,
        details: "Bức ảnh chụp Chủ tịch Hồ Chí Minh đọc Báo cáo Chính trị tại Đại hội đại biểu toàn quốc lần thứ II của Đảng diễn ra tại chiến khu Việt Bắc (Chiêm Hóa, Tuyên Quang) từ ngày 11 đến 19-2-1951. Đại hội quyết định đưa Đảng ra hoạt động công khai dưới tên gọi Đảng Lao động Việt Nam, xây dựng Đảng vững mạnh về chính trị, tư tưởng và tổ chức để trực tiếp gánh vác sứ mệnh lịch sử chèo lái con thuyền kháng chiến chống thực dân Pháp xâm lược của toàn dân tộc đi đến thắng lợi cuối cùng."
      },
      {
        title: "Toàn cảnh hội trường Đại hội II",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDaihoi2ToanCanh,
        details: "Bức ảnh ghi lại toàn cảnh hội trường giản dị của Đại hội II được dựng hoàn toàn bằng các vật liệu tự nhiên như tranh, tre, nứa, lá giữa lòng rừng sâu chiến khu Việt Bắc. Dù trong điều kiện kháng chiến vô cùng khó khăn gian khổ, thiếu thốn trăm bề và luôn đối mặt với hiểm họa ném bom của máy bay Pháp, đại hội vẫn được tổ chức chu đáo, quy tụ đầy đủ các đại biểu đại diện cho ý chí, khát vọng tự do của quân và dân khắp mọi miền đất nước, thể hiện tinh thần cách mạng quật khởi vượt mọi gian nan."
      },
      {
        title: "Bộ Chỉ huy chiến dịch Điện Biên Phủ",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDBP_HopBan,
        details: "Bức ảnh lịch sử vô giá ghi lại cuộc họp quyết định của Bộ Chỉ huy chiến dịch Điện Biên Phủ tại lán chiến khu Mường Phăng. Dưới sự chủ trì của Đại tướng Võ Nguyên Giáp, Bộ chỉ huy đã có quyết định thay đổi phương châm tác chiến mang tính lịch sử từ 'Đánh nhanh, thắng nhanh' sang 'Đánh chắc, tiến chắc'. Quyết định táo bạo và vô cùng sáng suốt này thể hiện tư duy quân sự thiên tài, tinh thần trách nhiệm tối cao trước xương máu chiến sĩ, bảo đảm chắc chắn thắng lợi cho chiến dịch lịch sử chấn động địa cầu."
      },
      {
        title: "Chiến dịch Điện Biên Phủ (1954)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDBP_CamCo,
        details: "Khoảnh khắc lịch sử kinh điển khi lá cờ 'Quyết chiến Quyết thắng' đỏ tươi của Quân đội nhân dân Việt Nam tung bay ngạo nghễ trên nóc hầm chỉ huy của tướng De Castries vào chiều ngày 7-5-1954. Chiến thắng Điện Biên Phủ là thắng lợi vĩ đại nhất của quân và dân ta trong cuộc kháng chiến chống Pháp, đập tan hoàn toàn kế hoạch Navarre đầy tham vọng của thực dân Pháp có đế quốc Mỹ hậu thuẫn, khẳng định sức mạnh vô địch của chiến tranh nhân dân Việt Nam."
      },
      {
        title: "Toàn cảnh Hội nghị Giơnevơ (1954)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgGVR_HoiNghi,
        details: "Bức ảnh tư liệu chụp toàn cảnh phiên họp khoáng đại của Hội nghị Giơ-ne-vơ (Thụy Sĩ) năm 1954 về việc lập lại hòa bình ở Đông Dương. Thắng lợi quân sự vang dội từ Điện Biên Phủ đã tạo ra ưu thế đàm phán quyết định cho đoàn đại biểu Việt Nam Dân chủ Cộng hòa do đồng chí Phạm Văn Đồng dẫn đầu. Hiệp định ký kết ngày 21-7-1954 đã chính thức công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của ba nước Đông Dương, chấm dứt hoàn toàn sự thống trị của thực dân Pháp."
      },
      {
        title: "Chiến thắng Ấp Bắc (1963)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgApBac,
        details: "Bức ảnh tư liệu về chiến thắng Ấp Bắc (Mỹ Tho, nay thuộc Tiền Giang) ngày 2-1-1963. Trận đánh quy mô nhỏ nhưng có ý nghĩa chiến lược cực kỳ to lớn, mở đầu cho khả năng đánh bại các chiến thuật quân sự hiện đại 'trực thăng vận' và 'thiết xa vận' của quân đội Mỹ và tay sai. Chiến thắng Ấp Bắc đã củng cố niềm tin mãnh liệt cho quân dân miền Nam, chứng minh lực lượng vũ trang cách mạng dù trang bị thô sơ nhưng có thể đánh bại quân đội tay sai thiện chiến có cố vấn Mỹ trực tiếp chỉ huy."
      },
      {
        title: "Chiến thắng Bình Giã (1964)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgBinhGia,
        details: "Hình ảnh tư liệu lịch sử ghi lại chiến thắng Bình Giã (Bà Rịa) diễn ra từ cuối năm 1964 đến đầu năm 1965. Đây là một chiến dịch tiến công quân sự lớn của Quân Giải phóng miền Nam Việt Nam, tiêu diệt nhiều tiểu đoàn chủ lực ngụy có sự yểm trợ mạnh của trực thăng và xe bọc thép Mỹ. Chiến thắng Bình Giã cùng với chiến thắng Ấp Bắc đã góp phần làm lung lay tận gốc và đập tan hoàn toàn chiến lược 'Chiến tranh đặc biệt' của đế quốc Mỹ ở miền Nam."
      },
      {
        title: "Chiến thắng Đồng Xoài (1965)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgDongXoai,
        details: "Bức ảnh tư liệu về chiến thắng Đồng Xoài (Bình Phước) diễn ra vào tháng 6-1965. Trận đánh thể hiện bước phát triển vượt bậc về trình độ tác chiến tập trung và khả năng công kiên liên tục của Quân Giải phóng miền Nam Việt Nam. Chiến thắng vang dội này cùng với Bình Giã, Ba Gia đã trực tiếp đẩy ngụy quyền Sài Gòn vào cuộc khủng hoảng trầm trọng, báo hiệu sự sụp đổ hoàn toàn của chiến lược 'Chiến tranh đặc biệt', buộc Mỹ phải thay đổi chiến lược sang 'Chiến tranh cục bộ'."
      },
      {
        title: "Phong trào 'Ba sẵn sàng' lịch sử",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgBaSanSang,
        details: "Bức ảnh tư liệu ghi lại lễ ra quân rầm rộ của thanh niên Thủ đô hưởng ứng phong trào thi đua yêu nước 'Ba sẵn sàng' khởi xướng từ Hà Nội vào tháng 8-1964. Phong trào nhanh chóng lan rộng khắp miền Bắc với khẩu hiệu: Sẵn sàng chiến đấu và chiến đấu dũng cảm; Sẵn sàng gia nhập các lực lượng vũ trang; Sẵn sàng đi bất cứ nơi đâu, làm bất cứ việc gì mà Tổ quốc cần. Hàng triệu thanh niên đã hăng hái ký tên tình nguyện bằng máu, thể hiện khí thế sục sôi vươn mình ra tiền tuyến giải phóng miền Nam."
      },
      {
        title: "Vượt sông tiến về phía trước",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgVuotSong,
        details: "Bức ảnh đầy xúc cảm ghi lại hình ảnh những chiến sĩ bộ đội vượt qua những con sông dữ dội dưới làn mưa bom bão đạn của kẻ thù trong các chiến dịch lịch sử giải phóng miền Nam. Vượt qua những rào cản địa hình địa vật hiểm trở khắc nghiệt, mỗi bước tiến của người lính đều được đùm bọc bởi tấm lòng của nhân dân, thể hiện tinh thần quyết chiến quyết thắng, vượt mọi gian khổ hy sinh vì độc lập dân tộc và ngày hội thống nhất non sông."
      },
      {
        title: "Mặt trận Giải phóng miền Nam Việt Nam",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgMTGPMN,
        details: "Bức ảnh ghi lại ngày ra mắt của Ủy ban Trung ương Mặt trận Dân tộc Giải phóng miền Nam Việt Nam, thành lập ngày 20-12-1960 tại vùng giải phóng Tây Ninh. Dưới ngọn cờ nửa đỏ nửa xanh với ngôi sao vàng ở giữa, Mặt trận đã tập hợp rộng rãi mọi tầng lớp nhân dân, các đảng phái, đoàn thể, tôn giáo và nhân sĩ yêu nước ở miền Nam để tiến hành cuộc kháng chiến chống Mỹ cứu nước, tạo ra sức mạnh đại đoàn kết toàn dân tộc vững chắc."
      },
      {
        title: "Phong trào 'Ba đảm nhiệm' của phụ nữ",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgBaDamNhiem,
        details: "Hình ảnh tư liệu ấm áp về phong trào thi đua 'Ba đảm nhiệm' (sau đổi tên là 'Ba đảm đang') của phụ nữ Việt Nam được phát động từ tháng 3-1965. Phong trào kêu gọi phụ nữ miền Bắc đảm nhiệm sản xuất và công tác thay thế nam giới ra tiền tuyến; đảm nhiệm gia đình để chồng con yên tâm chiến đấu; và sẵn sàng phục vụ chiến đấu khi cần thiết. Hàng triệu người mẹ, người chị kiên trung đã trở thành những chiếc cột đỡ vững vàng ở hậu phương lớn, đóng góp to lớn vào chiến thắng chung của cả dân tộc."
      }
    ];

    // Array to be dynamically populated for proximity checking
    const exhibits: Exhibit[] = [];

    // Helper to auto-detect slots from original merged meshes, sort them, and spawn planes
    const setupSlotsForMesh = (
      mesh: THREE.Mesh,
      exhibitDataList: any[],
      exhibitTypePrefix: string
    ) => {
      const geometry = mesh.geometry;
      if (!geometry.index) return;

      const indices = geometry.index.array;
      const positions = geometry.attributes.position.array;

      const numTriangles = indices.length / 3;
      const triangles: { indices: number[]; center: THREE.Vector3 }[] = [];

      for (let i = 0; i < numTriangles; i++) {
        const i0 = indices[i * 3];
        const i1 = indices[i * 3 + 1];
        const i2 = indices[i * 3 + 2];

        const p0 = new THREE.Vector3(positions[i0 * 3], positions[i0 * 3 + 1], positions[i0 * 3 + 2]).applyMatrix4(mesh.matrixWorld);
        const p1 = new THREE.Vector3(positions[i1 * 3], positions[i1 * 3 + 1], positions[i1 * 3 + 2]).applyMatrix4(mesh.matrixWorld);
        const p2 = new THREE.Vector3(positions[i2 * 3], positions[i2 * 3 + 1], positions[i2 * 3 + 2]).applyMatrix4(mesh.matrixWorld);

        const center = new THREE.Vector3().add(p0).add(p1).add(p2).multiplyScalar(1 / 3);
        triangles.push({ indices: [i0, i1, i2], center });
      }

      // Simple distance-based clustering (group triangles closer than 1.5m)
      const visited = new Set<number>();
      const clusters: typeof triangles[] = [];

      for (let i = 0; i < triangles.length; i++) {
        if (visited.has(i)) continue;

        const cluster: typeof triangles = [];
        const queue = [triangles[i]];
        visited.add(i);

        while (queue.length > 0) {
          const tri = queue.shift()!;
          cluster.push(tri);

          for (let j = 0; j < triangles.length; j++) {
            if (visited.has(j)) continue;

            const tri2 = triangles[j];
            const dist = tri.center.distanceTo(tri2.center);

            if (dist < 1.5) {
              visited.add(j);
              queue.push(tri2);
            }
          }
        }
        clusters.push(cluster);
      }

      // Map clusters to slot metrics
      const slots = clusters.map((cluster) => {
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        const uniqueVertexIndices = new Set<number>();
        cluster.forEach((tri) => tri.indices.forEach((idx) => uniqueVertexIndices.add(idx)));

        uniqueVertexIndices.forEach((idx) => {
          const v = new THREE.Vector3(positions[idx * 3], positions[idx * 3 + 1], positions[idx * 3 + 2]).applyMatrix4(mesh.matrixWorld);
          if (v.x < minX) minX = v.x;
          if (v.x > maxX) maxX = v.x;
          if (v.y < minY) minY = v.y;
          if (v.y > maxY) maxY = v.y;
          if (v.z < minZ) minZ = v.z;
          if (v.z > maxZ) maxZ = v.z;
        });

        const center = new THREE.Vector3((minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2);

        // Dimensions
        const height = maxY - minY;
        const sizeX = maxX - minX;
        const sizeZ = maxZ - minZ;
        const width = sizeX > sizeZ ? sizeX : sizeZ;

        // Calculate rotation using radial geometry (center of gallery is [0, center.y, 0])
        const normal = new THREE.Vector3();
        if (exhibitTypePrefix === "inside001") {
          // Point outwards (facing the corridor)
          normal.set(center.x, 0, center.z).normalize();
        } else {
          // Point inwards (facing the center/corridor inwards)
          normal.set(-center.x, 0, -center.z).normalize();
        }

        const angle = Math.atan2(center.x, center.z);

        return { center, width, height, normal, angle };
      });

      // Sort slots clockwise by Y-rotation angle
      slots.sort((a, b) => a.angle - b.angle);

      // Create new picture meshes and add to scene
      slots.forEach((slot, index) => {
        const data = exhibitDataList[index % exhibitDataList.length];
        if (!data) return;

        const group = new THREE.Group();

        // Cap sizes to standard gallery ratios
        const finalWidth = slot.width > 0.5 ? slot.width : 1.68;
        const finalHeight = slot.height > 0.5 ? slot.height : 1.12;

        // 1. Frame Mesh
        const frameGeo = new THREE.BoxGeometry(finalWidth + 0.08, finalHeight + 0.08, 0.04);
        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x2b1e15, // Rich brown wood
          roughness: 0.85,
          metalness: 0.1
        });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.castShadow = true;
        frameMesh.receiveShadow = true;
        group.add(frameMesh);

        // 2. Picture Canvas Mesh
        const canvasGeo = new THREE.PlaneGeometry(finalWidth, finalHeight);
        let canvasMat: THREE.Material;

        if (data.type === "video") {
          const video = document.createElement("video");
          video.src = data.url;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          video.setAttribute("webkit-playsinline", "true");
          video.play().catch((err) => console.log("Video autoplay blocked:", err));
          activeVideos.push(video);

          const videoTex = new THREE.VideoTexture(video);
          videoTex.colorSpace = THREE.SRGBColorSpace;

          canvasMat = new THREE.MeshBasicMaterial({
            map: videoTex,
            side: THREE.DoubleSide
          });
        } else {
          const tex = textureLoader.load(data.url);
          tex.colorSpace = THREE.SRGBColorSpace;

          canvasMat = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
          });
        }

        const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
        canvasMesh.position.z = 0.022; // Offset forward slightly
        group.add(canvasMesh);

        // Spawn position: offset slightly along the normal vector to sit neatly in front of wall
        const spawnPosition = new THREE.Vector3().addVectors(slot.center, new THREE.Vector3().copy(slot.normal).multiplyScalar(0.02));
        group.position.copy(spawnPosition);

        // Point the front of the painting towards the normal
        const lookTarget = new THREE.Vector3().addVectors(spawnPosition, slot.normal);
        group.lookAt(lookTarget);

        scene.add(group);

        // Push to dynamic exhibits list for proximity checking
        exhibits.push({
          id: exhibits.length + 1,
          title: data.title,
          part: data.part,
          type: data.type,
          url: data.url,
          width: finalWidth,
          height: finalHeight,
          position: [spawnPosition.x, spawnPosition.y, spawnPosition.z],
          rotation: [group.rotation.x, group.rotation.y, group.rotation.z],
          details: data.details
        });
      });
    };

    // GLTF Loader to load art_gallery.glb.glb
    const loader = new GLTFLoader();
    let galleryModel: THREE.Group | null = null;

    loader.load(
      "/BaoTang3D/art_gallery.glb.glb",
      (gltf) => {
        galleryModel = gltf.scene;
        galleryModel.position.set(0, 0, 0);
        
        // Hide the original baking paintings and auto-setup custom ones
        galleryModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            // Detect slots and setup dynamic paintings on matching walls
            if (mesh.name === "PaitingsInside_Painting_0") {
              mesh.updateMatrixWorld(true);
              setupSlotsForMesh(mesh, insideExhibitsData, "inside");
              mesh.visible = false;
            } else if (mesh.name === "PaitingsInside.001_Painting_0") {
              mesh.updateMatrixWorld(true);
              setupSlotsForMesh(mesh, inside001ExhibitsData, "inside001");
              mesh.visible = false;
            } else if (mesh.name === "PaitingsOutside_Painting_0") {
              mesh.updateMatrixWorld(true);
              setupSlotsForMesh(mesh, outsideExhibitsData, "outside");
              mesh.visible = false;
            } else if (mesh.material) {
              // Override wall/ceiling colors to warm golden-brown
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              materials.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  const c = mat.color;
                  const hsl = { h: 0, s: 0, l: 0 };
                  c.getHSL(hsl);
                  // Apply golden color to everything except near-black objects
                  // (pitch-black items like cables/metal details stay dark)
                  if (hsl.l > 0.05) {
                    mat.color.set("#6b7280"); // Slate gray for walls + ceiling
                    mat.roughness = 0.75;
                    mat.metalness = 0.05;
                  } else {
                    // Keep near-black surfaces unchanged
                    mat.roughness = Math.max(mat.roughness, 0.45);
                    mat.metalness = Math.min(mat.metalness, 0.5);
                  }
                  mat.needsUpdate = true;
                }
              });
            }
          }
        });
 
         scene.add(galleryModel);
         setLoading(false);
       },
       (xhr) => {
         if (xhr.total) {
           const percent = Math.round((xhr.loaded / xhr.total) * 100);
           setProgress(percent);
         } else {
           const approximateTotal = 44630060;
           const percent = Math.min(Math.round((xhr.loaded / approximateTotal) * 100), 99);
           setProgress(percent);
         }
       },
       (err) => {
         console.error("Error loading GLB model:", err);
         setError("Không thể tải mô hình 3D. Vui lòng thử lại sau.");
         setLoading(false);
       }
     );
 
     // Resize Handler
     const handleResize = () => {
       if (!mountRef.current) return;
       camera.aspect = window.innerWidth / window.innerHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(window.innerWidth, window.innerHeight);
     };
     window.addEventListener("resize", handleResize);
    // Keep reference of current active exhibit to avoid React trigger loop
    let currentActive: Exhibit | null = null;

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Update camera light position
      camLight.position.copy(camera.position);
      
      // WASD / Arrow Keys Walking movement
      // ONLY walk if we are not focused on reading details!
      if (!focusedExhibitRef.current) {
        const moveSpeed = 0.08;
        const moveDirection = new THREE.Vector3();

        // Get forward vector (horizontal plane only)
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        forward.y = 0;
        forward.normalize();

        // Get right vector (horizontal plane only)
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
        right.y = 0;
        right.normalize();

        if (keysPressed["w"] || keysPressed["arrowup"]) {
          moveDirection.add(forward);
        }
        if (keysPressed["s"] || keysPressed["arrowdown"]) {
          moveDirection.sub(forward);
        }
        if (keysPressed["a"] || keysPressed["arrowleft"]) {
          moveDirection.sub(right);
        }
        if (keysPressed["d"] || keysPressed["arrowright"]) {
          moveDirection.add(right);
        }

        if (moveDirection.lengthSq() > 0) {
          moveDirection.normalize().multiplyScalar(moveSpeed);
          const newPos = new THREE.Vector3().addVectors(camera.position, moveDirection);
          
          // Limit walk boundaries (circular room boundary radius is ~8.2m)
          const distFromCenter = Math.sqrt(newPos.x * newPos.x + newPos.z * newPos.z);
          if (distFromCenter < 8.2) {
            camera.position.add(moveDirection);
          }
        }
      }

      // Constrain camera height to eye level
      camera.position.y = 1.8;
 
       // Check proximity of camera to each exhibit center
       let nearestEx: Exhibit | null = null;
       let minDistance = 2.5; // Proximity boundary in meters
 
       exhibits.forEach((ex) => {
         const exPos = new THREE.Vector3(ex.position[0], ex.position[1], ex.position[2]);
         const dist = camera.position.distanceTo(exPos);
         if (dist < minDistance) {
           minDistance = dist;
           nearestEx = ex;
         }
       });

       if (currentActive !== nearestEx) {
         currentActive = nearestEx;
         nearExhibitRef.current = nearestEx;
         setNearExhibit(nearestEx);
       }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanups on unmount
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Remove keyboard listeners
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);

      // Remove drag/swipe look listeners
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      domElement.removeEventListener("touchstart", handleTouchStart);
      domElement.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      // Pause and clean up all active video elements
      activeVideos.forEach((v) => {
        v.pause();
        v.removeAttribute("src");
        v.load();
      });
      
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose resources
      scene.clear();
      renderer.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#6b7280", // Slate gray to match 3D scene background
        display: "flex",
        flexDirection: "column",
        color: "#2b1e15",
        fontFamily: C.sans,
      }}
    >
      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />

      {/* Header Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "16px 24px",
          background: "linear-gradient(to bottom, rgba(107,114,128,0.92) 0%, rgba(107,114,128,0) 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <h2 style={{ fontFamily: C.serif, fontSize: 24, fontWeight: 900, color: C.brown, margin: 0, textShadow: "0 1px 3px rgba(255,255,255,0.4)" }}>
            Bảo Tàng Lịch Sử 3D
          </h2>
          <p style={{ fontSize: 13, color: "rgba(62,40,20,0.85)", margin: "4px 0 0 0" }}>
            Tư liệu ảnh &amp; phim lịch sử Đảng Cộng sản Việt Nam (1945–1975)
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12, pointerEvents: "auto" }}>
          <button
            onClick={() => setShowHelp(!showHelp)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: C.tr,
            }}
            title="Hướng dẫn điều khiển"
          >
            <HelpCircle size={20} />
          </button>
          
          <button
            onClick={onClose}
            style={{
              background: C.red,
              color: "#fff",
              padding: "10px 18px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: C.tr,
              boxShadow: "0 4px 12px rgba(122,26,28,0.3)",
            }}
          >
            <X size={18} />
            Đóng
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#1e1510",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <Loader2 className="animate-spin" size={48} style={{ color: C.accent, marginBottom: 20 }} />
          <h3 style={{ fontFamily: C.serif, fontSize: 22, color: C.accent, margin: "0 0 8px 0" }}>
            Đang tải không gian bảo tàng 3D...
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
            Kích thước mô hình: ~44.6 MB
          </p>
          <div style={{ width: 240, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", position: "relative" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: C.accent,
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: C.accent, fontWeight: 700, marginTop: 8 }}>
            {progress}% hoàn tất
          </span>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#1e1510",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 11,
          }}
        >
          <h3 style={{ fontFamily: C.serif, fontSize: 22, color: C.red, margin: "0 0 12px 0" }}>
            Có lỗi xảy ra
          </h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>
            {error}
          </p>
          <button
            onClick={onClose}
            style={{
              background: C.red,
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Quay lại
          </button>
        </div>
      )}

      {/* Active Exhibit Proximity Card (Prompt to press [F] or Tap) */}
      {nearExhibit && !focusedExhibit && !loading && !error && (
        <div
          className="no-drag-ui"
          onClick={() => setFocusedExhibit(nearExhibit)}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: 500,
            background: "rgba(30, 21, 16, 0.95)",
            backdropFilter: "blur(10px)",
            border: `1.5px solid ${C.accent}`,
            borderRadius: 8,
            padding: "16px 20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            zIndex: 40,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, color: C.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
            {nearExhibit.part}
          </span>
          <h4 style={{ fontFamily: C.serif, fontSize: 17, fontWeight: 800, color: "#fff", margin: "0 0 8px 0" }}>
            {nearExhibit.title}
          </h4>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.red, color: "#fff", padding: "6px 14px", borderRadius: 4, fontSize: 13, fontWeight: 700 }}>
            <span>Nhấn phím [F] hoặc Chạm để xem chi tiết</span>
          </div>
        </div>
      )}

      {/* Glassmorphic Cinema Focus Modal Overlay */}
      {focusedExhibit && !loading && !error && (
        <div
          className="no-drag-ui"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15, 10, 8, 0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              maxWidth: 900,
              maxHeight: "85vh",
              background: "#1e1510",
              border: `2px solid ${C.accent}`,
              borderRadius: 8,
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Close button top-right */}
            <button
              onClick={() => setFocusedExhibit(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                zIndex: 110,
              }}
            >
              <X size={20} />
            </button>

            {/* Left Column: Media view */}
            <div
              style={{
                flex: "1 1 450px",
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 300,
                position: "relative",
              }}
            >
              {focusedExhibit.type === "video" ? (
                <video
                  src={focusedExhibit.url}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "50vh",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <img
                  src={focusedExhibit.url}
                  alt={focusedExhibit.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "50vh",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>

            {/* Right Column: Historical text details */}
            <div
              style={{
                flex: "1 1 350px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {focusedExhibit.part}
              </span>
              <h3
                style={{
                  fontFamily: C.serif,
                  fontSize: 22,
                  fontWeight: 900,
                  color: "#fff",
                  margin: "0 0 16px 0",
                  lineHeight: 1.3,
                  borderBottom: `1px solid rgba(139,107,63,0.25)`,
                  paddingBottom: 12,
                }}
              >
                {focusedExhibit.title}
              </h3>
              <p
                style={{
                  fontFamily: C.body,
                  fontSize: 15.5,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.6,
                  margin: 0,
                  textAlign: "justify",
                  whiteSpace: "pre-line",
                }}
              >
                {focusedExhibit.details}
              </p>

              <div style={{ marginTop: "24px", paddingTop: "12px" }}>
                <button
                  onClick={() => setFocusedExhibit(null)}
                  style={{
                    background: C.red,
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: 4,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 14,
                    boxShadow: "0 4px 10px rgba(122,26,28,0.3)",
                    transition: C.tr,
                  }}
                >
                  Quay lại tham quan [F]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal / Card (Overlayed in bottom-left) */}
      {showHelp && !loading && !error && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: 24,
            width: 320,
            background: "rgba(30,21,16,0.85)",
            backdropFilter: "blur(8px)",
            border: `1.5px solid rgba(139,107,63,0.3)`,
            borderRadius: 6,
            padding: "16px 20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            pointerEvents: "auto",
            zIndex: 45,
          }}
        >
          <div style={{ display: "flex", justifyContext: "space-between", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h4 style={{ fontFamily: C.serif, fontSize: 16, fontWeight: 800, color: C.accent, margin: 0 }}>
              Hướng dẫn tham quan
            </h4>
            <button
              onClick={() => setShowHelp(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>
          <ul style={{ paddingLeft: 16, margin: 0, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
            <li style={{ marginBottom: 6 }}>
              <strong style={{ color: C.accent }}>Phím WASD / Mũi tên:</strong> Di chuyển (Walk)
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong style={{ color: C.accent }}>Kéo chuột / Vuốt màn hình:</strong> Xoay hướng nhìn (Look around)
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong style={{ color: C.accent }}>Phím F / Click tranh:</strong> Đọc chi tiết / Xem video lớn
            </li>
            <li>
              <strong style={{ color: C.accent }}>Phím ESC / F:</strong> Thoát giao diện đọc chi tiết
            </li>
          </ul>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 12, paddingTop: 10, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            * Tiến lại gần bất kỳ bức tranh nào trong khoảng 2.5m để tương tác với tư liệu.
          </div>
        </div>
      )}

      {/* Quick guide text at the bottom right */}
      {!loading && !error && !nearExhibit && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            background: "rgba(0,0,0,0.5)",
            padding: "8px 14px",
            borderRadius: 4,
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            pointerEvents: "none",
            zIndex: 35,
          }}
        >
          Sử dụng WASD để di chuyển, kéo chuột để xoay đầu
        </div>
      )}
    </div>
  );
}
