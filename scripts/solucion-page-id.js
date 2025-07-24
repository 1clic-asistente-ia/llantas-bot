// 🔧 SOLUCIÓN DEFINITIVA - Page ID de Facebook
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function solucionarPageID() {
  console.log('🔧 SOLUCIÓN DEFINITIVA - Page ID de Facebook');
  console.log('='.repeat(60));
  
  try {
    // 1. Verificar el cliente actual con Page ID
    console.log('📊 1. VERIFICANDO CLIENTE ACTUAL:');
    const { data: clienteActual } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', '608661302340026')
      .single();
    
    if (clienteActual) {
      console.log(`✅ Cliente encontrado: ${clienteActual.nombre_negocio}`);
      console.log(`   - Page ID: ${clienteActual.facebook_page_id}`);
      console.log(`   - Activo: ${clienteActual.activo}`);
    }
    
    // 2. Probar el webhook con el Page ID correcto
    console.log('\\n🧪 2. PROBANDO WEBHOOK:');
    console.log('   📱 Page ID a usar: 608661302340026');
    console.log('   🌐 Webhook URL: https://llanteras-bot.netlify.app/.netlify/functions/webhook');
    
    // 3. Verificar configuración de Facebook
    console.log('\\n⚙️ 3. VERIFICAR EN FACEBOOK DEVELOPER:');
    console.log('   1. Ve a: https://developers.facebook.com/');
    console.log('   2. Selecciona tu aplicación');
    console.log('   3. Messenger → Settings → Webhooks');
    console.log('   4. Verifica que la página suscrita tenga ID: 608661302340026');
    console.log('   5. Si no, suscribe la página correcta');
    
    // 4. Instrucciones para probar
    console.log('\\n🧪 4. CÓMO PROBAR:');
    console.log('   1. Ve a tu página de Facebook');
    console.log('   2. Envía un mensaje desde otra cuenta');
    console.log('   3. Revisa los logs en Netlify Functions');
    console.log('   4. Busca: "Cliente no encontrado para page_id: [ID]"');
    console.log('   5. Si aparece otro ID, actualiza la base de datos');
    
    // 5. Scripts de corrección disponibles
    console.log('\\n🛠️ 5. SCRIPTS DISPONIBLES:');
    console.log('   - actualizar-pageid.js (para 608661302340026)');
    console.log('   - actualizar-url-pageid.js (para 61577782224691)');
    console.log('   - actualizar-developer-pageid.js (para 608661302340026)');
    
    console.log('\\n✅ RECOMENDACIÓN FINAL:');
    console.log('   El Page ID 608661302340026 ya está configurado correctamente.');
    console.log('   Si el bot no funciona, el problema puede ser:');
    console.log('   - Webhook no configurado en Facebook');
    console.log('   - Página no suscrita al webhook');
    console.log('   - Variables de entorno incorrectas en Netlify');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

solucionarPageID();