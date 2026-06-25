import { C } from "@/tokens";

export function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  width = "100%",
  darkCaption = false,
  height = 220,
}: {
  src: string;
  alt: string;
  caption: string;
  rotate?: number;
  width?: string;
  darkCaption?: boolean;
  height?: number | string;
}) {
  return (
    <figure
      style={{
        width,
        margin: "0 auto",
        transform: `rotate(${rotate}deg)`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = `rotate(0deg) scale(1.06) translateY(-8px)`;
        e.currentTarget.style.zIndex = "25";
        e.currentTarget.style.boxShadow = "0 20px 45px rgba(122,26,28,0.25), 0 0 20px rgba(212,163,69,0.45)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${rotate}deg) scale(1) translateY(0px)`;
        e.currentTarget.style.zIndex = "1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {darkCaption ? (
        // Magazine styled caption box (from mockup)
        <div
          style={{
            background: "#fff",
            padding: "8px",
            border: `1.5px solid ${C.red}`,
            boxShadow: "0 10px 25px rgba(62,47,28,0.18)",
            position: "relative",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: height,
              objectFit: "cover",
              display: "block",
              filter: "sepia(0.2) contrast(1.08) brightness(0.92)",
            }}
          />
          <div
            style={{
              background: C.red,
              color: "#fff",
              padding: "8px 12px",
              marginTop: 6,
              fontFamily: C.body,
              fontSize: 15.5,
              fontWeight: 600,
              textAlign: "center",
              lineHeight: 1.4,
              border: `1px solid ${C.accent}`,
            }}
          >
            {caption}
          </div>
        </div>
      ) : (
        // Classic Polaroid style
        <>
          <div
            style={{
              background: "#fff",
              padding: "10px 10px 36px",
              boxShadow: "2px 4px 18px rgba(62,47,28,0.18), 0 1px 4px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
                height: height,
                filter: "sepia(0.25) contrast(1.06) brightness(0.94)",
              }}
            />
          </div>
          <figcaption
            style={{
              fontFamily: C.body,
              fontSize: 15,
              fontStyle: "italic",
              color: C.brown,
              fontWeight: 600,
              textAlign: "center",
              marginTop: 10,
              lineHeight: 1.5,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {caption}
          </figcaption>
        </>
      )}
    </figure>
  );
}

