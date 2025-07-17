// Instrucciones específicas para deploy con Claude
console.log('🚀 DEPLOY CON CLAUDE - OPCIÓN B\n');

console.log('📋 PASO 1: OBTENER API KEY DE ANTHROPIC');
console.log('1. Ve a: https://console.anthropic.com/');
console.log('2. Crea cuenta o inicia sesión');
console.log('3. Ve a "API Keys" en el menú lateral');
console.log('4. Clic en "Create Key"');
console.log('5. Copia la clave (empieza con "sk-ant-...")');
console.log('');

console.log('📋 PASO 2: CONFIGURAR EN NETLIFY');
console.log('1. Ve a: https://app.netlify.com/');
console.log('2. Busca tu sitio "llantas-bot-2"');
console.log('3. Clic en el sitio → Site settings');
console.log('4. En el menú lateral: Environment variables');
console.log('5. Agrega estas 3 variables:');
console.log('');
console.log('   🔑 Variable 1:');
console.log('   Name: ANTHROPIC_API_KEY');
console.log('   Value: [tu_clave_que_copiaste]');
console.log('');
console.log('   🔑 Variable 2:');
console.log('   Name: AI_PROVIDER');
console.log('   Value: claude');
console.log('');
console.log('   🔑 Variable 3:');
console.log('   Name: ANTHROPIC_MODEL');
console.log('   Value: claude-3-sonnet-20240229');
console.log('');

console.log('📋 PASO 3: DEPLOY DE ARCHIVOS');
console.log('Opción 3A - GitHub (Recomendado):');
console.log('1. Ve a: https://github.com/1clic-asistente-ia/llantas-bot');
console.log('2. Edita package.json → Agrega en dependencies:');
console.log('   "@anthropic-ai/sdk": "^0.24.3",');
console.log('3. Crea archivo lib/claude.ts (copiar contenido)');
console.log('4. Edita netlify/functions/webhook.ts (actualizar imports)');
console.log('5. Commit → Deploy automático');
console.log('');

console.log('Opción 3B - Netlify Drag & Drop:');
console.log('1. Ve a Netlify → Deploys');
console.log('2. Arrastra toda la carpeta llantas-bot');
console.log('3. Espera el deploy');
console.log('');

console.log('📋 PASO 4: VERIFICAR');
console.log('1. Ve a Netlify → Functions');
console.log('2. Revisa que webhook esté activo');
console.log('3. Prueba enviando mensaje al bot');
console.log('4. Revisa logs en Functions → webhook');
console.log('');

console.log('🎯 ARCHIVOS QUE NECESITAS SUBIR:');
console.log('✅ package.json (con @anthropic-ai/sdk)');
console.log('✅ lib/claude.ts (archivo nuevo)');
console.log('✅ netlify/functions/webhook.ts (modificado)');
console.log('');

console.log('🔧 SI HAY PROBLEMAS:');
console.log('• Revisa que la API key sea correcta');
console.log('• Verifica que AI_PROVIDER=claude');
console.log('• El sistema usará OpenAI como fallback automáticamente');
console.log('');

console.log('💡 VENTAJA:');
console.log('Con este setup, si Claude falla → OpenAI automáticamente');
console.log('¡Máxima confiabilidad!');
console.log('');

console.log('🚀 ¿En qué paso necesitas ayuda?');
console.log('1. ¿Obtener API key de Anthropic?');
console.log('2. ¿Configurar variables en Netlify?');
console.log('3. ¿Hacer el deploy de archivos?');
console.log('4. ¿Verificar que funcione?');

console.log('\n✅ ¡Dime en qué paso estás y te ayudo!');