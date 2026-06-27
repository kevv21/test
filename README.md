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

Los datos de contacto ya vienen cargados con la info pública del local
(Los Robles, Managua · +505 2293 5514 · rockmunchies@gmail.com · IG/FB @rockmunchies).
Revisá el objeto `CONFIG` al inicio de **`script.js`** y, sobre todo,
**confirmá el número de WhatsApp** (puede ser distinto al teléfono fijo):

```js
const CONFIG = {
  whatsapp: "50522935514",   // ⚠️ confirmá tu WhatsApp (solo dígitos)
  telefono:  "+505 2293 5514",
  email:     "rockmunchies@gmail.com",
  direccion: "Los Robles, Managua, Nicaragua",
  instagram: "https://instagram.com/rockmunchies",
  facebook:  "https://facebook.com/rockmunchies",
  galeria:   ["foto-1.jpg", "foto-2.jpg", ...],  // fotos de assets/fotos/
  ...
};
```

También podés ajustar el horario y la capacidad de las reservas en `CONFIG.reservas`.

## 📸 Fotos / Galería

Poné tus fotos en **`assets/fotos/`** con los nombres `foto-1.jpg`, `foto-2.jpg`, …
(ver `assets/fotos/README.md`). Aparecen solas en la sección **Galería**; si no hay
ninguna, la sección se oculta. Opcional: `assets/fotos/hero.jpg` se usa como fondo
del encabezado. *(Instagram/Facebook bloquean la descarga automática, por eso las
fotos se agregan a mano.)*

## Cómo verlo

- **Local:** abrí `index.html` en el navegador (doble clic).
- **Publicarlo gratis:** subí estos archivos a **GitHub Pages**, **Netlify** o **Vercel**.

## Notas

- Los precios corresponden a la pizza de 14″ del menú.
- La disponibilidad de reservas se calcula en el dispositivo (demo). Para que sea
  compartida entre todos los clientes en tiempo real hace falta un backend o
  conectarlo al bot de WhatsApp (ver guía aparte).
