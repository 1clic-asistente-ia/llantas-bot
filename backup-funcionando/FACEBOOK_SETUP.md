# 🤖 Bot de Llanteras - Configuración de Facebook

## 📋 Pasos para Conectar con Facebook Messenger

### 1. Configurar Variables de Entorno en Netlify

Ve al panel de Netlify → Site settings → Environment variables y agrega:

```
NEXT_PUBLIC_SUPABASE_URL=https://ixqjqvfqtqjqjqjqjqjq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4
FACEBOOK_PAGE_ACCESS_TOKEN=EAABwzLixnjYBO...
FACEBOOK_APP_SECRET=abc123...
FACEBOOK_VERIFY_TOKEN=mi_token_secreto_123
```

### 2. Configurar Webhook en Facebook

1. Ve a [Facebook for Developers](https://developers.facebook.com/)
2. Selecciona tu aplicación
3. Ve a **Messenger** → **Settings**
4. En **Webhooks**, haz clic en **Add Callback URL**:
   - **Callback URL**: `https://llanteras-bot.netlify.app/.netlify/functions/webhook`
   - **Verify Token**: `mi_token_secreto_123` (debe coincidir con FACEBOOK_VERIFY_TOKEN)
5. Selecciona los eventos de suscripción:
   - ✅ `messages`
   - ✅ `messaging_postbacks`
   - ✅ `messaging_optins`
   - ✅ `message_deliveries`
   - ✅ `message_reads`

### 3. Suscribir la Página

1. En **Messenger** → **Settings**
2. En **Webhooks**, busca tu página
3. Haz clic en **Subscribe** para conectar la página al webhook

### 4. Verificar Configuración

1. Envía un mensaje de prueba a tu página de Facebook
2. Revisa los logs en Netlify Functions para verificar que se reciben los mensajes
3. El bot debería responder automáticamente

## 🔧 Estructura del Proyecto

```
netlify/functions/
├── webhook.ts          # Webhook principal de Facebook
lib/
├── facebook.ts         # API de Facebook Messenger
├── database.ts         # Funciones de base de datos
├── openai.ts          # Integración con OpenAI
└── supabase.ts        # Cliente de Supabase
```

## 🎯 Funcionalidades del Bot

- **Conversación Natural**: Sin flujos rígidos, respuestas contextuales
- **Búsqueda de Llantas**: Por medida y marca en inventario real
- **Medidas Compatibles**: Sugerencias cuando no hay stock exacto
- **Multi-tenant**: Soporte para múltiples llanteras
- **Contexto Híbrido**: Memoria de conversaciones anteriores
- **Herramientas Inteligentes**: Búsqueda, información del negocio, escalación

## 🚀 Próximos Pasos

1. ✅ Configurar variables de entorno en Netlify
2. ✅ Configurar webhook en Facebook
3. 🔄 Probar el bot con mensajes reales
4. 📊 Monitorear logs y métricas
5. 🎨 Ajustar respuestas según feedback

## 📞 Soporte

Si tienes problemas con la configuración, revisa:
- Los logs de Netlify Functions
- La configuración de variables de entorno
- Los permisos de la aplicación de Facebook
- La suscripción del webhook a la página