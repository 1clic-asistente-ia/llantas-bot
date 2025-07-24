// Script para verificar y actualizar cliente en Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarYActualizarCliente() {
  try {
    console.log('🔍 Verificando clientes existentes...');
    
    // Primero verificar todos los clientes
    const { data: clientes, error: errorSelect } = await supabase
      .from('clientes')
      .select('*');

    if (errorSelect) {
      console.error('❌ Error al consultar:', errorSelect);
      return;
    }

    console.log('📋 Clientes encontrados:', clientes.length);
    clientes.forEach(cliente => {
      console.log(`- ID: ${cliente.id_cliente}, Negocio: ${cliente.nombre_negocio}, Page ID: ${cliente.facebook_page_id}`);
    });

    // Buscar cliente con nuestro Page ID
    const clienteConPageId = clientes.find(c => c.facebook_page_id === '61577782224691');
    
    if (clienteConPageId) {
      console.log('✅ ¡Cliente con Page ID encontrado!', clienteConPageId);
      return;
    }

    // Si no existe, actualizar el primer cliente
    if (clientes.length > 0) {
      console.log('🔄 Actualizando cliente existente con el Page ID...');
      
      const { data, error } = await supabase
        .from('clientes')
        .update({ 
          facebook_page_id: '61577782224691',
          estado_suscripcion: 'Activo'
        })
        .eq('id_cliente', clientes[0].id_cliente)
        .select();

      if (error) {
        console.error('❌ Error al actualizar:', error);
        return;
      }

      console.log('✅ Cliente actualizado exitosamente:', data);
    } else {
      console.log('📝 No hay clientes, creando uno nuevo...');
      
      const { data, error } = await supabase
        .from('clientes')
        .insert([
          {
            id_cliente: 'C0002',
            nombre_negocio: 'Llantería Bot',
            facebook_page_id: '61577782224691',
            estado_suscripcion: 'Activo'
          }
        ])
        .select();

      if (error) {
        console.error('❌ Error al crear:', error);
        return;
      }

      console.log('✅ Cliente creado exitosamente:', data);
    }
    
    console.log('🎉 ¡El bot ya está listo para funcionar!');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

verificarYActualizarCliente();