import * as React from "react";

interface VolunteerWelcomeProps {
  fullName: string;
  roles: string[];
}

export default function VolunteerWelcome({
  fullName,
  roles,
}: VolunteerWelcomeProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Welcome to Medway Soup Kitchen</title>
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
                  <td>
                    <h1
                      style={{
                        color: "#111827",
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0 0 16px 0",
                      }}
                    >
                      Welcome, {fullName}!
                    </h1>
                    <p
                      style={{
                        color: "#4B5563",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        margin: "0 0 24px 0",
                      }}
                    >
                      Thank you for signing up to volunteer with Medway Soup
                      Kitchen CIC. Your willingness to give your time makes a
                      real difference in our community.
                    </p>
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
                          color: "#111827",
                          fontSize: "14px",
                          fontWeight: "bold",
                          margin: "0 0 12px 0",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Roles Selected
                      </p>
                      <ul
                        style={{
                          margin: 0,
                          padding: "0 0 0 20px",
                          color: "#4B5563",
                        }}
                      >
                        {roles.map((role, index) => (
                          <li
                            key={index}
                            style={{
                              marginBottom: "8px",
                              fontSize: "15px",
                            }}
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2
                      style={{
                        color: "#111827",
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "0 0 12px 0",
                      }}
                    >
                      What happens next?
                    </h2>
                    <p
                      style={{
                        color: "#4B5563",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        margin: "0 0 24px 0",
                      }}
                    >
                      A member of our team will be in touch within 7 days to
                      discuss next steps, availability, and answer any questions
                      you may have.
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
                      If you have any questions in the meantime, please contact
                      us at{" "}
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
                      Warm regards,
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
