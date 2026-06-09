import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "LUMIS — Technology, Refined";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const syneBold = await fetch(
    "https://fonts.gstatic.com/s/syne/v22/8QIFdfQdSkA7oaUdV53FrL6La2qI.woff"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div
            style={{
              position: "relative",
              width: "88px",
              height: "88px",
              borderRadius: "20px",
              backgroundColor: "#0A0A0A",
              border: "3px solid #FFFFFF",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "22px",
                top: "20px",
                width: "24px",
                height: "48px",
                backgroundColor: "#FFFFFF",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "22px",
                bottom: "20px",
                width: "40px",
                height: "10px",
                backgroundColor: "#FFFFFF",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "18px",
                top: "20px",
                width: "10px",
                height: "48px",
                borderRadius: "5px",
                backgroundColor: "#2563EB",
              }}
            />
          </div>

          <div
            style={{
              fontFamily: "Syne",
              fontSize: "96px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            LUMIS
          </div>
        </div>

        <div
          style={{
            marginTop: "36px",
            fontFamily: "Syne",
            fontSize: "40px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.72)",
            letterSpacing: "-0.02em",
          }}
        >
          Technology, Refined.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: syneBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
