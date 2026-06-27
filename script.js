/* =========================================================
   ROCK MUNCHIES — lógica del sitio
   ========================================================= */

/* ----------------------------------------------------------
   1) CONFIGURACIÓN  —  ✏️ EDITÁ ESTO CON TUS DATOS REALES
   ---------------------------------------------------------- */
const CONFIG = {
  // Número de WhatsApp con código de país, SOLO dígitos (sin +, sin espacios).
  // ⚠️ Vacío por ahora. Cuando pongas tu número acá (ej. "50588887777"),
  // los botones de WhatsApp se activan solos.
  whatsapp: "",

  telefono:  "",   // vacío = se muestra "Próximamente" en Contacto
  email:     "rockmunchies@gmail.com",
  direccion: "Los Robles, Managua, Nicaragua",

  // Redes (dejá "" para ocultar el botón)
  instagram: "https://instagram.com/rockmunchies",
  facebook:  "https://facebook.com/rockmunchies",
  tiktok:    "",

  // Mapa: pegá una dirección o coordenadas para el embed de Google Maps
  mapsQuery: "Rock Munchies, Los Robles, Managua, Nicaragua",

  moneda: "C$",

  // IVA: se suma a los precios base del menú y se muestra ya incluido en
  // tarjetas, carrito, total y mensaje de WhatsApp. 0.15 = 15%. Poné 0 para quitarlo.
  iva: 0.15,

  // GALERÍA: nombres de archivo dentro de assets/fotos/ (tus publicaciones).
  // Solo aparecen las que existan; si no hay ninguna, la sección se oculta sola.
  galeria: [
    "foto-1.webp", "foto-2.webp", "foto-3.webp", "foto-4.webp",
    "foto-5.webp", "foto-6.webp", "foto-7.webp", "foto-8.webp",
  ],

  // Horario y capacidad para las RESERVAS
  reservas: {
    // 0=Dom, 1=Lun, ... 6=Sáb.  Días cerrados:
    diasCerrados: [1],                 // Lunes cerrado
    horaApertura: 12,                  // 12:00
    horaCierre: 22,                    // última franja 21:30
    intervaloMin: 30,                  // franjas cada 30 min
    capacidadPorFranja: 40,            // personas por franja horaria
  },
};

/* ----------------------------------------------------------
   2) MENÚ  (tomado de las fotos del menú · precio de pizza 14")
   ---------------------------------------------------------- */
const MENU = [
  // ---- Clásicas ----
  { cat: "clasicas", name: "Jamón", desc: "La de siempre, con buen jamón y queso.", price: 260 },
  { cat: "clasicas", name: "Pepperoni", desc: "Pepperoni crujiente sobre mozzarella.", price: 270 },
  { cat: "clasicas", name: "Hawaiana", desc: "Jamón y piña.", price: 290 },
  { cat: "clasicas", name: "Margarita", desc: "Tomate y albahaca.", price: 290 },

  // ---- Old School ----
  { cat: "oldschool", name: "Diabla", desc: "Aceituna negra, cebolla, pepperoni y chile seco.", price: 300 },
  { cat: "oldschool", name: "Rock Munchies", desc: "Chiltoma, jamón, salchicha italiana y hongos.", price: 340, star: true },
  { cat: "oldschool", name: "Treboláctea", desc: "Mozzarella, parmesano y gorgonzola.", price: 340 },
  { cat: "oldschool", name: "No Hay Primavera", desc: "Chiltoma, cebolla, aceituna negra y verde.", price: 300 },
  { cat: "oldschool", name: "Aaaay Chorizo", desc: "Chorizo alemán, español, italiano, pepperoni y pimienta.", price: 370 },
  { cat: "oldschool", name: "Mare Rosso", desc: "Tomate y anchoas.", price: 400 },

  // ---- New School ----
  { cat: "newschool", name: "Española", desc: "Tomate confitado, aceituna verde y chorizo español.", price: 370 },
  { cat: "newschool", name: "Pesto", desc: "Salsa pesto, brócoli y chiltoma.", price: 370 },
  { cat: "newschool", name: "4 Estaciones Remix", desc: "Prosciutto, hongos, aceitunas negras y tomate.", price: 400 },
  { cat: "newschool", name: "Carnicera", desc: "Bacon, carne molida, salchicha italiana, pepperoni y chimichurri.", price: 400 },
  { cat: "newschool", name: "Veggie", desc: "Brócoli, hongos, chiltoma y espinacas.", price: 370 },

  // ---- Especiales ----
  { cat: "especiales", name: "Hawaiana Super Saiyajin", desc: "Jamón, pepperoni, bacon y piña.", price: 440 },
  { cat: "especiales", name: "Cordobesa", desc: "Aceitunas negras, jamón, hongos y ajo.", price: 440 },
  { cat: "especiales", name: "Chicken Little", desc: "Salsa pesto, tomate y pollo.", price: 440 },
  { cat: "especiales", name: "Fugazza", desc: "Parmesano, orégano y cebolla.", price: 400 },
  { cat: "especiales", name: "La Fabulosa", desc: "Mariscos, cebolla morada, gorgonzola y ajo.", price: 450 },
  { cat: "especiales", name: "Búffalo Chicken", desc: "Chunks de pollo, salsa buffalo, apio y salsa ranch.", price: 440 },
  { cat: "especiales", name: "Green Day", desc: "Alcachofa, aceitunas negras, parmesano y albahaca.", price: 440 },
  { cat: "especiales", name: "Brocoletta", desc: "Brócoli, piña y hongos.", price: 400 },
  { cat: "especiales", name: "Brisket", desc: "Brisket deshilachada, piña, cebollín y gravy.", price: 460 },

  // ---- Munchie Rolls ----
  { cat: "rolls", name: "Munchie Rolls de Pepperoni", desc: "Rollitos de masa rellenos de pepperoni y queso, con salsas para dipear.", price: 180, img: "munchie-rolls.webp" },
  { cat: "rolls", name: "Munchie Rolls Trebolácteos", desc: "Rollitos de masa rellenos de mozzarella, parmesano y gorgonzola.", price: 180, img: "munchie-rolls.webp" },
];

