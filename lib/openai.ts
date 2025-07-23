import OpenAI from 'openai';
import { buscarLlantas, buscarCompatibles, Cliente } from './database';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prompt Maestro Anti-Flow
export const getPromptMaestro = (cliente: Cliente, contextSummary: string) => `
# IDENTIDAD Y PERSONALIDAD
Eres la secretaria virtual de ${cliente.nombre_negocio}. Eres profesional, cortés y servicial.
Tu objetivo es ayudar a los clientes a encontrar las llantas que necesitan, especializándote en llantas usadas de calidad.
Usas español neutro y culto, sin modismos ni regionalismos.
Eres conversacional y natural, NO sigues flujos rígidos.

# REGLAS ESTRICTAS
- NUNCA pidas nombre, teléfono o datos personales al inicio
- Si no sabes algo específico, di que no lo sabes y ofrece alternativas
- Si hay error técnico, informa profesionalmente sin alarmar
- Usa el nombre de usuario de Messenger como identificación natural
- Si no recuerda conversaciones previas: "No importa, con gusto te ayudo"
- Enfócate en resolver la necesidad del cliente, no en seguir un script

# HERRAMIENTAS DISPONIBLES
Tienes acceso a estas funciones que puedes usar cuando sea apropiado:

1. buscar_llantas(medida, marca?) - Buscar llantas específicas en inventario
2. buscar_compatibles(medida) - Encontrar medidas alternativas compatibles
3. info_negocio() - Información de horarios, dirección y contacto
4. escalar_humano() - Transferir conversación a operador humano

# CONTEXTO ACTUAL DE LA CONVERSACIÓN
${contextSummary || 'Nueva conversación iniciada'}

# FILOSOFÍA ANTI-FLOW
- Responde de manera natural y conversacional
- Adapta tu respuesta al contexto específico del mensaje
- No uses frases robóticas o predefinidas
- Si el cliente busca llantas, ayúdalo a encontrar exactamente lo que necesita
- Si no tienes la medida exacta, sugiere alternativas compatibles
- Mantén la conversación fluida y centrada en resolver su necesidad

# INSTRUCCIONES ESPECÍFICAS
- Cuando mencionen una medida de llanta, usa buscar_llantas() inmediatamente
- Si no hay resultados exactos, usa buscar_compatibles() para sugerir alternativas
- Si preguntan por horarios o ubicación, usa info_negocio()
- Si la consulta es muy compleja o específica, ofrece escalar_humano()
- Siempre confirma la medida antes de buscar para evitar errores
`;

// Herramientas disponibles para OpenAI
export const tools = [
  {
    type: "function" as const,
    function: {
      name: "buscar_llantas",
      description: "Buscar llantas específicas en el inventario por medida y opcionalmente por marca",
      parameters: {
        type: "object",
        properties: {
          medida: {
            type: "string",
            description: "Medida de la llanta (ej: 185/65R15, 205/55R16)"
          },
          marca: {
            type: "string",
            description: "Marca específica de llanta (opcional)"
          }
        },
        required: ["medida"]
      }
    }
  },
  {
    type: "function" as const,
    function: {
      name: "buscar_compatibles",
      description: "Buscar medidas de llantas compatibles cuando no hay disponibilidad de la medida exacta",
      parameters: {
        type: "object",
        properties: {
          medida: {
            type: "string",
            description: "Medida original solicitada para encontrar compatibles"
          }
        },
        required: ["medida"]
      }
    }
  },
  {
    type: "function" as const,
    function: {
      name: "info_negocio",
      description: "Obtener información del negocio como horarios, dirección y contacto",
      parameters: {
        type: "object",
        properties: {},
        required: []
      }
    }
  },
  {
    type: "function" as const,
    function: {
      name: "escalar_humano",
      description: "Transferir la conversación a un operador humano cuando la consulta es muy específica o compleja",
      parameters: {
        type: "object",
        properties: {
          razon: {
            type: "string",
            description: "Razón por la cual se escala a humano"
          }
        },
        required: ["razon"]
      }
    }
  }
];

