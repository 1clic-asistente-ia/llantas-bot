import { Handler } from '@netlify/functions';
import crypto from 'crypto';
import { sendMessage, markSeen, typingOn } from '../../lib/facebook';
import { 
  getClienteByPageId, 
  getOrCreateConversacion, 
  guardarMensaje, 
  getMensajesRecientes 
} from '../../lib/database';
// Eliminado: import { generateResponse } from '../../lib/claude';

const FACEBOOK_VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const handler: Handler = async (event, context) => {
  // Verificación del webhook (GET)
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];

    console.log('Verificación de webhook:', { mode, token: token ? 'presente' : 'ausente' });

    if (mode === 'subscribe' && token === FACEBOOK_VERIFY_TOKEN) {
      console.log('Webhook verificado exitosamente');
      return {
        statusCode: 200,
        body: challenge || ''
      };
    }
    
    console.log('Verificación fallida');
    return {
      statusCode: 403,
      body: 'Invalid verification'
    };
  }

  // Procesamiento de mensajes (POST)
  if (event.httpMethod === 'POST') {
    try {
      // Verificar firma de Facebook
      const signature = event.headers['x-hub-signature-256'] || '';
      const body = event.body || '';

      if (!FACEBOOK_APP_SECRET) {
        console.error('FACEBOOK_APP_SECRET no configurado');
        return {
          statusCode: 500,
          body: 'Server configuration error'
        };
      }

      const hmac = crypto.createHmac('sha256', FACEBOOK_APP_SECRET);
      hmac.update(body);
      const expectedSignature = 'sha256=' + hmac.digest('hex');

      if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
        console.error('Firma inválida');
        return {
          statusCode: 403,
          body: 'Invalid signature'
        };
      }

      const payload = JSON.parse(body);
      console.log('Payload recibido:', JSON.stringify(payload, null, 2));

      if (payload.object === 'page') {
        // Procesar cada entrada del webhook
        for (const entry of payload.entry) {
          const pageId = entry.id;
          
          // 🔍 LOGGING DETALLADO PARA CAPTURAR PAGE ID REAL
          console.log('='.repeat(60));
          console.log('🔍 WEBHOOK RECIBIDO - INFORMACIÓN DETALLADA:');
          console.log(`📱 Page ID recibido: ${pageId}`);
          console.log(`📊 Entry completa:`, JSON.stringify(entry, null, 2));
          console.log('='.repeat(60));
          
          // Obtener información del cliente
          const cliente = await getClienteByPageId(pageId);
          if (!cliente) {
            console.error(`❌ Cliente no encontrado para page_id: ${pageId}`);
            console.error(`🔧 SOLUCIÓN: Ejecutar script de actualización con este Page ID`);
            console.error(`📋 Page ID a usar en base de datos: ${pageId}`);
            continue;
          }

          console.log(`Procesando mensajes para cliente: ${cliente.nombre_negocio}`);

          // Procesar cada evento de messaging
          for (const messagingEvent of entry.messaging) {
            await procesarMensaje(messagingEvent, cliente);
          }
        }
      }

      return {
        statusCode: 200,
        body: 'EVENT_RECEIVED'
      };

    } catch (error) {
      console.error('Error procesando webhook:', error);
      return {
        statusCode: 500,
        body: 'Internal server error'
      };
    }
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};

// Función para procesar un mensaje individual
async function procesarMensaje(messagingEvent: any, cliente: any) {
  try {
    const senderId = messagingEvent.sender.id;
    const message = messagingEvent.message;

    // Solo procesar mensajes de texto (por ahora)
    if (!message || !message.text) {
      console.log('Mensaje sin texto, ignorando');
      return;
    }

    const mensajeTexto = message.text;
    console.log(`Mensaje de ${senderId}: ${mensajeTexto}`);

    // Marcar como visto y mostrar typing
    await markSeen(senderId);
    await typingOn(senderId);

    // Obtener o crear conversación
    const conversacion = await getOrCreateConversacion(cliente.id, senderId);
    if (!conversacion) {
      console.error('No se pudo crear/obtener conversación');
      await enviarMensajeError(senderId);
      return;
    }

    // Guardar mensaje del usuario
    await guardarMensaje(conversacion.id, mensajeTexto, 'usuario', {
      facebook_message_id: message.mid,
      timestamp: Date.now()
    });

    // Obtener mensajes recientes para contexto
    const mensajesRecientes = await getMensajesRecientes(conversacion.id, 15);

    // Eliminado: // Generar respuesta usando Claude
    // Eliminado: console.log('Generando respuesta con Claude...');
    const respuestaBot = await generateResponse(
      mensajeTexto,
      mensajesRecientes,
      conversacion.resumen_contexto,
      cliente
    );

    // Enviar respuesta
    await sendMessage(senderId, { text: respuestaBot });

    // Guardar respuesta del bot
    await guardarMensaje(conversacion.id, respuestaBot, 'bot', {
      timestamp: Date.now()
    });

    console.log(`Respuesta enviada a ${senderId}: ${respuestaBot.substring(0, 100)}...`);

  } catch (error) {
    console.error('Error procesando mensaje:', error);
    await enviarMensajeError(messagingEvent.sender.id);
  }
}

// Función para enviar mensaje de error
async function enviarMensajeError(senderId: string) {
  try {
    await sendMessage(senderId, {
      text: 'Disculpa, hubo un problema técnico. ¿Puedes intentar de nuevo en un momento?'
    });
  } catch (error) {
    console.error('Error enviando mensaje de error:', error);
  }
}

export { handler };