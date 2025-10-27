const assert = require('assert');
const { buildSendgridMessage } = require('../server/sendEmailHelper');

function runTests() {
  // Ensure env FROM_EMAIL is used when present
  process.env.FROM_EMAIL = 'from@example.com';

  const msg = buildSendgridMessage({
    to: 'to@example.com',
    subject: 'Test Subject',
    message: 'Hello\nWorld',
    replyTo: 'reply@example.com'
  });

  assert.strictEqual(msg.to, 'to@example.com');
  assert.strictEqual(msg.from, 'from@example.com');
  assert.strictEqual(msg.subject, 'Test Subject');
  assert.ok(msg.html.includes('Hello<br>World'));
  assert.strictEqual(msg.replyTo, 'reply@example.com');

  console.log('All sendEmailHelper tests passed ✅');
}

runTests();
