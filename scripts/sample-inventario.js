const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wjtahtevulglhlajwwjr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqdGFodGV2dWxnbGhsYWp3d2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5OTU1NjcsImV4cCI6MjA0NDU3MTU2N30.0wM4V8-0nq6Qh0YpU5Z2k1x3qB3Yk3e7X_KrE3f1o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function sampleInventario() {
  try {
    const { data, error } = await supabase
      .from('inventario')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Error querying inventario:', error);
      return;
    }

    console.log('Sample rows from inventario:');
    data.forEach((row, index) => {
      console.log(`Row ${index + 1}:`, JSON.stringify(row, null, 2));
    });
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

sampleInventario();