import { useState } from "react";

// ── Chevron helper ───────────────────────────────────────────────────────────
function Chevron({ up = false, color = "#545453", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d={up ? "M3 9.5L7 5.5L11 9.5" : "M3 5.5L7 9.5L11 5.5"} stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── TopBar component ─────────────────────────────────────────────────────────
// Props:
//   contextLabel  — string: left-side label (e.g. "Month-end close")
//   period        — string: period picker text (e.g. "February 2026")
//   syncStatus    — string: sync status text (e.g. "Last synced 32 minutes ago")
//   syncLabel     — string: sync button label (e.g. "Sync with Xero")
//   onPeriodClick — fn(): called when period picker is clicked
//   onSyncClick   — fn(): called when sync button is clicked
export default function TopBar({
  contextLabel = "Month-end close",
  period = "April 2026",
  syncStatus = "Last synced 32 minutes ago",
  syncLabel = "Sync with Xero",
  onPeriodClick,
  onSyncClick,
}) {
  return (
    <div style={{
      height: 60, background: "#FFFFFF", borderBottom: "1px solid #E9E9EB",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", flexShrink: 0,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Left: context label + period picker */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, color: "#8C8C8B" }}>{contextLabel}</span>
        <button
          onClick={onPeriodClick}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "5px 10px",
            border: "1px solid #E9E9EB", borderRadius: 6,
            background: "#FFFFFF", cursor: "pointer",
            fontSize: 14, fontWeight: 500, color: "#080908",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#CFCFD1"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#E9E9EB"}
        >
          {period}
          <Chevron up={false} color="#080908" size={13} />
        </button>
      </div>

      {/* Right: sync status + sync button */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12, color: "#8C8C8B" }}>{syncStatus}</span>
        <button
          onClick={onSyncClick}
          style={{
            padding: "6px 12px",
            border: "1px solid #E9E9EB", borderRadius: 6,
            background: "#FFFFFF", cursor: "pointer",
            fontSize: 14, fontWeight: 500, color: "#080908",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
        >
          {syncLabel}
        </button>
      </div>
    </div>
  );
}
