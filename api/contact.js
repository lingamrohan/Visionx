import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { schoolName, name, contactNumber, email, message } = req.body

  // Validation
  if (!schoolName || !name || !contactNumber || !email) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // Check environment variables
  const emailUser = process.env.EMAIL_USER?.trim()
  const emailPassword = process.env.EMAIL_PASSWORD?.replace(/\s+/g, '') // remove spaces from app password if present

  if (!emailUser || !emailPassword) {
    return res.status(500).json({
      message: 'Server Configuration Error',
      error: 'EMAIL_USER or EMAIL_PASSWORD is not configured in Vercel Environment Variables.'
    })
  }

  try {
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    })

    // Email to VisionX
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'visionx236@gmail.com',
      subject: `New School Enquiry from ${name} - ${schoolName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">New School Enquiry Received</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #333;">School Name:</strong> ${schoolName}</p>
            <p><strong style="color: #333;">Contact Person:</strong> ${name}</p>
            <p><strong style="color: #333;">Contact Number:</strong> ${contactNumber}</p>
            <p><strong style="color: #333;">Email:</strong> ${email}</p>
            ${message ? `<p><strong style="color: #333;">Message:</strong></p><p style="background-color: white; padding: 15px; border-left: 4px solid #667eea;">${message.replace(/\n/g, '<br>')}</p>` : ''}
          </div>

          <div style="background-color: #e8f0ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #667eea; font-size: 12px;">
              <strong>Received at:</strong> ${new Date().toLocaleString()}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            This is an automated email from the VisionX Enquiry Form
          </p>
        </div>
      `
    }

    // Confirmation email to the enquirer
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'VisionX - Enquiry Received ✓',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #667eea; margin: 0; font-size: 28px;">VisionX</h2>
          </div>

          <h3 style="color: #333; text-align: center;">Thank you for your enquiry!</h3>
          
          <div style="background-color: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; color: #155724;">
            <p style="margin: 0; font-weight: 600;">✓ We've received your enquiry</p>
          </div>

          <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
            Hi ${name},
          </p>

          <p style="color: #555; line-height: 1.6;">
            Thank you for your interest in bringing VisionX training to <strong>${schoolName}</strong>. We've received your enquiry and our team will review your details and get in touch with you soon at <strong>${contactNumber}</strong> or <strong>${email}</strong>.
          </p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #666;"><strong>Your Details:</strong></p>
            <p style="margin: 8px 0; color: #555;">School: ${schoolName}</p>
            <p style="margin: 8px 0; color: #555;">Contact: ${contactNumber}</p>
            <p style="margin: 8px 0; color: #555;">Email: ${email}</p>
          </div>

          <p style="color: #555; line-height: 1.6;">
            If you have any urgent questions, feel free to reach out to us directly.
          </p>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Best regards,<br>
              <strong>The VisionX Team</strong>
            </p>
          </div>
        </div>
      `
    }

    // Send both emails
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(confirmationMailOptions)

    return res.status(200).json({ 
      message: 'Enquiry submitted successfully',
      success: true
    })

  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ 
      message: 'Failed to send enquiry',
      error: error.message 
    })
  }
}
