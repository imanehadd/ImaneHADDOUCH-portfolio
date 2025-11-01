// Script pour générer le refresh token OAuth2 Gmail
// Usage: node server/gmailGetRefreshToken.js
const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || '';
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Configurez GMAIL_CLIENT_ID et GMAIL_CLIENT_SECRET dans vos variables d\'environnement.');
  process.exit(1);
}

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Ouvrez ce lien dans votre navigateur et autorisez l\'application:');
console.log(authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Collez le code d\'autorisation ici: ', async (code) => {
  rl.close();
  try {
    const { tokens } = await oAuth2Client.getToken(code.trim());
    console.log('Refresh token généré, à copier dans vos variables d\'environnement:');
    console.log('GMAIL_REFRESH_TOKEN =', tokens.refresh_token);
  } catch (err) {
    console.error('Erreur lors de l\'obtention du token:', err);
  }
});