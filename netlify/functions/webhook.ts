import { Handler } from '@netlify/functions';
import crypto from 'crypto';

// Si necesitas importar supabase/openai, adapta los paths según sea necesario
// import { supabase } from '../../lib/supabase';
// import { openai } from '../../lib/openai';

const FACEBOOK_VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const handler: Handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];

    if (mode === 'subscribe' && token === FACEBOOK_VERIFY_TOKEN) {
      return {
        statusCode: 200,
        body: challenge || ''
      };
    }
    return {
      statusCode: 403,
      body: 'Invalid verification'
    };
  }

  if (event.httpMethod === 'POST') {
    const signature = event.headers['x-hub-signature-256'] || '';
    const body = event.body || '';

    const hmac = crypto.createHmac('sha256', FACEBOOK_APP_SECRET!);
    hmac.update(body);
    const expectedSignature = 'sha256=' + hmac.digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return {
        statusCode: 403,
        body: 'Invalid signature'
      };
    }

    const payload = JSON.parse(body);
    if (payload.object === 'page') {
      for (const entry of payload.entry) {
        for (const messagingEvent of entry.messaging) {
          const senderId = messagingEvent.sender.id;
          const pageId = entry.id;
          const message = messagingEvent.message?.text;

          if (message) {
            // TODO: Obtener cliente_id de pageId
            // TODO: Manejar contexto de conversación
            // TODO: Llamar a OpenAI con Prompt Maestro
            // TODO: Enviar respuesta via Messenger API
            console.log(`Mensaje recibido de ${senderId} en página ${pageId}: ${message}`);
          }
        }
      }
    }
    return {
      statusCode: 200,
      body: 'EVENT_RECEIVED'
    };
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};

export { handler };