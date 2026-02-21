import * as React from "react";

interface AdminNotificationProps {
  type: "volunteer" | "donation" | "newsletter" | "contact";
  data: Record<string, unknown>;
}

const typeLabels: Record<string, { label: string; color: string }> = {
  volunteer: { label: "New Volunteer Sign-up", color: "#1F82A1" },
  donation: { label: "New Donation Pledge", color: "#FF8302" },
  newsletter: { label: "New Newsletter Subscriber", color: "#15627A" },
  contact: { label: "New Contact Enquiry", color: "#B13C02" },
};

export default function AdminNotification({
  type,
  data,
}: AdminNotificationProps) {
  const { label, color } = typeLabels[type] || typeLabels.contact;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{label}</title>
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
                  <td style={{ paddingBottom: "24px" }}>
                    <div
                      style={{
                        display: "inline-block",
                        backgroundColor: color,
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        marginBottom: "12px",
                      }}
                    >
                      Admin Alert
                    </div>
                    <h1
                      style={{
                        color: "#111827",
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {label}
                    </h1>
                    <p
                      style={{
                        color: "#9CA3AF",
                        fontSize: "14px",
                        margin: "8px 0 0 0",
                      }}
                    >
                      {new Date().toLocaleString("en-GB", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        backgroundColor: "#f9fafb",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "24px",
                      }}
                    >
                      <h2
                        style={{
                          color: "#111827",
                          fontSize: "14px",
                          fontWeight: "bold",
                          margin: "0 0 16px 0",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Submission Details
                      </h2>
                      <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ fontSize: "14px" }}
                      >
                        {Object.entries(data).map(([key, value], index) => (
                          <tr key={index}>
                            <td
                              style={{
                                color: "#6b7280",
                                fontWeight: "500",
                                padding: "8px 0",
                                width: "140px",
                                verticalAlign: "top",
                                textTransform: "capitalize",
                              }}
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </td>
                            <td
                              style={{
                                color: "#111827",
                                padding: "8px 0",
                                verticalAlign: "top",
                              }}
                            >
                              {Array.isArray(value)
                                ? value.join(", ")
                                : String(value)}
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </td>
                </tr>
                {(data.email as string) && (
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <a
                        href={`mailto:${data.email}`}
                        style={{
                          display: "inline-block",
                          backgroundColor: color,
                          color: "#ffffff",
                          fontSize: "16px",
                          fontWeight: "bold",
                          textDecoration: "none",
                          padding: "14px 32px",
                          borderRadius: "999px",
                        }}
                      >
                        Reply to{" "}
                        {(data.fullName as string) || (data.email as string)}
                      </a>
                    </td>
                  </tr>
                )}
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
                        fontSize: "12px",
                        lineHeight: "1.5",
                        margin: 0,
                        textAlign: "center",
                      }}
                    >
                      This is an automated notification from the Medway Soup
                      Kitchen website.
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
