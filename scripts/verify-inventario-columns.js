const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyInventarioColumns() {
  try {
    const { data, error } = await supabase
      .from('inventario')
      .select('*')
      .limit(1);
    if (error) {
      console.error('Error querying inventario:', error);
      return;
    }
    if (data.length > 0) {
      console.log('Column names in inventario:', Object.keys(data[0]));
    } else {
      console.log('No data in inventario table. Cannot determine columns without data.');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

verifyInventarioColumns();