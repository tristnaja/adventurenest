"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create a transporter using Gmail SMTP
// You'll need to set up app-specific password in Gmail settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Email to the admin (your email)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "tristan.basori@gmail.com",
      replyTo: data.email,
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
      `,
    });

    // Confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: "We received your message - AdventureNest Support",
      html: `
        <h2>Thank you for contacting AdventureNest!</h2>
        <p>Hi ${escapeHtml(data.name)},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <hr />
        <p><strong>Your message details:</strong></p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
        <hr />
        <p>Best regards,<br />AdventureNest Team</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    };
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
