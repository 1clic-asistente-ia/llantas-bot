// Deploy con Claude configurado
console.log('🚀 DEPLOY CON CLAUDE CONFIGURADO\n');

console.log('📋 ARCHIVOS MODIFICADOS:');
console.log('✅ lib/claude.ts - Nuevo proveedor de IA');
console.log('✅ package.json - Dependencia de Anthropic agregada');
console.log('✅ netlify/functions/webhook.ts - Soporte para Claude + fallback');
console.log('');

console.log('🎯 OPCIONES DE DEPLOY:');
console.log('');

console.log('OPCIÓN A - DEPLOY MANUAL EN GITHUB:');
console.log('1. Ve a: https://github.com/1clic-asistente-ia/llantas-bot');
console.log('2. Edita estos archivos directamente:');
console.log('   • package.json (agregar "@anthropic-ai/sdk": "^0.24.3")');
console.log('   • Subir lib/claude.ts');
console.log('   • Actualizar netlify/functions/webhook.ts');
console.log('3. Commit → Deploy automático');
console.log('');

console.log('OPCIÓN B - NETLIFY MANUAL:');
console.log('1. Ve a Netlify Dashboard');
console.log('2. Deploys → Drag and drop');
console.log('3. Arrastra la carpeta del proyecto');
console.log('');

console.log('OPCIÓN C - CONFIGURAR SOLO VARIABLES:');
console.log('Si no quieres cambiar código ahora:');
console.log('1. Ve a Netlify → Environment variables');
console.log('2. Cambia AI_PROVIDER de "claude" a "openai"');
console.log('3. Esto usará OpenAI (que ya funciona)');
console.log('4. Luego puedes agregar Claude cuando tengas tiempo');
console.log('');

console.log('🔧 VARIABLES DE ENTORNO NECESARIAS:');
console.log('Para Claude:');
console.log('• ANTHROPIC_API_KEY=tu_clave_de_anthropic');
console.log('• AI_PROVIDER=claude');
console.log('• ANTHROPIC_MODEL=claude-3-sonnet-20240229');
console.log('');
console.log('Para OpenAI (actual):');
console.log('• OPENAI_API_KEY=tu_clave_actual');
console.log('• AI_PROVIDER=openai');
console.log('• OPENAI_MODEL=gpt-4');
console.log('');

console.log('💡 RECOMENDACIÓN INMEDIATA:');
console.log('1. Primero asegúrate que OpenAI funcione');
console.log('2. Configura AI_PROVIDER=openai en Netlify');
console.log('3. Haz deploy');
console.log('4. Prueba el bot');
console.log('5. Si funciona, luego agrega Claude');
console.log('');

console.log('🎯 DIAGNÓSTICO RÁPIDO:');
console.log('¿El problema es OpenAI o la configuración general?');
console.log('• Revisa logs en Netlify Functions');
console.log('• Verifica que OPENAI_API_KEY esté configurada');
console.log('• Confirma que las tablas existan en Supabase');
console.log('');

console.log('🚀 PRÓXIMOS PASOS:');
console.log('1. ¿Quieres probar primero con OpenAI funcionando?');
console.log('2. ¿O prefieres ir directo a Claude?');
console.log('3. ¿Necesitas ayuda con alguna configuración específica?');

console.log('\n✅ ¡Dime qué opción prefieres y continuamos!');