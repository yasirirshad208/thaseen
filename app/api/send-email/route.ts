import nodemailer from "nodemailer";

export async function POST(req: Request) {
 

  const { name, email, message, phone, subject} = await req.json();

  // Create transport
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or use host, port, etc. for other services
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIEVING_EMAIL, 
      subject: "New Contact Message",
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2 style="color: #2563eb; border-bottom: 1px solid #ddd; padding-bottom: 10px;">📩 Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td>
          <td style="padding: 8px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Email:</td>
          <td style="padding: 8px;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Phone:</td>
          <td style="padding: 8px;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Subject:</td>
          <td style="padding: 8px;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Message:</td>
          <td style="padding: 8px; white-space: pre-line;">${message}</td>
        </tr>
      </table>
      
    </div>
  </div>
`

    });

    return Response.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (err) {
    return Response.json({ message: "Failed to send email", error: err }, { status: 500 });
  }
}
