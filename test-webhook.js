// Script de diagnóstico - Verificar webhook
const fetch = require('node-fetch');

async function testWebhook() {
  try {
    console.log('🔍 Probando webhook...');
    
    // Probar GET (verificación)
    const getResponse = await fetch('https://llanteras-bot.netlify.app/.netlify/functions/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=llantasbot123');
    const getResult = await getResponse.text();
    
    console.log('✅ GET Response:', getResult);
    
    // Simular POST (mensaje)
    const postData = {
      object: 'page',
      entry: [{
        id: '61577782224691',
        time: Date.now(),
        messaging: [{
          sender: { id: 'test_user_123' },
          recipient: { id: '61577782224691' },
          timestamp: Date.now(),
          message: {
            mid: 'test_message_id',
            text: 'Hola, esto es una prueba'
          }
        }]
      }]
    };
    
    console.log('🔄 Enviando mensaje de prueba...');
    const postResponse = await fetch('https://llanteras-bot.netlify.app/.netlify/functions/webhook', {
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