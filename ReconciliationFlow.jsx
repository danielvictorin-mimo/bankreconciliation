import { useState, useRef, useEffect } from "react";

// ── Chevron ───────────────────────────────────────────────────────────────────
function Chevron({ color = "#080908", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 5.5L7 9.5L11 5.5" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Stop icon ─────────────────────────────────────────────────────────────────
function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="#080908" strokeWidth="1.25" />
    </svg>
  );
}

// ── AI message bubble ─────────────────────────────────────────────────────────
function AiMessage({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
      <div style={{ maxWidth: 560, fontSize: 14, color: "#080908", lineHeight: "22px" }}>
        {children}
      </div>
    </div>
  );
}

// ── User message bubble ───────────────────────────────────────────────────────
function UserMessage({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
      <div style={{
        maxWidth: 400,
        background: "#F4F9F1",
        border: "1px solid #D5EBCF",
        borderRadius: "12px 12px 2px 12px",
        padding: "10px 14px",
        fontSize: 14,
        color: "#080908",
        lineHeight: "22px",
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ReconciliationFlow({
  accountName = "Lloyds Bank Operations GBP",
  itemsLeft = 8,
  onClose,
}) {
  const accounts = [
    "Lloyds Bank Operations GBP",
    "Lloyd Bank - Business",
    "HSBC - Business Transactions",
    "Barclays - Operations",
    "American Express OP GBP",
    "Mastercard Business",
  ];

  const [selectedAccount, setSelectedAccount] = useState(accountName);
  const [dropdownOpen, setDropdownOpen]       = useState(false);
  const [inputValue, setInputValue]           = useState("");
  const [isPreparing, setIsPreparing]         = useState(false);
  const [isStreaming, setIsStreaming]         = useState(false);
  const inputRef                              = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.9); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{
        display: "flex", flexDirection: "column", height: "100vh",
        fontFamily: "'Inter', sans-serif", background: "#F7F7F7",
      }}>

        {/* ── Top bar ─────────────────────────────────────────────────────── */}
        <div style={{
          height: 56, background: "#FFFFFF",
          borderBottom: "1px solid #E9E9EB",
          display: "flex", alignItems: "center",
          padding: "0 24px", flexShrink: 0,
          gap: 16,
        }}>
          {/* Title */}
          <span style={{ fontSize: 16, fontWeight: 600, color: "#080908", flexShrink: 0 }}>
            Bank reconciliation
          </span>

          {/* Account dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 12px",
                border: "1px solid #E9E9EB",
                borderRadius: 8,
                background: "#FFFFFF",
                cursor: "pointer",
                fontSize: 14, fontWeight: 500, color: "#080908",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#CFCFD1"}
              onMouseLeave={e => { if (!dropdownOpen) e.currentTarget.style.borderColor = "#E9E9EB"; }}
            >
              {selectedAccount}
              <Chevron />
            </button>

            {dropdownOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 4px)", left: 0,
                background: "#FFFFFF", border: "1px solid #E9E9EB",
                borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                zIndex: 100, minWidth: 240, overflow: "hidden",
              }}>
                {accounts.map(acc => (
                  <button
                    key={acc}
                    onClick={() => { setSelectedAccount(acc); setDropdownOpen(false); }}
                    style={{
                      width: "100%", display: "block", textAlign: "left",
                      padding: "10px 14px",
                      fontSize: 14, color: acc === selectedAccount ? "#080908" : "#4F4F4F",
                      fontWeight: acc === selectedAccount ? 500 : 400,
                      background: acc === selectedAccount ? "#F5F5F5" : "transparent",
                      border: "none", cursor: "pointer",
                    }}
                    onMouseEnter={e => { if (acc !== selectedAccount) e.currentTarget.style.background = "#FAFAFA"; }}
                    onMouseLeave={e => { if (acc !== selectedAccount) e.currentTarget.style.background = "transparent"; }}
                  >
                    {acc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side */}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 14, color: "#8C8C8B", flexShrink: 0 }}>
            Left to review: <span style={{ fontWeight: 600, color: "#080908" }}>{itemsLeft} items</span>
          </span>
          <button
            onClick={onClose}
            style={{
              border: "none", background: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 28, height: 28, borderRadius: 6, color: "#8C8C8B",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.color = "#080908"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8C8C8B"; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Main content — scrollable chat area ─────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{
            maxWidth: 680, width: "100%", margin: "0 auto",
            padding: "40px 24px 24px", flex: 1,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
          }}>

            {/* AI opening message */}
            <AiMessage>
              <p>Great, let's reconcile a <strong>bank account.</strong></p>
              <p style={{ marginTop: 4 }}>Tell me what bank account you want to reconcile</p>
            </AiMessage>

            {/* Preparing next step — shown while response is being written (streaming) */}
            {isStreaming && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
                <div style={{
                  fontSize: 14, color: "#8C8C8B", lineHeight: "22px",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ display: "inline-flex", gap: 3 }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: 4, height: 4, borderRadius: "50%",
                        background: "#8C8C8B",
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                        display: "inline-block",
                      }} />
                    ))}
                  </span>
                  Preparing next step...
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Standalone textarea — visible when idle (not streaming) ────── */}
        {!isStreaming && (
          <div style={{ padding: "0 24px 20px", flexShrink: 0 }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div style={{
                borderRadius: 16,
                padding: "14px 14px 12px",
                background: "#FFFFFF",
                boxShadow: "0 12px 24px 0 rgba(0,0,0,0.04), 0 0 0 1px #E9E9EB",
              }}>
                {/* Text area */}
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Ask for changes or information..."
                  rows={3}
                  style={{
                    width: "100%", border: "none", outline: "none", resize: "none",
                    fontSize: 14, color: "#080908", lineHeight: "22px",
                    background: "transparent",
                    fontFamily: "'Inter', sans-serif",
                    display: "block",
                  }}
                />
                {/* Bottom action row */}
                <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                  {/* Attachment */}
                  <button style={{
                    width: 32, height: 32, border: "none", background: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 6, color: "#8C8C8B", padding: 0,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F5F5F5"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M15.5 8.5L8.5 15.5C7.12 16.88 4.88 16.88 3.5 15.5C2.12 14.12 2.12 11.88 3.5 10.5L10.5 3.5C11.33 2.67 12.67 2.67 13.5 3.5C14.33 4.33 14.33 5.67 13.5 6.5L6.5 13.5C6.08 13.92 5.42 13.92 5 13.5C4.58 13.08 4.58 12.42 5 12L11.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div style={{ flex: 1 }} />

                  {/* Microphone */}
                  <button style={{
                    width: 32, height: 32, border: "none", background: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: 6, color: "#8C8C8B", padding: 0,
                  }}
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
                  <button style={{
                    width: 36, height: 36, marginLeft: 6,
                    border: "1px solid #E9E9EB",
                    borderRadius: 10,
                    background: inputValue.trim() ? "#080908" : "#FAFAFA",
                    cursor: inputValue.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                    padding: 0,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M14 2L7 9M14 2L9.5 14L7 9L2 6.5L14 2Z" stroke={inputValue.trim() ? "#FFFFFF" : "#8C8C8B"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
