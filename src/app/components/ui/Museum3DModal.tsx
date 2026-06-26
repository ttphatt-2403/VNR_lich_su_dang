import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { X, HelpCircle, Loader2, BookOpen, Film } from "lucide-react";
import { C } from "@/tokens";
import {
  imgToLamUN,
  imgVietnamMap,
  imgVietnamTrain,
  imgVietnamHighwayTraffic,
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
  imgBaSanSang
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
    scene.background = new THREE.Color("#1e1510"); // Warm dark background
    scene.fog = new THREE.FogExp2("#1e1510", 0.015);

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
    renderer.toneMappingExposure = 1.0;

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

    // Lighting
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fff9e6", 1.0);
    sunLight.position.set(10, 20, 15);
    scene.add(sunLight);

    // Light attached to camera so view is never pitch black
    const camLight = new THREE.PointLight("#ffffff", 0.8, 15);
    scene.add(camLight);

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
        details: "Đoạn phim tư liệu chân thực quay lại bối cảnh đại biểu thảo luận, biểu quyết và sinh hoạt tại chiến khu Việt Bắc trong những ngày Đại hội diễn ra."
      },
      {
        title: "Phim tư liệu Chiến thắng Điện Biên Phủ (1954)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "video",
        url: "/BaoTang3D/pic_and_video/(387) Chiến thắng Điện Biên Phủ 1954 - YouTube.mp4",
        details: "Thước phim chân thực ghi lại khí thế hào hùng của quân dân ta: kéo pháo qua đèo, đào hào bao vây và đợt tổng công kích cuối cùng vào hầm chỉ huy của giặc."
      },
      {
        title: "Phim tư liệu Phong trào Đồng Khởi (1960)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "video",
        url: "/BaoTang3D/pic_and_video/(387) Phong trào Đồng Khởi - Bước ngoặt của cách mạng miền Nam - YouTube.mp4",
        details: "Bùng nổ từ Bến Tre, phong trào lan rộng khắp miền Nam, làm tan rã cơ cấu chính quyền cơ sở của địch, chuyển cách mạng miền Nam sang thế tiến công."
      },
      {
        title: "Phim tư liệu Chiến Tranh Đặc Biệt (1961)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "video",
        url: "/BaoTang3D/pic_and_video/(387) Chiến Tranh Đặc Biệt 1961 - YouTube.mp4",
        details: "Thước phim tư liệu về thời kỳ chống chiến lược Chiến tranh đặc biệt của đế quốc Mỹ ở miền Nam Việt Nam (1961 - 1965)."
      }
    ];

    const inside001ExhibitsData = [
      {
        title: "Bản đồ Cách mạng hai miền (1954 - 1975)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgVietnamMap,
        details: "Việt Nam tạm thời chia cắt thành hai miền tại vĩ tuyến 17. Đảng đề ra hai nhiệm vụ chiến lược song song: xây dựng miền Bắc làm hậu phương và giải phóng miền Nam."
      },
      {
        title: "Hội nghị Trung ương lần thứ 15 (1-1959)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgNQ15_HoiNghi,
        details: "Hội nghị quan trọng vạch ra con đường cách mạng miền Nam: sử dụng bạo lực cách mạng, kết hợp đấu tranh chính trị với đấu tranh quân sự để đánh đổ Mỹ - Diệm."
      },
      {
        title: "Phong trào Đồng khởi (1960)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgDongKhoi,
        details: "Bùng nổ từ Bến Tre, phong trào lan rộng khắp miền Nam, làm tan rã cơ cấu chính quyền cơ sở của địch, chuyển cách mạng miền Nam sang thế tiến công."
      },
      {
        title: "Đại hội đại biểu toàn quốc lần thứ III (9-1960)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgDaihoi3_1,
        details: "Đại hội xác định đường lối chung của cách mạng cả nước: kết hợp xây dựng CNXH ở miền Bắc và đấu tranh giải phóng dân tộc ở miền Nam."
      }
    ];

    const outsideExhibitsData = [
      {
        title: "Đại hội đại biểu toàn quốc lần thứ II (2-1951)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDaihoi2PhatBieu,
        details: "Đại hội II của Đảng diễn ra tại chiến khu Việt Bắc, quyết định đưa Đảng ra hoạt động công khai dưới tên gọi Đảng Lao động Việt Nam để trực tiếp lãnh đạo kháng chiến."
      },
      {
        title: "Toàn cảnh hội trường Đại hội II",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDaihoi2ToanCanh,
        details: "Toàn cảnh hội trường làm việc giản dị bằng tranh tre nứa lá tại chiến khu Việt Bắc, thể hiện tinh thần vượt khó kháng chiến thắng lợi của Đảng."
      },
      {
        title: "Bộ Chỉ huy chiến dịch Điện Biên Phủ",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDBP_HopBan,
        details: "Đại tướng Võ Nguyên Giáp cùng Bộ chỉ huy họp bàn kế hoạch tác chiến cho chiến dịch lịch sử Điện Biên Phủ với phương châm 'đánh chắc, tiến chắc'."
      },
      {
        title: "Chiến dịch Điện Biên Phủ (1954)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgDBP_CamCo,
        details: "Chiến dịch Điện Biên Phủ kết thúc thắng lợi rực rỡ, đập tan tập đoàn cứ điểm mạnh nhất Đông Dương của thực dân Pháp, tạo tiếng vang chấn động địa cầu."
      },
      {
        title: "Toàn cảnh Hội nghị Giơnevơ (1954)",
        part: "Phần I · Lịch sử giai đoạn 1930 - 1954",
        type: "image",
        url: imgGVR_HoiNghi,
        details: "Quang cảnh phòng họp hội nghị đa phương tại Giơnevơ bàn về việc lập lại hòa bình ở Đông Dương sau thắng lợi quân sự của Việt Nam."
      },
      {
        title: "Chiến thắng Ấp Bắc (1963)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgApBac,
        details: "Chiến thắng vang dội mở đầu cho phong trào tiêu diệt các chiến thuật 'trực thăng vận' và 'thiết xa vận' của Mỹ, chứng minh quân dân miền Nam hoàn toàn có thể đánh bại quân Mỹ."
      },
      {
        title: "Chiến thắng Bình Giã (1964)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgBinhGia,
        details: "Chiến thắng tại Bình Giã (Bà Rịa) đã đập tan xương sống của chiến lược 'Chiến tranh đặc biệt', tiêu diệt nhiều tiểu đoàn chủ lực tinh nhuệ của ngụy."
      },
      {
        title: "Chiến thắng Đồng Xoài (1965)",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgDongXoai,
        details: "Trận tiến công quy mô lớn góp phần làm sụp đổ hoàn toàn chiến lược 'Chiến tranh đặc biệt' của Mỹ, khẳng định sự trưởng thành vượt bậc của Quân Giải phóng."
      },
      {
        title: "Phong trào 'Ba sẵn sàng' lịch sử",
        part: "Phần II · Lịch sử giai đoạn 1954 - 1975",
        type: "image",
        url: imgBaSanSang,
        details: "Phong trào thi đua yêu nước sục sôi của thanh niên miền Bắc sẵn sàng chiến đấu, sẵn sàng gia nhập quân đội và sẵn sàng đi bất cứ nơi đâu Tổ quốc cần."
      },
      {
        title: "Đột phá giao thông & Tốc độ cao",
        part: "Ví dụ thực tiễn · Đất nước đổi mới",
        type: "image",
        url: imgVietnamHighwayTraffic,
        details: "Hạ tầng giao thông Bắc - Nam đột phá mạnh mẽ thể hiện tiềm lực và khát vọng phát triển vượt trội của nước nhà trong kỷ nguyên đổi mới."
      },
      {
        title: "Đường sắt tốc độ cao Bắc - Nam",
        part: "Ví dụ thực tiễn · Hướng tới tương lai",
        type: "image",
        url: imgVietnamTrain,
        details: "Dự án đường sắt tốc độ cao kết nối hai miền Tổ quốc nhanh chóng, an toàn, thể hiện tầm nhìn thế kỷ và quyết tâm vươn mình của quốc gia."
      },
      {
        title: "Trường phái Ngoại giao cây tre",
        part: "Ví dụ thực tiễn · Kế thừa lịch sử",
        type: "image",
        url: imgToLamUN,
        details: "Bài học độc lập, tự chủ từ quá khứ được phát triển thành học thuyết 'Ngoại giao cây tre Việt Nam' thời đại mới: mềm dẻo về phương pháp nhưng kiên định về nguyên tắc."
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
              // Adjust other generic materials
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              materials.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughness = Math.max(mat.roughness, 0.45);
                  mat.metalness = Math.min(mat.metalness, 0.5);
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
        background: "#1e1510",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
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
          background: "linear-gradient(to bottom, rgba(30,21,16,0.85) 0%, rgba(30,21,16,0) 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <h2 style={{ fontFamily: C.serif, fontSize: 24, fontWeight: 900, color: C.accent, margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            Bảo Tàng Lịch Sử 3D
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "4px 0 0 0" }}>
            Trực quan hoá tư liệu Điện Biên Phủ & Hiệp định Giơnevơ
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
