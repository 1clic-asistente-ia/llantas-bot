import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { supabase } from '@/lib/supabase';
import { sendMessage, markSeen, typingOn } from '@/lib/facebook';
import { generateResponse } from '@/lib/openai';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.FACEBOOK_VERIFY_TOKEN) {
    return NextResponse.json(challenge, { status: 200 });
  }

  return NextResponse.json('Invalid verification', { status: 403 });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('x-hub-signature-256') || '';

  // Validar firma
  const hmac = crypto.createHmac('sha256', process.env.FACEBOOK_APP_SECRET!);
  hmac.update(body);
  const expectedSignature = 'sha256=' + hmac.digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return NextResponse.json('Invalid signature', { status: 403 });
  }

  const payload = JSON.parse(body);

  // Procesar entradas (solo Messenger por ahora)
  if (payload.object === 'page') {
    for (const entry of payload.entry) {
      for (const messagingEvent of entry.messaging) {
        const senderId = messagingEvent.sender.id;
        const pageId = entry.id; // Este es el ID de la página de Facebook
        const message = messagingEvent.message?.text;

        if (message) {
          await markSeen(senderId);
          await typingOn(senderId);

          // 1. Obtener la configuración del cliente desde Supabase usando el pageId
          const { data: cliente, error: clienteError } = await supabase
            .from('clientes')
            .select('*')
            .eq('facebook_page_id', pageId)
            .single();

          if (clienteError || !cliente) {
            console.error('Error o no se encontró cliente para pageId:', pageId, clienteError);
            // Opcional: enviar un mensaje de error o simplemente ignorar
            continue; // Continuar con el siguiente evento
          }

          // 2. Registrar el mensaje entrante
          await supabase.from('mensajes').insert([
            { 
              cliente_id: cliente.id,
              remitente: 'usuario',
              contenido: message,
              facebook_sender_id: senderId
            }
          ]);

          // 3. Obtener historial de conversación
          const { data: conversationHistory, error: historyError } = await supabase
            .from('mensajes')
            .select('remitente, contenido')
            .eq('facebook_sender_id', senderId)
            .order('creado_en', { ascending: true })
            .limit(10);

          // 4. Llamar a la IA (Claude) con el prompt y el historial
          const aiResponse = await generateResponse(message, conversationHistory || [], '', cliente);
          // 5. Enviar respuesta de la IA al usuario
          await sendMessage(senderId, { text: aiResponse });

          // 6. Registrar la respuesta de la IA
          await supabase.from('mensajes').insert([
            { 
              cliente_id: cliente.id,
              remitente: 'bot',
              contenido: aiResponse,
              facebook_sender_id: senderId
            }
          ]);
        }
      }
    }
  }

  return NextResponse.json('EVENT_RECEIVED', { status: 200 });
}
const aiResponse = await generateResponse(message, conversationHistory || [], '', cliente);