const CAT_LABEL = {
  clasicas: "Clásica", oldschool: "Old School", newschool: "New School",
  especiales: "Especial", rolls: "Munchie Rolls",
};

/* ----------------------------------------------------------
   2b) PROMOCIONES
   El precio es FINAL (ya con IVA incluido): no se le suma IVA.
   Poné la foto en assets/fotos/<img>; si no existe, se muestra
   un diseño de respaldo automáticamente.
   ---------------------------------------------------------- */
const PROMOS = [
  {
    id: "promo-2x500",
    name: "2 Pizzas x C$ 500",
    desc: "Llevá 2 pizzas para compartir por un solo precio. Elegí tus 2 pizzas al hacer el pedido 🍕🍕",
    price: 500,
    img: "promo-2x500.webp",
    badge: "2x",
  },
  {
    id: "promo-2hawaianas",
    name: "2 Hawaianas x C$ 500",
    desc: "Doble de jamón y piña para compartir. Dos pizzas Hawaianas por un solo precio 🍍🍕",
    price: 500,
    img: "promo-2hawaianas.webp",
    badge: "2x",
  },
];

/* ----------------------------------------------------------
   3) Utilidades
   ---------------------------------------------------------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const money = (n) => `${CONFIG.moneda} ${n.toLocaleString("es-NI")}`;
// Precio con IVA incluido, redondeado al córdoba más cercano
const precioFinal = (base) => Math.round(base * (1 + (CONFIG.iva || 0)));
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
const WA_GREETING = "¡Hola Rock Munchies! 🤘 Quiero hacer una consulta.";
const waReady = () => Boolean(CONFIG.whatsapp);
// Abre WhatsApp si hay número configurado; si no, avisa "próximamente"
function openWa(text) {
  if (!waReady()) { toast("📲 WhatsApp disponible muy pronto 🤘"); return false; }
  window.open(waLink(text), "_blank");
  return true;
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("is-visible");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("is-visible"), 2200);
}

/* ----------------------------------------------------------
   4) Render del menú
   ---------------------------------------------------------- */
const menuGrid = $("#menuGrid");

