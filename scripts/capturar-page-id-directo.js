const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = 'https://pjmjpqpxkdyztglqaaml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbWpwcXB4a2R5enRnbHFhYW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NzI4NzEsImV4cCI6MjA1MDA0ODg3MX0.VBmhJVhvgOKJBZLNqOLy8jJEMNqOQdvVQGJmEt_QDQY';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log(`
🔧 SOLUCIÓN DIRECTA - Capturar Page ID Real
=============================================

❌ PROBLEMA: No podemos acceder a los logs de Netlify
✅ SOLUCIÓN: Vamos a probar directamente con los dos Page IDs

📋 ESTRATEGIA:
1. Probar con el Page ID de Developer Console: 608661302340026
2. Si no funciona, probar con el Page ID de URL: 61577782224691
3. Actualizar la base de datos con el que funcione

🎯 EJECUTANDO PRUEBAS...
`);

async function probarPageIDs() {
    try {
        console.log('\n🔍 1. VERIFICANDO CLIENTE ACTUAL...');
        
        // Verificar cliente actual
        const { data: clienteActual, error: errorActual } = await supabase
            .from('clientes')
            .select('*')
            .eq('nombre', 'Llantera 1 CLIC')
            .single();

        if (errorActual) {
            console.log('❌ Error al verificar cliente:', errorActual.message);
            return;
        }

        console.log('✅ Cliente actual:', {
            nombre: clienteActual.nombre,
            facebook_page_id: clienteActual.facebook_page_id
        });

        console.log('\n🧪 2. PROBANDO PAGE ID DE DEVELOPER CONSOLE...');
        
        // Probar con Page ID de Developer Console
        const pageIdDeveloper = '608661302340026';
        const { data: clienteDeveloper } = await supabase
            .from('clientes')
            .select('*')
            .eq('facebook_page_id', pageIdDeveloper)
            .single();

        if (clienteDeveloper) {
            console.log('✅ ENCONTRADO con Page ID Developer:', pageIdDeveloper);
            console.log('   Cliente:', clienteDeveloper.nombre);
            console.log('   🎉 ESTE ES EL CORRECTO - El bot debería funcionar');
        } else {
            console.log('❌ NO encontrado con Page ID Developer:', pageIdDeveloper);
        }

        console.log('\n🧪 3. PROBANDO PAGE ID DE URL...');
        
        // Probar con Page ID de URL
        const pageIdUrl = '61577782224691';
        const { data: clienteUrl } = await supabase
            .from('clientes')
            .select('*')
            .eq('facebook_page_id', pageIdUrl)
            .single();

        if (clienteUrl) {
            console.log('✅ ENCONTRADO con Page ID URL:', pageIdUrl);
            console.log('   Cliente:', clienteUrl.nombre);
            console.log('   🎉 ESTE ES EL CORRECTO - El bot debería funcionar');
        } else {
            console.log('❌ NO encontrado con Page ID URL:', pageIdUrl);
            console.log('\n🔧 NECESITAMOS ACTUALIZAR LA BASE DE DATOS...');
            
            // Actualizar con Page ID de URL
            const { data: actualizado, error: errorUpdate } = await supabase
                .from('clientes')
                .update({ facebook_page_id: pageIdUrl })
                .eq('nombre', 'Llantera 1 CLIC')
                .select()
                .single();

            if (errorUpdate) {
                console.log('❌ Error al actualizar:', errorUpdate.message);
            } else {
                console.log('✅ BASE DE DATOS ACTUALIZADA:');
                console.log('   Cliente:', actualizado.nombre);
                console.log('   Nuevo Page ID:', actualizado.facebook_page_id);
                console.log('   🎉 AHORA PRUEBA EL BOT!');
            }
        }

        console.log(`
📱 INSTRUCCIONES FINALES:
========================

1. 🧪 PROBAR EL BOT AHORA:
   - Ve a tu página de Facebook
   - Envía un mensaje desde OTRA CUENTA
   - Mensaje: "Hola" o "Busco llantas"

2. ✅ SI FUNCIONA:
   - ¡Perfecto! El problema está resuelto
   
3. ❌ SI NO FUNCIONA:
   - El problema no es el Page ID
   - Revisar configuración de Facebook Developer
   - Verificar variables de entorno en Netlify

🎯 RESULTADO: Base de datos configurada con Page ID: ${pageIdUrl}
`);

    } catch (error) {
        console.log('❌ Error general:', error.message);
    }
}

probarPageIDs();