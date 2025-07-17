// Script para insertar cliente en Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertarCliente() {
  try {
    console.log('🔄 Insertando cliente en Supabase...');
    
    const { data, error } = await supabase
      .from('clientes')
      .insert([
        {
          id_cliente: 'C0001',
          nombre_negocio: 'Llantería Bot Demo',
          facebook_page_id: '61577782224691',
          estado_suscripcion: 'Activo',
          direccion: 'Dirección de ejemplo',
          telefono_b2b: '555-0123',
          whatsapp: '555-0123',
          nombre_responsable: 'Administrador',
          email_responsable: 'admin@llanteria.com',
          fecha_alta_servicio: new Date().toISOString(),
          horario_atencion: {
            lunes: "9:00-18:00",
            martes: "9:00-18:00", 
            miercoles: "9:00-18:00",
            jueves: "9:00-18:00",
            viernes: "9:00-18:00",
            sabado: "9:00-14:00",
            domingo: "Cerrado"
          }
        }
      ])
      .select();

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log('✅ Cliente insertado exitosamente:', data);
    console.log('🎉 ¡El bot ya está listo para funcionar!');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

insertarCliente();