function renderMenu(filter = "all") {
  menuGrid.innerHTML = "";
  MENU.filter((p) => filter === "all" || p.cat === filter).forEach((p) => {
    const card = document.createElement("article");
    card.className = p.img ? "card card--photo" : "card";
    card.innerHTML = `
      ${p.img ? `<div class="card__media"><img src="assets/fotos/${p.img}" alt="${p.name}" loading="lazy" onerror="this.closest('.card__media').remove()"></div>` : ""}
      <span class="card__tag">${CAT_LABEL[p.cat]}</span>
      <h3 class="card__name">${p.name}</h3>
      <p class="card__desc">${p.desc}</p>
      <div class="card__foot">
        <span class="card__price">${money(precioFinal(p.price))}</span>
        <button class="card__add" data-name="${p.name}">Agregar</button>
      </div>`;
    menuGrid.appendChild(card);
  });
}
renderMenu();

$$(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderMenu(btn.dataset.filter);
  });
});

/* ----------------------------------------------------------
   4b) Render de promociones
   ---------------------------------------------------------- */
(function renderPromos() {
  const grid = $("#promosGrid");
  if (!grid) return;
  grid.innerHTML = "";
  PROMOS.forEach((p) => {
    const art = document.createElement("article");
    art.className = "promo";
    art.innerHTML = `
      <div class="promo__media">
        <img src="assets/fotos/${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.remove()">
        ${p.badge ? `<span class="promo__badge">${p.badge}</span>` : ""}
      </div>
      <div class="promo__body">
        <h3 class="promo__name">${p.name}</h3>
        <p class="promo__desc">${p.desc}</p>
        <div class="promo__foot">
          <span class="promo__price">${money(p.price)}</span>
          <button class="promo__add" data-promo="${p.id}">Agregar al pedido</button>
        </div>
      </div>`;
    grid.appendChild(art);
  });
})();

/* ----------------------------------------------------------
   5) Carrito / pedido
   ---------------------------------------------------------- */
const cart = new Map(); // name -> { ...pizza, qty }

function addToCart(name) {
  const pizza = MENU.find((p) => p.name === name);
  if (!pizza) return;
  const item = cart.get(name) || { ...pizza, price: precioFinal(pizza.price), qty: 0 };
  item.qty += 1;
  cart.set(name, item);
  renderCart();
  toast(`🍕 ${name} agregada`);
}

// Las promos tienen precio FINAL (no se les aplica IVA encima)
function addPromo(id) {
  const promo = PROMOS.find((p) => p.id === id);
  if (!promo) return;
  const item = cart.get(promo.name) || { name: promo.name, price: promo.price, qty: 0, promo: true };
  item.qty += 1;
  cart.set(promo.name, item);
  renderCart();
  toast(`🔥 ${promo.name} agregada`);
}

function changeQty(name, delta) {
  const item = cart.get(name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart.delete(name);
  renderCart();
}

function cartTotal() {
  let t = 0;
  cart.forEach((i) => (t += i.price * i.qty));
  return t;
}
function cartCount() {
  let c = 0;
  cart.forEach((i) => (c += i.qty));
  return c;
}

function renderCart() {
  const wrap = $("#orderItems");
  const empty = $("#orderEmpty");

  $$(".order-line", wrap).forEach((el) => el.remove());

  if (cart.size === 0) {
    empty.style.display = "";
  } else {
    empty.style.display = "none";
    cart.forEach((i) => {
      const line = document.createElement("div");
      line.className = "order-line";
      line.innerHTML = `
        <div class="order-line__info">
          <div class="order-line__name">${i.name}</div>
          <div class="order-line__price">${money(i.price)} c/u</div>
        </div>
        <div class="qty">
          <button data-act="dec" data-name="${i.name}" aria-label="Quitar uno">−</button>
          <span>${i.qty}</span>
          <button data-act="inc" data-name="${i.name}" aria-label="Agregar uno">+</button>
        </div>
        <div class="order-line__sub">${money(i.price * i.qty)}</div>`;
      wrap.appendChild(line);
    });
  }

  $("#orderTotal").textContent = money(cartTotal());

  const fab = $("#cartFab");
  const count = cartCount();
  $("#cartCount").textContent = count;
  fab.classList.toggle("is-visible", count > 0);
}

// Delegación de clics: agregar y +/- del carrito
document.addEventListener("click", (e) => {
  const add = e.target.closest(".card__add");
  if (add) return addToCart(add.dataset.name);

  const promoAdd = e.target.closest(".promo__add");
  if (promoAdd) return addPromo(promoAdd.dataset.promo);

  const qtyBtn = e.target.closest(".qty button");
  if (qtyBtn) return changeQty(qtyBtn.dataset.name, qtyBtn.dataset.act === "inc" ? 1 : -1);

  // Botones de WhatsApp (se mantienen visibles aunque no haya número aún)
  const wa = e.target.closest("[data-wa]");
  if (wa) { e.preventDefault(); openWa(WA_GREETING); }
});

// Tipo de pedido (delivery / local)
let orderType = "delivery";
$$(".seg__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".seg__btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    orderType = btn.dataset.type;
    $("#addressField").style.display = orderType === "delivery" ? "" : "none";
  });
});

