import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { resend } from "@/lib/resend";
import NewsletterWelcome from "@/emails/NewsletterWelcome";
import AdminNotification from "@/emails/AdminNotification";

interface NewsletterData {
  email: string;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

    // Rate limiting - check for recent submissions from this email
    const { data: recentSubmission } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id, subscribed")
      .eq("email", email)
      .single();

    // If already subscribed, return success
    if (recentSubmission?.subscribed) {
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    // Upsert subscriber - update if exists, insert if new
    const { error: dbError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email,
          subscribed: true,
          source: "website",
          unsubscribed_at: null,
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
        subject: "You're in! Welcome to Medway Soup Kitchen updates",
        react: NewsletterWelcome({ email }),
      });
    } catch (emailError) {
      console.error("Failed to send newsletter welcome email:", emailError);
    }

    // Send admin notification (only for new subscribers)
    if (!recentSubmission) {
      try {
        await resend.emails.send({
          from: `Medway Soup Kitchen <${fromEmail}>`,
          to: adminEmail,
          subject: `New newsletter subscriber: ${email}`,
          react: AdminNotification({
            type: "newsletter",
            data: {
              email,
              source: "Website footer",
            },
          }),
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
