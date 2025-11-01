
const { sendViaGmail } = require('../server/gmailSendHelper');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    const { firstName, lastName, email, company, subject, language, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
    const from = process.env.GMAIL_FROM || email;
    const to = process.env.GMAIL_TO || 'imanehaddouch06@gmail.com';

    if (!clientId || !clientSecret || !refreshToken || !to) {
      res.status(500).json({ error: 'Gmail API not configured' });
      return;
    }

    const subjectLine = `Portfolio Contact: ${subject} - ${firstName} ${lastName}`;
    const bodyText = `Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\nPreferred Language: ${language}\n\nMessage:\n${message}\n\nTime: ${new Date().toLocaleString()}`;
    const bodyHtml = `<p><strong>Name:</strong> ${firstName} ${lastName}<br><strong>Email:</strong> ${email}<br><strong>Company:</strong> ${company || 'Not provided'}<br><strong>Preferred Language:</strong> ${language}<br><br><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}<br><br><em>Time: ${new Date().toLocaleString()}</em></p>`;

    await sendViaGmail({
      clientId,
      clientSecret,
      refreshToken,
      to,
      subject: subjectLine,
      bodyHtml,
      bodyText,
      from
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
