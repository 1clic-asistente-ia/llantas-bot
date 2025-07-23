import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    // Verificar variables de entorno
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL;
    
    if (!apiKey) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'OPENAI_API_KEY no está configurada',
          variables: {
            OPENAI_API_KEY: apiKey ? 'CONFIGURADA' : 'NO CONFIGURADA',
            OPENAI_MODEL: model || 'NO CONFIGURADA'
          }
        })
      };
    }

    // Probar conexión con OpenAI
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: response.ok ? 'SUCCESS' : 'ERROR',
        statusCode: response.status,
        variables: {
          OPENAI_API_KEY: apiKey ? 'CONFIGURADA' : 'NO CONFIGURADA',
          OPENAI_MODEL: model || 'NO CONFIGURADA'
        },
        openai_response: response.ok ? 'API Key válida' : result
      })
    };

  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Error al probar OpenAI',
        message: error instanceof Error ? error.message : 'Error desconocido',
        variables: {
          OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'CONFIGURADA' : 'NO CONFIGURADA',
          OPENAI_MODEL: process.env.OPENAI_MODEL || 'NO CONFIGURADA'
        }
      })
    };
  }
};