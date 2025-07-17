// Script para configurar Claude como proveedor de IA
console.log('🤖 CONFIGURACIÓN DE CLAUDE COMO PROVEEDOR DE IA\n');

console.log('📋 PASOS PARA CONFIGURAR CLAUDE:');
console.log('');

console.log('1️⃣ OBTENER API KEY DE ANTHROPIC:');
console.log('   • Ve a: https://console.anthropic.com/');
console.log('   • Crea una cuenta o inicia sesión');
console.log('   • Ve a "API Keys" en el dashboard');
console.log('   • Crea una nueva API Key');
console.log('   • Copia la clave (empieza con "sk-ant-...")');
console.log('');

console.log('2️⃣ CONFIGURAR EN NETLIFY:');
console.log('   • Ve a tu dashboard de Netlify');
console.log('   • Selecciona tu sitio "llantas-bot-2"');
console.log('   • Ve a Site settings → Environment variables');
console.log('   • Agrega estas variables:');
console.log('');
console.log('   Variable: ANTHROPIC_API_KEY');
console.log('   Valor: tu_api_key_de_anthropic');
console.log('');
console.log('   Variable: AI_PROVIDER');
console.log('   Valor: claude');
console.log('');
console.log('   Variable: ANTHROPIC_MODEL');
console.log('   Valor: claude-3-sonnet-20240229');
console.log('');

console.log('3️⃣ DEPLOY AUTOMÁTICO:');
console.log('   • Una vez guardadas las variables, Netlify hará deploy automático');
console.log('   • El bot usará Claude en lugar de OpenAI');
console.log('   • Si Claude falla, automáticamente usará OpenAI como respaldo');
console.log('');

console.log('4️⃣ VENTAJAS DE CLAUDE:');
console.log('   ✅ Más confiable y estable');
console.log('   ✅ Mejor comprensión del contexto');
console.log('   ✅ Respuestas más naturales');
console.log('   ✅ Menos propenso a errores de API');
console.log('   ✅ Mejor manejo de herramientas');
console.log('');

console.log('5️⃣ ALTERNATIVA RÁPIDA - SOLO CAMBIAR PROVEEDOR:');
console.log('   Si ya tienes OpenAI funcionando, solo cambia:');
console.log('   • AI_PROVIDER: openai (para usar OpenAI)');
console.log('   • AI_PROVIDER: claude (para usar Claude)');
console.log('');

console.log('🔧 TROUBLESHOOTING:');
console.log('   • Si Claude no responde: revisa la API key');
console.log('   • Si hay errores: el sistema usará OpenAI automáticamente');
console.log('   • Para debug: revisa los logs en Netlify Functions');
console.log('');

console.log('💡 RECOMENDACIÓN:');
console.log('   Configura Claude como principal y mantén OpenAI como respaldo');
console.log('   Esto te dará la máxima confiabilidad.');
console.log('');

console.log('🚀 UNA VEZ CONFIGURADO:');
console.log('   ¡El bot debería funcionar mucho mejor!');
console.log('   Claude es más estable y da mejores respuestas.');

console.log('\n✅ ¿Necesitas ayuda con algún paso específico?');