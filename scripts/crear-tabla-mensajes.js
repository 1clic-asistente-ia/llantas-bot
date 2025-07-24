// Script para crear la tabla mensajes en Supabase
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://zfibsvuntawggeixrhsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmaWJzdnVudGF3Z2dlaXhyaHNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM2NDc4MiwiZXhwIjoyMDY3OTQwNzgyfQ.eGGGOTRXmtB1z7i2RjLgHd669uZ35F0Sm7qCeKRr4Wc';

const supabase = createClient(supabaseUrl, supabaseKey);

async function crearTablaMensajes() {
  try {
    console.log('🔧 CREANDO TABLA MENSAJES\n');
    
    console.log('📋 INSTRUCCIONES:');
    console.log('Ve a Supabase Dashboard → SQL Editor');
    console.log('Y ejecuta este comando SQL:\n');
    
    const sqlMensajes = `CREATE TABLE IF NOT EXISTS mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id UUID NOT NULL,
  contenido TEXT NOT NULL,
  tipo TEXT DEFAULT 'usuario' CHECK (tipo IN ('usuario', 'bot', 'humano')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_mensajes_conversacion_id ON mensajes(conversacion_id);
CREATE INDEX IF NOT EXISTS idx_mensajes_created_at ON mensajes(created_at);`;

    console.log(sqlMensajes);
    
    console.log('\n🎯 DESPUÉS DE EJECUTAR EL SQL:');
    console.log('1. El bot podrá guardar mensajes');
    console.log('2. Despliega el código a Netlify');
    console.log('3. ¡El bot funcionará!');
    
    // Verificar que conversations existe y tiene la estructura correcta
    console.log('\n🔍 Verificando tabla conversations...');
    const { data: conv, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .limit(1);
    
    if (convError) {
      console.log('❌ Error en conversations:', convError.message);
      console.log('\n📋 TAMBIÉN NECESITAS CREAR LA TABLA CONVERSATIONS:');
      console.log(`CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id TEXT NOT NULL,
  facebook_user_id TEXT NOT NULL,
  estado TEXT DEFAULT 'activa' CHECK (estado IN ('activa', 'pausada', 'cerrada')),
  resumen_contexto TEXT DEFAULT '',
  ultima_actividad TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(cliente_id, facebook_user_id)
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_conversations_cliente_id ON conversations(cliente_id);
CREATE INDEX IF NOT EXISTS idx_conversations_facebook_user_id ON conversations(facebook_user_id);`);
    } else {
      console.log('✅ Tabla conversations existe');
    }
    
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

crearTablaMensajes();