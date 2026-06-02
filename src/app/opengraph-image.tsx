import { ImageResponse } from "next/og";
import { readFileSync } from "fs";

export const runtime = "nodejs";

export const alt = "Pizza Restaurant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoContent = readFileSync("public/logo.svg", "utf-8");
  const logoDataUrl = `data:image/svg+xml,${encodeURIComponent(logoContent)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FDF6EE 0%, #FFF1E0 50%, #FDE8D0 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(246,95,66,0.08) 0%, rgba(246,95,66,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(246,95,66,0.06) 0%, rgba(246,95,66,0) 70%)",
          }}
        />
        <img
          src={logoDataUrl}
          width={400}
          height={120}
          alt="Pizza Restaurant"
          style={{ marginBottom: 32 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#F65F42",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: "#F65F42",
              borderRadius: 1,
            }}
          />
          Fresh Hand-Tossed Pizza
          <div
            style={{
              width: 40,
              height: 2,
              background: "#F65F42",
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
