import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, mobile, source, destination, totalAmount, paymentType } = await req.json();

  const emailContent = `
    <h3>Booking Details</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Mobile Number:</strong> ${mobile}</p>
    <p><strong>Email Address:</strong> ${email}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}</p>
    <p><strong>Payment Type:</strong> ${paymentType}</p>
  `;

  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.verify();
  } catch (error) {
    console.error("Error verifying SMTP transport:", error);
    return new Response(JSON.stringify({ message: "Failed to verify SMTP transport." }), {
      status: 500,
    });
  }

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: 'Booking Confirmation',
      html: emailContent,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Failed to send email." }), {
      status: 500,
    });
  }
}
