# 🍕 Rock Munchies — Sitio web

Sitio web para **Rock Munchies**, pizzería al estilo romano (delivery y local) con
una estética inspirada en el rock. Estático, sin servidor: funciona abriendo
`index.html` en cualquier navegador y se ve igual en teléfono y computadora.

## Funciones

- **Menú** completo por categorías (Clásicas, Old School, New School, Especiales) con filtros.
- **Pedido online**: armás el carrito y se envía listo por **WhatsApp** (delivery o recoger en local).
- **Reservas** con verificación de **disponibilidad** por fecha, hora y cantidad de personas.
- **Contacto** con teléfono, email, redes, horario y mapa de Google.
- **Responsive**: diseño adaptable a celular y escritorio, con estética rock (oscuro + dorado).

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilos y diseño responsive |
| `script.js`  | Menú, carrito, reservas y configuración |
| `assets/`    | Fondos e ilustraciones vectoriales (SVG) estilo rock |
| `bot/`       | Bot de WhatsApp (WhatsApp Cloud API) listo para desplegar |

## ✏️ Configuración (importante)

Abrí **`script.js`** y editá el objeto `CONFIG` al inicio con tus datos reales:

```js
const CONFIG = {
  whatsapp: "50500000000",   // tu número con código de país, solo dígitos
  telefono:  "+505 0000 0000",
  email:     "hola@rockmunchies.com",
  direccion: "Tu dirección, ciudad, Nicaragua",
  instagram: "https://instagram.com/...",
  facebook:  "https://facebook.com/...",
  mapsQuery: "Managua, Nicaragua",   // dirección o coordenadas para el mapa
  ...
};
```

También podés ajustar el horario y la capacidad de las reservas en `CONFIG.reservas`.

## Cómo verlo

- **Local:** abrí `index.html` en el navegador (doble clic).
- **Publicarlo gratis:** subí estos archivos a **GitHub Pages**, **Netlify** o **Vercel**.

## Notas

- Los precios corresponden a la pizza de 14″ del menú.
- La disponibilidad de reservas se calcula en el dispositivo (demo). Para que sea
  compartida entre todos los clientes en tiempo real hace falta un backend o
  conectarlo al bot de WhatsApp (ver guía aparte).
