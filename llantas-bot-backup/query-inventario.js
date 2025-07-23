const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function queryInventario() {
  try {
    const { data: cliente, error: clientError } = await supabase
      .from('clientes')
      .select('id_cliente')
      .eq('facebook_page_id', '608661302340026')
      .single();
    if (clientError || !cliente) {
      console.error('Error finding client:', clientError);
      return;
    }
    const clienteId = cliente.id_cliente;
    console.log('Cliente ID:', clienteId);

    const { data, error } = await supabase
      .from('inventario')
      .select('*')
      .eq('cliente_id', clienteId)
      .eq('medida', '185/65R15')
      .gt('total_disponible_medida', 0);
    if (error) {
      console.error('Error querying inventario:', error);
      return;
    }
    console.log('Results for 185/65R15:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

queryInventario();