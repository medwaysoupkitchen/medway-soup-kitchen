import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";

interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getContactEmailHtml(fullName: string, email: string, message: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1F82A1; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 16px 0;"><strong>From:</strong> ${fullName}</p>
        <p style="margin: 0 0 16px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1F82A1;">${email}</a></p>
        <div style="background-color: white; padding: 16px; border-left: 4px solid #FF8302; margin-top: 16px;">
          <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${email}?subject=Re: Your enquiry to Medway Soup Kitchen" style="display: inline-block; background-color: #1F82A1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reply to ${fullName}</a>
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactData = await req.json();

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

    if (!body.message || !body.message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Rate limiting - check for duplicate submissions
    const { data: recentSubmission } = await supabaseAdmin
      .from("contact_submissions")
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
      .from("contact_submissions")
      .insert({
        full_name: body.fullName.trim(),
        email: body.email.toLowerCase().trim(),
        message: body.message.trim(),
        status: "new",
      });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // Send admin notification
    const fromEmail = process.env.EMAIL_FROM || "noreply@medwaysoupkitchen.co.uk";
    const adminEmail = process.env.ADMIN_EMAIL || "hello@medwaysoupkitchen.co.uk";

    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: adminEmail,
        subject: `New website enquiry from ${body.fullName}`,
        html: getContactEmailHtml(body.fullName, body.email, body.message),
      });
    } catch (emailError) {
      console.error("Failed to send contact notification:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Message received. We'll be in touch soon." },
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
