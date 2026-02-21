import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";
import ContactNotification from "@/emails/ContactNotification";
import AdminNotification from "@/emails/AdminNotification";

interface ContactData {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
        subject: body.subject?.trim() || null,
        message: body.message.trim(),
        status: "unread",
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
        react: ContactNotification({
          fullName: body.fullName,
          email: body.email,
          subject: body.subject,
          message: body.message,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send contact notification:", emailError);
    }

    // Also send generic admin notification
    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: adminEmail,
        subject: `[Alert] New contact form submission`,
        react: AdminNotification({
          type: "contact",
          data: {
            fullName: body.fullName,
            email: body.email,
            subject: body.subject || "No subject",
            message: body.message,
          },
        }),
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
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
