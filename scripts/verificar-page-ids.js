// 🔍 Script para verificar qué Page ID llega en los webhooks
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarPageIDs() {
  console.log('🔍 VERIFICACIÓN DE Page IDs');
  console.log('='.repeat(50));
  
  try {
    // Verificar clientes existentes
    const { data: clientes } = await supabase
      .from('clientes')
      .select('*');
    
    console.log('📊 CLIENTES EN BASE DE DATOS:');
    if (clientes && clientes.length > 0) {
      clientes.forEach(cliente => {
        console.log(`- ${cliente.nombre_negocio}: ${cliente.facebook_page_id}`);
      });
    } else {
      console.log('❌ No hay clientes');
    }
    
    console.log('\\n🔍 Page IDs DETECTADOS EN CÓDIGO:');
    console.log('- Developer Console: 608661302340026');
    console.log('- URL de página: 61577782224691');
    
    console.log('\\n🎯 SOLUCIÓN RECOMENDADA:');
    console.log('1. Ve a Facebook Developer Console');
    console.log('2. Messenger → Settings → Webhooks');
    console.log('3. Verifica qué página está suscrita');
    console.log('4. Usa ese Page ID en la base de datos');
    
    console.log('\\n📋 PASOS PARA CORREGIR:');
    console.log('1. Identifica el Page ID correcto');
    console.log('2. Ejecuta el script de actualización correspondiente');
    console.log('3. Prueba el bot enviando un mensaje');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verificarPageIDs();