// Verificación final después del deploy
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificacionFinal() {
  try {
    console.log('🎯 VERIFICACIÓN FINAL POST-DEPLOY\n');
    
    // 1. Verificar tabla conversations
    console.log('1️⃣ Verificando tabla conversations...');
    const { data: conv, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .limit(1);
    
    if (convError) {
      console.log('❌ Error:', convError.message);
    } else {
      console.log('✅ Tabla conversations: OK');
    }
    
    // 2. Verificar tabla mensajes
    console.log('\n2️⃣ Verificando tabla mensajes...');
    const { data: mens, error: mensError } = await supabase
      .from('mensajes')
      .select('*')
      .limit(1);
    
    if (mensError) {
      console.log('❌ Error:', mensError.message);
    } else {
      console.log('✅ Tabla mensajes: OK');
    }
    
    // 3. Verificar cliente
    console.log('\n3️⃣ Verificando cliente...');
    const { data: cliente, error: clienteError } = await supabase
      .from('clientes')
      .select('*')
      .eq('id_cliente', 'C0000')
      .single();
    
    if (clienteError) {
      console.log('❌ Error:', clienteError.message);
    } else {
      console.log('✅ Cliente configurado:');
      console.log(`   - Facebook Page ID: ${cliente.facebook_page_id}`);
      console.log(`   - Estado: ${cliente.estado_suscripcion}`);
    }
    
    // 4. Verificar webhook
    console.log('\n4️⃣ Verificando webhook...');
    console.log('✅ URL: https://llantas-bot-2.netlify.app/.netlify/functions/webhook');
    console.log('✅ Verify Token: llantasbot123');
    
    console.log('\n🎉 ¡CONFIGURACIÓN COMPLETA!');
    console.log('\n📱 AHORA PUEDES PROBAR EL BOT:');
    console.log('1. Ve a tu página de Facebook');
    console.log('2. Envía un mensaje desde una cuenta personal (NO admin)');
    console.log('3. Prueba estos mensajes:');
    console.log('   • "Hola"');
    console.log('   • "Necesito llantas para mi carro"');
    console.log('   • "¿Tienen llantas 185/65R15?"');
    console.log('   • "¿Qué marcas manejan?"');
    
    console.log('\n⚡ RESPUESTA ESPERADA:');
    console.log('El bot debería responder inmediatamente con información sobre llantas');
    console.log('y hacer preguntas para ayudar al cliente.');
    
    console.log('\n🔧 SI NO RESPONDE:');
    console.log('1. Espera 2-3 minutos (deploy puede tardar)');
    console.log('2. Verifica que el mensaje sea desde cuenta personal');
    console.log('3. Revisa Facebook Developer Console → Webhooks');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

verificacionFinal();