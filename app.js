const DEMO_RESPONSES = [{"id": "P01", "pago": 2000, "actual": "Recorro la zona hasta encontrar un parqueadero disponible.", "gusta": "Ahorrar tiempo y conocer el precio antes de llegar.", "cambiaria": "Agregaría filtros por precio y distancia."}, {"id": "P02", "pago": 3000, "actual": "Uso Google Maps y pregunto en parqueaderos cercanos.", "gusta": "Poder comparar opciones cercanas desde el celular.", "cambiaria": "Mostraría fotos del parqueadero."}, {"id": "P03", "pago": 2000, "actual": "Llego con tiempo y busco un parqueadero al azar.", "gusta": "La posibilidad de reservar antes de llegar.", "cambiaria": "Añadiría calificaciones de otros usuarios."}, {"id": "P04", "pago": 1000, "actual": "Pregunto a conocidos o vigilantes de la zona.", "gusta": "Ver ubicación, precio y disponibilidad en un solo lugar.", "cambiaria": "Incluiría más opciones para motocicletas."}, {"id": "P05", "pago": 2000, "actual": "Busco parqueaderos en Google cuando ya estoy cerca.", "gusta": "Evitar dar vueltas buscando un cupo.", "cambiaria": "Añadiría navegación hasta la entrada exacta."}, {"id": "P06", "pago": 3000, "actual": "Uso el parqueadero que conozco aunque quede lejos.", "gusta": "La comodidad de asegurar un espacio previamente.", "cambiaria": "Incluiría pagos digitales dentro de la plataforma."}, {"id": "P07", "pago": 2000, "actual": "Comparo algunos parqueaderos cuando llego a la zona.", "gusta": "Conocer el precio sin tener que preguntar en cada lugar.", "cambiaria": "Agregaría promociones para usuarios frecuentes."}, {"id": "P08", "pago": 0, "actual": "Prefiero buscar personalmente para no pagar una comisión.", "gusta": "La facilidad para encontrar opciones en una sola página.", "cambiaria": "Mantendría una opción gratuita sin tarifa de reserva."}, {"id": "P09", "pago": 2000, "actual": "Dejo el carro en el primer parqueadero que encuentro.", "gusta": "Ahorrar tiempo y reducir el estrés de llegar tarde.", "cambiaria": "Mostraría la seguridad y horarios de cada parqueadero."}, {"id": "P10", "pago": 3000, "actual": "Busco por internet y llamo para confirmar si hay cupo.", "gusta": "Tener una confirmación rápida de la solicitud.", "cambiaria": "Añadiría cancelación sencilla y soporte por WhatsApp."}];

const PARKING_OPTIONS = [
  {name:"ParkiGo Centro", distance:"350 m", price:4800, detail:"Cubierto · Vigilancia · Carro/Moto"},
  {name:"ParkiGo Express", distance:"620 m", price:3900, detail:"Acceso rápido · Carro/Moto"},
  {name:"ParkiGo Plus", distance:"850 m", price:5500, detail:"Cubierto · 24 h · Carro"}
];

const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat("es-CO", {style:"currency", currency:"COP", maximumFractionDigits:0}).format(value);
const escapeHTML = (str) => String(str).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

function getUserResponses(){
  try { return JSON.parse(localStorage.getItem("parkigo_validation") || "[]"); }
  catch { return []; }
}
function setUserResponses(items){
  localStorage.setItem("parkigo_validation", JSON.stringify(items));
}
function allResponses(){
  return [...DEMO_RESPONSES, ...getUserResponses()];
}

function renderResponses(){
  const body = $("#responses-body");
  body.innerHTML = DEMO_RESPONSES.map(r => `
    <tr>
      <td>${escapeHTML(r.id)}</td>
      <td>${money(r.pago)}</td>
      <td>${escapeHTML(r.actual)}</td>
      <td>${escapeHTML(r.gusta)}</td>
      <td>${escapeHTML(r.cambiaria)}</td>
    </tr>`).join("");
}

