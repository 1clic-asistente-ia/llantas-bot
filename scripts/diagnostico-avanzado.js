// Script de diagnóstico avanzado
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnosticoCompleto() {
  try {
    console.log('🔍 DIAGNÓSTICO COMPLETO DEL BOT\n');
    
    // 1. Verificar cliente
    console.log('1️⃣ Verificando cliente...');
    const { data: cliente, error: errorCliente } = await supabase
      .from('clientes')
      .select('*')
      .eq('facebook_page_id', '608661302340026')
      .single();

    if (errorCliente || !cliente) {
      console.log('❌ PROBLEMA: Cliente no encontrado');
      console.log('Intentando con Page ID alternativo...');
      
      const { data: clienteAlt, error: errorAlt } = await supabase
        .from('clientes')
        .select('*')
        .eq('facebook_page_id', '61577782224691')
        .single();
        
      if (clienteAlt) {
        console.log('✅ Cliente encontrado con Page ID alternativo:', clienteAlt.facebook_page_id);
        console.log('🔧 SOLUCIÓN: Actualizar Page ID en Facebook Developer Console');
      } else {
        console.log('❌ No se encontró cliente con ningún Page ID');
      }
      return;
    }

    console.log('✅ Cliente encontrado:', cliente.nombre_negocio);
    console.log('📱 Page ID:', cliente.facebook_page_id);

    // 2. Verificar tabla conversaciones
    console.log('\n2️⃣ Verificando tabla conversaciones...');
    const { data: conversaciones, error: errorConv } = await supabase
      .from('conversaciones')
      .select('*')
      .limit(1);

    if (errorConv) {
      console.log('❌ PROBLEMA: Tabla conversaciones no existe');
      console.log('🔧 SOLUCIÓN: Crear tabla conversaciones');
    } else {
      console.log('✅ Tabla conversaciones existe');
    }

    // 3. Verificar tabla mensajes
    console.log('\n3️⃣ Verificando tabla mensajes...');
    const { data: mensajes, error: errorMens } = await supabase
      .from('mensajes')
      .select('*')
      .limit(1);

    if (errorMens) {
      console.log('❌ PROBLEMA: Tabla mensajes no existe');
      console.log('🔧 SOLUCIÓN: Crear tabla mensajes');
    } else {
      console.log('✅ Tabla mensajes existe');
    }

    console.log('\n📋 RESUMEN DEL DIAGNÓSTICO:');
    console.log('- Cliente configurado:', cliente ? '✅' : '❌');
    console.log('- Tabla conversaciones:', errorConv ? '❌' : '✅');
    console.log('- Tabla mensajes:', errorMens ? '❌' : '✅');
    
  } catch (err) {
    console.error('❌ Error en diagnóstico:', err);
  }
}

diagnosticoCompleto();