import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";

interface NewsletterData {
  email: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getNewsletterWelcomeHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <h1 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 24px 0;">You're subscribed</h1>

        <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">Thank you for subscribing to updates from Medway Soup Kitchen. You'll receive occasional emails about our work, upcoming events, and ways to get involved.</p>

        <p style="font-size: 13px; color: #6b7280; margin: 0 0 4px 0;">Subscribed email</p>
        <p style="font-size: 15px; color: #111827; margin: 0 0 24px 0;">${email}</p>

        <p style="font-size: 15px; color: #374151; margin: 0;">Best,<br>The Medway Soup Kitchen Team</p>

        <p style="font-size: 12px; color: #9ca3af; margin: 32px 0 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb;">Medway Soup Kitchen CIC<br>4 High Street, Chatham, ME4 4EP</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getAdminNewsletterHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">New Subscriber</p>
        <h1 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 24px 0;">${email}</h1>

        <p style="font-size: 13px; color: #6b7280; margin: 0 0 4px 0;">Source</p>
        <p style="font-size: 15px; color: #111827; margin: 0;">Website footer</p>

        <p style="font-size: 12px; color: #9ca3af; margin: 32px 0 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb;">Medway Soup Kitchen CIC</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: NewsletterData = await req.json();

    // Validate email
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase().trim();

    // Check if already subscribed
    const { data: existingSubscriber } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    // If already subscribed and active, return success
    if (existingSubscriber?.status === "active") {
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    // Insert new subscriber or update existing
    const { error: dbError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          status: "active",
        },
        {
          onConflict: "email",
        }
      );

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save subscription" },
        { status: 500 }
      );
    }

    const fromEmail = process.env.EMAIL_FROM || "noreply@medwaysoupkitchen.co.uk";
    const adminEmail = process.env.ADMIN_EMAIL || "hello@medwaysoupkitchen.co.uk";

    // Send welcome email to subscriber
    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: email,
        subject: "Welcome to Medway Soup Kitchen updates!",
        html: getNewsletterWelcomeHtml(email),
      });
    } catch (emailError) {
      console.error("Failed to send newsletter welcome email:", emailError);
    }

    // Send admin notification (only for new subscribers)
    if (!existingSubscriber) {
      try {
        await resend.emails.send({
          from: `Medway Soup Kitchen <${fromEmail}>`,
          to: adminEmail,
          subject: `New newsletter subscriber: ${email}`,
          html: getAdminNewsletterHtml(email),
        });
      } catch (emailError) {
        console.error("Failed to send admin notification:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, message: "You're subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
