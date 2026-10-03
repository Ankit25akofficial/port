export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, role, projectType, message, budget } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Name, email, and message are required.'
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Invalid email address.'
      });
    }

    const submission = {
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().toLowerCase().slice(0, 120),
      role: role || 'Video Portfolio Visitor',
      projectType: projectType || 'Video Editing / Motion Graphics',
      budget: budget || 'Flexible',
      message: String(message).trim().slice(0, 2000),
      receivedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    };

    console.log('[API/Contact] Processing inquiry for:', submission.email);

    // Resend Email Integration (Strictly from Environment Variables)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL;

    let emailSent = false;
    let resendDetails = null;

    if (resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Ankit Portfolio <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: submission.email,
            subject: `🚀 New Lead: ${submission.name} - ${submission.projectType}`,
            html: `
              <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d0d15; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #332255;">
                <div style="border-bottom: 1px solid #221c38; padding-bottom: 16px; margin-bottom: 24px;">
                  <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #a855f7; font-weight: bold;">New Client Inquiry</span>
                  <h1 style="color: #ffffff; font-size: 24px; margin: 6px 0 0 0;">${submission.name}</h1>
                </div>

                <div style="background-color: #141422; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(168,85,247,0.2);">
                  <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>📧 Email:</strong> <a href="mailto:${submission.email}" style="color: #c084fc; text-decoration: none;">${submission.email}</a></p>
                  <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>💼 Category / Role:</strong> <span style="color: #e2e8f0;">${submission.role}</span></p>
                  <p style="margin: 0; font-size: 14px;"><strong>🕒 Submitted At:</strong> <span style="color: #94a3b8;">${submission.receivedAt} (IST)</span></p>
                </div>

                <div style="background-color: #181528; border-radius: 12px; padding: 20px; border-left: 4px solid #a855f7; margin-bottom: 24px;">
                  <strong style="color: #c084fc; font-size: 14px; display: block; margin-bottom: 8px;">💬 Project Details / Message:</strong>
                  <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #f1f5f9; font-size: 14px;">${submission.message}</p>
                </div>

                <div style="text-align: center; border-top: 1px solid #221c38; pt: 16px; margin-top: 24px;">
                  <p style="font-size: 12px; color: #64748b; margin: 0;">Hit "Reply" in your email client to directly respond to ${submission.email}.</p>
                </div>
              </div>
            `
          })
        });

        const resendJson = await resendRes.json();
        if (resendRes.ok) {
          emailSent = true;
          resendDetails = resendJson;
          console.log('[API/Contact] Resend Email Dispatched Successfully:', resendJson);
        } else {
          console.warn('[API/Contact] Resend API Returned Error:', resendJson);
        }
      } catch (emailErr) {
        console.error('[API/Contact] Error calling Resend API:', emailErr);
      }
    }

    return res.status(200).json({
      success: true,
      emailSent,
      message: 'Thank you! Your message has been received. I will reply within 24 hours.',
      data: {
        name: submission.name,
        timestamp: submission.receivedAt
      }
    });
  } catch (error) {
    console.error('[API/Contact] Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal error sending message.'
    });
  }
}
