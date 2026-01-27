/**
 * contactRoutes.js - Contact Form and Support Routes
 * 
 * This file handles user contact inquiries and support messages:
 * - Users can submit contact forms
 * - Support team can view and reply to messages
 * - Email notifications sent to users
 */

import express from "express";
import Contact from "../models/Contact.js";
import sgMail from "@sendgrid/mail";

/**
 * Initialize SendGrid email service
 */
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

/**
 * Submit a contact form
 * POST /api/contact/
 * Body: { name, email, message }
 * Public endpoint - no authentication required
 */
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Create contact record in database
        const contact = await Contact.create({
            name,
            email,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Message saved",
            data: contact,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * Get all contact messages (admin view)
 * GET /api/contact/
 * Returns: List of all contact submissions
 */
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * Send reply to a contact message
 * POST /api/contact/reply
 * Body: { messageId, reply }
 * Sends email notification to user and saves reply
 */
router.post("/reply", async (req, res) => {
  try {
    const { messageId, reply } = req.body;

    // Validate required fields
    if (!messageId || !reply) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    // Find the contact message
    const contact = await Contact.findById(messageId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Send reply email via SendGrid
    await sgMail.send({
      to: contact.email,
      from: {
        email: process.env.SENDGRID_SENDER,
        name: "Support",
      },
      subject: "Support Reply",
      text: `Hello ${contact.name},

            Thank you for reaching out to our support team.

            We have reviewed your message and would like to provide the following response:

            ${reply}

            If you have any further questions or require additional assistance, please do not hesitate to contact us. We are always happy to help.

            Kind regards,  
            Support Team
`,
    });

    // Save reply in database
    contact.replies.push({ message: reply });
    contact.replied = true;
    await contact.save();

    res.json({
      success: true,
      message: "Reply sent and saved",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });
  }
});

export default router;
