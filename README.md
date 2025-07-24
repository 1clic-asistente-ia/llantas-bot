# Llantas Bot
## Descripción

Bot inteligente para llanterías en Facebook Messenger, con enfoque anti-flow para conversaciones naturales. Usa Next.js, Supabase, OpenAI y Facebook API. Soporte multi-tenant para múltiples llanteras, gestión de inventario y escalamiento a humanos.

## Stack Tecnológico
- Next.js 14 (TypeScript)
- Supabase (PostgreSQL)
- OpenAI (gpt-4)
- Facebook Messenger API
- Tailwind CSS
- Deployment: Vercel o Netlify

## Instalación
1. Clona el repositorio: `git clone https://github.com/1clic-asistente-ia/llantas-bot.git`
2. Navega al directorio: `cd llantas-bot`
3. Instala dependencias: `npm install`
4. Copia `.env.example` a `.env.local` y llena con tus credenciales.

## Ejecución Local
- Desarrollo: `npm run dev` (corre en http://localhost:3000)
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## Despliegue en Netlify
1. Instala Netlify CLI: `npm install -g netlify-cli`
2. Inicia sesión: `netlify login`
3. Ejecuta localmente funciones: `netlify dev`
4. Crea un archivo `.env` en la raíz y copia las variables necesarias:
   - FACEBOOK_VERIFY_TOKEN
   - FACEBOOK_APP_SECRET
   - OPENAI_API_KEY
   - NEXT_PUBLIC_SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
5. Despliega: `netlify deploy --prod`
6. Usa la URL generada por Netlify para configurar el webhook en Facebook: `https://<tu-site>.netlify.app/.netlify/functions/webhook`

## Estructura de Carpetas
- `app/`: Rutas y páginas
- `components/`: Componentes React
- `lib/`: Utilidades y clientes (Supabase, OpenAI)
- `public/`: Archivos estáticos
- `utils/`: Funciones helper
- `netlify/functions/`: Funciones serverless para Netlify (webhook)

## Próximos Pasos
- Implementar webhook de Messenger.
- Configurar cliente Supabase para multi-tenant.
- Desarrollar Prompt Maestro y herramientas de IA.
- Agregar panel admin.

Para más detalles, consulta Plan Mejorado Anti-Flow.md.