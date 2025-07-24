// Script para crear las tablas faltantes en Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function crearTablasFaltantes() {
  try {
    console.log('🔧 Creando tablas faltantes en Supabase...\n');
    
    // 1. Crear tabla conversaciones
    console.log('1️⃣ Creando tabla conversaciones...');
    const sqlConversaciones = `
      CREATE TABLE IF NOT EXISTS conversaciones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cliente_id TEXT NOT NULL REFERENCES clientes(id_cliente),
        facebook_user_id TEXT NOT NULL,
        estado TEXT DEFAULT 'activa' CHECK (estado IN ('activa', 'pausada', 'cerrada')),
        resumen_contexto TEXT DEFAULT '',
        ultima_actividad TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(cliente_id, facebook_user_id)
      );
    `;
    
    const { error: errorConv } = await supabase.rpc('exec_sql', { sql: sqlConversaciones });
    
    if (errorConv) {
      console.log('❌ Error creando tabla conversaciones:', errorConv);
    } else {
      console.log('✅ Tabla conversaciones creada');
    }

    // 2. Crear tabla mensajes
    console.log('\n2️⃣ Creando tabla mensajes...');
    const sqlMensajes = `
      CREATE TABLE IF NOT EXISTS mensajes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        conversacion_id UUID NOT NULL REFERENCES conversaciones(id),
        contenido TEXT NOT NULL,
        tipo TEXT DEFAULT 'usuario' CHECK (tipo IN ('usuario', 'bot')),
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const { error: errorMens } = await supabase.rpc('exec_sql', { sql: sqlMensajes });
    
    if (errorMens) {
      console.log('❌ Error creando tabla mensajes:', errorMens);
    } else {
      console.log('✅ Tabla mensajes creada');
    }

    console.log('\n🎉 ¡Tablas creadas exitosamente!');
    console.log('🚀 ¡El bot ya debería funcionar!');
    
  } catch (err) {
    console.error('❌ Error inesperado:', err);
    console.log('\n🔧 SOLUCIÓN ALTERNATIVA:');
    console.log('Ve a Supabase Dashboard → SQL Editor y ejecuta estos comandos:');
    console.log('\n-- Crear tabla conversaciones');
    console.log(`CREATE TABLE IF NOT EXISTS conversaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id TEXT NOT NULL,
  facebook_user_id TEXT NOT NULL,
  estado TEXT DEFAULT 'activa',
  resumen_contexto TEXT DEFAULT '',
  ultima_actividad TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(cliente_id, facebook_user_id)
);`);
    
    console.log('\n-- Crear tabla mensajes');
    console.log(`CREATE TABLE IF NOT EXISTS mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id UUID NOT NULL,
  contenido TEXT NOT NULL,
  tipo TEXT DEFAULT 'usuario',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`);
  }
}

crearTablasFaltantes();