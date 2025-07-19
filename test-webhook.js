// Script de diagnóstico - Verificar webhook
const fetch = require('node-fetch');
const args = process.argv.slice(2);
let testMessage = 'Hola, esto es una prueba';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--message' && i + 1 < args.length) {
    testMessage = args[i + 1];
    break;
  }
}

async function testWebhook() {
  try {
    console.log('🔍 Probando webhook...');
    
    // Probar GET (verificación)
    const getResponse = await fetch('http://localhost:9999/.netlify/functions/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=llantasbot123');
    const getResult = await getResponse.text();
    
    console.log('✅ GET Response:', getResult);
    
    // Simular POST (mensaje)
    const postData = {
      object: 'page',
      entry: [{
        id: '608661302340026',
        time: Date.now(),
        messaging: [{
          sender: { id: '1234567890123456' },
          recipient: { id: '608661302340026' },
          timestamp: Date.now(),
          message: {
            mid: 'test_message_id',
            text: testMessage
          }
        }]
      }]
    };
    
    console.log('🔄 Enviando mensaje de prueba:', testMessage);
    const postResponse = await fetch('http://localhost:9999/.netlify/functions/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hub-Signature-256': 'sha256=test' // Esto fallará la validación, pero veremos si llega
      },
      body: JSON.stringify(postData)
    });
    
    console.log('📊 POST Status:', postResponse.status);
    const postResult = await postResponse.text();
    console.log('📊 POST Response:', postResult);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testWebhook();
// Remove the unused WEBHOOK_URL line at the end