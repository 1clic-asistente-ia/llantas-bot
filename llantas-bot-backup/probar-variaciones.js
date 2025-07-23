// Probar todas las variaciones posibles de nombres de tablas
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function probarVariaciones() {
  try {
    console.log('🔍 PROBANDO TODAS LAS VARIACIONES DE NOMBRES\n');
    
    const variaciones = [
      'conversaciones',
      'conversacions', 
      'conversacion',
      'conversations',
      'conversation',
      'mensajes',
      'messages',
      'mensaje',
      'message',
      'messenger_users',
      'clientes',
      'inventario'
    ];
    
    for (const tabla of variaciones) {
      try {
        console.log(`🔍 Probando "${tabla}"...`);
        const { data, error } = await supabase
          .from(tabla)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ "${tabla}": ${error.message}`);
        } else {
          console.log(`✅ "${tabla}": EXISTE`);
          if (data && data.length > 0) {
            console.log(`   📊 Columnas: ${Object.keys(data[0]).join(', ')}`);
          } else {
            console.log(`   📊 Tabla vacía`);
          }
        }
      } catch (err) {
        console.log(`❌ "${tabla}": Error inesperado`);
      }
      console.log(''); // Línea en blanco
    }
    
    console.log('🎯 RESUMEN:');
    console.log('Las tablas que existen son las que muestran ✅');
    console.log('Necesitamos crear las que faltan o usar nombres alternativos.');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
  }
}

probarVariaciones();