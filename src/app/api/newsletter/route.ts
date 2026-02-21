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
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <div style="text-align: center; padding: 24px 0;">
          <img src="https://medwaysoupkitchen.co.uk/Full_logo_1.png" alt="Medway Soup Kitchen" style="height: 60px; width: auto;">
        </div>
        <div style="background-color: #1F82A1; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Welcome to Our Newsletter!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #374151;">Thank you for subscribing to the Medway Soup Kitchen newsletter!</p>
          <p style="font-size: 16px; color: #374151;">You'll now receive updates about:</p>
          <ul style="font-size: 16px; color: #4B5563;">
            <li>Our upcoming events and meal distributions</li>
            <li>Volunteer opportunities</li>
            <li>Stories from our community</li>
            <li>Ways you can help make a difference</li>
          </ul>
          <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #FF8302; margin: 16px 0;">
            <p style="margin: 0; font-size: 14px; color: #4B5563;">Your email: <strong>${email}</strong></p>
          </div>
          <p style="font-size: 16px; color: #374151; margin-top: 24px;">Thank you for your support,<br><strong>The Medway Soup Kitchen Team</strong></p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 24px;">Medway Soup Kitchen CIC | 4 High Street, Chatham, ME4 4EP</p>
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
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <div style="text-align: center; padding: 24px 0;">
          <img src="https://medwaysoupkitchen.co.uk/Full_logo_1.png" alt="Medway Soup Kitchen" style="height: 60px; width: auto;">
        </div>
        <div style="background-color: #1F82A1; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Newsletter Subscriber</h1>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1F82A1;">${email}</a></p>
          <p style="margin: 0 0 12px 0;"><strong>Source:</strong> Website footer</p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 24px;">Medway Soup Kitchen CIC | 4 High Street, Chatham, ME4 4EP</p>
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
