# Llantas Bot

## Descripción

Bot inteligente para llanterías en Facebook Messenger, con enfoque anti-flow para conversaciones naturales. Usa Next.js, Supabase, OpenAI y Facebook API. Soporte para gestión de inventario y escalamiento a humanos.

## Stack Tecnológico
- Next.js 14 (TypeScript)
- Supabase (PostgreSQL)
- OpenAI (gpt-4)
- Facebook Messenger API
- Tailwind CSS
- Deployment: Netlify

## Instalación
1. Clona el repositorio: `git clone https://github.com/1clic-asistente-ia/llantas-bot.git`
2. Navega al directorio: `cd llantas-bot`
3. Instala dependencias: `npm install`
4. Copia `.env.example` a `.env.local` y completa con tus credenciales.

## Configuración de Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```
# Facebook Messenger API
FACEBOOK_VERIFY_TOKEN=your_verify_token_here
FACEBOOK_APP_SECRET=your_app_secret_here
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token_here

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Environment
NODE_ENV=development
```

## Configuración de Supabase

Este bot requiere las siguientes tablas en Supabase:

1. `conversaciones` - Para almacenar las conversaciones con los usuarios
2. `mensajes` - Para almacenar los mensajes de cada conversación
3. `inventario` - Para gestionar el inventario de llantas

Consulta los scripts en la carpeta `scripts` para crear estas tablas.

## Configuración de Facebook

Consulta el archivo `FACEBOOK_SETUP.md` para instrucciones detalladas sobre cómo configurar el bot en Facebook Messenger.

## Ejecución Local
- Desarrollo: `npm run dev` (corre en http://localhost:3000)
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## Despliegue en Netlify
1. Instala Netlify CLI: `npm install -g netlify-cli`
2. Inicia sesión: `netlify login`
3. Ejecuta localmente funciones: `netlify dev`
4. Crea un archivo `.env` en la raíz y copia las variables necesarias de tu `.env.local`
5. Despliega: `netlify deploy --prod`
6. Usa la URL generada por Netlify para configurar el webhook en Facebook: `https://<tu-site>.netlify.app/.netlify/functions/webhook`

## Estructura de Carpetas
- `app/`: Rutas y páginas de la aplicación Next.js
- `lib/`: Utilidades y clientes (Supabase, OpenAI, Facebook)
- `netlify/functions/`: Funciones serverless para Netlify (webhook)
- `scripts/`: Scripts útiles para configuración y diagnóstico

## Solución de Problemas

Si encuentras problemas con la configuración:

1. Verifica las variables de entorno en Netlify
2. Comprueba que el Page ID de Facebook esté correctamente configurado
3. Revisa los logs de Netlify Functions
4. Ejecuta los scripts de diagnóstico en la carpeta `scripts`

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios antes de enviar un pull request.