/* =========================================================
   ROCK MUNCHIES — Bot de WhatsApp (WhatsApp Cloud API · Meta)
   Responde automáticamente con menú, link de pedido, reservas,
   horario y ubicación. Node 18+ (usa fetch nativo).
   ========================================================= */

import express from "express";
import crypto from "crypto";

const app = express();

// Guardamos el cuerpo crudo para poder validar la firma de Meta
app.use(express.json({ verify: (req, _res, buf) => { req.rawBody = buf; } }));

/* ---------- Configuración (vía variables de entorno) ---------- */
const {
  WA_TOKEN,                 // Token de acceso de WhatsApp (Meta)
  WA_PHONE_ID,              // Phone Number ID
  WA_VERIFY_TOKEN = "rockmunchies123", // palabra de verificación del webhook
  WA_APP_SECRET,            // (opcional) App Secret para validar la firma
  SITE_URL = "https://TU-WEB.com",
  PORT = 3000,
} = process.env;

const GRAPH = "https://graph.facebook.com/v21.0";

/* ---------- Verificación del webhook (Meta la pide 1 vez) ---------- */
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === WA_VERIFY_TOKEN) {
    console.log("✅ Webhook verificado");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

/* ---------- Validación opcional de la firma de Meta ---------- */
function firmaValida(req) {
  if (!WA_APP_SECRET) return true; // si no configuraste el secret, no validamos
  const firma = req.get("x-hub-signature-256") || "";
  const esperada =
    "sha256=" +
    crypto.createHmac("sha256", WA_APP_SECRET).update(req.rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(firma), Buffer.from(esperada));
  } catch {
    return false;
  }
}

/* ---------- Recibir mensajes y responder ---------- */
app.post("/webhook", async (req, res) => {
  res.sendStatus(200); // respondemos rápido a Meta

  if (!firmaValida(req)) { console.warn("⚠️  Firma inválida, ignorado"); return; }

  const value = req.body?.entry?.[0]?.changes?.[0]?.value;
  const msg = value?.messages?.[0];
  if (!msg) return; // pueden llegar eventos de estado (entregado/leído)

  const from = msg.from; // número del cliente
  const texto = (
    msg.text?.body ||
    msg.interactive?.button_reply?.title ||
    msg.interactive?.list_reply?.title ||
    ""
  ).toLowerCase();

  try {
    await responder(from, texto);
  } catch (e) {
    console.error("Error respondiendo:", e);
  }
});

/* ---------- Lógica de respuestas ---------- */
async function responder(to, texto) {
  const tiene = (...palabras) => palabras.some((p) => texto.includes(p));

  if (tiene("menu", "menú", "pizza", "carta")) {
    return enviarTexto(
      to,
      `🍕 *Nuestro menú* (pizzas al estilo romano 14")\n\n` +
        `Mirá todas las pizzas y armá tu pedido acá:\n${SITE_URL}#menu\n\n` +
        `Escribí *pedido*, *reserva*, *horario* o *ubicación* cuando quieras.`
    );
  }

  if (tiene("pedido", "ordenar", "pedir", "delivery", "comprar")) {
    return enviarTexto(
      to,
      `🛵 *Hacé tu pedido*\nElegí tus pizzas y mandalo en un toque desde la web:\n${SITE_URL}#pedido`
    );
  }

  if (tiene("reserva", "mesa", "reservar")) {
    return enviarTexto(
      to,
      `📅 *Reservá tu mesa*\nElegí fecha, hora y personas (te decimos al toque si hay lugar):\n${SITE_URL}#reservas`
    );
  }

  if (tiene("horario", "abren", "hora", "abierto")) {
    return enviarTexto(to, `🕒 *Horario*\nMartes a Domingo · 12:00 – 22:00\n(Lunes cerrado)`);
  }

  if (tiene("ubicacion", "ubicación", "direccion", "dirección", "donde", "dónde", "local")) {
    return enviarTexto(to, `📍 *Dónde estamos*\nVe el mapa y cómo llegar acá:\n${SITE_URL}#contacto`);
  }

  // Saludo / fallback con botones
  return enviarBotones(
    to,
    `🤘 *¡Hola! Bienvenido a Rock Munchies* 🍕\n\n¿Qué querés hacer?`,
    [
      { id: "ver_menu", title: "Ver menú" },
      { id: "hacer_pedido", title: "Hacer pedido" },
      { id: "reservar", title: "Reservar mesa" },
    ]
  );
}

/* ---------- Helpers de envío (Cloud API) ---------- */
async function apiSend(payload) {
  const r = await fetch(`${GRAPH}/${WA_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", ...payload }),
  });
  if (!r.ok) console.error("Cloud API error:", r.status, await r.text());
}

const enviarTexto = (to, body) =>
  apiSend({ to, type: "text", text: { preview_url: true, body } });

const enviarBotones = (to, body, botones) =>
  apiSend({
    to,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: body },
      action: {
        buttons: botones.map((b) => ({ type: "reply", reply: { id: b.id, title: b.title } })),
      },
    },
  });

/* ---------- Healthcheck ---------- */
app.get("/", (_req, res) => res.send("Rock Munchies bot 🤘 ok"));

app.listen(PORT, () => console.log(`🤘 Bot escuchando en el puerto ${PORT}`));
