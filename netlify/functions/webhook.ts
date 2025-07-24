import { Handler } from '@netlify/functions';
import crypto from 'crypto';
import { sendMessage, markSeen, typingOn } from '../../lib/facebook';
import { 
  getClienteByPageId, 
  getOrCreateConversacion, 
  guardarMensaje, 
  getMensajesRecientes 
} from '../../lib/database';
import { generateResponse } from '../../lib/openai';

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

      if (process.env.NODE_ENV === 'development') {
        console.log('Skipping signature validation in development mode');
      } else {
        if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
          console.error('Firma inválida');
          return {
            statusCode: 403,
            body: 'Invalid signature'
          };
        }
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

    } catch (error: any) {
      console.error('Error procesando webhook:', error);
console.error('Stack trace:', error.stack);
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
    console.log('🚀 INICIANDO procesarMensaje');
    const senderId = messagingEvent.sender.id;
    const message = messagingEvent.message;

    // Solo procesar mensajes de texto (por ahora)
    if (!message || !message.text) {
      console.log('Mensaje sin texto, ignorando');
      return;
    }

    const mensajeTexto = message.text;
    console.log(`📝 Mensaje de ${senderId}: ${mensajeTexto}`);

    // Marcar como visto y mostrar typing
    console.log('📱 Marcando como visto y typing...');
    if (process.env.NODE_ENV !== 'development') {
      await markSeen(senderId);
      await typingOn(senderId);
    } else {
      console.log('Skipping markSeen and typingOn in development');
    }

    // Obtener o crear conversación
    console.log('💬 Obteniendo/creando conversación...');
    const conversacion = await getOrCreateConversacion(cliente.id_cliente, senderId);
    if (!conversacion) {
      console.error('❌ No se pudo crear/obtener conversación');
      await enviarMensajeError(senderId);
      return;
    }
    console.log(`✅ Conversación obtenida: ${conversacion.id}`);

    // Guardar mensaje del usuario
    console.log('💾 Guardando mensaje del usuario...');
    await guardarMensaje(conversacion.id, mensajeTexto, 'usuario', {
      facebook_message_id: message.mid,
      timestamp: Date.now()
    });
    console.log('✅ Mensaje del usuario guardado');

    // Obtener mensajes recientes para contexto
    console.log('📚 Obteniendo mensajes recientes...');
    const mensajesRecientes = await getMensajesRecientes(conversacion.id, 15);
    console.log(`✅ ${mensajesRecientes.length} mensajes recientes obtenidos`);

    // Generar respuesta usando OpenAI
    console.log('🤖 Generando respuesta con OpenAI...');
    console.log(`🔧 Modelo configurado: ${process.env.OPENAI_MODEL || 'no configurado'}`);
    const respuestaBot = await generateResponse(
      mensajeTexto,
      mensajesRecientes,
      conversacion.resumen_contexto,
      cliente
    );
    console.log(`✅ Respuesta generada: ${respuestaBot.substring(0, 100)}...`);

    // Enviar respuesta
    console.log('📤 Enviando respuesta...');
    if (process.env.NODE_ENV !== 'development') {
      await sendMessage(senderId, { text: respuestaBot });
    } else {
      console.log('Simulated send: ', respuestaBot);
    }
    console.log('✅ Respuesta enviada');

    // Guardar respuesta del bot
    console.log('💾 Guardando respuesta del bot...');
    await guardarMensaje(conversacion.id, respuestaBot, 'bot', {
      timestamp: Date.now()
    });
    console.log('✅ Respuesta del bot guardada');

    console.log(`🎉 Proceso completado exitosamente para ${senderId}`);

  } catch (error: any) {
    console.error('❌ ERROR EN procesarMensaje:', error);
    console.error('📍 Stack trace:', error.stack);
    console.error('🔍 Detalles del error:', JSON.stringify(error, null, 2));
    console.error('🔧 Tipo de error:', error.constructor.name);
    console.error('💬 Mensaje de error:', error.message);
    await enviarMensajeError(messagingEvent.sender.id);
  }
}

// Función para enviar mensaje de error
async function enviarMensajeError(senderId: string) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      await sendMessage(senderId, {
        text: 'Disculpa, hubo un problema técnico. ¿Puedes intentar de nuevo en un momento?'
      });
    } else {
      console.log('Simulated error message send');
    }
  } catch (error: any) {
    console.error('Error enviando mensaje de error:', error);
console.error('Stack trace:', error.stack);
  }
}

export { handler };