const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function activarCliente() {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .update({ activo: true })
      .eq('nombre_negocio', 'Llantera 1 CLIC')
      .select();
    
    if (error) {
      console.error('Error activando cliente:', error);
      return;
    }
    
    console.log('Cliente activado:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

activarCliente();