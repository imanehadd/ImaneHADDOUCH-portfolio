const { google } = require('googleapis');

async function sendViaGmail({ clientId, clientSecret, refreshToken, to, subject, bodyHtml, bodyText, from }) {
  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  const raw = makeRawMessage({ from, to, subject, bodyText, bodyHtml });
  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw }
  });
  return res.data;
}

function makeRawMessage({ from, to, subject, bodyText, bodyHtml }) {
  const boundary = "__BOUNDARY__";
  const nl = "\r\n";
  let mime = "";
  mime += `From: ${from}${nl}`;
  mime += `To: ${to}${nl}`;
  mime += `Subject: ${subject}${nl}`;
  mime += `MIME-Version: 1.0${nl}`;
  mime += `Content-Type: multipart/alternative; boundary=\"${boundary}\"${nl}${nl}`;
  mime += `--${boundary}${nl}`;
  mime += `Content-Type: text/plain; charset=\"UTF-8\"${nl}${nl}`;
  mime += `${bodyText}${nl}${nl}`;
  mime += `--${boundary}${nl}`;
  mime += `Content-Type: text/html; charset=\"UTF-8\"${nl}${nl}`;
  mime += `${bodyHtml}${nl}${nl}`;
  mime += `--${boundary}--`;
  // base64url encode
  const encoded = Buffer.from(mime, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return encoded;
}

module.exports = { sendViaGmail };