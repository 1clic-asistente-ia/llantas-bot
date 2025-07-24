const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyInventario() {
  try {
    const { data: columns, error } = await supabase
      .rpc('exec_sql', {
        sql: "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'inventario' ORDER BY ordinal_position;"
      });
    if (error) {
      console.error('Error querying columns:', error);
      return;
    }
    console.log('Columns in inventario:', columns);
  } catch (err) {
    console.error('Error:', err);
  }
}

verifyInventario();