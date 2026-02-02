import sgMail from "@sendgrid/mail";
import Newsletter from "../models/NewsLetter.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const Subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const exists = await Newsletter.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    await Newsletter.create({ email: normalizedEmail });

    await sgMail.send({
      to: normalizedEmail,
      from: process.env.SENDGRID_SENDER,
      subject: "Welcome to Our Newsletter ✈️",
      html: `
        <h2>You're subscribed!</h2>
        <p>Thanks for joining our travel newsletter.</p>
      `,
    });

    return res.status(201).json({ message: "Subscribed successfully" });

  } catch (err) {
    console.error("SENDGRID ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
