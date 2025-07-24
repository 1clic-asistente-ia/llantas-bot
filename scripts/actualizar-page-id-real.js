// 🔧 SCRIPT AUTOMÁTICO - Actualizar Page ID Real
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function actualizarPageIdReal(pageIdReal) {
  console.log('🔧 ACTUALIZANDO CON Page ID REAL DE FACEBOOK');
  console.log('='.repeat(60));
  
  try {
    // 1. Verificar si ya existe un cliente con este Page ID
    console.log(`🔍 Verificando Page ID: ${pageIdReal}`);
    const { data: clienteExistente } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', pageIdReal)
      .single();
    
    if (clienteExistente) {
      console.log(`✅ Ya existe cliente con este Page ID: ${clienteExistente.nombre_negocio}`);
      return;
    }
    
    // 2. Buscar el cliente "Llantera 1 CLIC" y actualizar su Page ID
    console.log('🔄 Actualizando cliente "Llantera 1 CLIC"...');
    const { data, error } = await supabase
      .from('clientes')
      .update({
        facebook_page_id: pageIdReal,
        updated_at: new Date().toISOString()
      })
      .eq('nombre_negocio', 'Llantera 1 CLIC')
      .select();
    
    if (error) {
      console.error('❌ Error actualizando:', error);
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ Cliente actualizado exitosamente:');
      console.log(`   - Negocio: ${data[0].nombre_negocio}`);
      console.log(`   - Nuevo Page ID: ${data[0].facebook_page_id}`);
      console.log(`   - Actualizado: ${data[0].updated_at}`);
    } else {
      console.log('❌ No se encontró cliente "Llantera 1 CLIC"');
    }
    
    // 3. Verificar la actualización
    console.log('\\n🧪 Verificando actualización...');
    const { data: verificacion } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', pageIdReal)
      .single();
    
    if (verificacion) {
      console.log('✅ Verificación exitosa:');
      console.log(`   - Cliente: ${verificacion.nombre_negocio}`);
      console.log(`   - Page ID: ${verificacion.facebook_page_id}`);
      console.log('\\n🎉 ¡Bot listo para funcionar!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Función para usar con Page ID específico
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📋 USO DEL SCRIPT:');
    console.log('node actualizar-page-id-real.js [PAGE_ID]');
    console.log('\\nEjemplos:');
    console.log('node actualizar-page-id-real.js 608661302340026');
    console.log('node actualizar-page-id-real.js 61577782224691');
    console.log('\\n🔍 CÓMO OBTENER EL Page ID REAL:');
    console.log('1. Envía un mensaje al bot');
    console.log('2. Revisa los logs de Netlify');
    console.log('3. Busca: "📱 Page ID recibido: [ID]"');
    console.log('4. Ejecuta: node actualizar-page-id-real.js [ID]');
    return;
  }
  
  const pageIdReal = args[0];
  await actualizarPageIdReal(pageIdReal);
}

main();