// Enviar pedido por WhatsApp
$("#sendOrder").addEventListener("click", () => {
  if (cart.size === 0) return toast("Tu pedido está vacío 🤘");

  const name = $("#ordName").value.trim();
  const address = $("#ordAddress").value.trim();
  const notes = $("#ordNotes").value.trim();

  if (!name) return toast("Decinos tu nombre 🙂");
  if (orderType === "delivery" && !address) return toast("Necesitamos la dirección de entrega 📍");

  let msg = `🤘 *NUEVO PEDIDO — ROCK MUNCHIES*\n\n`;
  msg += `*Cliente:* ${name}\n`;
  msg += `*Tipo:* ${orderType === "delivery" ? "Delivery 🛵" : "Recoger en local 🏠"}\n`;
  if (orderType === "delivery") msg += `*Dirección:* ${address}\n`;
  msg += `\n*Pedido:*\n`;
  cart.forEach((i) => (msg += `• ${i.qty}x ${i.name} — ${money(i.price * i.qty)}\n`));
  msg += `\n*TOTAL: ${money(cartTotal())}*`;
  if (CONFIG.iva) msg += ` _(IVA ${Math.round(CONFIG.iva * 100)}% incluido)_`;
  if (notes) msg += `\n\n*Notas:* ${notes}`;

  openWa(msg);
});

/* ----------------------------------------------------------
   6) Reservas + disponibilidad (demo en este dispositivo)
   ---------------------------------------------------------- */
const R = CONFIG.reservas;
const STORE_KEY = "rm_reservas";

const getReservas = () => JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
const saveReserva = (key, people) => {
  const data = getReservas();
  data[key] = (data[key] || 0) + people;
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
};
const ocupadas = (key) => getReservas()[key] || 0;

// Genera las franjas horarias del <select>
(function fillTimes() {
  const sel = $("#resTime");
  for (let h = R.horaApertura; h < R.horaCierre; h++) {
    for (let m = 0; m < 60; m += R.intervaloMin) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const opt = document.createElement("option");
      opt.value = `${hh}:${mm}`;
      opt.textContent = `${hh}:${mm}`;
      sel.appendChild(opt);
    }
  }
})();

// Fecha mínima = hoy
$("#resDate").min = new Date().toISOString().split("T")[0];

let reservaPendiente = null;

$("#reserveForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#resName").value.trim();
  const date = $("#resDate").value;
  const time = $("#resTime").value;
  const people = parseInt($("#resPeople").value, 10);
  const phone = $("#resPhone").value.trim();
  const box = $("#reserveStatus");

  const dayOfWeek = new Date(`${date}T00:00`).getDay();
  const key = `${date} ${time}`;

  // ¿Día cerrado?
  if (R.diasCerrados.includes(dayOfWeek)) {
    box.className = "reserve__status is-bad";
    box.innerHTML = `<div class="reserve__status-icon">🚫</div>
      <h3>Cerrado ese día</h3>
      <p>Ese día no abrimos. Probá con otra fecha 🎸</p>`;
    return;
  }

  const libres = R.capacidadPorFranja - ocupadas(key);

  if (people <= libres) {
    reservaPendiente = { name, date, time, people, phone, key };
    box.className = "reserve__status is-ok";
    box.innerHTML = `<div class="reserve__status-icon">✅</div>
      <h3>¡Hay lugar!</h3>
      <p>Disponibilidad para <strong>${people}</strong> persona(s) el <strong>${date}</strong> a las <strong>${time}</strong>.</p>
      <button class="btn btn--wa" id="confirmRes">Confirmar por WhatsApp</button>`;
    $("#confirmRes").addEventListener("click", confirmReserva);
  } else {
    box.className = "reserve__status is-bad";
    box.innerHTML = `<div class="reserve__status-icon">😬</div>
      <h3>Sin lugar en esa franja</h3>
      <p>Quedan ${libres < 0 ? 0 : libres} lugar(es) a las ${time}. Probá otra hora o escribinos.</p>
      <a class="btn btn--ghost" data-wa="hola" href="#">Consultar por WhatsApp</a>`;
    bindWaButtons();
  }
});

