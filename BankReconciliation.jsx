import { useState, useEffect, useRef } from "react";

// ── Icon SVG paths from Mimo nav icon set ─────────────────────────────────────
const PATHS = {
  home: "M7.5 17.5016V11.3349C7.5 10.8682 7.5 10.6348 7.59083 10.4566C7.67072 10.2998 7.79821 10.1723 7.95501 10.0924C8.13327 10.0016 8.36662 10.0016 8.83333 10.0016H11.1667C11.6334 10.0016 11.8667 10.0016 12.045 10.0924C12.2018 10.1723 12.3293 10.2998 12.4092 10.4566C12.5 10.6348 12.5 10.8682 12.5 11.3349V17.5016M9.18141 2.30492L3.52949 6.70086C3.15168 6.99471 2.96278 7.14163 2.82669 7.32563C2.70614 7.48862 2.61633 7.67224 2.56169 7.86746C2.5 8.08785 2.5 8.32717 2.5 8.8058V14.8349C2.5 15.7683 2.5 16.235 2.68166 16.5916C2.84144 16.9052 3.09641 17.1601 3.41002 17.3199C3.76654 17.5016 4.23325 17.5016 5.16667 17.5016H14.8333C15.7668 17.5016 16.2335 17.5016 16.59 17.3199C16.9036 17.1601 17.1586 16.9052 17.3183 16.5916C17.5 16.235 17.5 15.7683 17.5 14.8349V8.8058C17.5 8.32717 17.5 8.08785 17.4383 7.86746C17.3837 7.67224 17.2939 7.48862 17.1733 7.32563C17.0372 7.14163 16.8483 6.99471 16.4705 6.70086L10.8186 2.30492C10.5258 2.07721 10.3794 1.96335 10.2178 1.91959C10.0752 1.88097 9.92484 1.88097 9.78221 1.91959C9.62057 1.96335 9.47418 2.07721 9.18141 2.30492Z",
  bookOpen: "M9.99984 17.5L9.91646 17.3749C9.33759 16.5066 9.04816 16.0725 8.66575 15.7582C8.32722 15.4799 7.93714 15.2712 7.51784 15.1438C7.04421 15 6.52243 15 5.47886 15H4.33317C3.39975 15 2.93304 15 2.57652 14.8183C2.26292 14.6586 2.00795 14.4036 1.84816 14.09C1.6665 13.7335 1.6665 13.2668 1.6665 12.3333V5.16667C1.6665 4.23325 1.6665 3.76654 1.84816 3.41002C2.00795 3.09641 2.26292 2.84144 2.57652 2.68166C2.93304 2.5 3.39975 2.5 4.33317 2.5H4.6665C6.53335 2.5 7.46677 2.5 8.17981 2.86331C8.80701 3.18289 9.31695 3.69282 9.63653 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333M9.99984 17.5V7.83333M9.99984 17.5L10.0832 17.3749C10.6621 16.5066 10.9515 16.0725 11.3339 15.7582C11.6725 15.4799 12.0625 15.2712 12.4818 15.1438C12.9555 15 13.4772 15 14.5208 15H15.6665C16.5999 15 17.0666 15 17.4232 14.8183C17.7368 14.6586 17.9917 14.4036 18.1515 14.09C18.3332 13.7335 18.3332 13.2668 18.3332 12.3333V5.16667C18.3332 4.23325 18.3332 3.76654 18.1515 3.41002C17.9917 3.09641 17.7368 2.84144 17.4232 2.68166C17.0666 2.5 16.5999 2.5 15.6665 2.5H15.3332C13.4663 2.5 12.5329 2.5 11.8199 2.86331C11.1927 3.18289 10.6827 3.69282 10.3631 4.32003C9.99984 5.03307 9.99984 5.96649 9.99984 7.83333",
  inbox: "M2.08317 9.9987H4.90148C5.47248 9.9987 5.99448 10.3213 6.24984 10.832C6.5052 11.3428 7.02719 11.6654 7.5982 11.6654H12.4015C12.9725 11.6654 13.4945 11.3428 13.7498 10.832C14.0052 10.3213 14.5272 9.9987 15.0982 9.9987H17.9165M7.47197 3.33203H12.5277C13.4251 3.33203 13.8738 3.33203 14.2699 3.46867C14.6202 3.5895 14.9393 3.78669 15.204 4.04599C15.5034 4.33919 15.7041 4.74053 16.1054 5.54318L17.9109 9.15412C18.0684 9.4691 18.1471 9.6266 18.2027 9.79165C18.252 9.93824 18.2876 10.0891 18.309 10.2423C18.3332 10.4147 18.3332 10.5908 18.3332 10.943V12.6654C18.3332 14.0655 18.3332 14.7656 18.0607 15.3003C17.821 15.7707 17.4386 16.1532 16.9681 16.3929C16.4334 16.6654 15.7333 16.6654 14.3332 16.6654H5.6665C4.26637 16.6654 3.56631 16.6654 3.03153 16.3929C2.56112 16.1532 2.17867 15.7707 1.93899 15.3003C1.6665 14.7656 1.6665 14.0655 1.6665 12.6654V10.943C1.6665 10.5908 1.6665 10.4147 1.69065 10.2423C1.71209 10.0891 1.7477 9.93824 1.79702 9.79165C1.85255 9.6266 1.9313 9.4691 2.0888 9.15412L3.89426 5.54318C4.29559 4.74052 4.49625 4.3392 4.79562 4.04599C5.06036 3.78669 5.37943 3.5895 5.72974 3.46867C6.12588 3.33203 6.57458 3.33203 7.47197 3.33203Z",
  checkVerifiedBadge: "M7.66809 17.1687C7.94121 17.1326 8.21712 17.2067 8.43469 17.3742L9.43738 18.1437C9.76884 18.3983 10.2299 18.3983 10.5604 18.1437L11.6011 17.3446C11.7955 17.1955 12.0409 17.1298 12.2834 17.1622L13.5852 17.3335C13.999 17.3881 14.3981 17.1576 14.5583 16.7715L15.0591 15.5604C15.1526 15.3336 15.3323 15.1539 15.5591 15.0604L16.7701 14.5595C17.1562 14.4003 17.3867 14.0003 17.3321 13.5864L17.1673 12.3318C17.1312 12.0587 17.2053 11.7827 17.3728 11.5651L18.1422 10.5624C18.3968 10.2309 18.3968 9.76983 18.1422 9.43928L17.3432 8.39857C17.1941 8.20413 17.1284 7.95877 17.1608 7.71618L17.3321 6.41437C17.3867 6.00049 17.1562 5.60142 16.7701 5.44124L15.5591 4.94033C15.3323 4.84682 15.1526 4.66719 15.0591 4.44035L14.5583 3.22927C14.399 2.84317 13.999 2.61262 13.5852 2.66725L12.2834 2.83854C12.0409 2.87187 11.7955 2.80613 11.602 2.65799L10.5614 1.85894C10.2299 1.60431 9.76884 1.60431 9.43831 1.85894L8.39766 2.65799C8.20323 2.80613 7.95788 2.87187 7.71531 2.84039L6.41356 2.6691C5.99971 2.61447 5.60067 2.84502 5.4405 3.23112L4.94054 4.4422C4.8461 4.66812 4.66649 4.84774 4.44058 4.94218L3.22957 5.44217C2.84349 5.60235 2.61295 6.00141 2.66758 6.41529L2.83886 7.71711C2.87034 7.95969 2.8046 8.20506 2.65647 8.39857L1.85746 9.43928C1.60285 9.77075 1.60285 10.2319 1.85746 10.5624L2.65647 11.6031C2.80553 11.7975 2.87126 12.0429 2.83886 12.2855L2.66758 13.5873C2.61295 14.0012 2.84349 14.4003 3.22957 14.5604L4.44058 15.0613C4.66741 15.1549 4.84703 15.3345 4.94054 15.5613L5.44142 16.7724C5.60067 17.1585 6.00063 17.3891 6.41449 17.3344L7.66809 17.1687Z",
  checkVerifiedMark: "M7.49984 10.0013L9.1665 11.668L12.9165 7.91797",
  switchHorizontal: "M16.6668 14.1667H3.3335M3.3335 14.1667L6.66683 10.8333M3.3335 14.1667L6.66683 17.5M3.3335 5.83333H16.6668M16.6668 5.83333L13.3335 2.5M16.6668 5.83333L13.3335 9.16667",
  fileQuestion: "M16.6668 7.91797V5.66797C16.6668 4.26784 16.6668 3.56777 16.3943 3.03299C16.1547 2.56259 15.7722 2.18014 15.3018 1.94045C14.767 1.66797 14.067 1.66797 12.6668 1.66797H7.3335C5.93336 1.66797 5.2333 1.66797 4.69852 1.94045C4.22811 2.18014 3.84566 2.56259 3.60598 3.03299C3.3335 3.56777 3.3335 4.26784 3.3335 5.66797V14.3346C3.3335 15.7348 3.3335 16.4348 3.60598 16.9696C3.84566 17.44 4.22811 17.8225 4.69852 18.0622C5.2333 18.3346 5.93336 18.3346 7.3335 18.3346H11.6668M11.6668 9.16797H6.66683M8.3335 12.5013H6.66683M13.3335 5.83464H6.66683M13.7502 12.5032C13.897 12.0858 14.1868 11.7338 14.5683 11.5096C14.9497 11.2854 15.3982 11.2035 15.8343 11.2783C16.2704 11.3531 16.666 11.5798 16.9509 11.9183C17.2359 12.2568 17.3919 12.6852 17.3912 13.1277C17.3912 14.3768 15.5176 15.0013 15.5176 15.0013M15.5417 17.5013H15.5501",
  settingsGear: "M7.82936 16.1439L8.3164 17.2393C8.46118 17.5653 8.69747 17.8424 8.99659 18.0368C9.29571 18.2312 9.64483 18.3347 10.0016 18.3346C10.3583 18.3347 10.7075 18.2312 11.0066 18.0368C11.3057 17.8424 11.542 17.5653 11.6868 17.2393L12.1738 16.1439C12.3472 15.7552 12.6388 15.4312 13.0071 15.218C13.3778 15.0042 13.8066 14.9131 14.2321 14.9578L15.4238 15.0846C15.7785 15.1222 16.1365 15.056 16.4544 14.8941C16.7722 14.7322 17.0363 14.4816 17.2145 14.1726C17.393 13.8638 17.4781 13.5099 17.4593 13.1537C17.4406 12.7975 17.3189 12.4545 17.109 12.1661L16.4034 11.1967C16.1522 10.8489 16.018 10.4303 16.0201 10.0013C16.02 9.57346 16.1555 9.15659 16.4071 8.81056L17.1127 7.84112C17.3226 7.55276 17.4443 7.20969 17.463 6.85353C17.4818 6.49737 17.3967 6.14342 17.2183 5.83464C17.04 5.52566 16.7759 5.27504 16.4581 5.11316C16.1402 4.95127 15.7822 4.88508 15.4275 4.9226L14.2358 5.04945C13.8103 5.09414 13.3815 5.00307 13.0108 4.78927C12.6418 4.57485 12.3501 4.2491 12.1775 3.85871L11.6868 2.76334C11.542 2.43728 11.3057 2.16023 11.0066 1.9658C10.7075 1.77137 10.3583 1.66791 10.0016 1.66797C9.64483 1.66791 9.29571 1.77137 8.99659 1.9658C8.69747 2.16023 8.46118 2.43728 8.3164 2.76334L7.82936 3.85871C7.6568 4.2491 7.36509 4.57485 6.99603 4.78927C6.62538 5.00307 6.19659 5.09414 5.77103 5.04945L4.57566 4.9226C4.22094 4.88508 3.86294 4.95127 3.54509 5.11316C3.22724 5.27504 2.96317 5.52566 2.78492 5.83464C2.60644 6.14342 2.52141 6.49737 2.54014 6.85353C2.55888 7.20969 2.68058 7.55276 2.89048 7.84112L3.59603 8.81056C3.84765 9.15659 3.98315 9.57346 3.98307 10.0013C3.98315 10.4291 3.84765 10.846 3.59603 11.192L2.89048 12.1615C2.68058 12.4498 2.55888 12.7929 2.54014 13.1491C2.52141 13.5052 2.60644 13.8592 2.78492 14.168C2.96335 14.4768 3.22744 14.7273 3.54525 14.8891C3.86306 15.051 4.22096 15.1173 4.57566 15.08L5.76733 14.9532C6.19289 14.9085 6.62167 14.9995 6.99233 15.2133C7.36277 15.4272 7.65583 15.753 7.82936 16.1439Z",
  settingsCircle: "M10.0001 12.5013C11.3808 12.5013 12.5001 11.382 12.5001 10.0013C12.5001 8.62059 11.3808 7.5013 10.0001 7.5013C8.61939 7.5013 7.5001 8.62059 7.5001 10.0013C7.5001 11.382 8.61939 12.5013 10.0001 12.5013Z",
};

// ── Reusable icon renderer ────────────────────────────────────────────────────
function NavIcon({ name, color }) {
  const sp = { stroke: color, strokeWidth: "1.25", strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "checkVerified") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.checkVerifiedBadge} {...sp} />
      <path d={PATHS.checkVerifiedMark} {...sp} />
    </svg>
  );
  if (name === "settings") return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS.settingsGear} {...sp} />
      <path d={PATHS.settingsCircle} {...sp} />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d={PATHS[name]} {...sp} />
    </svg>
  );
}

// ── Progress ring (circular indicator) ───────────────────────────────────────
function ProgressRing({ progress = 0, size = 40, strokeWidth = 3 }) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const c = size / 2;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circ - (clamped / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#EAF2E2" strokeWidth={strokeWidth} />
      <circle cx={c} cy={c} r={r} fill="none" stroke="#05A105" strokeWidth={strokeWidth}
        strokeDasharray={`${circ} ${circ}`} strokeDashoffset={offset} strokeLinecap="butt" />
    </svg>
  );
}

