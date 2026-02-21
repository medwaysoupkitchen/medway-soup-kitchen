import * as React from "react";

interface NewsletterWelcomeProps {
  email: string;
}

export default function NewsletterWelcome({ email }: NewsletterWelcomeProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Medway Soup Kitchen Updates</title>
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
                        width: "64px",
                        height: "64px",
                        backgroundColor: "#1F82A1",
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 16px",
                      }}
                    >
                      <span style={{ fontSize: "28px" }}>✓</span>
                    </div>
                    <h1
                      style={{
                        color: "#111827",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0 0 8px 0",
                      }}
                    >
                      You&apos;re In!
                    </h1>
                    <p
                      style={{
                        color: "#4B5563",
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      Welcome to Medway Soup Kitchen updates.
                    </p>
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
                      Thank you for subscribing! You&apos;ll now receive updates
                      straight to your inbox at{" "}
                      <strong style={{ color: "#111827" }}>{email}</strong>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{
                        backgroundColor: "#FFF5E0",
                        borderRadius: "12px",
                        padding: "24px",
                        marginBottom: "24px",
                      }}
                    >
                      <h2
                        style={{
                          color: "#111827",
                          fontSize: "16px",
                          fontWeight: "bold",
                          margin: "0 0 16px 0",
                        }}
                      >
                        What to expect:
                      </h2>
                      <ul
                        style={{
                          margin: 0,
                          padding: "0 0 0 20px",
                          color: "#4B5563",
                        }}
                      >
                        <li style={{ marginBottom: "8px", fontSize: "15px" }}>
                          Regular impact reports to see the difference your
                          community is making
                        </li>
                        <li style={{ marginBottom: "8px", fontSize: "15px" }}>
                          Volunteer stories and behind-the-scenes updates
                        </li>
                        <li style={{ marginBottom: "8px", fontSize: "15px" }}>
                          Event announcements and ways to get involved
                        </li>
                        <li style={{ fontSize: "15px" }}>
                          News about our growth and expansion plans
                        </li>
                      </ul>
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
                      We respect your inbox. You&apos;ll only hear from us when
                      we have something meaningful to share.
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
                        fontSize: "12px",
                        lineHeight: "1.5",
                        margin: 0,
                        textAlign: "center",
                      }}
                    >
                      You can unsubscribe at any time by clicking the link in
                      any of our emails or by contacting us at{" "}
                      <a
                        href="mailto:hello@medwaysoupkitchen.co.uk"
                        style={{ color: "#1F82A1" }}
                      >
                        hello@medwaysoupkitchen.co.uk
                      </a>
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
