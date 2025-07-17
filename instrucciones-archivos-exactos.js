console.log('='.repeat(60));
console.log('📋 ARCHIVOS EXACTOS PARA CLAUDE SIMPLE - SIN FALLBACK');
console.log('='.repeat(60));

console.log('\n🎯 PASO 1: ARCHIVOS CREADOS PARA TI');
console.log('Los siguientes archivos contienen el código exacto que necesitas:');
console.log('');
console.log('📁 contenido-claude-ts.txt');
console.log('   → Copiar contenido a: lib/claude.ts');
console.log('');
console.log('📁 contenido-webhook-ts.txt (ACTUALIZADO)');
console.log('   → Copiar contenido a: netlify/functions/webhook.ts');
console.log('   → ✅ Ahora usa SOLO Claude, sin fallback');
console.log('');
console.log('📁 contenido-package-json.txt');
console.log('   → Copiar contenido a: package.json');

console.log('\n🚀 PASO 2: SUBIR ARCHIVOS');
console.log('Ve a tu repositorio en GitHub y actualiza estos 3 archivos:');
console.log('');
console.log('1. lib/claude.ts (nuevo archivo)');
console.log('2. netlify/functions/webhook.ts (reemplazar)');
console.log('3. package.json (reemplazar)');

console.log('\n⚙️ PASO 3: CONFIGURAR VARIABLES EN NETLIFY');
console.log('Ve a tu sitio en Netlify → Site settings → Environment variables');
console.log('');
console.log('🔑 Variables requeridas para Claude:');
console.log('ANTHROPIC_API_KEY = tu_api_key_de_anthropic');
console.log('ANTHROPIC_MODEL = claude-3-sonnet-20240229');
console.log('');
console.log('🔑 Variables existentes (mantener):');
console.log('SUPABASE_URL = (tu URL actual)');
console.log('SUPABASE_ANON_KEY = (tu clave actual)');
console.log('FACEBOOK_ACCESS_TOKEN = (tu token actual)');
console.log('FACEBOOK_VERIFY_TOKEN = (tu token actual)');
console.log('FACEBOOK_APP_SECRET = (tu secreto actual)');
console.log('');
console.log('❌ Variables que ya NO necesitas:');
console.log('OPENAI_API_KEY (puedes eliminar)');
console.log('OPENAI_MODEL (puedes eliminar)');
console.log('AI_PROVIDER (puedes eliminar)');

console.log('\n🎯 PASO 4: OBTENER API KEY DE ANTHROPIC');
console.log('1. Ve a: https://console.anthropic.com/');
console.log('2. Crea una cuenta o inicia sesión');
console.log('3. Ve a "API Keys" en el menú');
console.log('4. Crea una nueva API key');
console.log('5. Copia la clave (empieza con "sk-ant-")');

console.log('\n✅ PASO 5: VERIFICAR FUNCIONAMIENTO');
console.log('Después de configurar todo:');
console.log('1. Espera 2-3 minutos para que se despliegue');
console.log('2. Envía "Hola" a tu página de Facebook');
console.log('3. El bot debería responder usando Claude');
console.log('4. Si hay error, revisa los logs en Netlify');

console.log('\n🎉 VENTAJAS DE ESTA CONFIGURACIÓN:');
console.log('• Configuración más simple');
console.log('• Sin conflictos entre proveedores');
console.log('• Menos variables de entorno');
console.log('• Más fácil de diagnosticar problemas');
console.log('• Claude es más conversacional que OpenAI');

console.log('\n🆘 SI ALGO FALLA:');
console.log('• Revisa los logs en Netlify Functions');
console.log('• Verifica que ANTHROPIC_API_KEY esté configurada');
console.log('• Asegúrate de que la API key sea válida');
console.log('• Verifica que ANTHROPIC_MODEL esté configurado');

console.log('\n' + '='.repeat(60));
console.log('🎯 ¡PERFECTO! Configuración simple con solo Claude');
console.log('='.repeat(60));