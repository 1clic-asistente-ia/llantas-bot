import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  // Solo permitir en desarrollo o con un token especial
  const authToken = event.queryStringParameters?.token;
  if (authToken !== 'diagnostico_2024') {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: 'No autorizado' })
    };
  }

  try {
    const diagnostico: any = {
      timestamp: new Date().toISOString(),
      variables_entorno: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'CONFIGURADA ✅' : 'NO CONFIGURADA ❌',
        OPENAI_MODEL: process.env.OPENAI_MODEL || 'NO CONFIGURADA (usará gpt-3.5-turbo)',
        FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN ? 'CONFIGURADA ✅' : 'NO CONFIGURADA ❌',
        FACEBOOK_VERIFY_TOKEN: process.env.FACEBOOK_VERIFY_TOKEN ? 'CONFIGURADA ✅' : 'NO CONFIGURADA ❌',
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET ? 'CONFIGURADA ✅' : 'NO CONFIGURADA ❌',
        NODE_ENV: process.env.NODE_ENV || 'NO CONFIGURADA'
      },
      api_key_info: process.env.OPENAI_API_KEY ? {
        primeros_chars: process.env.OPENAI_API_KEY.substring(0, 10),
        ultimos_chars: process.env.OPENAI_API_KEY.slice(-4),
        longitud: process.env.OPENAI_API_KEY.length
      } : null
    };

    // Probar conexión con OpenAI
    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai');
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: 'Responde solo con "OK" si me puedes escuchar.' }
          ],
          max_tokens: 10,
          temperature: 0
        });

        diagnostico.prueba_openai = {
          estado: 'EXITOSA ✅',
          respuesta: completion.choices[0].message.content,
          modelo_usado: completion.model,
          tokens_usados: completion.usage?.total_tokens || 'N/A'
        };

      } catch (error: any) {
        diagnostico.prueba_openai = {
          estado: 'ERROR ❌',
          tipo_error: error.constructor.name,
          mensaje: error.message,
          status: error.status || 'N/A',
          codigo: error.code || 'N/A'
        };
      }
    } else {
      diagnostico.prueba_openai = {
        estado: 'NO SE PUEDE PROBAR - API KEY NO CONFIGURADA ❌'
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(diagnostico, null, 2)
    };

  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Error en diagnóstico',
        mensaje: error.message
      })
    };
  }
};

export { handler };