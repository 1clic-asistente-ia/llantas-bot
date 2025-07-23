# 🔧 SOLUCIÓN AL ERROR TÉCNICO DEL BOT

## 🎯 Problema Identificado
El bot está devolviendo "Disculpa, hubo un problema técnico" porque hay un error en la conexión con OpenAI.

## 🔍 Diagnóstico Realizado
- ✅ El código está correcto
- ✅ El modelo se cambió de GPT-4 a GPT-3.5-turbo
- ✅ Los cambios se desplegaron en Netlify
- ❌ **El error persiste = Problema con la API Key de OpenAI**

## 🚨 Causa Más Probable
La `OPENAI_API_KEY` en Netlify es:
- **Inválida** (copiada incorrectamente)
- **Expirada** (las API Keys pueden expirar)
- **Sin permisos** (no tiene acceso a GPT-3.5-turbo)
- **Límite excedido** (cuenta sin créditos)

## 🔧 SOLUCIÓN PASO A PASO

### 1. Verificar API Key en OpenAI
1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Verifica que tu API Key esté activa
3. Verifica que tengas créditos disponibles
4. Si es necesario, crea una nueva API Key

### 2. Actualizar en Netlify
1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Selecciona tu sitio "llanteras-bot"
3. Ve a **Site settings** → **Environment variables**
4. Busca `OPENAI_API_KEY`
5. **Actualiza el valor** con la API Key correcta
6. Guarda los cambios

### 3. Verificar Otras Variables
Asegúrate de que estas variables estén configuradas:
```
OPENAI_API_KEY=sk-proj-... (tu API Key real)
OPENAI_MODEL=gpt-3.5-turbo
FACEBOOK_PAGE_ACCESS_TOKEN=EAABwzLixnjYBO...
FACEBOOK_APP_SECRET=abc123...
FACEBOOK_VERIFY_TOKEN=mi_token_secreto_123
```

### 4. Forzar Redespliegue
Después de actualizar las variables:
1. Ve a **Deploys** en Netlify
2. Haz clic en **Trigger deploy** → **Deploy site**
3. Espera que termine el despliegue

### 5. Probar el Bot
1. Envía "Hola" al bot en Messenger
2. Debería responder normalmente
3. Si sigue fallando, revisa los logs en Netlify

## 🔍 Endpoint de Diagnóstico
Una vez desplegado, puedes usar este endpoint para verificar:
```
https://llanteras-bot.netlify.app/.netlify/functions/diagnostico?token=diagnostico_2024
```

## 📞 Si el Problema Persiste
1. Verifica que la API Key sea válida copiándola y pegándola en [OpenAI Playground](https://platform.openai.com/playground)
2. Revisa los logs de Netlify Functions para errores específicos
3. Considera crear una nueva API Key en OpenAI

## ⚡ Solución Rápida
**La causa más común es una API Key incorrecta en Netlify. Actualízala y el bot funcionará inmediatamente.**