// ── Sortable column header icon ───────────────────────────────────────────────
function parseGBP(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/[£\s]/g, "").replace(/,(?=\d{3})/g, "").replace(",", ".")) || 0;
}
function formatGBPDiff(diff) {
  if (diff === 0) return "£0.00";
  const abs = Math.abs(diff).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${diff > 0 ? "+" : "-"}£${abs}`;
}

function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 2v8M3.5 7.5L6 10l2.5-2.5M3.5 4.5L6 2l2.5 2.5" stroke="#8C8C8B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Play circle icon ──────────────────────────────────────────────────────────
function PlayCircleIcon({ color = "#080908", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 18.335C14.6024 18.335 18.3333 14.604 18.3333 10.0016C18.3333 5.39926 14.6024 1.66831 10 1.66831C5.39763 1.66831 1.66667 5.39926 1.66667 10.0016C1.66667 14.604 5.39763 18.335 10 18.335Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.9165 7.47241C7.9165 7.07467 7.9165 6.87581 7.99962 6.76478C8.07206 6.66803 8.18293 6.6075 8.30349 6.59889C8.44182 6.58901 8.60911 6.69655 8.94368 6.91163L12.8775 9.44052C13.1678 9.62715 13.313 9.72047 13.3631 9.83913C13.4069 9.94281 13.4069 10.0598 13.3631 10.1635C13.313 10.2821 13.1678 10.3755 12.8775 10.5621L8.94368 13.091C8.60911 13.3061 8.44182 13.4136 8.30349 13.4037C8.18293 13.3951 8.07206 13.3346 7.99962 13.2378C7.9165 13.1268 7.9165 12.9279 7.9165 12.5302V7.47241Z" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Tr. matching mini-badge ───────────────────────────────────────────────────
function TrMatchBadge({ value = "0/0" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "#ECECEC", border: "none",
      borderRadius: 4, padding: "2px 8px",
      fontSize: 12, fontWeight: 500, color: "#7C7C7C",
    }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="4" stroke="#E9E9EB" strokeWidth="1.5" />
        <path d="M5 1 A4 4 0 0 1 9 5" stroke="#CFCFD1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {value}
    </span>
  );
}

// ── Tr. matching reconciled badge (with SVG progress ring) ───────────────────
function TrMatchingBadge({ matchedCount, totalCount, status }) {
  const isSuggestions = status === "suggestions";
  const isCompleted   = status === "completed";
  const trackColor = isSuggestions ? "#F4A59C" : isCompleted ? "#A0B4EE" : "#ACD394";
  const fillColor  = isSuggestions ? "#C8543A"  : isCompleted ? "#4C71DF"  : "#05A105";
  const textColor  = isSuggestions ? "#C8543A"  : isCompleted ? "#4C71DF"  : "#6BAC5B";
  const bgColor    = isSuggestions ? "#FCEFEC"  : isCompleted ? "#EBF0FB"  : "#F1F8F0";

  const safeTotal   = totalCount > 0 ? totalCount : 1;
  const safeMatched = Math.min(matchedCount, safeTotal);
  const pct         = (safeMatched / safeTotal) * 100;

  const SIZE = 16;
  const RADIUS = 5;
  const SW = 2;
  const CX = SIZE / 2;   // 8
  const CY = SIZE / 2;   // 8
  const circ = 2 * Math.PI * RADIUS;
  const offset = circ * (1 - pct / 100);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: bgColor, borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 500, color: textColor }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none" style={{ transform: "rotate(-90deg)", flexShrink: 0, display: "block" }}>
        <circle cx={CX} cy={CY} r={RADIUS} stroke={fillColor} strokeWidth={SW} fill="none"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={offset}
          strokeLinecap="round" />
      </svg>
      {safeMatched}/{safeTotal}
    </span>
  );
}

// ── Chevron ───────────────────────────────────────────────────────────────────
function Chevron({ up = false, color = "#8C8C8B", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d={up ? "M3 9.5L7 5.5L11 9.5" : "M3 5.5L7 9.5L11 5.5"} stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Account / Credit card table ───────────────────────────────────────────────
function DocIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 23 28" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.59259C0 1.16074 1.14416 0 2.55556 0H16.1L19.1048 3.95161L23 9.07407V25.4074C23 26.8393 21.8558 28 20.4444 28H2.55556C1.14416 28 0 26.8393 0 25.4074V2.59259Z" fill="#F4F4F2"/>
      <path d="M6.49191 13.3299H16.508M6.49191 16.6686H16.508M11.5 9.99121V20.0073M9.16288 9.99121H13.8371C14.772 9.99121 15.2395 9.99121 15.5966 10.1732C15.9107 10.3332 16.166 10.5886 16.3261 10.9027C16.508 11.2598 16.508 11.7273 16.508 12.6622V17.3364C16.508 18.2713 16.508 18.7388 16.3261 19.0959C16.166 19.41 15.9107 19.6653 15.5966 19.8254C15.2395 20.0073 14.772 20.0073 13.8371 20.0073H9.16288C8.22795 20.0073 7.76049 20.0073 7.4034 19.8254C7.08929 19.6653 6.83391 19.41 6.67386 19.0959C6.49191 18.7388 6.49191 18.2713 6.49191 17.3364V12.6622C6.49191 11.7273 6.49191 11.2598 6.67386 10.9027C6.83391 10.5886 7.08929 10.3332 7.4034 10.1732C7.76049 9.99121 8.22795 9.99121 9.16288 9.99121Z" stroke="#0AAC63" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1 7.61574V0L23 9.07407H17.5375C16.8599 9.07407 16.521 9.07407 16.3105 8.86051C16.1 8.64694 16.1 8.30321 16.1 7.61574Z" fill="#D6D6D4"/>
    </svg>
  );
}

function InvoiceIcon({ width = 20, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.22222C0 0.994923 0.994923 0 2.22222 0H14L16.6129 3.3871L20 7.77778V21.7778C20 23.0051 19.0051 24 17.7778 24H2.22222C0.994923 24 0 23.0051 0 21.7778V2.22222Z" fill="#F4F4F2"/>
      <path d="M8.03267 8.15368C10.5633 7.47908 7.93554 18.9444 5.9642 17.3672C3.51971 15.4116 15.1258 12.431 14.0498 15.299C13.1067 17.8125 5.21208 8.90557 8.03267 8.15368Z" stroke="#FF6056" strokeWidth="0.864969"/>
      <path d="M14 6.52778V0L20 7.77778H15.25C14.6607 7.77778 14.3661 7.77778 14.1831 7.59472C14 7.41166 14 7.11703 14 6.52778Z" fill="#D6D6D4"/>
    </svg>
  );
}

function PdfIcon({ width = 20, height = 24 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.22222C0 0.994923 0.994923 0 2.22222 0H14L20 7.77778V21.7778C20 23.0051 19.0051 24 17.7778 24H2.22222C0.994923 24 0 23.0051 0 21.7778V2.22222Z" fill="#FEE8E6"/>
      <path d="M14 6.52778V0L20 7.77778H15.25C14.6607 7.77778 14.3661 7.77778 14.1831 7.59472C14 7.41166 14 7.11703 14 6.52778Z" fill="#F4B8B4"/>
      <text x="3" y="18" fontSize="7" fontWeight="700" fill="#E8372A" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}

function CsvIcon({ width = 20, height = 24 }) {
  const scale = width / 23;
  return (
    <svg width={width} height={height} viewBox="0 0 23 28" fill="none" style={{ flexShrink: 0 }}>
      <path d="M0 2.59259C0 1.16074 1.14416 0 2.55556 0H16.1L19.1048 3.95161L23 9.07407V25.4074C23 26.8393 21.8558 28 20.4444 28H2.55556C1.14416 28 0 26.8393 0 25.4074V2.59259Z" fill="#F4F4F2"/>
      <path d="M6.49191 13.3299H16.508M6.49191 16.6686H16.508M11.5 9.99121V20.0073M9.16288 9.99121H13.8371C14.772 9.99121 15.2395 9.99121 15.5966 10.1732C15.9107 10.3332 16.166 10.5886 16.3261 10.9027C16.508 11.2598 16.508 11.7273 16.508 12.6622V17.3364C16.508 18.2713 16.508 18.7388 16.3261 19.0959C16.166 19.41 15.9107 19.6653 15.5966 19.8254C15.2395 20.0073 14.772 20.0073 13.8371 20.0073H9.16288C8.22795 20.0073 7.76049 20.0073 7.4034 19.8254C7.08929 19.6653 6.83391 19.41 6.67386 19.0959C6.49191 18.7388 6.49191 18.2713 6.49191 17.3364V12.6622C6.49191 11.7273 6.49191 11.2598 6.67386 10.9027C6.83391 10.5886 7.08929 10.3332 7.4034 10.1732C7.76049 9.99121 8.22795 9.99121 9.16288 9.99121Z" stroke="#0AAC63" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.1 7.61574V0L23 9.07407H17.5375C16.8599 9.07407 16.521 9.07407 16.3105 8.86051C16.1 8.64694 16.1 8.30321 16.1 7.61574Z" fill="#D6D6D4"/>
    </svg>
  );
}

const STATUS_CONFIG = {
  reconciled:  { label: "Reconciled",  color: "#05A105", tooltip: "Account is fully reconciled in Xero" },
  suggestions: { label: "Suggestions", color: "#C8543A", tooltip: "Resolve suggestions to reconcile account" },
  completed:   { label: "Completed",   color: "#4C71DF", tooltip: "Account ready to be reconciled in Xero" },
};

function ReconciledCard({ date, status = "reconciled", suggestionCount, onPlay, onTipShow, onTipHide }) {
  const { label, color, tooltip } = STATUS_CONFIG[status] || STATUS_CONFIG.reconciled;
  const displayLabel = status === "suggestions" && suggestionCount != null
    ? `${suggestionCount} ${label}`
    : label;
  return (
    <div
      onClick={onPlay}
      onMouseEnter={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        onTipShow && onTipShow(rect.left + rect.width / 2, rect.top, tooltip);
        e.currentTarget.style.borderColor = "#BCBCBC";
        e.currentTarget.style.background = "#FAFAFA";
      }}
      onMouseLeave={e => {
        onTipHide && onTipHide();
        e.currentTarget.style.borderColor = "#DBDBDB";
        e.currentTarget.style.background = "#FFFFFF";
      }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: 184, height: 60, padding: "0 12px",
        background: "#FFFFFF", border: "1px solid #DBDBDB", borderRadius: 8,
        boxSizing: "border-box", flexShrink: 0,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color, lineHeight: 1 }}>{displayLabel}</span>
        {date && <span style={{ fontSize: 11, color: "#7C7C7C", lineHeight: 1 }}>{date}</span>}
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.333" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.917 7.4714C7.917 7.0737 7.917 6.8748 8 6.7638C8.072 6.6671 8.183 6.6065 8.304 6.5979C8.442 6.588 8.609 6.6956 8.944 6.9106L12.878 9.4395C13.168 9.6262 13.313 9.7195 13.363 9.8382C13.407 9.9418 13.407 10.0588 13.363 10.1625C13.313 10.2812 13.168 10.3745 12.878 10.5611L8.944 13.09C8.609 13.3051 8.442 13.4126 8.304 13.4027C8.183 13.3941 8.072 13.3336 8 13.2368C7.917 13.1258 7.917 12.927 7.917 12.5292V7.4714Z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FileIcon({ file, width = 20, height = 24 }) {
  if (!file) return <InvoiceIcon width={width} height={height} />;
  const name = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();
  if (type === "application/pdf" || name.endsWith(".pdf")) return <PdfIcon width={width} height={height} />;
  if (type.includes("csv") || name.endsWith(".csv") || name.endsWith(".numbers")) return <CsvIcon width={width} height={height} />;
  return <InvoiceIcon width={width} height={height} />;
}

const STATUSES = ["reconciled", "suggestions", "completed"];
const randomOutcome = () => {
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const count = status === "suggestions" ? Math.floor(Math.random() * 20) + 20 : null;
  return { status, count };
};


function AccountTable({ title, rows, footerLabel, onRunReconciliation, onViewResults, reconciledAccounts = new Set(), reconciledData = {}, reconciledDates = {}, reconciledStatuses = {}, reconciledCounts = {}, bankStatements = {}, onUploadStatement, onAutoReconcile, onResetAccount }) {
  const [hovered, setHovered] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [reconcilingViaUpload, setReconcilingViaUpload] = useState(new Set());
  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setIsScrollable(el.scrollWidth > el.clientWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && uploadingFor) {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
      onUploadStatement?.(uploadingFor, { fileName: file.name, date: dateStr, time: timeStr });
      const accountName = uploadingFor;
      const { status, count } = accountName === "Lloyds Bank - Operations GBP"
        ? { status: "reconciled", count: null }
        : accountName === "Lloyds Bank - Business"
        ? { status: "suggestions", count: 8 }
        : { status: "suggestions", count: reconciledData[accountName]?.suggestions || 3 };
      setReconcilingViaUpload(prev => new Set([...prev, accountName]));
      setTimeout(() => {
        setReconcilingViaUpload(prev => { const next = new Set(prev); next.delete(accountName); return next; });
        onAutoReconcile?.(accountName, status, count);
      }, 3000);
    }
    e.target.value = "";
    setUploadingFor(null);
  };

  const cols = ["Account", "Feed balance", "Statement balance", "GL balance", "Tr. matching", "Bank statement", "Actions"];
  const sortable = new Set(["Account", "Feed balance", "Statement balance", "GL balance"]);
  const colTooltips = {
    "Account": "The bank or financial account being reconciled",
    "Feed balance": "Real-time balance pulled directly from your bank feed",
    "Statement balance": "Closing balance from the uploaded bank statement",
    "GL balance": "Current balance recorded in your general ledger",
    "Tr. matching": "Percentage of transactions automatically matched so far",
    "Bank statement": "The bank statement file used for this reconciliation",
    "Actions": "Run reconciliation or review results for this account",
  };
  const [colTooltipVisible, setColTooltipVisible] = useState(null);
  const [colTooltipPos, setColTooltipPos] = useState({ x: 0, y: 0 });
  const [badgeTooltip, setBadgeTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const [cardTip, setCardTip] = useState(null); // { x, y, text }

  // Always center the tooltip on x, but clamp so it never overflows the viewport edges.
  // We estimate ~140px as a comfortable half-width cap for clamping.
  const tipStyle = (x, y) => {
    const margin = 10;
    const halfEst = 140;
    const clamped = Math.max(margin + halfEst, Math.min(x, window.innerWidth - margin - halfEst));
    return { position: "fixed", left: clamped, top: y - 8, transform: "translate(-50%, -100%)" };
  };
  const [dragOverRow, setDragOverRow] = useState(null);
  const [replacePrompt, setReplacePrompt] = useState(null); // { rowName, file, dateStr, timeStr }

  const startReconciliationWithFile = (rowName, file, dateStr, timeStr) => {
    onResetAccount?.(rowName);
    onUploadStatement?.(rowName, { fileName: file.name, date: dateStr, time: timeStr });
    const getOutcome = (name) => {
      if (name === "Lloyds Bank - Operations GBP")  return { status: "reconciled",  count: null };
      if (name === "Lloyds Bank - Business")         return { status: "suggestions", count: 8 };
      if (name === "HSBC - Business Transactions")   return { status: "suggestions", count: 1 };
      return { status: "suggestions", count: reconciledData[name]?.suggestions || 3 };
    };
    const { status, count } = getOutcome(rowName);
    setReconcilingViaUpload(prev => new Set([...prev, rowName]));
    setTimeout(() => {
      setReconcilingViaUpload(prev => { const next = new Set(prev); next.delete(rowName); return next; });
      onAutoReconcile?.(rowName, status, count);
    }, 3000);
  };

  const handleRowDragOver = (e, rowName) => {
    if (reconcilingViaUpload.has(rowName)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverRow(rowName);
  };

  const handleRowDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setDragOverRow(null);
  };

  const handleRowDrop = (e, rowName) => {
    e.preventDefault();
    setDragOverRow(null);
    if (reconcilingViaUpload.has(rowName)) return;
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    if (bankStatements[rowName]) {
      setReplacePrompt({ rowName, file, dateStr, timeStr });
    } else {
      startReconciliationWithFile(rowName, file, dateStr, timeStr);
    }
  };

  return (
    <>
    <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>

    {/* Replace bank statement confirmation modal */}
    {replacePrompt && (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "0", maxWidth: 450, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)", fontFamily: "'Inter', sans-serif", overflow: "hidden" }}>
          <div style={{ padding: "24px 24px 0" }}>
            <p style={{ fontSize: 18, fontWeight: 600, color: "#080908", margin: "0 0 16px" }}>Replace bank statement</p>
          </div>
          <div style={{ height: 1, background: "#E9E9EB" }} />
          <div style={{ padding: "16px 24px 20px" }}>
            <p style={{ fontSize: 14, color: "#545453", lineHeight: "22px", margin: 0 }}>
              <strong style={{ color: "#080908" }}>{bankStatements[replacePrompt.rowName]?.fileName}</strong> is already uploaded for <strong style={{ color: "#080908" }}>{replacePrompt.rowName}</strong>. Do you want to replace it with <strong style={{ color: "#080908" }}>{replacePrompt.file.name}</strong> and start a new reconciliation?
            </p>
          </div>
          <div style={{ height: 1, background: "#E9E9EB" }} />
          <div style={{ padding: "16px 24px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              onClick={() => setReplacePrompt(null)}
              style={{ padding: "0 18px", height: 40, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", fontSize: 14, fontWeight: 500, color: "#080908", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
              onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
            >Cancel</button>
            <button
              onClick={() => { const { rowName, file, dateStr, timeStr } = replacePrompt; setReplacePrompt(null); startReconciliationWithFile(rowName, file, dateStr, timeStr); }}
              style={{ padding: "0 18px", height: 40, border: "none", borderRadius: 8, background: "#05A105", fontSize: 14, fontWeight: 500, color: "#FFFFFF", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#048504"}
              onMouseLeave={e => e.currentTarget.style.background = "#05A105"}
            >Replace and reconcile</button>
          </div>
        </div>
      </div>
    )}

    {badgeTooltip.visible && (
      <div style={{
        ...tipStyle(badgeTooltip.x, badgeTooltip.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {badgeTooltip.text}
      </div>
    )}
    {colTooltipVisible && (
      <div style={{
        ...tipStyle(colTooltipPos.x, colTooltipPos.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {colTooltips[colTooltipVisible]}
      </div>
    )}
    {cardTip && (
      <div style={{
        ...tipStyle(cardTip.x, cardTip.y),
        background: "#2A2A2A", color: "#FFFFFF",
        fontSize: 14, fontWeight: 400, lineHeight: "20px",
        padding: "6px 8px", borderRadius: 8,
        whiteSpace: "nowrap", zIndex: 9999,
        pointerEvents: "none",
        fontFamily: "'Inter', sans-serif",
      }}>
        {cardTip.text}
      </div>
    )}
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden" }}>
      {/* Hidden file input for bank statement upload */}
      <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileChange} />

      {/* Title row — inside the border */}
      <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #E9E9EB" }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: "#080908" }}>{title}</span>
      </div>

      {/* Scrollable table area — unified grid so all rows share column widths */}
      <div ref={scrollRef} style={{ overflowX: "auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto 200px 220px",
        minWidth: "100%",
        width: "max-content",
      }}>

        {/* ── Header cells ── */}
        {cols.map((col, ci) => {
          const isActions = col === "Actions";
          const isLast = ci === cols.length - 1;
          return (
            <div key={`h-${col}`} style={{
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 14, fontWeight: 500, color: "#8C8C8B",
              padding: "10px 16px",
              borderBottom: "1px solid #E9E9EB",
              borderRight: !isLast ? "1px solid #E9E9EB" : "none",
              background: "#FFFFFF",
              whiteSpace: "nowrap",
              ...(isActions ? {
                position: "sticky", right: 0,
                boxShadow: isScrollable ? "-6px 0 12px rgba(0,0,0,0.06)" : "none",
                zIndex: 2,
              } : {}),
            }}>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "default" }}
                onMouseEnter={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setColTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                  setColTooltipVisible(col);
                }}
                onMouseLeave={() => setColTooltipVisible(null)}
              >
                {col}
                {sortable.has(col) && <SortIcon />}
              </span>
            </div>
          );
        })}

        {/* ── Data rows ── */}
        {rows.map((row, i) => {
          const isReconciled = reconciledAccounts.has(row.name);
          const rData = reconciledData[row.name] || {};
          const rowStatus = reconciledStatuses[row.name] || "reconciled";
          const suggCount = reconciledCounts[row.name] || 3;
          const isDragOver = dragOverRow === row.name;
          const rowBg = isDragOver ? "#F1F8F0" : hovered === i ? "#FAFAFA" : "#FFFFFF";
          const borderBottom = i < rows.length - 1 ? "1px solid #E9E9EB" : "none";

          const cellProps = {
            onMouseEnter: () => setHovered(i),
            onMouseLeave: () => setHovered(null),
            onDragOver: e => handleRowDragOver(e, row.name),
            onDragLeave: handleRowDragLeave,
            onDrop: e => handleRowDrop(e, row.name),
          };
          const dragShadow = (pos) => {
            if (!isDragOver) return {};
            const parts = [
              "inset 0 2px 0 0 #05A105",
              "inset 0 -2px 0 0 #05A105",
              pos === "first" ? "inset 2px 0 0 0 #05A105" : null,
              pos === "last"  ? "inset -2px 0 0 0 #05A105" : null,
            ].filter(Boolean).join(", ");
            return { boxShadow: parts };
          };
          const cell = (extra = {}, pos = "middle") => ({
            background: rowBg,
            borderBottom,
            transition: "background 0.1s",
            ...dragShadow(pos),
            ...extra,
          });

          return (
            <React.Fragment key={i}>
              {/* Account name */}
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" }, "first")} {...cellProps}>
                {row.name}
              </div>

              {/* Feed balance */}
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" })} {...cellProps}>
                {row.feedBalance}
              </div>

              {/* Statement balance */}
              <div style={cell({ display: "flex", alignItems: "center", fontSize: 14, color: isReconciled ? "#080908" : "#9D9D9E", padding: "14px 16px", borderRight: "1px solid #E9E9EB", whiteSpace: "nowrap" })} {...cellProps}>
                {isReconciled
                  ? (rowStatus === "suggestions" ? (rData.statementBalance || row.feedBalance) : row.feedBalance)
                  : "No bank statement"}
              </div>

              {/* GL balance + difference badge */}
              <div style={cell({ display: "flex", flexDirection: "column", justifyContent: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB" })} {...cellProps}>
                <div style={{ fontSize: 14, color: "#080908", whiteSpace: "nowrap" }}>
                  {isReconciled && rowStatus !== "suggestions" ? row.feedBalance : row.glBalance}
                </div>
                {(() => {
                  let bg = "#ECECEC", color = "#7C7C7C", value = row.glSub;
                  if (isReconciled) {
                    const stmtBalance = rData.statementBalance || row.feedBalance;
                    const diff = rowStatus === "suggestions"
                      ? parseGBP(row.glBalance) - parseGBP(stmtBalance)
                      : 0;
                    value = formatGBPDiff(diff);
                    if (rowStatus === "suggestions") { bg = "#FCEFEC"; color = "#C8543A"; }
                    else if (rowStatus === "completed") { bg = "#EBF0FB"; color = "#4C71DF"; }
                    else { bg = "#F1F8F0"; color = "#6BAC5B"; }
                  }
                  return (
                    <span
                      style={{ display: "inline-block", background: bg, borderRadius: 4, padding: "2px 6px", fontSize: 11, fontWeight: 500, color, marginTop: 4, alignSelf: "flex-start", whiteSpace: "nowrap", cursor: "default" }}
                      onMouseEnter={e => { const rect = e.currentTarget.getBoundingClientRect(); setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: "Difference between statement balance and GL balance" }); }}
                      onMouseLeave={() => setBadgeTooltip(t => ({ ...t, visible: false }))}
                    >
                      {value}
                    </span>
                  );
                })()}
              </div>

              {/* Tr. matching */}
              <div style={cell({ display: "flex", alignItems: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB" })} {...cellProps}>
                {isReconciled ? (() => {
                  const total    = parseInt((rData.matched || "100/100").split("/")[1]) || 100;
                  const sc       = reconciledCounts[row.name] || 3;
                  const matchedN = rowStatus === "suggestions" ? Math.max(0, total - sc) : total;
                  return <TrMatchingBadge matchedCount={matchedN} totalCount={total} status={rowStatus} />;
                })() : (
                  <TrMatchBadge value="0/0" />
                )}
              </div>

              {/* Bank statement */}
              <div style={cell({ display: "flex", alignItems: "center", padding: "14px 16px", borderRight: "1px solid #E9E9EB", overflow: "hidden", minWidth: 0 })} {...cellProps}>
                {isDragOver && !bankStatements[row.name] ? (
                  <span style={{ fontSize: 13, color: "#05A105", fontWeight: 500, whiteSpace: "nowrap" }}>Drop to upload</span>
                ) : bankStatements[row.name] ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0, width: "100%" }}>
                    <DocIcon />
                    <span
                      style={{ fontSize: 13, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, minWidth: 0, cursor: "default" }}
                      onMouseEnter={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: bankStatements[row.name].fileName });
                      }}
                      onMouseLeave={() => setBadgeTooltip(t => ({ ...t, visible: false }))}
                    >
                      {bankStatements[row.name].fileName}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: 500, color: "#7C7C7C", background: "#ECECEC", borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap", flexShrink: 0, cursor: "default" }}
                      onMouseEnter={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const stmt = bankStatements[row.name];
                        const time = stmt.time || "";
                        setBadgeTooltip({ visible: true, x: rect.left + rect.width / 2, y: rect.top, text: `Bank statement uploaded ${stmt.date}${time ? " at " + time : ""}` });
                      }}
                      onMouseLeave={() => setBadgeTooltip(t => ({ ...t, visible: false }))}
                    >
                      {bankStatements[row.name].date}
                    </span>
                  </div>
                ) : (
                  <SecondaryButton
                    style={{ color: "#05A105", justifyContent: "center", width: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#ACD394"; e.currentTarget.style.background = "#F4F9F1"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}
                    onClick={() => { setUploadingFor(row.name); fileInputRef.current?.click(); }}
                  >
                    Upload statement
                  </SecondaryButton>
                )}
              </div>

              {/* Action button — sticky right */}
              <div style={cell({
                display: "flex", alignItems: "center", padding: "14px 16px",
                position: "sticky", right: 0,
                boxShadow: isDragOver
                  ? ["inset 0 2px 0 0 #05A105", "inset 0 -2px 0 0 #05A105", "inset -2px 0 0 0 #05A105"].join(", ")
                  : isScrollable ? "-6px 0 12px rgba(0,0,0,0.06)" : "none",
                zIndex: 1,
              })} {...cellProps}>
                {reconcilingViaUpload.has(row.name) ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#000000", whiteSpace: "nowrap" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.75s linear infinite", flexShrink: 0 }}>
                      <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" stroke="#05A105" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Reconciling account
                  </span>
                ) : isReconciled ? (
                  <ReconciledCard
                    date={reconciledDates[row.name]}
                    status={reconciledStatuses[row.name] || "reconciled"}
                    suggestionCount={reconciledCounts[row.name]}
                    onPlay={() => onViewResults?.(row.name)}
                    onTipShow={(x, y, text) => setCardTip({ x, y, text })}
                    onTipHide={() => setCardTip(null)}
                  />
                ) : (
                  <SecondaryButton icon={<PlayCircleIcon color="#080908" />} onClick={() => onRunReconciliation?.(row.name)}>
                    Run reconciliation
                  </SecondaryButton>
                )}
              </div>
            </React.Fragment>
          );
        })}

      </div>
      </div> {/* end scrollable area */}

      {/* Footer count */}
      <div style={{ padding: "12px 16px", fontSize: 14, color: "#8C8C8B", borderTop: "1px solid #E9E9EB" }}>
        {footerLabel}
      </div>
    </div>
    </>
  );
}

// ── Typewriter hook (word by word) ───────────────────────────────────────────
function useTypewriter(text, speed = 80, instant = false) {
  const words = text ? text.split(" ") : [];
  const [displayed, setDisplayed] = useState(instant && text ? words.length : 0);
  useEffect(() => {
    if (instant) {
      setDisplayed(words.length);
      return;
    }
    setDisplayed(0);
    if (!words.length) return;
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(i);
      if (i < words.length) setTimeout(tick, speed + Math.random() * 40);
    };
    const t = setTimeout(tick, 200);
    return () => clearTimeout(t);
  }, [text]);
  const visibleText = words.slice(0, displayed).join(" ");
  return { chars: visibleText, done: !!text && displayed >= words.length };
}

// ── Streaming message renderer ────────────────────────────────────────────────
// Renders plain text with optional bold segments, word by word.
// segments: [{ text, bold }]
function StreamingMessage({ segments, speed = 80, instant = false }) {
  const fullText = segments.map(s => s.text).join("");
  const { chars, done } = useTypewriter(fullText, speed, instant);

  // Map the streamed words back onto the segments to preserve bold spans
  let remaining = chars;
  const rendered = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (!remaining) break;
    const slice = remaining.slice(0, seg.text.length);
    remaining = remaining.slice(seg.text.length);
    if (seg.bold) {
      rendered.push(<strong key={i}>{slice}</strong>);
    } else {
      rendered.push(<span key={i}>{slice}</span>);
    }
  }

  return <span>{rendered}</span>;
}

// ── Upload card ───────────────────────────────────────────────────────────────
function UploadCard({ onFileSelected }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file) {
      setFileName(file.name);
      onFileSelected?.(file);
    }
  };

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E9E9EB",
      borderRadius: 16,
      padding: "24px",
      width: 400,
      boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
    }}>
      {/* Heading */}
      <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", marginBottom: 20 }}>
        Upload bank statement
      </p>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={e => handleFile(e.target.files?.[0])}
      />

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
        style={{
          border: `1.5px dashed ${dragging ? "#05A105" : "#DBDBDB"}`,
          borderRadius: 12,
          padding: "36px 24px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: dragging ? "#F4F9F1" : "transparent",
          transition: "background 0.15s, border-color 0.15s",
          marginBottom: 16,
        }}
      >
        {/* 3-document fan illustration */}
        <svg width="86" height="56" viewBox="0 0 86 56" fill="none" style={{ marginBottom: 20 }}>
          <defs>
            <filter id="filter0_d_upload" x="15.84" y="-3.31" width="57.44" height="65.62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4.96"/>
              <feGaussianBlur stdDeviation="4.13"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            <clipPath id="clip0_upload">
              <rect width="86" height="56" fill="white"/>
            </clipPath>
          </defs>
          <g clipPath="url(#clip0_upload)">
            <path d="M53.2218 13.2854C53.7433 11.3393 55.7436 10.1844 57.6897 10.7059L76.3653 15.71L79.0693 22.1909L82.5746 30.5922L76.6263 52.7914C76.1049 54.7375 74.1046 55.8924 72.1585 55.3709L47.4927 48.7617C45.5466 48.2403 44.3917 46.2399 44.9132 44.2939L53.2218 13.2854Z" fill="#DCF0D7"/>
            <path d="M73.5917 26.0618L76.3652 15.7109L82.5746 30.5931L75.0427 28.5749C74.1084 28.3246 73.6412 28.1994 73.4287 27.8314C73.2162 27.4633 73.3414 26.9961 73.5917 26.0618Z" fill="#D0EFC8"/>
            <path d="M32.7772 13.2854C32.2557 11.3393 30.2554 10.1844 28.3093 10.7059L9.63377 15.71L6.92969 22.1909L3.42441 30.5922L9.37268 52.7914C9.89413 54.7375 11.8945 55.8924 13.8405 55.3709L38.5064 48.7617C40.4524 48.2403 41.6073 46.2399 41.0859 44.2939L32.7772 13.2854Z" fill="#D2DEF6"/>
            <path d="M12.4073 26.0618L9.63379 15.7109L3.42442 30.5931L10.9563 28.5749C11.8907 28.3246 12.3578 28.1994 12.5703 27.8314C12.7828 27.4633 12.6576 26.9961 12.4073 26.0618Z" fill="#BCCFF2"/>
            <g filter="url(#filter0_d_upload)">
              <path d="M24.1064 4.54527C24.1064 2.03499 26.1414 0 28.6517 0H52.7417L58.086 6.92787L65.0139 15.9084V44.5437C65.0139 47.0539 62.9789 49.0889 60.4686 49.0889H28.6517C26.1414 49.0889 24.1064 47.0539 24.1064 44.5437V4.54527Z" fill="#F4F4F2"/>
              <path d="M40.5298 16.6758C45.1308 15.296 40.3532 38.7468 36.769 35.521C32.3247 31.521 53.4258 25.4246 51.4695 31.2906C49.7549 36.4317 35.4016 18.2137 40.5298 16.6758Z" stroke="#FF6056" strokeWidth="1.57261"/>
              <path d="M52.7412 13.3517V0L65.0134 15.9085H55.2979C54.0927 15.9085 53.4901 15.9085 53.1156 15.534C52.7412 15.1596 52.7412 14.557 52.7412 13.3517Z" fill="#D6D6D4"/>
            </g>
          </g>
        </svg>

        {/* Primary instruction — two lines matching screenshot */}
        <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", textAlign: "center", margin: "0 0 2px" }}>
          Drag &amp; drop your file here, or
        </p>
        <p style={{ fontSize: 14, textAlign: "center", margin: "0 0 10px" }}>
          <span style={{ color: "#05A105", fontWeight: 600, cursor: "pointer" }} onClick={() => fileInputRef.current?.click()}>
            Choose a file
          </span>{" "}to upload it manually
        </p>

        {/* Subtitle */}
        <p style={{ fontSize: 13, color: "#8C8C8B", margin: "0 0 20px", textAlign: "center" }}>
          Can be any document type
        </p>

        {/* Selected file name */}
        {fileName && (
          <p style={{ fontSize: 12, color: "#545453", marginBottom: 12, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            📄 {fileName}
          </p>
        )}

        {/* Upload button — inside the drop zone */}
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "10px 20px",
            background: "#05A105",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14, fontWeight: 500, color: "#FFFFFF",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#048A04"}
          onMouseLeave={e => e.currentTarget.style.background = "#05A105"}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Upload document
        </button>
      </div>
    </div>
  );
}

// ── Reconciliation progress steps ─────────────────────────────────────────────
const RECONCILIATION_STEPS = [
  { title: "Reading source",                                    subtext: null,                                                    duration: 900  },
  { title: "Parsing bank statement",                            subtext: "Found 380 transactions. Period 1-31 Mar 2026.",         duration: 1500 },
  { title: "Checking transactions against statement balance",   subtext: "Balance matching (£12,439.00)",                        duration: 1300 },
  { title: "Matching GL records",                               subtext: "361 of 380 bank statement lines are matching.",         duration: 1800 },
  { title: "Summarise and suggest actions",                     subtext: null,                                                    duration: 1000 },
];

// ── RecommendationCard ───────────────────────────────────────────────────────
function RecommendationCard({
  title = "Missing entry",
  description = "",
  statusLabel = "Unresolved",
  statusStyle = { background: "#FDF8EE", border: "none", color: "#D5A750" },
  collapsed = false,
  tableRow = {},
  primaryLabel = "Create spend money",
  external = false,
  fileAction = null,
  onPrimaryAction,
  onFileAction,
  onIgnore,
  onMore,
}) {
  const [expanded, setExpanded] = useState(!collapsed);
  // Sync expanded state when collapsed prop changes (e.g. after publish)
  useEffect(() => { setExpanded(!collapsed); }, [collapsed]);
  const isResolved = collapsed;
  const showBody = expanded;

  const PdfIcon = () => <InvoiceIcon width={14} height={17} />;
  const ExternalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M17.5 7.5L17.5 2.5M17.5 2.5H12.5M17.5 2.5L10.8333 9.16667M8.33333 4.16667H6.5C5.09987 4.16667 4.3998 4.16667 3.86502 4.43915C3.39462 4.67883 3.01217 5.06129 2.77248 5.53169C2.5 6.06647 2.5 6.76654 2.5 8.16667V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H11.8333C13.2335 17.5 13.9335 17.5 14.4683 17.2275C14.9387 16.9878 15.3212 16.6054 15.5608 16.135C15.8333 15.6002 15.8333 14.9001 15.8333 13.5V11.6667" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const MoreIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="2.5" r="1.2" fill="#545453"/>
      <circle cx="7" cy="7" r="1.2" fill="#545453"/>
      <circle cx="7" cy="11.5" r="1.2" fill="#545453"/>
    </svg>
  );
  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" fill="none" stroke="#05A105" strokeWidth="1.5"/>
      <path d="M6.66667 10L8.88889 12.2222L13.3333 7.77778" stroke="#05A105" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 12, padding: "20px", overflow: "hidden", fontFamily: "'Inter', sans-serif", transition: "all 0.35s ease" }}>
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showBody ? 10 : 0, transition: "margin 0.35s ease", cursor: isResolved ? "pointer" : "default" }}
        onClick={isResolved ? () => setExpanded(o => !o) : undefined}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isResolved && <SuccessIcon />}
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: statusStyle.background, border: statusStyle.border, color: statusStyle.color, whiteSpace: "nowrap", transition: "all 0.3s ease" }}>
            {statusLabel}
          </span>
          <div style={{ display: "flex", transform: showBody ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s" }}>
            <ChevronUpIcon />
          </div>
        </div>
      </div>
      {showBody && (
        <p style={{ fontSize: 13, color: "#4F4F4F", lineHeight: "20px", margin: "0 0 14px" }}>{description}</p>
      )}
      {showBody && (
      <>
      <div style={{ marginBottom: isResolved ? 0 : 14 }}>
        <DataTable
          columns={[
            { key: "state",   label: "State",     width: "1fr" },
            { key: "contact", label: "Contact",   width: "1.4fr" },
            { key: "date",    label: "Date",      width: "1fr" },
            { key: "amount",  label: "Amount",    width: "0.8fr" },
            { key: "email",   label: "Email b...", width: "0.9fr" },
          ]}
          rows={[tableRow]}
        />
      </div>
      {!isResolved && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <PrimaryButton style={{ padding: "8px 14px", fontSize: 13, borderRadius: 8 }} icon={external ? <ExternalIcon /> : undefined} onClick={onPrimaryAction}>
          {primaryLabel}
        </PrimaryButton>
        {fileAction ? (
          <SecondaryButton style={{ padding: "7px 12px", fontSize: 13, borderRadius: 8, borderColor: "#EFF1F4" }} icon={null} onClick={onFileAction}>
            <PdfIcon />{fileAction}
          </SecondaryButton>
        ) : (
          <SecondaryButton style={{ padding: "7px 12px", fontSize: 13, borderRadius: 8, borderColor: "#EFF1F4" }} onClick={onFileAction}>
            Upload document
          </SecondaryButton>
        )}
        <button style={{ width: 34, height: 34, border: "1px solid #EFF1F4", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
          onClick={onMore}
        ><MoreIcon /></button>
        <div style={{ flex: 1 }} />
        <button style={{ padding: "7px 12px", border: "none", borderRadius: 8, background: "#FCEFEC", fontSize: 13, fontWeight: 500, color: "#C8543A", cursor: "pointer", whiteSpace: "nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background = "#F9E5E1"}
          onMouseLeave={e => e.currentTarget.style.background = "#FCEFEC"}
          onClick={onIgnore}
        >Ignore suggestion</button>
      </div>
      )}
      </>
      )}
    </div>
  );
}

// ── Canvas loading spinner ────────────────────────────────────────────────────
function CanvasLoader() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100%", gap: 14, fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "2.5px solid #E9E9EB",
        borderTopColor: "#05A105",
        animation: "spin 0.75s linear infinite",
      }} />
      <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0 }}>Loading results…</p>
    </div>
  );
}

// ── Chevron up icon (from chevron-down.svg upload) ───────────────────────────
function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12.5L10 7.5L5 12.5" stroke="#2A2A2A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Spend Money Sidebar ───────────────────────────────────────────────────────
function SpendMoneySidebar({ contact = "Yorkshire Tea Estates", amount = "£240.00", date = "24 Feb 2026", onClose, onPublish }) {
  const [spentAs, setSpentAs] = useState("spend");
  const [amountsAre, setAmountsAre] = useState("Tax inclusive");
  const [reference, setReference] = useState("YTE-26-03");
  const [bankStatement, setBankStatement] = useState(contact);
  const [issueDate, setIssueDate] = useState(date);
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [lineItemsOpen, setLineItemsOpen] = useState(true);
  const [publishing, setPublishing] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onPublish?.();
        onClose();
      }, 320);
    }, 2500);
  };

  const inputStyle = {
    width: "100%", padding: "9px 12px", border: "1px solid #E9E9EB", borderRadius: 8,
    fontSize: 14, color: "#080908", background: "#FFFFFF", outline: "none",
    fontFamily: "'Inter', sans-serif", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 14, fontWeight: 500, color: "#000000", marginBottom: 6, display: "block" };
  const sectionHeaderStyle = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 16px", cursor: "pointer", background: "none", border: "none",
    width: "100%",
  };
  const sectionBarStyle = {
    margin: "16px 16px 0", background: "#F5F5F5", borderRadius: 8,
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: "#080908" }}>Review spend money</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#545453" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* Details section */}
        <div>
          <div style={sectionBarStyle}>
            <button style={sectionHeaderStyle} onClick={() => setDetailsOpen(o => !o)}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Details</span>
              <div style={{ transform: detailsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", display: "flex" }}>
                <ChevronUpIcon />
              </div>
            </button>
          </div>
          {detailsOpen && (
            <div style={{ padding: "16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Bank statement line */}
              <div>
                <label style={labelStyle}>Bank statement line</label>
                <input style={inputStyle} value={bankStatement} onChange={e => setBankStatement(e.target.value)} />
              </div>
              {/* Issue date */}
              <div>
                <label style={labelStyle}>Issue date</label>
                <div style={{ position: "relative" }}>
                  <input style={{ ...inputStyle, paddingRight: 36 }} value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(180deg)", pointerEvents: "none", display: "flex" }}>
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
              {/* Reference */}
              <div>
                <label style={labelStyle}>Reference</label>
                <input style={inputStyle} value={reference} onChange={e => setReference(e.target.value)} />
              </div>
              {/* Spent as */}
              <div>
                <label style={labelStyle}>Spent as</label>
                <div style={{ display: "flex", gap: 24 }}>
                  {[["spend", "Spend money"], ["receive", "Receive money"]].map(([val, label]) => (
                    <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#080908" }}>
                      <div onClick={() => setSpentAs(val)} style={{
                        width: 18, height: 18, borderRadius: "50%", border: `2px solid ${spentAs === val ? "#05A105" : "#CFCFD1"}`,
                        background: spentAs === val ? "#05A105" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer",
                      }}>
                        {spentAs === val && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFFFFF" }} />}
                      </div>
                      {label}
                    </label>
                  ))}
                </div>
              </div>
              {/* Amounts are */}
              <div>
                <label style={labelStyle}>Amounts are</label>
                <div style={{ position: "relative" }}>
                  <select style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }} value={amountsAre} onChange={e => setAmountsAre(e.target.value)}>
                    <option>Tax inclusive</option>
                    <option>Tax exclusive</option>
                    <option>No tax</option>
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(180deg)", pointerEvents: "none", display: "flex" }}>
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Line items section */}
        <div>
          <div style={sectionBarStyle}>
            <button style={sectionHeaderStyle} onClick={() => setLineItemsOpen(o => !o)}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#080908" }}>Line items</span>
              <div style={{ transform: lineItemsOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", display: "flex" }}>
                <ChevronUpIcon />
              </div>
            </button>
          </div>
          {lineItemsOpen && (
          <div style={{ padding: "16px 28px" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, marginBottom: 8, fontSize: 12, fontWeight: 500, color: "#8C8C8B", borderBottom: "1px solid #ECECEC", paddingBottom: 8 }}>
              <span>Description</span>
              <span style={{ textAlign: "right" }}>Actions</span>
              <span style={{ width: 24 }} />
            </div>
            {/* Line item row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ECECEC" }}>
              <div>
                <div style={{ fontSize: 14, color: "#080908", fontWeight: 500 }}>{contact} Spend Money</div>
                <div style={{ fontSize: 12, color: "#8C8C8B", marginTop: 2 }}>Cost of Goods Sold</div>
              </div>
              <span style={{ fontSize: 14, color: "#080908", fontWeight: 500 }}>{amount}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: "#8C8C8B", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 11.5V14H4.5L11.87 6.63L9.37 4.13L2 11.5ZM13.71 4.79a.996.996 0 000-1.41L12.21 1.88a.996.996 0 00-1.41 0l-1.18 1.18 2.5 2.5 1.59-1.77z" fill="#8C8C8B"/></svg>
                </button>
                <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, color: "#C8543A", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2.667A.667.667 0 015.667 2h4.666A.667.667 0 0111 2.667V4M6.333 7.333v4M9.667 7.333v4M3.333 4l.667 9.333A.667.667 0 004.667 14h6.666a.667.667 0 00.667-.667L12.667 4" stroke="#C8543A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
            {/* Totals */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, marginBottom: 16 }}>
              {[["Sub total", "£48.00"], ["Tax", "£192.00"], ["Total", amount]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "flex-end", gap: 32, fontSize: label === "Total" ? 14 : 13, fontWeight: label === "Total" ? 600 : 400, color: "#080908" }}>
                  <span style={{ color: label === "Total" ? "#080908" : "#8C8C8B" }}>{label}</span>
                  <span style={{ minWidth: 70, textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>
            {/* Add line item */}
            <button style={{
              width: "100%", padding: "10px 16px", border: "1.5px dashed #CFCFD1", borderRadius: 8,
              background: "none", cursor: "pointer", fontSize: 14, color: "#8C8C8B", textAlign: "center",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#05A105"; e.currentTarget.style.color = "#05A105"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.color = "#8C8C8B"; }}
            >
              Add line item
            </button>
          </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid #ECECEC", display: "flex", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{
          flex: 1, padding: "10px 16px", border: "1px solid #E9E9EB", borderRadius: 8,
          background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >
          Cancel
        </button>
        <button
          onClick={!publishing ? handlePublish : undefined}
          style={{
            flex: 2, padding: "10px 16px", border: publishing ? "1px solid #E9E9EB" : "none", borderRadius: 8,
            background: publishing ? "#F5F5F5" : "#05A105", cursor: publishing ? "default" : "pointer",
            fontSize: 14, fontWeight: 500, color: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { if (!publishing) e.currentTarget.style.background = "#048C04"; }}
          onMouseLeave={e => { if (!publishing) e.currentTarget.style.background = "#05A105"; }}
        >
          {publishing ? (
            <div style={{
              width: 20, height: 20, borderRadius: "50%",
              border: "2.5px solid #E9E9EB",
              borderTopColor: "#05A105",
              animation: "spin 0.75s linear infinite",
            }} />
          ) : "Create spend money and publish"}
        </button>
      </div>
    </div>
  );
}

// ── Icons for BatchDraftSidebar ────────────────────────────────────────────────
function BankBuildingIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4.965 8.938v7.944M9.434 8.938v7.944M14.399 8.938v7.944M18.868 8.938v7.944M2.979 18.471v.795c0 .556 0 .834.108 1.047a.993.993 0 00.434.434c.213.108.49.108 1.047.108h14.697c.556 0 .834 0 1.047-.108a.993.993 0 00.434-.434c.108-.213.108-.49.108-1.047v-.795c0-.556 0-.834-.108-1.047a.993.993 0 00-.434-.434c-.213-.108-.49-.108-1.047-.108H4.568c-.556 0-.834 0-1.047.108a.993.993 0 00-.434.434c-.108.213-.108.49-.108 1.047zM11.572 3.056l-7.349 1.633c-.444.099-.666.148-.832.268a.993.993 0 00-.333.414c-.08.188-.08.415-.08.87v1.109c0 .556 0 .834.109 1.046.095.187.247.339.434.434.212.109.49.109 1.046.109h14.698c.556 0 .834 0 1.046-.109a.993.993 0 00.434-.434c.108-.212.108-.49.108-1.046V6.24c0-.454 0-.682-.08-.87a.993.993 0 00-.333-.413c-.166-.12-.388-.17-.832-.268l-7.348-1.633a1.987 1.987 0 00-.259-.03 1.006 1.006 0 00-.173 0c-.066.006-.13.02-.259.03z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PencilIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M16.364 1.818l3.636 3.637M1.818 20l1.16-4.255c.076-.277.114-.416.172-.546a1.82 1.82 0 01.19-.326c.083-.114.185-.216.389-.42l9.394-9.394c.18-.18.27-.27.374-.303a.364.364 0 01.28 0c.104.034.194.124.374.304l2.607 2.608c.18.18.27.27.304.373a.364.364 0 010 .281c-.034.104-.124.194-.304.374L7.364 18.09c-.203.204-.305.305-.42.389a1.82 1.82 0 01-.325.19c-.13.057-.269.095-.546.171L1.818 20z" stroke="#4F4F4F" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function InvoiceFileIcon({ width = 24, height = 30 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 31 38" fill="none">
      <path d="M0 3.434A3.434 3.434 0 013.434 0H21.637l4.038 5.235 5.235 6.786v21.637a3.434 3.434 0 01-3.434 3.434H3.434A3.434 3.434 0 010 33.658V3.434z" fill="#F4F4F2"/>
      <path d="M12.297 12.601c3.477-1.043-.133 16.677-2.841 14.24-3.358-3.023 12.586-7.63 11.107-3.197-1.295 3.885-12.141-9.88-8.266-11.043z" stroke="#FF6056" strokeWidth="1.188"/>
      <path d="M21.637 10.089V0l9.273 12.021h-7.341c-.911 0-1.366 0-1.649-.283-.283-.283-.283-.738-.283-1.649z" fill="#D6D6D4"/>
    </svg>
  );
}

function FileQuestionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M16.6666 7.916V5.666c0-1.4-.0001-2.1-.2725-2.635a2.5 2.5 0 00-1.0925-1.0925C14.7668 1.666 14.0667 1.666 12.6666 1.666H7.333c-1.4 0-2.1 0-2.635.2725a2.5 2.5 0 00-1.0925 1.0925C3.333 3.566 3.333 4.266 3.333 5.666v8.667c0 1.4 0 2.1.273 2.635a2.5 2.5 0 001.092 1.092c.535.273 1.235.273 2.635.273h4.333M11.667 9.166H6.667M8.333 12.499H6.667M13.333 5.833H6.667M13.75 12.501a2.083 2.083 0 013.641.625c0 1.249-1.874 1.874-1.874 1.874M15.542 17.499h.008" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BankStatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M4.167 7.499v6.667M7.917 7.499v6.667M12.083 7.499v6.667M15.833 7.499v6.667M2.5 15.499v.667c0 .467 0 .7.091.878a.833.833 0 00.364.364c.178.091.412.091.878.091h12.334c.467 0 .7 0 .878-.091a.833.833 0 00.364-.364c.091-.178.091-.411.091-.878v-.667c0-.467 0-.7-.091-.878a.833.833 0 00-.364-.364c-.178-.091-.412-.091-.878-.091H3.833c-.467 0-.7 0-.878.091a.833.833 0 00-.364.364c-.091.178-.091.411-.091.878zM9.711 2.563L3.544 3.934c-.373.083-.559.124-.698.224a.833.833 0 00-.279.347C2.5 4.663 2.5 4.854 2.5 5.235v.931c0 .467 0 .7.091.878a.833.833 0 00.364.364c.178.091.412.091.878.091h12.334c.467 0 .7 0 .878-.091a.833.833 0 00.364-.364c.091-.178.091-.412.091-.878v-.931c0-.382 0-.573-.068-.73a.833.833 0 00-.279-.347c-.139-.1-.326-.142-.698-.225l-6.167-1.37a1.167 1.167 0 00-.216-.041.833.833 0 00-.146 0c-.054.005-.108.017-.216.041z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UsersCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M13.333 15l1.667 1.667 3.333-3.334M10 12.5H6.667c-1.554 0-2.33 0-2.943.254a3.333 3.333 0 00-1.804 1.804C1.667 15.17 1.667 15.947 1.667 17.5M12.917 2.742a3.333 3.333 0 010 6.183M11.25 5.833a3.333 3.333 0 11-6.667 0 3.333 3.333 0 016.667 0z" stroke="#1F2024" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 11v1.5A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5V11M8 2v8M5 7l3 3 3-3" stroke="#7C7C7C" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Batch Draft Sidebar ───────────────────────────────────────────────────────
function BatchDraftSidebar({ contact = "Yorkshire Tea Estates", amount = "£240.00", date = "23 March 2026", fileName = "yte-invoice172.pdf", onClose, onConfirm }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Document");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => { onConfirm?.(); onClose(); }, 320);
    }, 2000);
  };

  const cardStyle = { border: "1px solid #E9E9EB", borderRadius: 12, background: "#FFFFFF" };
  const tabs = ["Document", "Notes", "Audit trail"];

  return (
    <div style={{
      position: "fixed", top: 0, right: 0, bottom: 0, width: 600,
      background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
      display: "flex", flexDirection: "column", zIndex: 201,
      transform: visible ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", borderBottom: "1px solid #ECECEC", flexShrink: 0 }}>
        <span style={{ fontSize: 22, fontWeight: 600, color: "#080908" }}>{contact}</span>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="#545453" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── Bank account card ── */}
        <div style={cardStyle}>
          {/* Bank row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <BankBuildingIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Lloyds Bank - Business</div>
                <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 1 }}>1048 9418-2251</div>
              </div>
            </div>
            <button style={{ padding: "7px 14px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
              onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
              onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
            >Copy upload link</button>
          </div>
          {/* Amount + Date */}
          <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #F0F0F0" }}>
            <div style={{ flex: 1, padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginBottom: 4 }}>Amount</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>-{amount}</div>
            </div>
            <div style={{ width: 1, background: "#F0F0F0", height: 28, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginBottom: 4 }}>Date</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{date}</div>
            </div>
          </div>
        </div>

        {/* ── Batch info card ── */}
        <div style={cardStyle}>
          {/* Batch header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <PencilIcon size={16} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Lloyd Bank - Operations GBP</div>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 1 }}>Drafted batch</div>
            </div>
          </div>
          {/* Stats */}
          <div style={{ margin: "0 18px", border: "1px solid #E9E9EB", borderRadius: 8 }}>
            <div style={{ display: "flex", padding: "10px 0", alignItems: "center" }}>
              {[
                { icon: <FileQuestionIcon />, label: "8 requests" },
                { icon: <BankStatIcon />, label: "2 accounts" },
                { icon: <UsersCheckIcon />, label: "2 assignees" },
              ].map(({ icon, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <div style={{ width: 1, background: "#E9E9EB", height: 14, flexShrink: 0 }} />}
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#1F2024", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    {icon} {label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Separator below stats */}
          <div style={{ margin: "12px 18px 0", borderTop: "1px solid #F0F0F0" }} />
          {/* Assignees */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "16px 18px" }}>
            {[["S", "Sara Thompson"], ["O", "Oliver Davies"]].map(([initial, name], i) => (
              <React.Fragment key={name}>
                {i > 0 && <div style={{ width: 1, background: "#E9E9EB", alignSelf: "stretch", margin: "0 16px" }} />}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#6389CF" }}>{initial}</span>
                  </div>
                  <span style={{ fontSize: 14, color: "#080908" }}>{name}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Archive request ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", border: "1px solid #E9E9EB", borderRadius: 12, background: "#FFFFFF" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 2 }}>Archive request</div>
            <div style={{ fontSize: 14, color: "#7C7C7C" }}>If no document needed, archive this request</div>
          </div>
          <button style={{ padding: "7px 14px", border: "none", borderRadius: 8, background: "#FCEFEC", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#C8543A", whiteSpace: "nowrap", flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = "#F9DDD8"}
            onMouseLeave={e => e.currentTarget.style.background = "#FCEFEC"}
          >Archive request</button>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", borderBottom: "1px solid #ECECEC", marginTop: 4 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "10px 0", marginRight: 24, fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? "#080908" : "#7C7C7C", background: "none", border: "none",
              borderBottom: activeTab === tab ? "2px solid #05A105" : "2px solid transparent",
              cursor: "pointer", transition: "all 0.15s",
            }}>{tab}</button>
          ))}
        </div>

        {/* ── Document tab ── */}
        {activeTab === "Document" && (
          <div style={cardStyle}>
            {/* Invoice header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid #F0F0F0" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Invoice</div>
                <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 2 }}><span style={{ fontWeight: 500 }}>Direct Expenses</span> 325</div>
              </div>
              <button style={{ padding: "6px 14px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
              >Review</button>
            </div>
            {/* Invoice detail */}
            <div style={{ padding: "14px 18px" }}>
              <div style={{ fontSize: 14, color: "#080908" }}>
                <span style={{ fontWeight: 500 }}>{contact}</span> 31 Jan 2026
              </div>
              <div style={{ fontSize: 14, color: "#7C7C7C", marginTop: 4 }}>
                <span style={{ fontWeight: 500, color: "#080908" }}>-{amount}</span> 20% tax, £48.00
              </div>
            </div>
            {/* Attached PDF */}
            <div style={{ margin: "0 14px 14px", border: "1px solid #E9E9EB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", height: 70 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <InvoiceFileIcon width={32} height={38} />
                <span style={{ fontSize: 14, color: "#080908" }}>{fileName}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ padding: "3px 8px", borderRadius: 6, background: "#FDF8EE", fontSize: 13, fontWeight: 500, color: "#D5A750" }}>Review</span>
                <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 2 }}>
                  <DownloadIcon />
                </button>
                <button style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 2 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#7C7C7C" strokeWidth="1.25" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Notes" && (
          <div style={{ color: "#7C7C7C", fontSize: 14, padding: "8px 0" }}>No notes yet.</div>
        )}
        {activeTab === "Audit trail" && (
          <div style={{ color: "#7C7C7C", fontSize: 14, padding: "8px 0" }}>No audit events yet.</div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 28px", borderTop: "1px solid #ECECEC", display: "flex", gap: 12, flexShrink: 0 }}>
        <button onClick={onClose} style={{ padding: "10px 24px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
          onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
        >Close</button>
        <button onClick={!confirming ? handleConfirm : undefined}
          style={{ flex: 1, padding: "10px 16px", border: confirming ? "1px solid #E9E9EB" : "none", borderRadius: 8, background: confirming ? "#F5F5F5" : "#05A105", cursor: confirming ? "default" : "pointer", fontSize: 14, fontWeight: 500, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s ease" }}
          onMouseEnter={e => { if (!confirming) e.currentTarget.style.background = "#04880E"; }}
          onMouseLeave={e => { if (!confirming) e.currentTarget.style.background = "#05A105"; }}
        >
          {confirming ? (
            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2.5px solid #E9E9EB", borderTopColor: "#05A105", animation: "spin 0.75s linear infinite" }} />
          ) : "Publish to Xero"}
        </button>
      </div>
    </div>
  );
}

// ── Results panel ─────────────────────────────────────────────────────────────
function ResultsPanel({ accountName, onOpenSpendMoney, onOpenBatchDraft, resolvedCards = new Set(), onResolveCard, onShowToast }) {
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const isHSBC = accountName === "HSBC - Business Transactions";

  const resultRows = isHSBC ? [
    { description: "Missing entries", issues: 1 },
  ] : [
    { description: "Missing entries",    issues: 3 },
    { description: "Anomalies",          issues: 1 },
    { description: "Duplicates",         issues: 1 },
    { description: "Date differences",   issues: 1 },
    { description: "Omitted",            issues: 1 },
    { description: "General",            issues: 1 },
  ];

  const missingEntries = isHSBC ? [
    {
      state: "Open", contact: "Anchor & Webb Consulting", date: "21 Mar 2026", amount: "£875.00", email: "20 Mar, 10:30",
      description: "A bank statement line for Anchor & Webb Consulting (£875.00) dated 21 Mar 2026 was found with no matching GL entry in Xero.",
      primaryLabel: "Create spend money", external: false, fileAction: null,
    },
  ] : [
    {
      state: "Open",   contact: "Yorkshire Tea Estates", date: "17 Mar 2026", amount: "£240.00", email: "12 Mar, 09:00",
      description: "A bank statement line for Yorkshire Tea Estates (£240.00) dated 17 Mar 2026 was found with no matching GL entry in Xero.",
      primaryLabel: "Create spend money", external: false, fileAction: null,
    },
    {
      state: "Review", contact: "Clifton & Harrow Supplies", date: "14 Mar 2026", amount: "£1,180.00", email: "13 Mar, 10:15",
      description: "A bank statement line for Clifton & Harrow Supplies (£1,180.00) dated 14 Mar 2026 was found with no matching GL entry in Xero.",
      primaryLabel: "Review and publish", external: false, fileAction: "CliftonHarrow-invoice.pdf",
    },
    {
      state: "Ready",  contact: "Meridian Office Solutions", date: "9 Mar 2026", amount: "£530.00", email: "8 Mar, 16:40",
      description: "A bank statement line for Meridian Office Solutions (£530.00) dated 9 Mar 2026 was found with no matching GL entry in Xero.",
      primaryLabel: "Reconcile in Xero", external: true,  fileAction: "Meridian-invoice.pdf",
    },
  ];

  const anomalies = [
    {
      state: "Open", contact: "Bakery & Food Supplies", date: "12 Mar 2026", amount: "£4,850.00", email: "10 Mar, 11:30",
      description: "A transaction of £4,850.00 from Bakery & Food Supplies is significantly above the account average of £240.00. This unusual amount may require manual review.",
      primaryLabel: "Remove in Xero", external: true, fileAction: null,
    },
  ];

  const duplicates = [
    {
      state: "Open", contact: "Yorkshire Tea Estates", date: "17 Mar 2026", amount: "£240.00", email: "15 Mar, 08:45",
      description: "Two identical transactions of £240.00 from Yorkshire Tea Estates were recorded on 17 Mar 2026. One entry may be a duplicate in Xero.",
      primaryLabel: "Remove in Xero", external: true, fileAction: null,
    },
  ];

  const dateDifferences = [
    {
      state: "Open", contact: "Direct Expenses", date: "14 Mar 2026", amount: "£320.00", email: "13 Mar, 14:00",
      description: "A bank statement entry dated 14 Mar 2026 is matched to a GL entry dated 17 Mar 2026 — a 3-day discrepancy. Please confirm if this date difference is intentional.",
      primaryLabel: "Acknowledge", external: false, fileAction: null,
    },
  ];

  const omitted = [
    {
      state: "Open", contact: "Internal Transfer", date: "28 Feb 2026", amount: "£12,000.00", email: "28 Feb, 09:00",
      description: "A bank statement line for an internal transfer of £12,000.00 on 28 Feb 2026 has no corresponding GL entry in Xero. This transaction may have been omitted.",
      primaryLabel: "Remove in Xero", external: true, fileAction: null,
    },
  ];

  const general = [
    {
      state: "Open", contact: "Unclassified", date: "22 Mar 2026", amount: "£85.00", email: "21 Mar, 17:20",
      description: "A transaction of £85.00 on 22 Mar 2026 could not be automatically classified. Manual review is required to assign the correct account code in Xero.",
      primaryLabel: "Remove in Xero", external: true, fileAction: null,
    },
  ];


  return (
    <div style={{ padding: "48px", fontFamily: "'Inter', sans-serif", minHeight: "100%" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Heading */}
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#080908", margin: "0 0 20px" }}>Results</h2>

      {/* Results table (uses DataTable from Tables.jsx) */}
      <div style={{ marginBottom: 12 }}>
        <DataTable
          columns={[
            { key: "description", label: "Description", width: "1fr" },
            { key: "issues", label: "Suggestions found", width: "160px" },
            { key: "action", label: "Action", width: "100px", align: "right", render: () => (
              <SecondaryButton style={{ padding: "4px 12px", fontSize: 13, whiteSpace: "nowrap" }}>Review</SecondaryButton>
            )},
          ]}
          rows={resultRows}
        />
      </div>

      {/* Analysis & key findings */}
      <div style={{ background: "#FFFFFF", border: "1px solid #EFF1F4", borderRadius: 8, marginBottom: 28, overflow: "hidden" }}>
        <button onClick={() => setAnalysisOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: "none", background: "none", cursor: "pointer" }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>Analysis & key findings</span>
          <div style={{ display: "flex", transform: analysisOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s", flexShrink: 0 }}>
            <ChevronUpIcon />
          </div>
        </button>
        {analysisOpen && (
          <div style={{ padding: "0 16px 16px", fontSize: 14, color: "#4F4F4F", lineHeight: "22px", borderTop: "1px solid #EFF1F4", paddingTop: 14 }}>
            The reconciliation found 8 items requiring attention across 6 categories. The most significant issues are 3 missing entries totalling £720.00. Balance is confirmed matching at £12,439.00 with 361 of 380 bank statement lines matched to GL records.
          </div>
        )}
      </div>

      {/* Suggestions */}
      <h3 style={{ fontSize: 16, fontWeight: 500, color: "#080908", margin: "0 0 6px" }}>Suggestions</h3>
      <p style={{ fontSize: 14, color: "#000000", margin: "0 0 16px" }}>{missingEntries.length} Missing {missingEntries.length === 1 ? "entry" : "entries"}</p>

      {/* Missing entry cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {missingEntries.map((entry, i) => {
          const isResolved = resolvedCards.has(i);
          return (
            <RecommendationCard
              key={i}
              title={`Missing entry: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved
                ? { background: "#EAF2E2", border: "none", color: "#05A105" }
                : { background: "#FDF8EE", border: "none", color: "#D5A750" }
              }
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={
                entry.primaryLabel === "Create spend money" ? () => onOpenSpendMoney?.(entry, i) :
                entry.primaryLabel === "Review and publish"  ? () => onOpenBatchDraft?.(entry, i) :
                entry.primaryLabel === "Reconcile in Xero"   ? () => { onResolveCard?.(i); onShowToast?.("Reconciled in Xero successfully"); } :
                undefined
              }
            />
          );
        })}
      </div>

      {!isHSBC && (<>
      {/* Anomalies */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Anomaly</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {anomalies.map((entry, i) => {
          const cardIdx = 3 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <RecommendationCard
              key={i}
              title={`Anomaly: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
          );
        })}
      </div>

      {/* Duplicates */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Duplicate</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {duplicates.map((entry, i) => {
          const cardIdx = 4 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <RecommendationCard
              key={i}
              title={`Duplicate: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
          );
        })}
      </div>

      {/* Date differences */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Date difference</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {dateDifferences.map((entry, i) => {
          const cardIdx = 5 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <RecommendationCard
              key={i}
              title={`Date difference: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Date difference acknowledged"); }}
            />
          );
        })}
      </div>

      {/* Omitted */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 Omitted</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {omitted.map((entry, i) => {
          const cardIdx = 6 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <RecommendationCard
              key={i}
              title={`Omitted: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
          );
        })}
      </div>

      {/* General */}
      <p style={{ fontSize: 14, color: "#000000", margin: "24px 0 16px" }}>1 General</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {general.map((entry, i) => {
          const cardIdx = 7 + i;
          const isResolved = resolvedCards.has(cardIdx);
          return (
            <RecommendationCard
              key={i}
              title={`General: ${entry.contact}`}
              description={entry.description}
              statusLabel={isResolved ? "Resolved" : "Unresolved"}
              statusStyle={isResolved ? { background: "#EAF2E2", border: "none", color: "#05A105" } : { background: "#FDF8EE", border: "none", color: "#D5A750" }}
              collapsed={isResolved}
              tableRow={{ state: entry.state, contact: entry.contact, date: entry.date, amount: entry.amount, email: entry.email }}
              primaryLabel={entry.primaryLabel}
              external={entry.external}
              fileAction={entry.fileAction}
              onPrimaryAction={() => { onResolveCard?.(cardIdx); onShowToast?.("Removed in Xero successfully"); }}
            />
          );
        })}
      </div>
      </>)}
      <div style={{ paddingBottom: 32 }} />

      </div> {/* end maxWidth wrapper */}
    </div>
  );
}

