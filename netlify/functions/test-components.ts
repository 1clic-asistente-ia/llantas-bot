import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    console.log('🔍 Iniciando diagnóstico de componentes...');

    // 1. Verificar variables de entorno
    const envVars = {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Configurada' : 'NO CONFIGURADA',
      OPENAI_MODEL: process.env.OPENAI_MODEL || 'NO CONFIGURADA',
      SUPABASE_URL: process.env.SUPABASE_URL ? 'Configurada' : 'NO CONFIGURADA',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'Configurada' : 'NO CONFIGURADA',
      FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN ? 'Configurada' : 'NO CONFIGURADA',
      FACEBOOK_VERIFY_TOKEN: process.env.FACEBOOK_VERIFY_TOKEN ? 'Configurada' : 'NO CONFIGURADA',
      FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET ? 'Configurada' : 'NO CONFIGURADA'
    };

    console.log('✅ Variables de entorno:', envVars);

    // 2. Probar importación de OpenAI
    let openaiStatus = 'ERROR';
    try {
      const { openai } = await import('../utils/openai');
      openaiStatus = 'OK - Importación exitosa';
    } catch (error: any) {
      openaiStatus = `ERROR - ${error.message}`;
      console.error('Error importando OpenAI:', error);
    }

    // 3. Probar importación de Database
    let databaseStatus = 'ERROR';
    try {
      const { supabase } = await import('../utils/database');
      databaseStatus = 'OK - Importación exitosa';
    } catch (error: any) {
      databaseStatus = `ERROR - ${error.message}`;
      console.error('Error importando Database:', error);
    }

    // 4. Probar conexión a Supabase
    let supabaseConnectionStatus = 'ERROR';
    try {
      const { supabase } = await import('../utils/database');
      const { data, error } = await supabase.from('clientes').select('count').limit(1);
      if (error) {
        supabaseConnectionStatus = `ERROR - ${error.message}`;
      } else {
        supabaseConnectionStatus = 'OK - Conexión exitosa';
      }
    } catch (error: any) {
      supabaseConnectionStatus = `ERROR - ${error.message}`;
      console.error('Error conectando a Supabase:', error);
    }

    // 5. Probar llamada simple a OpenAI
    let openaiCallStatus = 'ERROR';
    try {
      const { openai } = await import('../utils/openai');
      const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Responde solo "OK"' }],
        max_tokens: 10
      });
      openaiCallStatus = `OK - Respuesta: ${response.choices[0]?.message?.content}`;
    } catch (error: any) {
      openaiCallStatus = `ERROR - ${error.message}`;
      console.error('Error llamando a OpenAI:', error);
    }

    const diagnostico = {
      timestamp: new Date().toISOString(),
      variables_entorno: envVars,
      importacion_openai: openaiStatus,
      importacion_database: databaseStatus,
      conexion_supabase: supabaseConnectionStatus,
      llamada_openai: openaiCallStatus
    };

    console.log('📊 Diagnóstico completo:', diagnostico);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diagnostico, null, 2)
    };

  } catch (error: any) {
    console.error('❌ Error en diagnóstico:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack
      }, null, 2)
    };
  }
};

export { handler };