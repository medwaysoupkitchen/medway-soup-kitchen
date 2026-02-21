import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";

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

function getVolunteerWelcomeHtml(fullName: string, roles: string[]): string {
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
          <img src="https://medwaysoupkitchen.co.uk/Full_logo_6.png" alt="Medway Soup Kitchen" style="height: 60px; width: auto;">
        </div>
        <div style="background-color: #1F82A1; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Welcome to Medway Soup Kitchen!</h1>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #374151;">Dear ${fullName},</p>
          <p style="font-size: 16px; color: #374151;">Thank you so much for signing up to volunteer with us! Your willingness to help makes a real difference in our community.</p>
          <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #FF8302; margin: 16px 0;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #374151;">You've signed up for:</p>
            <ul style="margin: 0; padding-left: 20px; color: #4B5563;">
              ${roles.map(role => `<li>${role}</li>`).join('')}
            </ul>
          </div>
          <p style="font-size: 16px; color: #374151;">A member of our team will be in touch soon to discuss next steps and how you can get involved.</p>
          <p style="font-size: 16px; color: #374151;">In the meantime, if you have any questions, feel free to reply to this email.</p>
          <p style="font-size: 16px; color: #374151; margin-top: 24px;">With gratitude,<br><strong>The Medway Soup Kitchen Team</strong></p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 24px;">Medway Soup Kitchen CIC | 4 High Street, Chatham, ME4 4EP</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getAdminVolunteerHtml(data: VolunteerData): string {
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
          <img src="https://medwaysoupkitchen.co.uk/Full_logo_6.png" alt="Medway Soup Kitchen" style="height: 60px; width: auto;">
        </div>
        <div style="background-color: #FF8302; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New Volunteer Sign-up</h1>
        </div>
        <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${data.fullName}</p>
          <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #1F82A1;">${data.email}</a></p>
          <p style="margin: 0 0 12px 0;"><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p style="margin: 0 0 12px 0;"><strong>Roles:</strong> ${data.roles.join(', ')}</p>
          <p style="margin: 0 0 12px 0;"><strong>Availability:</strong> ${data.availability || 'Not specified'}</p>
          ${data.message ? `<div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #1F82A1; margin-top: 16px;">
            <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; color: #374151;">${data.message}</p>
          </div>` : ''}
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${data.email}?subject=Welcome to Medway Soup Kitchen - Volunteer Enquiry" style="display: inline-block; background-color: #1F82A1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact ${data.fullName}</a>
          </div>
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
        html: getVolunteerWelcomeHtml(body.fullName, body.roles),
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
        html: getAdminVolunteerHtml(body),
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