function confirmReserva() {
  const r = reservaPendiente;
  if (!r) return;

  const msg =
    `🎸 *NUEVA RESERVA — ROCK MUNCHIES*\n\n` +
    `*Nombre:* ${r.name}\n` +
    `*Fecha:* ${r.date}\n` +
    `*Hora:* ${r.time}\n` +
    `*Personas:* ${r.people}\n` +
    `*Teléfono:* ${r.phone}`;

  if (!openWa(msg)) return; // WhatsApp aún no configurado: avisa y no confirma

  saveReserva(r.key, r.people);

  const box = $("#reserveStatus");
  box.className = "reserve__status is-ok";
  box.innerHTML = `<div class="reserve__status-icon">🤘</div>
    <h3>¡Reserva enviada!</h3>
    <p>Te confirmamos por WhatsApp. ¡Nos vemos pronto!</p>`;
  $("#reserveForm").reset();
  reservaPendiente = null;
}

/* ----------------------------------------------------------
   7) Datos de contacto + botones de WhatsApp
   ---------------------------------------------------------- */
// Mantiene los botones de WhatsApp visibles. Si hay número, apuntan al chat;
// si no, quedan como botón (el click muestra "próximamente" vía openWa).
function bindWaButtons() {
  $$("[data-wa]").forEach((el) => {
    if (waReady()) { el.href = waLink(WA_GREETING); el.target = "_blank"; }
    else { el.setAttribute("href", "#"); el.removeAttribute("target"); }
  });
}

(function fillContact() {
  $("#cDireccion").textContent = CONFIG.direccion;

  const tel = $("#cTel");
  if (CONFIG.telefono) {
    tel.textContent = CONFIG.telefono;
    tel.href = `tel:${CONFIG.telefono.replace(/\s+/g, "")}`;
  } else {
    tel.textContent = "Próximamente";
    tel.removeAttribute("href");
  }

  const mail = $("#cEmail");
  mail.textContent = CONFIG.email;
  mail.href = `mailto:${CONFIG.email}`;

  $("#cMap").src = `https://www.google.com/maps?q=${encodeURIComponent(CONFIG.mapsQuery)}&output=embed`;

  const socials = $("#cSocials");
  const links = [
    ["Instagram", CONFIG.instagram],
    ["Facebook", CONFIG.facebook],
    ["TikTok", CONFIG.tiktok],
  ].filter(([, url]) => url);
  socials.innerHTML = links
    .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`)
    .join("");

  const gIg = $("#gIg"), gFb = $("#gFb");
  if (gIg && CONFIG.instagram) gIg.href = CONFIG.instagram;
  if (gFb && CONFIG.facebook) gFb.href = CONFIG.facebook;

  $("#year").textContent = new Date().getFullYear();
  bindWaButtons();
})();

/* ----------------------------------------------------------
   7.5) Galería — carga solo las fotos que existan en assets/fotos/
        (si no hay ninguna, la sección queda oculta)
   ---------------------------------------------------------- */
(function loadGallery() {
  const section = $("#galeria");
  const grid = $("#galeriaGrid");
  if (!section || !grid) return;

  (CONFIG.galeria || []).forEach((file) => {
    const src = `assets/fotos/${file}`;
    const probe = new Image();
    probe.onload = () => {
      const fig = document.createElement("figure");
      fig.className = "gtile";
      fig.innerHTML = `<img src="${src}" alt="Rock Munchies" loading="lazy">`;
      grid.appendChild(fig);
      section.hidden = false; // mostramos la sección al cargar la primera foto
    };
    probe.src = src; // si falla (no existe), simplemente no se agrega
  });
})();

/* Foto real opcional para el fondo del hero (assets/fotos/hero.jpg) */
(function heroPhoto() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const probe = new Image();
  probe.onload = () => hero.classList.add("hero--photo");
  probe.src = "assets/fotos/hero.jpg";
})();

/* ----------------------------------------------------------
   8) Menú móvil
   ---------------------------------------------------------- */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open);
});
$$("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);
