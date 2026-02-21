import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";
import VolunteerWelcome from "@/emails/VolunteerWelcome";
import AdminNotification from "@/emails/AdminNotification";

interface VolunteerData {
  fullName: string;
  email: string;
  phone?: string;
  roles: string[];
  availability?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body: VolunteerData = await req.json();

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

    if (!body.roles || body.roles.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one role" },
        { status: 400 }
      );
    }

    // Rate limiting - check for duplicate submissions
    const { data: recentSubmission } = await supabaseAdmin
      .from("volunteers")
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
    const { error: dbError } = await supabaseAdmin.from("volunteers").insert({
      full_name: body.fullName.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || null,
      roles: body.roles,
      availability: body.availability?.trim() || null,
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

    // Send welcome email to volunteer
    const fromEmail = process.env.EMAIL_FROM || "noreply@medwaysoupkitchen.co.uk";

    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: body.email,
        subject: "Welcome to Medway Soup Kitchen! Thank you for signing up",
        react: VolunteerWelcome({
          fullName: body.fullName,
          roles: body.roles,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send volunteer welcome email:", emailError);
    }

    // Send admin notification
    const adminEmail = process.env.ADMIN_EMAIL || "hello@medwaysoupkitchen.co.uk";

    try {
      await resend.emails.send({
        from: `Medway Soup Kitchen <${fromEmail}>`,
        to: adminEmail,
        subject: `New volunteer sign-up: ${body.fullName}`,
        react: AdminNotification({
          type: "volunteer",
          data: {
            fullName: body.fullName,
            email: body.email,
            phone: body.phone || "Not provided",
            roles: body.roles,
            availability: body.availability || "Not specified",
            message: body.message || "No message",
          },
        }),
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Thank you for signing up!" },
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
