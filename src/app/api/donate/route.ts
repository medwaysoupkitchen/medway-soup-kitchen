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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #FF8302; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Your Support!</h1>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #374151;">Dear ${fullName},</p>
        <p style="font-size: 16px; color: #374151;">Thank you so much for your generous pledge of <strong>${amount}</strong> (${frequency}). Your support means the world to us and will help us continue serving meals to those in need across Medway.</p>
        <div style="background-color: white; padding: 16px; border-left: 4px solid #1F82A1; margin: 16px 0;">
          <p style="margin: 0; font-size: 14px; color: #4B5563;">A member of our team will be in touch shortly with payment details. If you have any questions in the meantime, please don't hesitate to reply to this email.</p>
        </div>
        <p style="font-size: 16px; color: #374151;">Every contribution helps us provide freshly prepared meals and support to our community.</p>
        <p style="font-size: 16px; color: #374151; margin-top: 24px;">With heartfelt thanks,<br><strong>The Medway Soup Kitchen Team</strong></p>
      </div>
    </div>
  `;
}

function getAdminDonateHtml(data: DonateData, displayAmount: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #FF8302; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Donation Pledge!</h1>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${data.fullName}</p>
        <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1F82A1;">${data.email}</a></p>
        <p style="margin: 0 0 12px 0;"><strong>Amount:</strong> ${displayAmount}</p>
        <p style="margin: 0 0 12px 0;"><strong>Frequency:</strong> ${data.frequency === "monthly" ? "Monthly" : "One-off"}</p>
        ${data.message ? `<div style="background-color: white; padding: 16px; border-left: 4px solid #1F82A1; margin-top: 16px;">
          <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>` : ''}
        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${data.email}?subject=Thank you for your donation pledge - Medway Soup Kitchen" style="display: inline-block; background-color: #1F82A1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Contact ${data.fullName}</a>
        </div>
      </div>
    </div>
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