function renderMetrics(){
  const rows = allResponses();
  const paid2k = rows.filter(r => Number(r.pago) >= 2000).length;
  const avg = rows.reduce((sum,r)=>sum+Number(r.pago || 0),0) / Math.max(rows.length,1);
  $("#metric-total").textContent = rows.length;
  $("#metric-pay").textContent = `${Math.round((paid2k / rows.length) * 100)}%`;
  $("#metric-average").textContent = money(avg);

  const combined = rows.map(r => r.gusta.toLowerCase()).join(" ");
  const categories = [
    ["Ahorro de tiempo", ["tiempo","vueltas","tarde"]],
    ["Reserva anticipada", ["reserv","asegurar","confirmación"]],
    ["Precio visible", ["precio","comparar"]],
    ["Facilidad de uso", ["facilidad","una sola","celular"]]
  ];
  const scores = categories.map(([label, words]) => ({
    label,
    score: words.reduce((n,w) => n + (combined.match(new RegExp(w,"g")) || []).length,0)
  })).sort((a,b)=>b.score-a.score);
  $("#metric-like").textContent = scores[0].label;
}

function setMinimumDate(){
  const input = $("#fecha");
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth()+1).padStart(2,"0");
  const d = String(today.getDate()).padStart(2,"0");
  input.min = `${y}-${m}-${d}`;
}

function showParkingOptions(zona){
  $("#results-title").textContent = `Opciones de prueba cerca de ${zona}`;
  $("#parking-options").innerHTML = PARKING_OPTIONS.map((p,i) => `
    <article class="parking-option">
      <strong>${p.name}</strong>
      <div class="option-meta"><span>${p.distance}</span><span>${p.detail}</span></div>
      <div class="option-price">${money(p.price)} <small>/ hora aprox.</small></div>
      <button class="button primary full booking-btn" data-index="${i}" type="button">Solicitar reserva</button>
    </article>`).join("");
  $("#results-panel").classList.remove("hidden");
  $("#results-panel").scrollIntoView({behavior:"smooth",block:"center"});
  document.querySelectorAll(".booking-btn").forEach(btn => {
    btn.addEventListener("click", () => openBooking(Number(btn.dataset.index)));
  });
}

function openBooking(index){
  const p = PARKING_OPTIONS[index];
  const code = `PKG-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  $("#booking-copy").textContent = `Registramos tu interés en ${p.name}. En una prueba Mago de Oz, el equipo verificaría manualmente la disponibilidad y respondería al usuario.`;
  $("#booking-code").textContent = code;
  $("#booking-modal").classList.remove("hidden");
}

$("#parking-form").addEventListener("submit", e => {
  e.preventDefault();
  const zona = $("#zona").value.trim();
  if (!zona) return;
  showParkingOptions(zona);
});
$("#close-results").addEventListener("click", () => $("#results-panel").classList.add("hidden"));
$("#modal-close").addEventListener("click", () => $("#booking-modal").classList.add("hidden"));
$("#modal-ok").addEventListener("click", () => $("#booking-modal").classList.add("hidden"));
$("#booking-modal").addEventListener("click", e => {
  if (e.target.id === "booking-modal") $("#booking-modal").classList.add("hidden");
});

$("#survey-form").addEventListener("submit", e => {
  e.preventDefault();
  const item = {
    id:`R${String(getUserResponses().length+1).padStart(2,"0")}`,
    pago:Number($("#pago").value),
    actual:$("#actual").value.trim(),
    gusta:$("#gusta").value.trim(),
    cambiaria:$("#cambiaria").value.trim()
  };
  const items = getUserResponses();
  items.push(item);
  setUserResponses(items);
  e.currentTarget.reset();
  $("#survey-message").textContent = "Respuesta guardada en este navegador. ¡Gracias por participar!";
  renderMetrics();
});

$("#export-csv").addEventListener("click", () => {
  const rows = allResponses();
  const headers = ["Persona","Pago_COP","Como_resuelve_hoy","Que_mas_le_gusta","Que_cambiaria","Origen"];
  const csvRows = [headers.join(",")].concat(rows.map((r,i) => {
    const origin = i < DEMO_RESPONSES.length ? "Simulada_demo" : "Respuesta_local";
    return [r.id,r.pago,r.actual,r.gusta,r.cambiaria,origin].map(v => `"${String(v).replaceAll('"','""')}"`).join(",");
  }));
  const blob = new Blob(["\ufeff"+csvRows.join("\n")], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "parkigo_validacion.csv"; a.click();
  URL.revokeObjectURL(url);
});

setMinimumDate();
renderResponses();
renderMetrics();
