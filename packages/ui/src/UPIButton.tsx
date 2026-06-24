"use client";

import { formatINR } from "@bharat-ui/validators";
import * as React from "react";

export interface UPIApp {
  name: string;
  packageName: string;
  deepLinkScheme: string;
}

const UPI_APPS: UPIApp[] = [
  {
    name: "GPay",
    packageName: "com.google.android.apps.nbu.paisa.user",
    deepLinkScheme: "gpay",
  },
  {
    name: "PhonePe",
    packageName: "com.phonepe.app",
    deepLinkScheme: "phonepe",
  },
  { name: "Paytm", packageName: "net.one97.paytm", deepLinkScheme: "paytmmp" },
  { name: "BHIM", packageName: "in.org.npci.upiapp", deepLinkScheme: "upi" },
];

export interface UPIButtonProps {
  vpa: string;
  amount: number;
  merchantName: string;
  transactionNote?: string;
  currency?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

function buildUPIUrl(params: {
  vpa: string;
  amount: number;
  merchantName: string;
  transactionNote: string;
  currency: string;
}): string {
  const query = new URLSearchParams({
    pa: params.vpa,
    pn: params.merchantName,
    am: params.amount.toFixed(2),
    cu: params.currency,
    tn: params.transactionNote,
  });
  return `upi://pay?${query.toString()}`;
}

export function UPIButton({
  vpa,
  amount,
  merchantName,
  transactionNote = "Payment",
  currency = "INR",
  onSuccess,
  onError,
}: UPIButtonProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  const upiUrl = buildUPIUrl({
    vpa,
    amount,
    merchantName,
    transactionNote,
    currency,
  });

  const handlePayClick = () => {
    if (isDesktop) {
      setExpanded((e) => !e);
      return;
    }
    window.location.href = upiUrl;
  };

  const handleAppClick = (app: UPIApp) => {
    const appUrl = upiUrl.replace("upi://", `${app.deepLinkScheme}://`);
    try {
      window.location.href = appUrl;
      onSuccess?.();
    } catch {
      onError?.(`Could not open ${app.name}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <button
        onClick={handlePayClick}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px 20px",
          borderRadius: "8px",
          border: "1.5px solid #B45309",
          background: "transparent",
          color: "#B45309",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          width: "100%",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.background =
            "rgba(180,83,9,0.06)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.background = "transparent";
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
        Pay {formatINR(amount)} via UPI
      </button>

      {expanded && isDesktop && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            border: "0.5px solid #e5e7eb",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              fontSize: "11px",
              fontWeight: 500,
              color: "#6b7280",
              background: "#f9fafb",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Choose UPI app
          </div>
          {UPI_APPS.map((app) => (
            <button
              key={app.name}
              onClick={() => handleAppClick(app)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                border: "none",
                borderTop: "0.5px solid #f3f4f6",
                background: "#ffffff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#111827",
                textAlign: "left",
                transition: "background 0.1s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#fef3c7";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#ffffff";
              }}
            >
              <span>{app.name}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {UPI_APPS.map((app) => (
          <span
            key={app.name}
            style={{
              fontSize: "11px",
              padding: "3px 8px",
              borderRadius: "99px",
              border: "0.5px solid #e5e7eb",
              color: "#6b7280",
            }}
          >
            {app.name}
          </span>
        ))}
      </div>
    </div>
  );
}
