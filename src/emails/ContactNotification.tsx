import * as React from "react";

interface ContactNotificationProps {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
}

export default function ContactNotification({
  fullName,
  email,
  subject,
  message,
}: ContactNotificationProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>New Website Enquiry</title>
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
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#FF8302",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "8px",
                      }}
                    >
                      Admin Notification
                    </div>
                    <h1
                      style={{
                        color: "#111827",
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      New Website Enquiry
                    </h1>
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
                      <table width="100%" cellPadding={0} cellSpacing={0}>
                        <tr>
                          <td style={{ paddingBottom: "12px" }}>
                            <strong style={{ color: "#6b7280", fontSize: "12px" }}>
                              FROM
                            </strong>
                            <div style={{ color: "#111827", fontSize: "16px" }}>
                              {fullName}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: "12px" }}>
                            <strong style={{ color: "#6b7280", fontSize: "12px" }}>
                              EMAIL
                            </strong>
                            <div style={{ color: "#1F82A1", fontSize: "16px" }}>
                              <a
                                href={`mailto:${email}`}
                                style={{ color: "#1F82A1", textDecoration: "none" }}
                              >
                                {email}
                              </a>
                            </div>
                          </td>
                        </tr>
                        {subject && (
                          <tr>
                            <td style={{ paddingBottom: "12px" }}>
                              <strong style={{ color: "#6b7280", fontSize: "12px" }}>
                                SUBJECT
                              </strong>
                              <div style={{ color: "#111827", fontSize: "16px" }}>
                                {subject}
                              </div>
                            </td>
                          </tr>
                        )}
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2
                      style={{
                        color: "#111827",
                        fontSize: "14px",
                        fontWeight: "bold",
                        margin: "0 0 12px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Message
                    </h2>
                    <div
                      style={{
                        backgroundColor: "#FFF5E0",
                        borderLeft: "4px solid #FF8302",
                        borderRadius: "0 12px 12px 0",
                        padding: "20px",
                        marginBottom: "24px",
                      }}
                    >
                      <p
                        style={{
                          color: "#4B5563",
                          fontSize: "16px",
                          lineHeight: "1.6",
                          margin: 0,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {message}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <a
                      href={`mailto:${email}?subject=Re: ${subject || "Your enquiry to Medway Soup Kitchen"}`}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#1F82A1",
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        padding: "14px 32px",
                        borderRadius: "999px",
                      }}
                    >
                      Reply to {fullName}
                    </a>
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
