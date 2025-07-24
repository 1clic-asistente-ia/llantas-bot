// Diagnóstico específico para verificar nombres de tablas
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarTablas() {
  try {
    console.log('🔍 VERIFICANDO NOMBRES DE TABLAS\n');
    
    // Probar tabla conversaciones (con 'e')
    console.log('1️⃣ Probando tabla "conversaciones" (con e)...');
    const { data: conv1, error: error1 } = await supabase
      .from('conversaciones')
      .select('*')
      .limit(1);
    
    if (error1) {
      console.log('❌ Error:', error1.message);
    } else {
      console.log('✅ Tabla "conversaciones" existe');
    }
    
    // Probar tabla conversacions (sin 'e')
    console.log('\n2️⃣ Probando tabla "conversacions" (sin e)...');
    const { data: conv2, error: error2 } = await supabase
      .from('conversacions')
      .select('*')
      .limit(1);
    
    if (error2) {
      console.log('❌ Error:', error2.message);
    } else {
      console.log('✅ Tabla "conversacions" existe');
    }
    
    // Probar tabla mensajes
    console.log('\n3️⃣ Probando tabla "mensajes"...');
    const { data: mens, error: errorMens } = await supabase
      .from('mensajes')
      .select('*')
      .limit(1);
    
    if (errorMens) {
      console.log('❌ Error:', errorMens.message);
    } else {
      console.log('✅ Tabla "mensajes" existe');
    }
    
    // Verificar cliente
    console.log('\n4️⃣ Verificando cliente...');
    const { data: cliente, error: errorCliente } = await supabase
      .from('clientes')
      .select('*')
      .eq('id_cliente', 'C0000')
      .single();
    
    if (errorCliente) {
      console.log('❌ Error:', errorCliente.message);
    } else {
      console.log('✅ Cliente encontrado:');
      console.log(`   - Facebook Page ID: ${cliente.facebook_page_id}`);
      console.log(`   - Estado: ${cliente.estado_suscripcion}`);
    }
    
    console.log('\n🎯 CONCLUSIÓN:');
    console.log('Si "conversacions" existe pero "conversaciones" no,');
    console.log('necesitamos actualizar el código del bot para usar "conversacions"');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

verificarTablas();