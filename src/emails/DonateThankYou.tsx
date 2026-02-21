import * as React from "react";

interface DonateThankYouProps {
  fullName: string;
  amountTier: string;
  customAmount?: number;
  frequency: string;
}

const tierDescriptions: Record<string, string> = {
  "5": "Helps fund a meal for one person facing hardship",
  "40": "Covers ingredients for a full weekly cook",
  "160": "Supports four weeks of consistent meals",
  custom: "Your generous contribution",
};

export default function DonateThankYou({
  fullName,
  amountTier,
  customAmount,
  frequency,
}: DonateThankYouProps) {
  const amount = amountTier === "custom" ? customAmount : parseInt(amountTier);
  const description = tierDescriptions[amountTier] || tierDescriptions.custom;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Thank You for Your Support</title>
      </head>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9fafb",
          padding: "40px 20px",
          margin: 0,
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <tr>
            <td
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "40px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <table width="100%" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td style={{ textAlign: "center", paddingBottom: "24px" }}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#1F82A1",
                      }}
                    >
                      Medway Soup Kitchen
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", paddingBottom: "32px" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#FFE8BB",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                      }}
                    >
                      <span style={{ fontSize: "40px" }}>🧡</span>
                    </div>
                    <h1
                      style={{
                        color: "#111827",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Thank You, {fullName}!
                    </h1>
                    <p
                      style={{
                        color: "#4B5563",
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      Your support means the world to us.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        backgroundColor: "#1F82A1",
                        borderRadius: "16px",
                        padding: "24px",
                        textAlign: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <div
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "8px",
                        }}
                      >
                        {frequency === "monthly" ? "Monthly Pledge" : "One-off Pledge"}
                      </div>
                      <div
                        style={{
                          color: "#ffffff",
                          fontSize: "48px",
                          fontWeight: "bold",
                        }}
                      >
                        £{amount}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontSize: "14px",
                          marginTop: "8px",
                        }}
                      >
                        {description}
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        backgroundColor: "#FFF5E0",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "24px",
                      }}
                    >
                      <p
                        style={{
                          color: "#B13C02",
                          fontSize: "14px",
                          fontWeight: "bold",
                          margin: "0 0 8px 0",
                        }}
                      >
                        Important Note
                      </p>
                      <p
                        style={{
                          color: "#4B5563",
                          fontSize: "14px",
                          lineHeight: "1.6",
                          margin: 0,
                        }}
                      >
                        This email confirms your pledge of support. A member of
                        our team will contact you within the next few days to
                        arrange payment via bank transfer or our donation
                        platform. This is not a payment receipt.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        color: "#4B5563",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        margin: "0 0 24px 0",
                      }}
                    >
                      Every donation goes directly towards ingredients and meal
                      preparation. We operate with minimal overhead, so your money
                      feeds people in our community who need it most.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr
                      style={{
                        border: "none",
                        borderTop: "1px solid #e5e7eb",
                        margin: "24px 0",
                      }}
                    />
                    <p
                      style={{
                        color: "#9CA3AF",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        margin: 0,
                      }}
                    >
                      Questions? Contact us at{" "}
                      <a
                        href="mailto:hello@medwaysoupkitchen.co.uk"
                        style={{ color: "#1F82A1" }}
                      >
                        hello@medwaysoupkitchen.co.uk
                      </a>
                    </p>
                    <p
                      style={{
                        color: "#4B5563",
                        fontSize: "14px",
                        marginTop: "24px",
                      }}
                    >
                      With gratitude,
                      <br />
                      <strong>The Medway Soup Kitchen Team</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}
