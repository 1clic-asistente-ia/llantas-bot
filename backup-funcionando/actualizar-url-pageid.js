// Script para actualizar con el Page ID de la URL
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function actualizarConPageIdURL() {
  try {
    console.log('🔄 Actualizando con el Page ID de la URL: 61577782224691');
    
    const { data, error } = await supabase
      .from('clientes')
      .update({ 
        facebook_page_id: '61577782224691',
        estado_suscripcion: 'Activo'
      })
      .eq('id_cliente', 'C0000')
      .select();

    if (error) {
      console.error('❌ Error al actualizar:', error);
      return;
    }

    console.log('✅ Cliente actualizado con Page ID de la URL:', data);
    console.log('🎉 ¡Ahora debería funcionar con el ID correcto!');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

actualizarConPageIdURL();