import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    console.log('🔍 Test básico de Netlify Functions...');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Netlify Functions está funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          hasOpenAI: !!process.env.OPENAI_API_KEY,
          hasSupabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL
        }
      }, null, 2)
    };

  } catch (error: any) {
    console.error('❌ Error en test básico:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }, null, 2)
    };
  }
};

export { handler };