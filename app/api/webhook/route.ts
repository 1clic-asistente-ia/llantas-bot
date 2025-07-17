import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { supabase } from '@/lib/supabase';
import { openai } from '@/lib/openai';

// TODO: Implementar lógica completa de procesamiento de mensajes

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

  return NextResponse.json('EVENT_RECEIVED', { status: 200 });
}