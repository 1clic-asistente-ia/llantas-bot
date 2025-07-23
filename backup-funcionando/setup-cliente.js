// Nueva implementación con soporte para token_messenger
const { crearClienteConToken } = require('./lib/database');

async function main() {
  const pageId = process.argv[2];
  
  if (!pageId) {
    console.error('❌ Debes proporcionar el Facebook Page ID como primer argumento');
    process.exit(1);
  }

  const resultado = await crearClienteConToken({
    nombre_negocio: 'Mi Llantera',
    facebook_page_id: pageId,
    token_messenger: process.env.FACEBOOK_PAGE_ACCESS_TOKEN
  });

  if (resultado.error) {
    console.error('❌ Error creando cliente:', resultado.error);
    process.exit(1);
  }

  console.log('✅ Cliente creado correctamente con token:');
  console.log('ID:', resultado.cliente.id);
  console.log('Page ID:', resultado.cliente.facebook_page_id);
}

main();