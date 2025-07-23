import { generateResponse } from './lib/openai.ts';

async function testBot() {
  try {
    console.log('🔍 Iniciando test local del bot...');

    // Simular datos de cliente
    const cliente = {
      id_cliente: "1",
      nombre_negocio: "Test Llantas",
      facebook_page_id: "test_page_id",
      configuracion: {
        telefono: "123456789",
        direccion: "Test Address",
        horarios: "Lun-Vie 8-18",
        servicios: "Venta y reparación de llantas"
      },
      activo: true
    };

    console.log('✅ Cliente simulado:', cliente.nombre_negocio);

    // Simular mensaje del usuario
    const mensajeUsuario = "Tiene servicio a domicilio? se me reventó una llanta";
    console.log('📝 Mensaje de prueba:', mensajeUsuario);

    // Simular mensajes recientes vacíos (nueva conversación)
    const mensajesRecientes = [];
    const resumenContexto = "";

    console.log('🤖 Llamando a generateResponse...');

    // Llamar a generateResponse exactamente como lo hace el webhook
    const respuesta = await generateResponse(
      mensajeUsuario,
      mensajesRecientes,
      resumenContexto,
      cliente
    );

    console.log('✅ Respuesta generada exitosamente:');
    console.log(respuesta);

  } catch (error) {
    console.error('❌ Error en test local:', error);
    console.error('Stack trace:', error.stack);
    console.error('Detalles del error:', JSON.stringify(error, null, 2));
  }
}

testBot();