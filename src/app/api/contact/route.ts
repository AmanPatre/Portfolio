import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123_dummy");

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form submission (no Resend key):", { name, email, message });
      return NextResponse.json({ ok: true, note: "Logged (no Resend key)" });
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "amanpatre25@gmail.com",
      subject: `[Portfolio] Message from ${name}`,
      html: `
        <div style="font-family: monospace; background: #04080f; color: #e8f2f8; padding: 2rem; border-radius: 8px;">
          <h2 style="color: #00d2ff;">[portfolio contact]</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <hr style="border-color: rgba(255,255,255,0.1);" />
          <p style="line-height: 1.8; white-space: pre-wrap;">${message}</p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
