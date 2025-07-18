import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Función principal para generar respuesta con Claude
export async function getClaudeResponse(
  promptMaestro: string,
  mensajeUsuario: string,
  historialConversacion: { remitente: string; contenido: string }[]
): Promise<string> {
  try {
    const messages = historialConversacion.map(msg => ({
      role: msg.remitente === 'usuario' ? 'user' : 'assistant',
      content: msg.contenido
    }));
    messages.push({ role: 'user', content: mensajeUsuario });

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      system: promptMaestro,
      messages: messages,
    });

    const responseText = response.content[0].text;
    return responseText;

  } catch (error) {
    console.error('Error generando respuesta de Claude:', error);
    return 'Lo siento, estoy teniendo problemas para procesar tu solicitud en este momento.';
  }
}