import { Handler } from '@netlify/functions';
import { generateResponse } from '../../lib/openai';
import { getClienteByPageId } from '../../lib/database';

const handler: Handler = async (event, context) => {
  try {
    console.log('🔍 Iniciando test completo del flujo...');

    // Simular datos de cliente (usando el primer cliente disponible)
    const cliente = {
      id_cliente: 1,
      nombre_negocio: "Test Llantas",
      telefono: "123456789",
      direccion: "Test Address",
      horarios: "Lun-Vie 8-18",
      servicios: "Venta y reparación de llantas",
      page_id: "test"
    };

    console.log('✅ Cliente simulado:', cliente.nombre_negocio);

    // Simular mensaje del usuario
    const mensajeUsuario = "Tiene servicio a domicilio? se me reventó una llanta";
    console.log('📝 Mensaje de prueba:', mensajeUsuario);

    // Simular mensajes recientes vacíos (nueva conversación)
    const mensajesRecientes: any[] = [];
    const resumenContexto = null;

    console.log('🤖 Llamando a generateResponse...');

    // Llamar a generateResponse exactamente como lo hace el webhook
    const respuesta = await generateResponse(
      mensajeUsuario,
      mensajesRecientes,
      resumenContexto,
      cliente
    );

    console.log('✅ Respuesta generada exitosamente:', respuesta);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        mensaje_usuario: mensajeUsuario,
        respuesta_bot: respuesta,
        cliente: cliente.nombre_negocio,
        timestamp: new Date().toISOString()
      }, null, 2)
    };

  } catch (error: any) {
    console.error('❌ Error en test completo:', error);
    console.error('Stack trace:', error.stack);
    console.error('Detalles del error:', JSON.stringify(error, null, 2));

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
        details: error
      }, null, 2)
    };
  }
};

export { handler };