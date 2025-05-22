import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: "linear-gradient(to bottom, #7e22ce, #581c87)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0 0 4px 4px",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "75%",
          height: "75%",
        }}
      >
        {/* Roof/triangle */}
        <div
          style={{
            width: "100%",
            height: "25%",
            background: "rgba(216, 180, 254, 0.8)",
            clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
            marginBottom: "1px",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(216, 180, 254, 0.8)",
            marginBottom: "1px",
          }}
        />

        {/* Columns container */}
        <div
          style={{
            width: "100%",
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            padding: "0 2px",
          }}
        >
          {/* 4 columns */}
          <div style={{ width: "15%", background: "rgba(216, 180, 254, 0.8)", borderRadius: "0 0 1px 1px" }} />
          <div style={{ width: "15%", background: "rgba(216, 180, 254, 0.8)", borderRadius: "0 0 1px 1px" }} />
          <div style={{ width: "15%", background: "rgba(216, 180, 254, 0.8)", borderRadius: "0 0 1px 1px" }} />
          <div style={{ width: "15%", background: "rgba(216, 180, 254, 0.8)", borderRadius: "0 0 1px 1px" }} />
        </div>

        {/* Base */}
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(216, 180, 254, 0.8)",
            marginTop: "1px",
          }}
        />
      </div>
    </div>,
    { ...size },
  )
}