// ── Reconciliation flow ───────────────────────────────────────────────────────
function ReconciliationFlow({ accountName, onClose, showResults = false, allResolved = false, isCleanReconcile = false, onUploadStatement }) {
  const accounts = [
    "Lloyds Bank - Operations GBP", "Lloyds Bank - Business",
    "HSBC - Business Transactions", "Barclays - Operations",
    "American Express OP GBP", "Mastercard Business",
  ];
  const isPicker = accountName === "__picker__";
  const [selectedAccount, setSelectedAccount] = useState(isPicker ? null : accountName);
  const [accountSelected, setAccountSelected] = useState(!isPicker); // true when account already known or user picks one
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [inputValue, setInputValue]           = useState("");
  const [uploadedFile, setUploadedFile]       = useState(showResults ? { name: "bank-statement.pdf", type: "application/pdf" } : null);
  const [previewUrl, setPreviewUrl]           = useState(null);
  const [prepDone, setPrepDone]               = useState(showResults);
  const [startClicked, setStartClicked]       = useState(showResults);
  const [stepStatuses, setStepStatuses]       = useState(showResults ? RECONCILIATION_STEPS.map(() => "done") : []);
  const [stepSubtexts, setStepSubtexts]       = useState(showResults ? RECONCILIATION_STEPS.map(s => s.subtext || "") : []);
  const [userMessages, setUserMessages]       = useState([]);
  const [reuploadPhase, setReuploadPhase]     = useState(false);
  const [resultsVisible, setResultsVisible]   = useState(showResults);
  const [canvasReady, setCanvasReady]         = useState(showResults);
  const [chatWidth, setChatWidth]             = useState(400);
  const [isDragging, setIsDragging]           = useState(false);
  const [spendMoneySidebar, setSpendMoneySidebar] = useState(null);
  const chatScrollRef = useRef(null);
  const chatEndRef    = useRef(null);
  const [batchDraftSidebar, setBatchDraftSidebar] = useState(null);
  const ACCOUNT_TOTAL_SUGGESTIONS = { "Lloyds Bank - Business": 8, "HSBC - Business Transactions": 1 };
  const totalSuggestions = ACCOUNT_TOTAL_SUGGESTIONS[accountName] ?? 8;
  const allResolvedSet = allResolved ? new Set(Array.from({ length: totalSuggestions }, (_, i) => i)) : new Set();
  const [resolvedCards, setResolvedCards] = useState(allResolvedSet);
  const [toast, setToast] = useState(null);

  // Drag handler for resizable chat panel
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = chatWidth;

    const onMouseMove = (e) => {
      const newWidth = Math.max(280, Math.min(700, startWidth + (e.clientX - startX)));
      setChatWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const reconciliationComplete = stepStatuses.length > 0 && stepStatuses.every(s => s === "done");

  useEffect(() => {
    if (reconciliationComplete) setResultsVisible(true);
  }, [reconciliationComplete]);

  // Delay canvas content until panel has slid in
  useEffect(() => {
    if (!resultsVisible) return;
    if (showResults) { setCanvasReady(true); return; }
    setCanvasReady(false);
    const t = setTimeout(() => setCanvasReady(true), 3200);
    return () => clearTimeout(t);
  }, [resultsVisible]);

  const handleRestart = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setUserMessages([]);
    setReuploadPhase(false);
    setResultsVisible(false);
    setCanvasReady(false);
    setInputValue("");
  };

  const handleSend = () => {
    const msg = inputValue.trim();
    if (!msg) return;
    setUserMessages(prev => [...prev, msg]);
    setInputValue("");
    setUploadedFile(null);
    setPreviewUrl(null);
    setPrepDone(false);
    setStartClicked(false);
    setStepStatuses([]);
    setStepSubtexts([]);
    setReuploadPhase(true);
  };

  useEffect(() => {
    if (!startClicked || showResults) return;
    setStepStatuses(RECONCILIATION_STEPS.map((_, i) => i === 0 ? "active" : "pending"));
    setStepSubtexts(RECONCILIATION_STEPS.map(() => false));
    let cumulative = 0;
    const timers = [];
    RECONCILIATION_STEPS.forEach((step, i) => {
      cumulative += step.duration;
      // Show subtext 400ms before the step completes
      if (step.subtext) {
        timers.push(setTimeout(() => {
          setStepSubtexts(prev => { const next = [...prev]; next[i] = true; return next; });
        }, cumulative - 400));
      }
      // Mark step done
      timers.push(setTimeout(() => {
        setStepStatuses(prev => {
          const next = [...prev];
          next[i] = "done";
          if (i + 1 < RECONCILIATION_STEPS.length) next[i + 1] = "active";
          return next;
        });
      }, cumulative));
    });
    return () => timers.forEach(clearTimeout);
  }, [startClicked]);

  // After file is selected, wait 2.2s then start AI response
  useEffect(() => {
    if (!uploadedFile || showResults) return;
    const t = setTimeout(() => setPrepDone(true), 2200);
    return () => clearTimeout(t);
  }, [uploadedFile]);

  const handleFileSelected = (file) => {
    setUploadedFile(file);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    onUploadStatement?.(selectedAccount, { fileName: file.name, date: dateStr });
  };

  // Two-line message — line 2 starts after line 1 finishes, user bubble after line 2
  const line1Segments = [
    { text: "Great, let's reconcile a ", bold: false },
    { text: "bank account.",             bold: true  },
  ];
  const line1Full = line1Segments.map(s => s.text).join("");
  const { done: line1Done } = useTypewriter(line1Full, 18, showResults);

  const line2Text = "Tell me what bank account you want to reconcile";
  // line2 only types in picker flow; in row flow we skip it
  const { done: line2Done } = useTypewriter(isPicker && line1Done ? line2Text : "", 18, showResults);

  // Line 3 AI message — in picker flow: starts after user picks account; in row flow: starts after line1 finishes
  const line3Segments = [
    { text: "I couldn't find any bank statement for ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: ". Could you upload the bank statement for me.", bold: false },
  ];
  const line3Full = line3Segments.map(s => s.text).join("");
  const line3Trigger = isPicker ? accountSelected : (line1Done && accountSelected);
  const { done: line3Done } = useTypewriter(line3Trigger ? line3Full : "", 18, showResults);

  // Line 4 — after file prep completes
  const line4Segments = [
    { text: "I have everything I need to reconcile ", bold: false },
    { text: selectedAccount,                          bold: true  },
    { text: " with account number ",                  bold: false },
    { text: "1234 567 8910",                          bold: true  },
    { text: ".",                                      bold: false },
  ];
  const line4Full = line4Segments.map(s => s.text).join("");
  const { done: line4Done } = useTypewriter(prepDone ? line4Full : "", 18, showResults);

  // Line 5 — after line 4
  const line5Text = "Tell me whenever you're ready to start.";
  const { done: line5Done } = useTypewriter(line4Done ? line5Text : "", 18, showResults);

  // Auto-scroll chat to bottom whenever new content appears
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [line1Done, line2Done, line3Done, line4Done, line5Done, prepDone, startClicked, stepStatuses, userMessages, accountSelected]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#FBFBFB" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,80%,100%{opacity:0.3;transform:scale(0.9)} 40%{opacity:1;transform:scale(1)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes resultsFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(-12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
      `}</style>

      {/* Top bar */}
      <div style={{ height: 96, background: "#FFFFFF", borderBottom: "1px solid #E9E9EB", boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)", display: "flex", alignItems: "center", padding: "0 24px", flexShrink: 0, gap: 16, zIndex: 10, position: "relative" }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: "#080908", flexShrink: 0, letterSpacing: "-1px" }}>Bank reconciliation</span>

        {/* Account dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 48, border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          >
            <span style={{ color: selectedAccount ? "#080908" : "#9D9D9E" }}>
              {selectedAccount || "Select account"}
            </span>
            <Chevron color="#080908" />
          </button>
          {dropdownOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 100, minWidth: 240, overflow: "hidden" }}>
              {accounts.map(acc => (
                <button key={acc} onClick={() => { setSelectedAccount(acc); setDropdownOpen(false); }}
                  style={{ width: "100%", display: "block", textAlign: "left", padding: "10px 14px", fontSize: 14, color: acc === selectedAccount ? "#080908" : "#4F4F4F", fontWeight: acc === selectedAccount ? 500 : 400, background: acc === selectedAccount ? "#F5F5F5" : "transparent", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => { if (acc !== selectedAccount) e.currentTarget.style.background = "#FAFAFA"; }}
                  onMouseLeave={e => { if (acc !== selectedAccount) e.currentTarget.style.background = "transparent"; }}
                >{acc}</button>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} />
        {resultsVisible && !isCleanReconcile && (
          <span style={{ fontSize: 14, color: "#545453", marginRight: 12, whiteSpace: "nowrap" }}>
            Left to review: <strong style={{ color: "#080908" }}>{totalSuggestions - resolvedCards.size} suggestion{(totalSuggestions - resolvedCards.size) !== 1 ? "s" : ""}</strong>
          </span>
        )}
        <button onClick={() => onClose(canvasReady, resolvedCards.size >= totalSuggestions)}
          style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", flexShrink: 0, padding: 0 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <rect width="30" height="30" rx="15" fill="#F5F5F5"/>
            <path d="M20 10L10 20M10 10L20 20" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content area — position:relative so the canvas overlay can anchor to it */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>

      {/* Left: chat panel */}
      <div style={{
        display: "flex", flexDirection: "column",
        width: resultsVisible ? chatWidth : "100%",
        flexShrink: 0,
        transition: isDragging ? "none" : "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        willChange: "width",
      }}>

      {/* Chat area */}
      <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: resultsVisible ? "100%" : 680, width: "100%", margin: "0 auto", padding: resultsVisible ? "32px 24px 40px" : "40px 24px 40px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>

          <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px" }}>
            <p><StreamingMessage segments={line1Segments} speed={18} instant={showResults} /></p>
            {isPicker && line1Done && (
              <p style={{ marginTop: 6 }}>
                <StreamingMessage key="line2" segments={[{ text: line2Text, bold: false }]} speed={18} instant={showResults} />
              </p>
            )}
          </div>

          {/* Account picker — appears after AI finishes line 2, before user selects (picker flow only) */}
          {isPicker && line2Done && !accountSelected && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "20px 20px 12px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#080908", marginBottom: 12 }}>Select bank account</p>
                {accounts.map(acc => (
                  <button
                    key={acc}
                    onClick={() => { setSelectedAccount(acc); setAccountSelected(true); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "12px 16px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 14, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {acc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User reply bubble — appears after account is selected and line1 is done */}
          {accountSelected && line1Done && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                {selectedAccount}
              </div>
            </div>
          )}

          {/* AI line 3 — couldn't find statement */}
          {line3Trigger && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line3" segments={line3Segments} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* Upload card — appears once line 3 finishes, hides after file chosen or re-upload phase */}
          {line3Done && !uploadedFile && !reuploadPhase && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={handleFileSelected} />
            </div>
          )}

          {/* User bubble — file preview after upload */}
          {uploadedFile && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <div style={{ maxWidth: 320 }}>
                {/* Document preview thumbnail */}
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" style={{ width: "100%", borderRadius: "12px 12px 2px 12px", border: "1px solid #E9E9EB", display: "block" }} />
                ) : (
                  /* PDF mock first-page preview */
                  <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: "12px 12px 2px 12px", padding: "20px 16px 16px", width: 260 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <FileIcon file={uploadedFile} width={20} height={24} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#080908" }}>Bank statement</span>
                    </div>
                    <div style={{ height: 1, background: "#F0F0F0", marginBottom: 10 }} />
                    {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                      <div key={i} style={{ height: 6, borderRadius: 3, background: "#F0F0F0", width: `${w}%`, marginBottom: 6 }} />
                    ))}
                  </div>
                )}
                {/* Filename pill */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                  <FileIcon file={uploadedFile} width={13} height={16} />
                  <span style={{ fontSize: 12, color: "#545453", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>{uploadedFile.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Preparing status */}
          {uploadedFile && !prepDone && (
            <p style={{ fontSize: 13, color: "#BCBCBC", marginTop: 20, lineHeight: "20px" }}>
              Preparing the file and getting ready for reconciliation
            </p>
          )}

          {/* AI line 4 — has everything needed */}
          {prepDone && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
              <p><StreamingMessage key="line4" segments={line4Segments} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* AI line 5 — ready to start */}
          {line4Done && (
            <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 6 }}>
              <p><StreamingMessage key="line5" segments={[{ text: line5Text, bold: false }]} speed={18} instant={showResults} /></p>
            </div>
          )}

          {/* Ready to start card — hidden once Start reconciliation is clicked */}
          {line5Done && !startClicked && (
            <div style={{ marginTop: 16 }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E9E9EB",
                borderRadius: 16,
                padding: "24px 24px 16px",
                maxWidth: 480,
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
              }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#080908", marginBottom: 16 }}>Ready to start?</p>
                {[
                  { label: "Start reconciliation", primary: true },
                  { label: "Upload another bank statement", primary: false },
                ].map(({ label, primary }) => (
                  <button
                    key={label}
                    onClick={() => { if (label === "Start reconciliation") setStartClicked(true); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "16px 18px", marginBottom: 8,
                      background: "#F7F7F7", border: "none",
                      borderRadius: 10, cursor: "pointer",
                      fontSize: 15, fontWeight: 400, color: "#080908",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F0F0F0"}
                    onMouseLeave={e => e.currentTarget.style.background = "#F7F7F7"}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User sent messages + re-upload flow */}
          {userMessages.map((msg, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <div style={{ maxWidth: 400, background: "#EAF2E2", borderRadius: "12px 12px 2px 12px", padding: "10px 14px", fontSize: 14, color: "#080908", lineHeight: "22px" }}>
                  {msg}
                </div>
              </div>
              {i === userMessages.length - 1 && (
                <div style={{ fontSize: 14, color: "#080908", lineHeight: "22px", marginTop: 20 }}>
                  <p>Sure! Please upload the new bank statement.</p>
                </div>
              )}
            </div>
          ))}

          {/* Re-upload card */}
          {reuploadPhase && !uploadedFile && (
            <div style={{ marginTop: 16 }}>
              <UploadCard onFileSelected={file => { handleFileSelected(file); setReuploadPhase(false); }} />
            </div>
          )}

          {/* User bubble — appears when "Start reconciliation" is clicked */}
          {startClicked && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <div style={{
                maxWidth: 400,
                background: "#EAF2E2",
                borderRadius: "12px 12px 2px 12px",
                padding: "10px 14px",
                fontSize: 14,
                color: "#080908",
                lineHeight: "22px",
              }}>
                Start reconciliation
              </div>
            </div>
          )}

          {/* Reconciliation progress */}
          {startClicked && stepStatuses.length > 0 && (
            <div style={{ marginTop: 24 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.50065 6.4987L10.6257 10.6237M6.50065 6.4987H3.75065L2.83398 3.7487L3.75065 2.83203L6.50065 3.7487V6.4987ZM18.6547 3.51129L16.2461 5.91994C15.8831 6.28296 15.7016 6.46446 15.6335 6.67377C15.5737 6.85787 15.5737 7.05619 15.6335 7.2403C15.7016 7.4496 15.8831 7.63111 16.2461 7.99412L16.4636 8.21161C16.8266 8.57462 17.0081 8.75613 17.2174 8.82414C17.4015 8.88396 17.5998 8.88396 17.7839 8.82414C17.9932 8.75613 18.1747 8.57462 18.5377 8.21161L20.7908 5.95852C21.0335 6.54901 21.1673 7.19573 21.1673 7.8737C21.1673 10.6581 18.9101 12.9154 16.1257 12.9154C15.79 12.9154 15.4619 12.8826 15.1446 12.82C14.699 12.7321 14.4761 12.6881 14.3411 12.7016C14.1975 12.7159 14.1267 12.7374 13.9995 12.8055C13.8798 12.8696 13.7597 12.9896 13.5196 13.2298L6.95898 19.7904C6.19959 20.5497 4.96838 20.5497 4.20899 19.7904C3.44959 19.031 3.44959 17.7997 4.20899 17.0403L10.7696 10.4798C11.0097 10.2396 11.1298 10.1196 11.1938 9.99989C11.2619 9.87265 11.2834 9.80188 11.2977 9.65827C11.3112 9.5232 11.2673 9.30038 11.1794 8.85475C11.1168 8.53742 11.084 8.20939 11.084 7.8737C11.084 5.08926 13.3412 2.83203 16.1257 2.83203C17.0474 2.83203 17.9113 3.07937 18.6547 3.51129ZM12.0007 14.7486L17.0423 19.7903C17.8017 20.5497 19.0329 20.5497 19.7923 19.7903C20.5517 19.0309 20.5517 17.7996 19.7923 17.0403L15.6447 12.8927C15.3511 12.8649 15.0648 12.812 14.788 12.736C14.4314 12.6381 14.0402 12.7092 13.7787 12.9707L12.0007 14.7486Z" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: "#080908" }}>Reconciliation</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 8.5L7 4.5L11 8.5" stroke="#8C8C8B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#8C8C8B" }}>
                    {stepStatuses.every(s => s === "done") ? "Completed" : "In progress"}
                  </span>
                </div>
              </div>

              {/* Steps */}
              {RECONCILIATION_STEPS.map((step, i) => {
                const status = stepStatuses[i] || "pending";
                const isLast = i === RECONCILIATION_STEPS.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    {/* Circle + connector line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 2 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        border: status === "active" ? "none" : `1.5px solid ${status === "done" ? "#05A105" : "#E9E9EB"}`,
                        background: status === "done" ? "#F5F5F5" : status === "active" ? "transparent" : "#FFFFFF",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.4s ease",
                      }}>
                        {status === "done" && (
                          <svg width="8" height="8" viewBox="0 0 13 13" fill="none">
                            <path d="M2 6.5L5 9.5L11 3.5" stroke="#05A105" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {status === "active" && (
                          <div style={{
                            width: 16, height: 16, borderRadius: "50%",
                            border: "1.5px solid #ACD394",
                            borderTopColor: "#05A105",
                            animation: "spin 0.7s linear infinite",
                          }} />
                        )}
                      </div>
                      {!isLast && (
                        <div style={{ width: 1, flexGrow: 1, minHeight: 20, background: "#E9E9EB", margin: "4px 0" }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ paddingBottom: isLast ? 0 : 20, paddingTop: 0 }}>
                      <div style={{
                        fontSize: 14, lineHeight: "24px",
                        fontWeight: status === "done" ? 500 : 400,
                        color: status === "pending" ? "#BCBCBC" : "#080908",
                        transition: "all 0.3s ease",
                      }}>
                        {step.title}
                      </div>
                      {(stepSubtexts[i] || status === "done") && step.subtext && (
                        <div style={{ fontSize: 13, color: "#8C8C8B", marginTop: 2, lineHeight: "18px", animation: "fadeIn 0.3s ease" }}>
                          {step.subtext}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div ref={chatEndRef} style={{ height: 32, flexShrink: 0 }} />
        </div>
      </div>

      {/* Preparing next step — shown while AI is streaming a response */}
      {(() => {
        const isStreaming = !line1Done
          || (isPicker && line1Done && !line2Done)
          || (!line3Done && (isPicker ? line2Done : line1Done))
          || (prepDone && !line4Done)
          || (line4Done && !line5Done);
        return isStreaming ? (
          <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div style={{
                borderRadius: 16, padding: "14px 14px 12px", background: "#FFFFFF",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontSize: 14, color: "#8C8C8B", display: "flex", alignItems: "center", gap: 6, lineHeight: "22px", flex: 1 }}>
                    <span style={{ display: "inline-flex", gap: 3 }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#8C8C8B", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`, display: "inline-block" }} />
                      ))}
                    </span>
                    Preparing next step...
                  </div>
                  <button
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", border: "1px solid #E9E9EB", borderRadius: 8, background: "#FFFFFF", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#080908", flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "#FFFFFF"}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" />
                    </svg>
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standalone textarea — visible when AI is not streaming */
          <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              {/* Restart reconciliation button — shown when results are visible (sidebar mode) */}
              {resultsVisible && (
                <button
                  onClick={handleRestart}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                    height: 40, padding: "0 16px", marginBottom: 10,
                    border: "1px solid #E9E9EB", borderRadius: 8,
                    background: "#FFFFFF", cursor: "pointer",
                    boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04)",
                    fontSize: 14, fontWeight: 500, color: "#080908",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = "#CFCFD1"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E9E9EB"; }}
                >
                  <PlayCircleIcon color="#080908" size={20} />
                  Restart reconciliation
                </button>
              )}
              <div style={{
                borderRadius: 16, padding: "14px 14px 12px", background: "#FFFFFF",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
              }}>
                <textarea
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Ask for changes or information..."
                  rows={3}
                  style={{ width: "100%", border: "none", outline: "none", resize: "none", fontSize: 14, color: "#080908", lineHeight: "22px", background: "transparent", fontFamily: "'Inter', sans-serif", display: "block" }}
                />
                <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                  {/* Attachment */}
                  <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div style={{ flex: 1 }} />
                  {/* Microphone */}
                  <button style={{ width: 32, height: 32, border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, color: "#8C8C8B", padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="6" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.25" />
                      <path d="M3 9C3 12.31 5.69 15 9 15C12.31 15 15 12.31 15 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                      <line x1="9" y1="15" x2="9" y2="17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                  </button>
                  {/* Send */}
                  <button onClick={handleSend} style={{ width: 36, height: 36, marginLeft: 6, border: "1px solid #E9E9EB", borderRadius: 10, background: inputValue.trim() ? "#05A105" : "#FAFAFA", cursor: inputValue.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", padding: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M9.99984 15.8346V4.16797M9.99984 4.16797L4.1665 10.0013M9.99984 4.16797L15.8332 10.0013" stroke={inputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      </div> {/* end left chat panel */}

      {/* Canvas — absolutely positioned overlay, slides in from right in one motion */}
      <div style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: chatWidth + 6,
        right: 0,
        background: "#FFFFFF",
        borderLeft: "1px solid #E9E9EB",
        overflowY: "auto",
        zIndex: 2,
        transform: resultsVisible ? "translateX(0)" : "translateX(100vw)",
        transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }}>
        {resultsVisible && (canvasReady ? (
          <div style={{ animation: "resultsFadeIn 0.5s ease both", height: "100%" }}>
            {(isCleanReconcile || (!allResolved && resolvedCards.size >= totalSuggestions && accountName !== "HSBC - Business Transactions")) ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: 48, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EAF2E2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M7 16.5L12.5 22L25 10" stroke="#05A105" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontSize: 18, fontWeight: 500, color: "#080908", margin: 0 }}>{accountName} is reconciled</p>
                <p style={{ fontSize: 14, color: "#8C8C8B", margin: 0, maxWidth: 280, lineHeight: "22px" }}>All transactions have been matched and verified. No issues found.</p>
              </div>
            ) : (
              <ResultsPanel
                accountName={accountName}
                onOpenSpendMoney={(entry, cardIndex) => setSpendMoneySidebar({ ...entry, cardIndex })}
                onOpenBatchDraft={(entry, cardIndex) => setBatchDraftSidebar({ ...entry, cardIndex })}
                resolvedCards={resolvedCards}
                onResolveCard={(idx) => setResolvedCards(prev => new Set([...prev, idx]))}
                onShowToast={(msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); }}
              />
            )}
          </div>
        ) : <CanvasLoader />)}
      </div>

      {/* Drag handle — thin absolute strip between chat and canvas */}
      {resultsVisible && (
        <div
          onMouseDown={handleDragStart}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: chatWidth,
            width: 6,
            cursor: "col-resize",
            zIndex: 10,
            background: isDragging ? "#E9E9EB" : "transparent",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = "#F0F0F0"; }}
          onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
        />
      )}

      </div> {/* end content area */}

      {/* Spend money sidebar — rendered here (top level) so it's above topbar and chat panel */}
      {spendMoneySidebar && (
        <>
          <div onClick={() => setSpendMoneySidebar(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <SpendMoneySidebar
            contact={spendMoneySidebar.contact}
            amount={spendMoneySidebar.amount}
            date={spendMoneySidebar.date}
            onClose={() => setSpendMoneySidebar(null)}
            onPublish={() => {
              if (spendMoneySidebar.cardIndex != null) {
                setResolvedCards(prev => new Set([...prev, spendMoneySidebar.cardIndex]));
              }
              setToast("Spend money created and published successfully");
              setTimeout(() => setToast(null), 4000);
            }}
          />
        </>
      )}

      {/* Batch draft sidebar */}
      {batchDraftSidebar && (
        <>
          <div onClick={() => setBatchDraftSidebar(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
          <BatchDraftSidebar
            contact={batchDraftSidebar.contact}
            amount={batchDraftSidebar.amount}
            date={batchDraftSidebar.date}
            fileName={batchDraftSidebar.fileAction}
            onClose={() => setBatchDraftSidebar(null)}
            onConfirm={() => {
              if (batchDraftSidebar.cardIndex != null) {
                setResolvedCards(prev => new Set([...prev, batchDraftSidebar.cardIndex]));
              }
              setToast("Document confirmed and published successfully");
              setTimeout(() => setToast(null), 4000);
            }}
          />
        </>
      )}

      {/* Success toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
          background: "#05A105", color: "#FFFFFF", padding: "12px 20px",
          borderRadius: 10, fontSize: 14, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 10,
          zIndex: 300, animation: "toastIn 0.35s ease",
          fontFamily: "'Inter', sans-serif",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" fill="rgba(255,255,255,0.25)"/>
            <path d="M6.66667 10L8.88889 12.2222L13.3333 7.77778" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {toast}
        </div>
      )}
    </div>
  );
}

// ── TopBar component (from TopBar.jsx) ────────────────────────────────────────
function TopBar({
  contextLabel = "Month-end close",
  period = "April 2026",
  syncStatus = "Last synced 32 minutes ago",
  syncLabel = "Sync with Xero",
  onPeriodClick,
  onSyncClick,
}) {
  return (
    <div style={{ height: 60, background: "#FFFFFF", borderBottom: "1px solid #E9E9EB", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14, color: "#8C8C8B" }}>{contextLabel}</span>
        <button onClick={onPeriodClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", border: "1px solid #E9E9EB", borderRadius: 6, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#CFCFD1"} onMouseLeave={e => e.currentTarget.style.borderColor = "#E9E9EB"}>
          {period} <Chevron up={false} color="#080908" size={13} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, color: "#8C8C8B" }}>{syncStatus}</span>
        <button onClick={onSyncClick} style={{ padding: "0 12px", height: 36, border: "1px solid #E9E9EB", borderRadius: 6, background: "#FFFFFF", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#080908" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; }}>
          {syncLabel}
        </button>
      </div>
    </div>
  );
}

// ── Button components (from Buttons.jsx) ──────────────────────────────────────
function PrimaryButton({ children, icon, onClick, disabled = false, style = {} }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: disabled ? "#F5F5F5" : "#05A105", color: disabled ? "#9D9D9E" : "#FFFFFF", border: "none", borderRadius: 8, cursor: disabled ? "default" : "pointer", fontSize: 14, fontWeight: 500, transition: "background 0.15s ease", ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "#008D00"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "#05A105"; }}>
      {children}{icon}
    </button>
  );
}

function SecondaryButton({ children, icon, onClick, disabled = false, style = {}, onMouseEnter, onMouseLeave }) {
  const defaultEnter = e => { if (!disabled) { e.currentTarget.style.borderColor = "#CFCFD1"; e.currentTarget.style.background = "#FAFAFA"; } };
  const defaultLeave = e => { if (!disabled) { e.currentTarget.style.borderColor = "#E9E9EB"; e.currentTarget.style.background = "#FFFFFF"; } };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", background: disabled ? "#F5F5F5" : "#FFFFFF", color: disabled ? "#9D9D9E" : "#080908", border: `1px solid ${disabled ? "#F5F5F5" : "#E9E9EB"}`, borderRadius: 6, cursor: disabled ? "default" : "pointer", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap", transition: "all 0.15s ease", ...style }}
      onMouseEnter={onMouseEnter || defaultEnter}
      onMouseLeave={onMouseLeave || defaultLeave}>
      {children}{icon}
    </button>
  );
}

// ── Widgets components (from Widgets.jsx) ─────────────────────────────────────
function StatsWidget({ label, value, progress = 0 }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      <ProgressRing progress={progress} size={40} strokeWidth={3} />
      <div>
        <div style={{ fontSize: 14, color: "#8C8C8B", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "#080908" }}>{value}</div>
      </div>
    </div>
  );
}

function StatsRow({ items = [], columns }) {
  const cols = columns || items.length || 1;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {items.map((item, i) => <StatsWidget key={i} label={item.label} value={item.value} progress={item.progress} />)}
    </div>
  );
}

// ── DataTable component (from Tables.jsx) ─────────────────────────────────────
function DataTable({ title, columns = [], rows = [], footerLabel, onRowClick }) {
  const [hovered, setHovered] = useState(null);
  const gridTemplate = columns.map(c => c.width || "1fr").join(" ");
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E9E9EB", borderRadius: 8, overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {title && <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid #E9E9EB" }}><span style={{ fontSize: 18, fontWeight: 500, color: "#080908" }}>{title}</span></div>}
      <div style={{ display: "grid", gridTemplateColumns: gridTemplate, borderBottom: "1px solid #E9E9EB", background: "#FFFFFF" }}>
        {columns.map((col, ci) => (
          <div key={col.key} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 500, color: "#8C8C8B", padding: "10px 16px", borderRight: ci < columns.length - 1 ? "1px solid #E9E9EB" : "none", justifyContent: col.align === "right" ? "flex-end" : "flex-start" }}>
            {col.label}{col.sortable && <SortIcon />}
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} onClick={() => onRowClick?.(row, ri)} onMouseEnter={() => setHovered(ri)} onMouseLeave={() => setHovered(null)}
          style={{ display: "grid", gridTemplateColumns: gridTemplate, borderBottom: ri < rows.length - 1 ? "1px solid #E9E9EB" : "none", background: hovered === ri ? "#FAFAFA" : "#FFFFFF", transition: "background 0.1s", cursor: onRowClick ? "pointer" : "default" }}>
          {columns.map((col, ci) => (
            <div key={col.key} style={{ display: "flex", alignItems: "center", justifyContent: col.align === "right" ? "flex-end" : "flex-start", fontSize: 14, color: "#080908", padding: "14px 16px", borderRight: ci < columns.length - 1 ? "1px solid #E9E9EB" : "none" }}>
              {col.render ? col.render(row[col.key], row, ri) : row[col.key]}
            </div>
          ))}
        </div>
      ))}
      {footerLabel && <div style={{ padding: "12px 16px", fontSize: 14, color: "#8C8C8B", borderTop: "1px solid #E9E9EB" }}>{footerLabel}</div>}
    </div>
  );
}

// ── MainMenu component (from MainMenu.jsx) ───────────────────────────────────
function MainMenu({
  activeNav,
  onNavChange,
  companyName = "Seabrook Foods Ltd.",
  userName = "Laura Bennett",
  userRole = "Clifton & Harrow",
  navItems = [
    { label: "Home",                icon: "home" },
    { label: "Collect documents",   icon: "fileQuestion" },
    { label: "Inbox",               icon: "inbox" },
    { label: "Bank reconciliation", icon: "checkVerified" },
    { label: "Adjustments",         icon: "switchHorizontal" },
    { label: "Review",              icon: "bookOpen" },
  ],
}) {
  const [associateOpen, setAssociateOpen] = useState(true);
  const [paymentsOpen, setPaymentsOpen]   = useState(false);

  return (
    <aside style={{
      width: 264, flexShrink: 0, display: "flex", flexDirection: "column",
      background: "#FFFFFF", borderRight: "1px solid #E9E9EB", height: "100vh",
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Mimo logo — 96px header */}
      <div style={{ height: 96, display: "flex", alignItems: "center", padding: "0 16px", flexShrink: 0 }}>
        <svg width="93" height="20" viewBox="0 0 98 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#mimoClip)">
            <path d="M21.2948 0.316406H16.2686V19.8237H21.2948V0.316406Z" fill="#1F2024"/>
            <path d="M3.55406 0L0 3.55406L10.9144 14.4685L14.4685 10.9144L3.55406 0Z" fill="#1F2024"/>
            <path d="M5.56185 10.7422H0.535645V19.8197H5.56185V10.7422Z" fill="#1F2024"/>
            <path d="M32.0013 19.8173V0.316406H36.4094L41.4536 12.2309C41.7614 12.9701 42.0807 13.7995 42.4143 14.7189H42.4684C42.7929 13.7995 43.1084 12.9701 43.4162 12.2309L48.4449 0.316406H52.826V19.816H49.4314V5.84742H49.3773C49.215 6.2711 49.0373 6.73857 48.8429 7.24724C48.6497 7.7572 48.4437 8.2736 48.2273 8.79515L43.5488 19.816H41.29L36.5974 8.78099C36.381 8.25815 36.1763 7.74045 35.9818 7.22534C35.7886 6.71151 35.6109 6.24277 35.4474 5.81909H35.3933V19.8147H32L32.0013 19.8173Z" fill="#1F2024"/>
            <path d="M54.7979 3.35338V0H58.3135V3.35338H54.7979ZM54.8519 19.8151V5.38678H58.2594V19.8163H54.8519V19.8151Z" fill="#1F2024"/>
            <path d="M60.729 19.8153V5.38573H64.1365V7.31998H64.1777C64.4018 6.85123 64.7198 6.44815 65.1306 6.10946C65.5414 5.77207 66.0231 5.51193 66.5781 5.33293C67.1318 5.15264 67.7384 5.0625 68.3964 5.0625C69.4151 5.0625 70.2702 5.26726 70.9591 5.67677C71.6481 6.08757 72.1696 6.67995 72.5212 7.45519H72.5611C72.9938 6.67995 73.5888 6.08628 74.3473 5.67677C75.1045 5.26726 76.0008 5.0625 77.0387 5.0625C78.0767 5.0625 78.9227 5.26726 79.6619 5.67677C80.4011 6.08757 80.9677 6.69283 81.3592 7.49511C81.7507 8.2974 81.9477 9.27611 81.9477 10.43V19.814H78.5532V10.9296C78.5532 10.0282 78.3188 9.3199 77.85 8.80607C77.3813 8.29225 76.7271 8.03598 75.8887 8.03598C75.2938 8.03598 74.7838 8.16862 74.3614 8.43519C73.9378 8.70048 73.6107 9.07522 73.3801 9.55814C73.1509 10.0411 73.0363 10.6051 73.0363 11.2554V19.8153H69.6559V10.9039C69.6559 10.0114 69.4241 9.30831 68.9592 8.79448C68.4943 8.28066 67.8478 8.02439 67.0185 8.02439C66.4403 8.02439 65.9342 8.1609 65.4964 8.43648C65.0598 8.71207 64.7237 9.09196 64.4893 9.57874C64.2537 10.0655 64.1378 10.6244 64.1378 11.2554V19.8153H60.7303H60.729Z" fill="#1F2024"/>
            <path d="M90.6726 20.1284C89.2843 20.1284 88.0403 19.8193 86.9393 19.2012C85.8395 18.5844 84.9806 17.7048 84.3624 16.5651C83.7443 15.4254 83.4365 14.1106 83.4365 12.6232C83.4365 11.1358 83.7404 9.8223 84.3483 8.68133C84.9574 7.54036 85.8138 6.65566 86.9174 6.02464C88.021 5.39363 89.2766 5.07812 90.6829 5.07812C92.0891 5.07812 93.3408 5.39106 94.4355 6.0182C95.5301 6.64535 96.3826 7.52619 96.9917 8.66202C97.5995 9.79784 97.9034 11.1191 97.9034 12.6245C97.9034 14.1299 97.5918 15.437 96.9711 16.5728C96.3491 17.7087 95.4901 18.5856 94.3942 19.2025C93.2996 19.8206 92.0569 20.1297 90.6687 20.1297L90.6726 20.1284ZM90.6726 17.3159C91.4014 17.3159 92.0556 17.1317 92.6338 16.7621C93.2108 16.3926 93.6615 15.8556 93.986 15.1524C94.3105 14.4493 94.4728 13.6058 94.4728 12.6232C94.4728 11.6406 94.3118 10.7959 93.9925 10.0876C93.6731 9.37931 93.2236 8.83844 92.648 8.46499C92.0698 8.09024 91.4117 7.90223 90.6738 7.90223C89.9359 7.90223 89.265 8.09024 88.6932 8.46499C88.1202 8.83844 87.672 9.37931 87.3475 10.0876C87.023 10.7959 86.8607 11.6406 86.8607 12.6232C86.8607 13.6058 87.0256 14.4467 87.354 15.1447C87.6823 15.844 88.1343 16.3797 88.7061 16.7544C89.2792 17.1279 89.9347 17.3159 90.6751 17.3159H90.6726Z" fill="#1F2024"/>
          </g>
          <defs>
            <clipPath id="mimoClip">
              <rect width="98" height="20.2181" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E9E9EB", flexShrink: 0 }} />

      {/* Company selector — white bordered card */}
      <div style={{ padding: "24px 12px", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 12px", background: "#FFFFFF",
          border: "1px solid #E9E9EB", borderRadius: 8, cursor: "pointer",
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12.5L5.5 8L10 3.5" stroke="#545453" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#080908" }}>{companyName}</span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E9E9EB", flexShrink: 0 }} />

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 8px 0", overflowY: "auto" }}>

        {/* Associate */}
        <button
          onClick={() => setAssociateOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 4px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: "#080908" }}>Associate</span>
          <Chevron up={associateOpen} />
        </button>

        {associateOpen && navItems.map(item => {
          const active = activeNav === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavChange?.(item.label)}
              style={{
                width: "calc(100% - 16px)", display: "flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 12px", marginBottom: 1,
                marginLeft: 8, marginRight: 8,
                borderRadius: 6, border: "none", cursor: "pointer",
                background: active ? "#F0F0F0" : "transparent",
                textAlign: "left", boxShadow: "none",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.04)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <NavIcon name={item.icon} color={active ? "#080908" : "#4F4F4F"} />
              <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? "#080908" : "#4F4F4F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Divider */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 0" }} />

        {/* Payments */}
        <button
          onClick={() => setPaymentsOpen(o => !o)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 20px 4px", background: "none", border: "none", cursor: "pointer" }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: "#080908" }}>Payments</span>
          <Chevron up={paymentsOpen} />
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: "#E9E9EB", margin: "16px 0" }} />

        {/* Settings */}
        <button
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 4px", background: "none", border: "none", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <NavIcon name="settings" color="#545453" />
          <span style={{ fontSize: 14, fontWeight: 400, color: "#4F4F4F" }}>Settings</span>
        </button>

      </nav>

      {/* User profile */}
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, borderTop: "1px solid #E9E9EB" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F0F5FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6389CF" }}>LB</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#080908", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</div>
          <div style={{ fontSize: 12, color: "#8C8C8B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userRole}</div>
        </div>
        <button style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="3" r="1.2" fill="#545453"/>
            <circle cx="8" cy="8" r="1.2" fill="#545453"/>
            <circle cx="8" cy="13" r="1.2" fill="#545453"/>
          </svg>
        </button>
      </div>
    </aside>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export default function BankReconciliation() {
  const [activeNav, setActiveNav] = useState("Bank reconciliation");
  const [reconciling, setReconciling] = useState(null); // account name or null
  const [showResultsMode, setShowResultsMode] = useState(false); // true when opening from suggestions button
  const [allResolvedOnOpen, setAllResolvedOnOpen] = useState(false); // true when opening from a fully reconciled account
  const [isCleanReconcileOnOpen, setIsCleanReconcileOnOpen] = useState(false); // true when account has "reconciled" status (no suggestions)
  const [reconciledAccounts, setReconciledAccounts] = useState(new Set()); // tracks completed reconciliations
  const [reconciledDates, setReconciledDates] = useState({}); // { [accountName]: "13 Apr" }
  const [reconciledStatuses, setReconciledStatuses] = useState({}); // { [accountName]: "reconciled"|"suggestions"|"completed" }
  const [reconciledCounts, setReconciledCounts] = useState({}); // { [accountName]: number | null }
  const [bankStatements, setBankStatements] = useState({}); // { [accountName]: { fileName, date } }

  const handleUploadStatement = (accountName, fileInfo) => {
    setBankStatements(prev => ({ ...prev, [accountName]: fileInfo }));
  };

  // Post-reconciliation data per account (statement balance, difference, matching)
  const reconciledData = {
    "Lloyds Bank - Operations GBP":   { statementBalance: "£127,000.00", difference: "£27,000.00", matched: "361/380", suggestions: 3 },
    "Lloyds Bank - Business":          { statementBalance: "£152,500.00", difference: "£2,500.00",  matched: "241/244", suggestions: 2 },
    "HSBC - Business Transactions":   { statementBalance: "£95,500.00",  difference: "£2,500.00",  matched: "189/195", suggestions: 2 },
    "Barclays - Operations":          { statementBalance: "£374,000.00", difference: "£6,000.00",  matched: "409/420", suggestions: 1 },
    "American Express OP GBP":        { statementBalance: "£127,000.00", difference: "£27,000.00", matched: "98/105",  suggestions: 3 },
    "Mastercard Business":            { statementBalance: "£152,500.00", difference: "£2,500.00",  matched: "53/56",   suggestions: 2 },
  };

  const bankAccounts = [
    { name: "Lloyds Bank - Operations GBP",   feedBalance: "£127,000.00", glBalance: "£100,000.00", glSub: "£0,00" },
    { name: "Lloyds Bank - Business",          feedBalance: "£155,000.00", glBalance: "£155,000.00", glSub: "£0,00" },
    { name: "HSBC - Business Transactions",   feedBalance: "£93,000.00",  glBalance: "£93,000.00",  glSub: "£0,00" },
    { name: "Barclays - Operations",          feedBalance: "£374,000.00", glBalance: "£380,000.00", glSub: "£0,00" },
    { name: "American Express OP GBP",        feedBalance: "£127,000.00", glBalance: "£100,000.00", glSub: "£0,00" },
    { name: "Mastercard Business",            feedBalance: "£155,000.00", glBalance: "£155,000.00", glSub: "£0,00" },
  ];

  const getDateLabel = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  const ACCOUNT_OUTCOMES = {
    "Lloyds Bank - Business":       { status: "suggestions", count: 8 },
    "HSBC - Business Transactions": { status: "suggestions", count: 1 },
  };

  const handleCloseReconciliation = (accountName, completed = false, allSuggestionsResolved = false) => {
    if (completed) {
      setReconciledAccounts(prev => new Set([...prev, accountName]));
      setReconciledDates(prev => ({ ...prev, [accountName]: getDateLabel() }));
      // When closing from view-results mode for an already-"reconciled" account,
      // preserve its status — don't downgrade it to "suggestions".
      const currentStatus = reconciledStatuses[accountName];
      if (!(showResultsMode && currentStatus === "reconciled")) {
        const outcome = ACCOUNT_OUTCOMES[accountName];
        const accountsWithCompletedState = new Set(["Lloyds Bank - Business", "HSBC - Business Transactions"]);
        const resolvedStatus = (accountsWithCompletedState.has(accountName) && allSuggestionsResolved)
          ? "completed"
          : accountName === "Lloyds Bank - Operations GBP"
          ? "reconciled"
          : "suggestions";
        const resolvedCount = (resolvedStatus === "completed" || resolvedStatus === "reconciled") ? null : (outcome?.count ?? reconciledData[accountName]?.suggestions ?? 3);
        setReconciledStatuses(prev => ({ ...prev, [accountName]: resolvedStatus }));
        setReconciledCounts(prev => ({ ...prev, [accountName]: resolvedCount }));
      }
    }
    setReconciling(null);
    setShowResultsMode(false);
  };

  const handleRunReconciliation = (accountName) => {
    setReconciling(accountName);
    setShowResultsMode(false);
    setAllResolvedOnOpen(false);
    setIsCleanReconcileOnOpen(accountName === "Lloyds Bank - Operations GBP");
  };

  const handleAutoReconcile = (accountName, status = "reconciled", count = null) => {
    setReconciledAccounts(prev => new Set([...prev, accountName]));
    setReconciledDates(prev => ({ ...prev, [accountName]: getDateLabel() }));
    setReconciledStatuses(prev => ({ ...prev, [accountName]: status }));
    setReconciledCounts(prev => ({ ...prev, [accountName]: count }));
  };

  const handleResetAccount = (accountName) => {
    setReconciledAccounts(prev => { const next = new Set(prev); next.delete(accountName); return next; });
    setReconciledStatuses(prev => { const next = { ...prev }; delete next[accountName]; return next; });
    setReconciledCounts(prev => { const next = { ...prev }; delete next[accountName]; return next; });
    setReconciledDates(prev => { const next = { ...prev }; delete next[accountName]; return next; });
  };

  const handleViewResults = (accountName) => {
    setReconciling(accountName);
    setShowResultsMode(true);
    const status = reconciledStatuses[accountName] || "reconciled";
    setAllResolvedOnOpen(status !== "suggestions");
    setIsCleanReconcileOnOpen(status === "reconciled");
  };

  if (reconciling) {
    return <ReconciliationFlow accountName={reconciling} onClose={(completed, allSuggestionsResolved) => handleCloseReconciliation(reconciling, completed, allSuggestionsResolved)} showResults={showResultsMode} allResolved={allResolvedOnOpen} isCleanReconcile={isCleanReconcileOnOpen} onUploadStatement={handleUploadStatement} />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: "#FFFFFF", overflow: "hidden" }}>

        {/* ── LEFT MAIN MENU (from MainMenu.jsx) ─────────────────────────── */}
        <MainMenu activeNav={activeNav} onNavChange={setActiveNav} />

        {/* ── RIGHT: CONTENT AREA ───────────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Top context bar (from TopBar.jsx) */}
          <TopBar />

          {/* Page header (uses PrimaryButton from Buttons.jsx) */}
          <div style={{ padding: "32px 48px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#FFFFFF" }}>
            <h1 style={{ fontSize: 32, fontWeight: 500, color: "#080908", lineHeight: "40px", letterSpacing: "-1px" }}>Bank reconciliation</h1>
            <PrimaryButton icon={<PlayCircleIcon color="white" />} onClick={() => { setReconciling("__picker__"); setShowResultsMode(false); }}>
              Run reconciliation
            </PrimaryButton>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: "auto", padding: 48, paddingTop: 0, display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Stats summary cards (from Widgets.jsx) */}
            <StatsRow items={(() => {
              const totalAccounts = bankAccounts.length;
              const reconciledCount = reconciledAccounts.size;
              const { matchedGL, totalMatches } = [...reconciledAccounts].reduce((acc, name) => {
                const d = reconciledData[name] || {};
                const status = reconciledStatuses[name] || "reconciled";
                const count = reconciledCounts[name] || 3;
                const total = parseInt((d.matched || "100/100").split("/")[1]) || 100;
                const matched = status === "suggestions"
                  ? Math.max(0, total - count)
                  : total;
                return { matchedGL: acc.matchedGL + matched, totalMatches: acc.totalMatches + total };
              }, { matchedGL: 0, totalMatches: 0 });
              const fullyReconciled = [...reconciledAccounts].filter(name => (reconciledStatuses[name] || "reconciled") === "reconciled").length;
              return [
                { label: "Bank statements received", value: `${reconciledCount} of ${totalAccounts} statements`, progress: Math.round((reconciledCount / totalAccounts) * 100) },
                { label: "Matched GL record",         value: `${matchedGL} of ${totalMatches} matches`,           progress: totalMatches > 0 ? Math.round((matchedGL / totalMatches) * 100) : 0 },
                { label: "Accounts reconciled",       value: `${fullyReconciled} of ${totalAccounts} accounts`,   progress: Math.round((fullyReconciled / totalAccounts) * 100) },
              ];
            })()} />

            {/* Bank accounts table */}
            <AccountTable title="Accounts" rows={bankAccounts} footerLabel="6 bank accounts" onRunReconciliation={handleRunReconciliation} onViewResults={handleViewResults} reconciledAccounts={reconciledAccounts} reconciledData={reconciledData} reconciledDates={reconciledDates} reconciledStatuses={reconciledStatuses} reconciledCounts={reconciledCounts} bankStatements={bankStatements} onUploadStatement={handleUploadStatement} onAutoReconcile={handleAutoReconcile} onResetAccount={handleResetAccount} />

          </div>
        </div>
      </div>
    </>
  );
}
