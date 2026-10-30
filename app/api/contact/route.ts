import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();

    const website = String(body.website || '').trim();

    if (website) {
      // Silently ignore submissions caught by the honeypot.
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: 'One or more fields are too long' },
        { status: 400 }
      );
    }

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.TO_EMAIL;

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.error('Missing email configuration. Required env vars: RESEND_API_KEY, FROM_EMAIL, TO_EMAIL');
      return NextResponse.json(
        { error: 'Email service not configured. Please check server configuration.' },
        { status: 503 }
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #0f172a; margin-bottom: 16px;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0;"><strong style="color: #64748b;">Name:</strong> ${safeName}</p>
            <p style="margin: 0 0 8px 0;"><strong style="color: #64748b;">Email:</strong> ${safeEmail}</p>
            <p style="margin: 0 0 8px 0;"><strong style="color: #64748b;">Subject:</strong> ${safeSubject}</p>
          </div>
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
      text: `Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
