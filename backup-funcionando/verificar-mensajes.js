// Verificar si existe tabla mensajes o si tiene otro nombre
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarMensajes() {
  try {
    console.log('🔍 VERIFICANDO TABLA DE MENSAJES\n');
    
    // Probar tabla mensajes
    console.log('1️⃣ Probando tabla "mensajes"...');
    const { data: mens1, error: error1 } = await supabase
      .from('mensajes')
      .select('*')
      .limit(1);
    
    if (error1) {
      console.log('❌ Error:', error1.message);
    } else {
      console.log('✅ Tabla "mensajes" existe');
    }
    
    // Probar tabla messages
    console.log('\n2️⃣ Probando tabla "messages"...');
    const { data: mens2, error: error2 } = await supabase
      .from('messages')
      .select('*')
      .limit(1);
    
    if (error2) {
      console.log('❌ Error:', error2.message);
    } else {
      console.log('✅ Tabla "messages" existe');
    }
    
    // Probar tabla messenger_users (que vimos en la imagen)
    console.log('\n3️⃣ Probando tabla "messenger_users"...');
    const { data: mens3, error: error3 } = await supabase
      .from('messenger_users')
      .select('*')
      .limit(1);
    
    if (error3) {
      console.log('❌ Error:', error3.message);
    } else {
      console.log('✅ Tabla "messenger_users" existe');
      console.log('📊 Estructura:', Object.keys(mens3[0] || {}));
    }
    
    // Verificar conversacions con la corrección
    console.log('\n4️⃣ Probando tabla "conversacions" (corregida)...');
    const { data: conv, error: errorConv } = await supabase
      .from('conversacions')
      .select('*')
      .limit(1);
    
    if (errorConv) {
      console.log('❌ Error:', errorConv.message);
    } else {
      console.log('✅ Tabla "conversacions" existe');
      if (conv.length > 0) {
        console.log('📊 Estructura:', Object.keys(conv[0]));
      }
    }
    
    console.log('\n🎯 CONCLUSIÓN:');
    console.log('Necesitamos identificar qué tabla usar para mensajes');
    console.log('y posiblemente crear la tabla si no existe.');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

verificarMensajes();