import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";
import DonateThankYou from "@/emails/DonateThankYou";
import AdminNotification from "@/emails/AdminNotification";

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

    // Send thank you email to donor
    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: body.email,
        subject: "Thank you for your support | Medway Soup Kitchen",
        react: DonateThankYou({
          fullName: body.fullName,
          amountTier: body.amountTier,
          customAmount: body.customAmount,
          frequency: body.frequency,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send donation thank you email:", emailError);
    }

    // Send admin notification
    const displayAmount =
      body.amountTier === "custom"
        ? `£${body.customAmount} (custom)`
        : `£${body.amountTier}`;

    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: adminEmail,
        subject: `New donation pledge: ${displayAmount} from ${body.fullName}`,
        react: AdminNotification({
          type: "donation",
          data: {
            fullName: body.fullName,
            email: body.email,
            amount: displayAmount,
            frequency: body.frequency === "monthly" ? "Monthly" : "One-off",
            message: body.message || "No message",
          },
        }),
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
