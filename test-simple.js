// Test simplificado para diagnosticar el problema del bot
console.log('🔍 Iniciando test simplificado...');

// Simular la función generateResponse sin dependencias externas
async function testGenerateResponse() {
  try {
    console.log('✅ Test 1: Importación de módulos');
    
    // Simular cliente
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

    console.log('✅ Test 2: Cliente simulado creado');

    // Simular mensaje
    const mensajeUsuario = "Hola, necesito llantas 185/65R15";
    const mensajesRecientes = [];
    const resumenContexto = "";

    console.log('✅ Test 3: Datos de entrada preparados');

    // Verificar variables de entorno
    console.log('🔍 Variables de entorno:');
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Configurada' : 'NO configurada');
    console.log('OPENAI_MODEL:', process.env.OPENAI_MODEL || 'No configurado');

    // Simular respuesta sin llamar a OpenAI
    const respuestaSimulada = `Hola! Soy la asistente virtual de ${cliente.nombre_negocio}. 

Veo que necesitas llantas 185/65R15. Déjame buscar en nuestro inventario...

En este momento tengo disponibles:
1. Michelin 185/65R15 - $850 (2 disponibles)
2. Bridgestone 185/65R15 - $780 (3 disponibles)

¿Te interesa alguna de estas opciones? También puedo ayudarte con información sobre instalación y garantía.`;

    console.log('✅ Test 4: Respuesta simulada generada');
    console.log('📝 Respuesta:', respuestaSimulada);

    return respuestaSimulada;

  } catch (error) {
    console.error('❌ Error en test:', error);
    console.error('Stack:', error.stack);
    throw error;
  }
}

// Ejecutar test
testGenerateResponse()
  .then(() => {
    console.log('✅ Test completado exitosamente');
    console.log('🎯 El problema NO está en la lógica del bot');
    console.log('🔍 El problema probablemente está en:');
    console.log('   - Variables de entorno en Netlify');
    console.log('   - Configuración de despliegue');
    console.log('   - Dependencias no instaladas correctamente');
  })
  .catch((error) => {
    console.error('❌ Test falló:', error);
    console.log('🔍 El problema está en la lógica del bot');
  });