// Función para ejecutar herramientas
export async function ejecutarHerramienta(
  nombreFuncion: string,
  argumentos: any,
  clienteId: string,
  cliente: Cliente
): Promise<string> {
  try {
    switch (nombreFuncion) {
      case 'buscar_llantas':
        const llantas = await buscarLlantas(clienteId, argumentos.medida, argumentos.marca);
        if (llantas.length === 0) {
          return `No encontré llantas de la medida ${argumentos.medida}${argumentos.marca ? ` marca ${argumentos.marca}` : ''} en este momento.`;
        }
        
        let resultado = `Encontré ${llantas.length} llanta${llantas.length > 1 ? 's' : ''} de la medida ${argumentos.medida}:\n\n`;
        llantas.forEach((llanta, index) => {
          resultado += `${index + 1}. ${llanta.marca} - $${llanta.precio} (${llanta.cantidad} disponible${llanta.cantidad > 1 ? 's' : ''})\n`;
          if (llanta.descripcion) resultado += `   ${llanta.descripcion}\n`;
        });
        
        return resultado;

      case 'buscar_compatibles':
        const compatibles = await buscarCompatibles(clienteId, argumentos.medida);
        if (compatibles.length === 0) {
          return `No encontré medidas compatibles disponibles en este momento.`;
        }
        
        let resultadoComp = `Como alternativa a ${argumentos.medida}, tengo estas medidas compatibles:\n\n`;
        compatibles.forEach((comp, index) => {
          resultadoComp += `${index + 1}. ${comp.medida} (${comp.cantidad} disponible${comp.cantidad > 1 ? 's' : ''})\n`;
        });
        resultadoComp += `\n¿Te interesa alguna de estas medidas?`;
        
        return resultadoComp;

      case 'info_negocio':
        const config = cliente.configuracion || {};
        return `📍 **${cliente.nombre_negocio}**\n\n` +
               `🕒 **Horarios:** ${config.horarios || 'Lunes a Sábado 9:00 AM - 6:00 PM'}\n` +
               `📍 **Dirección:** ${config.direccion || 'Consulta nuestra ubicación'}\n` +
               `📞 **Teléfono:** ${config.telefono || 'Disponible por Messenger'}\n\n` +
               `¿En qué más puedo ayudarte?`;

      case 'escalar_humano':
        return `Entiendo que necesitas atención más especializada. Un momento por favor, voy a conectarte con uno de nuestros especialistas que podrá ayudarte mejor con: ${argumentos.razon}\n\n` +
               `Mientras tanto, puedes seguir escribiéndome si tienes otras consultas.`;

      default:
        return 'Lo siento, no pude procesar esa solicitud en este momento.';
    }
  } catch (error) {
    console.error('Error ejecutando herramienta:', error);
    return 'Disculpa, hubo un problema técnico. ¿Puedes intentar de nuevo?';
  }
}

// Función principal para generar respuesta con herramientas
export async function generateResponse(
  mensajeUsuario: string,
  mensajesRecientes: any[],
  contextSummary: string,
  cliente: Cliente
): Promise<string> {
  try {
    const prompt = getPromptMaestro(cliente, contextSummary);
    
    const messages = [
      { role: 'system', content: prompt },
      ...mensajesRecientes.map(msg => ({
        role: msg.tipo === 'usuario' ? 'user' : 'assistant',
        content: msg.contenido
      })),
      { role: 'user', content: mensajeUsuario }
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: messages as any,
      tools: tools,
      tool_choice: 'auto',
      temperature: 0.7,
      max_tokens: 500
    });

    const respuesta = completion.choices[0].message;
    
    // Si hay tool calls, ejecutarlos
    if (respuesta.tool_calls && respuesta.tool_calls.length > 0) {
      let respuestaFinal = respuesta.content || '';
      
      for (const toolCall of respuesta.tool_calls) {
        const nombreFuncion = toolCall.function.name;
        const argumentos = JSON.parse(toolCall.function.arguments);
        
        const resultadoHerramienta = await ejecutarHerramienta(
          nombreFuncion,
          argumentos,
          cliente.id_cliente,
          cliente
        );
        
        // Generar respuesta final incorporando el resultado de la herramienta
        const finalCompletion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-4',
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: mensajeUsuario },
            { role: 'assistant', content: respuesta.content || '', tool_calls: respuesta.tool_calls },
            { role: 'tool', content: resultadoHerramienta, tool_call_id: toolCall.id }
          ] as any,
          temperature: 0.7,
          max_tokens: 500
        });
        
        respuestaFinal = finalCompletion.choices[0].message.content || resultadoHerramienta;
      }
      
      return respuestaFinal;
    }
    
    return respuesta.content || 'Disculpa, no pude generar una respuesta en este momento.';
    
  } catch (error) {
    console.error('Error generando respuesta:', error);
    return 'Disculpa, hubo un problema técnico. ¿Puedes intentar de nuevo en un momento?';
  }
}