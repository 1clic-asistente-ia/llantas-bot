export const handler = async (event, context) => {
  try {
    console.log('🔍 Test ultra básico sin dependencias...');

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
        message: 'Función ultra básica funcionando',
        timestamp: new Date().toISOString(),
        method: event.httpMethod,
        path: event.path,
        environment_vars: {
          NODE_ENV: process.env.NODE_ENV || 'undefined',
          NETLIFY: process.env.NETLIFY || 'undefined',
          AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME || 'undefined'
        }
      }, null, 2)
    };

  } catch (error) {
    console.error('❌ Error en test ultra básico:', error);

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