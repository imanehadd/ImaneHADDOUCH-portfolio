// Helper to build SendGrid message payload
function buildSendgridMessage({ to, subject, message, replyTo }) {
    const from = process.env.FROM_EMAIL || 'no-reply@example.com';

    // Basic sanitization for HTML
    const html = (message || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    const msg = {
        to,
        from,
        subject: subject || 'New contact message',
        text: message,
        html,
    };

    if (replyTo) msg.replyTo = replyTo;

    return msg;
}

module.exports = { buildSendgridMessage };
