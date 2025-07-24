// 🔍 DIAGNÓSTICO COMPLETO - Page ID de Facebook
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnosticarPageIDs() {
  console.log('🔍 DIAGNÓSTICO COMPLETO - Page IDs de Facebook');
  console.log('='.repeat(60));
  
  try {
    // 1. Verificar todos los clientes en la base de datos
    console.log('📊 1. CLIENTES EN BASE DE DATOS:');
    const { data: clientes, error } = await supabase
      .from('clientes')
      .select('*');
    
    if (clientes && clientes.length > 0) {
      clientes.forEach((cliente, index) => {
        console.log(`   ${index + 1}. ${cliente.nombre_negocio}`);
        console.log(`      - Page ID: ${cliente.facebook_page_id}`);
        console.log(`      - Activo: ${cliente.activo}`);
        console.log('');
      });
    } else {
      console.log('   ❌ No hay clientes en la base de datos');
    }
    
    console.log('🔍 2. ANÁLISIS DE Page IDs ENCONTRADOS:');
    console.log('   📱 Page ID en Developer Console: 608661302340026');
    console.log('   🌐 Page ID en URL de página: 61577782224691');
    console.log('');
    
    // 3. Probar cuál funciona
    console.log('🧪 3. PROBANDO CADA Page ID:');
    
    // Probar Page ID de Developer Console
    console.log('   🔸 Probando: 608661302340026 (Developer Console)');
    const { data: cliente1 } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', '608661302340026')
      .eq('activo', true)
      .single();
    
    if (cliente1) {
      console.log('   ✅ ENCONTRADO con 608661302340026');
      console.log(`      - Negocio: ${cliente1.nombre_negocio}`);
    } else {
      console.log('   ❌ NO encontrado con 608661302340026');
    }
    
    // Probar Page ID de URL
    console.log('   🔸 Probando: 61577782224691 (URL de página)');
    const { data: cliente2 } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', '61577782224691')
      .eq('activo', true)
      .single();
    
    if (cliente2) {
      console.log('   ✅ ENCONTRADO con 61577782224691');
      console.log(`      - Negocio: ${cliente2.nombre_negocio}`);
    } else {
      console.log('   ❌ NO encontrado con 61577782224691');
    }
    
    console.log('');
    console.log('🎯 4. RECOMENDACIONES:');
    
    if (cliente1 && !cliente2) {
      console.log('   ✅ Usar: 608661302340026 (Developer Console)');
      console.log('   🔧 Acción: Verificar que Facebook envíe este ID en webhooks');
    } else if (cliente2 && !cliente1) {
      console.log('   ✅ Usar: 61577782224691 (URL de página)');
      console.log('   🔧 Acción: Verificar que Facebook envíe este ID en webhooks');
    } else if (cliente1 && cliente2) {
      console.log('   ⚠️  AMBOS Page IDs tienen clientes configurados');
      console.log('   🔧 Acción: Decidir cuál usar y eliminar el otro');
    } else {
      console.log('   ❌ NINGÚN Page ID tiene cliente configurado');
      console.log('   🔧 Acción: Configurar cliente con el Page ID correcto');
    }
    
    console.log('');
    console.log('📋 5. CÓMO OBTENER EL Page ID CORRECTO:');
    console.log('   1. Ve a tu página de Facebook');
    console.log('   2. Haz clic en "Acerca de"');
    console.log('   3. Busca "ID de página" o "Page ID"');
    console.log('   4. O usa la URL: facebook.com/[tu-pagina] → el número al final');
    console.log('');
    console.log('   🔍 También puedes verificar en Facebook Developer Console:');
    console.log('   1. developers.facebook.com');
    console.log('   2. Tu app → Messenger → Settings');
    console.log('   3. Verificar qué Page ID aparece suscrito al webhook');
    
  } catch (error) {
    console.error('❌ Error en diagnóstico:', error);
  }
}

diagnosticarPageIDs();