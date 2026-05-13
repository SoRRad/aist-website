import { ImageResponse } from "next/og";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const title = project ? project.name : "Project";
  const subtitle = project ? project.tagline : siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          background: "linear-gradient(135deg, #061632 0%, #0a2150 60%, #061632 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(30,136,229,0.06) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(30,136,229,0.06) 80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background: "radial-gradient(ellipse at top right, rgba(30,136,229,0.15) 0%, transparent 70%)",
          }}
        />

        {/* AIST label */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#1e88e5",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {siteConfig.name} · Project
        </div>

        {/* Project name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#f1f5f9",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#94a3b8",
            lineHeight: 1.3,
            maxWidth: 800,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 16,
            color: "#475569",
          }}
        >
          {siteConfig.institution.name} · {siteConfig.institution.department}
        </div>
      </div>
    ),
    { ...size },
  );
}
