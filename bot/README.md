# 🤘 Bot de WhatsApp — Rock Munchies

Bot que responde automáticamente por WhatsApp con el **menú**, el **link de pedido**,
**reservas**, **horario** y **ubicación**. Usa la **WhatsApp Cloud API oficial de Meta**.

## ¿Qué hace?

El cliente escribe y el bot responde solo según palabras clave:

| El cliente escribe… | El bot responde |
|---|---|
| `menú`, `pizza`, `carta` | Link al menú de la web |
| `pedido`, `delivery`, `pedir` | Link para armar el pedido |
| `reserva`, `mesa` | Link para reservar |
| `horario`, `abren` | Horario de atención |
| `ubicación`, `dónde` | Link al mapa |
| cualquier otra cosa / saludo | Mensaje de bienvenida con **botones** |

## 1) Requisitos en Meta (una sola vez)

1. Creá una cuenta en **Meta Business** → https://business.facebook.com
2. Entrá a **Meta for Developers** → https://developers.facebook.com →
   **My Apps → Create App → tipo *Business***.
3. Agregá el producto **WhatsApp** a la app.
4. En **WhatsApp → API Setup** vas a ver:
   - un **número de prueba**,
   - el **Phone Number ID** → copialo a `WA_PHONE_ID`,
   - un **token temporal** (24 h) → copialo a `WA_TOKEN`.
5. Agregá tu propio celular en *"To"* para poder probar.

> Para **producción**: verificá tu negocio, registrá tu número real y generá un
> **token permanente** (System User Token). El token temporal sirve solo para probar.

## 2) Correr el bot

```bash
cd bot
npm install
cp .env.example .env     # completá tus datos
npm start
```

El bot queda escuchando en `http://localhost:3000`.

## 3) Exponerlo a internet y conectar el webhook

Meta necesita una **URL pública con HTTPS**. Dos caminos:

- **Para probar local:** usá [ngrok](https://ngrok.com) → `ngrok http 3000`
  (te da una URL `https://xxxx.ngrok.io`).
- **Para producción:** desplegalo gratis en **Render**, **Railway** o **Vercel**
  (subí la carpeta `bot/` y configurá las variables de entorno del `.env`).

Luego, en **Meta → WhatsApp → Configuration → Webhook**:

1. **Callback URL:** `https://TU-DOMINIO/webhook`
2. **Verify token:** el mismo valor de `WA_VERIFY_TOKEN` (por defecto `rockmunchies123`).
3. Tocá **Verify and Save**.
4. En **Webhook fields**, suscribite a **`messages`**.

¡Listo! Escribile a tu número de WhatsApp y el bot responde solo. 🎸

## Notas

- Necesita **Node 18+** (usa `fetch` nativo).
- Validación de firma opcional: completá `WA_APP_SECRET` con el *App Secret* de tu app.
- Este bot da respuestas por palabras clave. Si querés flujos más avanzados
  (carrito dentro de WhatsApp, pagos, etc.) se puede ampliar o conectar con
  plataformas no-code como **Wati**, **ManyChat** o **Landbot**.
