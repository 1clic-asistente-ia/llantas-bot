const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wjtahtevulglhlajwwjr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqdGFodGV2dWxnbGhsYWp3d2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5OTU1NjcsImV4cCI6MjA0NDU3MTU2N30.0wM4V8-0nq6Qh0YpU5Z2k1x3qB3Yk3e7X_KrE3f1o';
const supabase = createClient(supabaseUrl, supabaseKey);

async function countAvailable() {
  try {
    // Count with fecha_venta null
    const { count: countFechaNull, error: errorFecha } = await supabase
      .from('inventario')
      .select('count(*)', { count: 'exact' })
      .is('fecha_venta', null);

    if (errorFecha) {
      console.error('Error counting with fecha_venta null:', errorFecha);
    } else {
      console.log('Number of available tires (fecha_venta null):', countFechaNull);
    }

    // Count with disponibilidad true
    const { count: countDisponibilidad, error: errorDisp } = await supabase
      .from('inventario')
      .select('count(*)', { count: 'exact' })
      .eq('disponibilidad', 'Disponible');

    if (errorDisp) {
      console.error('Error counting with disponibilidad true:', errorDisp);
    } else {
      console.log('Number of available tires (disponibilidad true):', countDisponibilidad);
    }

    // Count total rows
    const { count: totalCount, error: errorTotal } = await supabase
      .from('inventario')
      .select('count(*)', { count: 'exact' });

    if (errorTotal) {
      console.error('Error counting total rows:', errorTotal);
    } else {
      console.log('Total rows in inventario:', totalCount);
    }

    const { data: distinctValues, error: errorDistinct } = await supabase
      .from('inventario')
      .select('disponibilidad', { count: 'none' })
      .limit(100);

    if (errorDistinct) {
      console.error('Error getting distinct disponibilidad:', errorDistinct);
    } else {
      const unique = [...new Set(distinctValues.map(item => item.disponibilidad))];
      console.log('Distinct disponibilidad values:', unique);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

countAvailable();