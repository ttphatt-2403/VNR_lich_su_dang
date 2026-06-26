import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { X, HelpCircle, Loader2 } from "lucide-react";
import { C } from "@/tokens";

interface Museum3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Museum3DModal({ isOpen, onClose }: Museum3DModalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(true);

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
    // Position the camera inside the gallery
    camera.position.set(0, 1.8, 8);

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

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.minDistance = 0.5;
    controls.maxDistance = 60;
    // Limit looking down below the floor
    controls.maxPolarAngle = Math.PI / 2 + 0.15; 
    controls.target.set(0, 1.5, 0);
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#fff9e6", 1.2);
    sunLight.position.set(10, 20, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Light attached to camera so view is never pitch black
    const camLight = new THREE.PointLight("#ffffff", 0.8, 20);
    scene.add(camLight);

    // Floor Grid Helper (for spatial references, styled nicely)
    const gridHelper = new THREE.GridHelper(100, 100, "#8b6b3f", "rgba(139,107,63,0.15)");
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // GLTF Loader to load art_gallery.glb.glb
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;

    loader.load(
      "/BaoTang3D/art_gallery.glb.glb",
      (gltf) => {
        model = gltf.scene;
        
        // Center/adjust model scale or position if needed
        model.position.set(0, 0, 0);
        
        // Enable shadows on all child meshes
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Adjust materials if they are too dark or shiny
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              materials.forEach((mat) => {
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughness = Math.max(mat.roughness, 0.4);
                  mat.metalness = Math.min(mat.metalness, 0.6);
                }
              });
            }
          }
        });

        scene.add(model);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setProgress(percent);
        } else {
          // If total is 0 or not provided, approximate based on loaded size (~44MB)
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

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Update camera light position
      camLight.position.copy(camera.position);
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanups on unmount
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
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
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
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
              <strong style={{ color: C.accent }}>Chuột trái + Kéo:</strong> Xoay góc nhìn (Orbit)
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong style={{ color: C.accent }}>Chuột phải + Kéo:</strong> Di chuyển vị trí (Pan)
            </li>
            <li style={{ marginBottom: 6 }}>
              <strong style={{ color: C.accent }}>Cuộn chuột:</strong> Thu phóng khoảng cách (Zoom)
            </li>
            <li>
              <strong style={{ color: C.accent }}>Chạm & Vuốt (Mobile):</strong> Xoay / Thu phóng góc nhìn
            </li>
          </ul>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 12, paddingTop: 10, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            * Ở các bước tiếp theo, chúng ta sẽ chèn trực tiếp tranh ảnh và video Điện Biên Phủ vào các khung tranh 3D trong không gian này.
          </div>
        </div>
      )}

      {/* Quick guide text at the bottom right */}
      {!loading && !error && (
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
          }}
        >
          Sử dụng chuột hoặc cảm ứng để tương tác với mô hình 3D
        </div>
      )}
    </div>
  );
}
