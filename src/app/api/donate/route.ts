import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";

interface DonateData {
  fullName: string;
  email: string;
  amountTier: "5" | "40" | "160" | "custom";
  customAmount?: number;
  frequency: "one-off" | "monthly";
  message?: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getDonateThankYouHtml(fullName: string, amount: string, frequency: string): string {
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
        <h1 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 24px 0;">Thank you for your support</h1>

        <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px 0;">Hi ${fullName},</p>

        <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">Thank you for pledging <strong>${amount}</strong> (${frequency}) to Medway Soup Kitchen. Your generosity helps us provide meals to those in need across Medway.</p>

        <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 24px 0;">We'll be in touch shortly with payment details. If you have any questions, just reply to this email.</p>

        <p style="font-size: 15px; color: #374151; margin: 0;">With gratitude,<br>The Medway Soup Kitchen Team</p>

        <p style="font-size: 12px; color: #9ca3af; margin: 32px 0 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb;">Medway Soup Kitchen CIC<br>4 High Street, Chatham, ME4 4EP</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getAdminDonateHtml(data: DonateData, displayAmount: string): string {
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
        <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">New Donation Pledge</p>
        <h1 style="font-size: 20px; font-weight: 600; color: #111827; margin: 0 0 24px 0;">${displayAmount} from ${data.fullName}</h1>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 13px; color: #6b7280;">Name</span><br>
              <span style="font-size: 15px; color: #111827;">${data.fullName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 13px; color: #6b7280;">Email</span><br>
              <a href="mailto:${data.email}" style="font-size: 15px; color: #1F82A1; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 13px; color: #6b7280;">Amount</span><br>
              <span style="font-size: 15px; color: #111827; font-weight: 600;">${displayAmount}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 13px; color: #6b7280;">Frequency</span><br>
              <span style="font-size: 15px; color: #111827;">${data.frequency === "monthly" ? "Monthly" : "One-off"}</span>
            </td>
          </tr>
          ${data.message ? `<tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
              <span style="font-size: 13px; color: #6b7280;">Message</span><br>
              <span style="font-size: 15px; color: #111827; white-space: pre-wrap;">${data.message}</span>
            </td>
          </tr>` : ''}
        </table>

        <a href="mailto:${data.email}?subject=Your Donation Pledge - Medway Soup Kitchen" style="display: inline-block; background-color: #1F82A1; color: #ffffff; font-size: 14px; font-weight: 500; text-decoration: none; padding: 10px 20px; border-radius: 6px;">Reply</a>

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
    const body: DonateData = await req.json();

    // Validate required fields
    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const validTiers = ["5", "40", "160", "custom"];
    if (!body.amountTier || !validTiers.includes(body.amountTier)) {
      return NextResponse.json(
        { error: "Please select a donation amount" },
        { status: 400 }
      );
    }

    if (body.amountTier === "custom" && (!body.customAmount || body.customAmount <= 0)) {
      return NextResponse.json(
        { error: "Please enter a valid custom amount" },
        { status: 400 }
      );
    }

    // Rate limiting - check for duplicate submissions
    const { data: recentSubmission } = await supabaseAdmin
      .from("donation_pledges")
      .select("id")
      .eq("email", body.email.toLowerCase())
      .gte("created_at", new Date(Date.now() - 60000).toISOString())
      .single();

    if (recentSubmission) {
      return NextResponse.json(
        { error: "Please wait before submitting again" },
        { status: 429 }
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from("donation_pledges")
      .insert({
        full_name: body.fullName.trim(),
        email: body.email.toLowerCase().trim(),
        amount_tier: body.amountTier,
        custom_amount: body.amountTier === "custom" ? body.customAmount : null,
        frequency: body.frequency || "one-off",
        message: body.message?.trim() || null,
        status: "new",
      });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    const fromEmail = process.env.EMAIL_FROM || "noreply@medwaysoupkitchen.co.uk";
    const adminEmail = process.env.ADMIN_EMAIL || "hello@medwaysoupkitchen.co.uk";

    const displayAmount =
      body.amountTier === "custom"
        ? `£${body.customAmount}`
        : `£${body.amountTier}`;

    const frequencyText = body.frequency === "monthly" ? "monthly" : "one-off";

    // Send thank you email to donor
    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: body.email,
        subject: "Thank you for your support | Medway Soup Kitchen",
        html: getDonateThankYouHtml(body.fullName, displayAmount, frequencyText),
      });
    } catch (emailError) {
      console.error("Failed to send donation thank you email:", emailError);
    }

    // Send admin notification
    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: adminEmail,
        subject: `New donation pledge: ${displayAmount} from ${body.fullName}`,
        html: getAdminDonateHtml(body, displayAmount),
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Thank you for your pledge!" },
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
