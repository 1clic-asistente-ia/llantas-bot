const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function agregarColumnaActivo() {
  try {
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_statement: `
        ALTER TABLE clientes
        ADD COLUMN IF NOT EXISTS activo boolean DEFAULT true;
      `
    });
    
    if (error) {
      console.error('Error agregando columna:', error);
      return;
    }
    
    console.log('Columna activo agregada:', data);
    
    // Actualizar clientes existentes
    const { updateData, updateError } = await supabase
      .from('clientes')
      .update({ activo: true });
    
    if (updateError) {
      console.error('Error actualizando clientes:', updateError);
    } else {
      console.log('Clientes actualizados con activo: true');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

agregarColumnaActivo();