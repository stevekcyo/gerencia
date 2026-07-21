gsap.registerPlugin(ScrollTrigger);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- custom cursor ---------- */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursorGlow');
let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;

window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx+'px'; dot.style.top = my+'px';
  glow.style.left = mx+'px'; glow.style.top = my+'px';
});
(function loop(){ rx += (mx-rx)*0.16; ry += (my-ry)*0.16; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(loop); })();

document.querySelectorAll('a, button, .tilt-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('big'));
  el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

/* ---------- magnetic nav links ---------- */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2) * 0.35;
    const dy = (e.clientY - r.top - r.height/2) * 0.6;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
});

/* ---------- marquee content ---------- */
const marqueeItems = ['UPLA','INGENIERÍA DE SISTEMAS','GERENCIA DE SISTEMAS','CICLO 2026','NUBE · APPS · INFRAESTRUCTURA'];
const track = document.getElementById('marqueeTrack');
const build = marqueeItems.map(t => `<span><b>${t}</b></span>`).join('');
track.innerHTML = build + build; // duplicado para loop continuo

/* ---------- hero title reveal ---------- */
gsap.to('.hero h1 .line span', {
  y:'0%', duration:1, ease:'power4.out', stagger:0.12, delay:0.2
});
gsap.to('.hero-tag, .hero-sub .reveal-up, .stat-row .reveal-up', {
  opacity:1, y:0, duration:0.9, ease:'power3.out', stagger:0.08, delay:0.5
});

/* ---------- animated counters ---------- */
document.querySelectorAll('.num[data-count]').forEach(el => {
  const target = +el.dataset.count;
  gsap.fromTo(el, {innerText:0}, {
    innerText:target, duration:1.4, ease:'power2.out', snap:{innerText:1}, delay:0.9,
    onUpdate(){ el.textContent = Math.round(this.targets()[0].innerText); }
  });
});

/* ---------- ambient blob parallax ---------- */
gsap.utils.toArray('.blob').forEach((b,i) => {
  gsap.to(b, {
    yPercent: (i%2===0? 30 : -30), ease:'none',
    scrollTrigger:{ trigger: document.body, start:'top top', end:'bottom bottom', scrub:1 }
  });
});

/* ---------- scroll reveal for sections ---------- */
function revealBatch(selector, opts={}){
  gsap.utils.toArray(selector).forEach(el => {
    gsap.fromTo(el, {opacity:0, y:40}, {
      opacity:1, y:0, duration:0.9, ease:'power3.out',
      scrollTrigger:{ trigger: el, start:'top 88%' }, ...opts
    });
  });
}
revealBatch('.section .eyebrow, .section h2, .section .lede, .weeks-toolbar');
revealBatch('.unit-card', {duration:0.7});

/* ---------- data: semanas 1-16 ---------- */
const weeks = [
  {n:1,  unit:1, chapter:1,  title:'Trabajo 01 — añade el título aquí'},
  {n:2,  unit:1, chapter:2,  title:'Trabajo 02 — añade el título aquí'},
  {n:3,  unit:1, chapter:3,  title:'Trabajo 03 — añade el título aquí'},
  {n:4,  unit:1, chapter:4,  title:'Trabajo 04 — añade el título aquí'},
  {n:5,  unit:2, chapter:5,  title:'Trabajo 05 — añade el título aquí'},
  {n:6,  unit:2, chapter:6,  title:'Trabajo 06 — añade el título aquí'},
  {n:7,  unit:2, chapter:7,  title:'Trabajo 07 — añade el título aquí'},
  {n:8,  unit:2, chapter:8,  title:'Trabajo 08 — añade el título aquí'},
  {n:9,  unit:3, chapter:9,  title:'Trabajo 09 — añade el título aquí'},
  {n:10, unit:3, chapter:10, title:'Trabajo 10 — añade el título aquí'},
  {n:11, unit:3, chapter:11, title:'Trabajo 11 — añade el título aquí'},
  {n:12, unit:3, chapter:12, title:'Trabajo 12 — añade el título aquí'},
  {n:13, unit:4, chapter:13, title:'Trabajo 13 — añade el título aquí'},
  {n:14, unit:4, chapter:14, title:'Trabajo 14 — Desarrollo / Resumen de Aplicación'},
  {n:15, unit:4, chapter:15, title:'Trabajo 15 — añade el título aquí'},
  {n:16, unit:4, chapter:null, title:'Cierre de curso / Examen final'},
];
const unitNames = {1:'Unidad I', 2:'Unidad II', 3:'Unidad III', 4:'Unidad IV'};
const pad = n => String(n).padStart(2,'0');
const fileHref = w => w.chapter ? `trabajos/Capitulo_${pad(w.chapter)}_Desarrollo_Resumen_Aplicacion.docx` : null;

const grid = document.getElementById('weeksGrid');
grid.innerHTML = weeks.map(w => {
  const href = fileHref(w);
  const isFinal = !w.chapter;
  const stateClass = isFinal ? 'final' : 'pending';
  const statusText = isFinal ? 'Cierre de curso' : 'Archivo por confirmar';
  return `
    <div class="tilt-card week-card ${stateClass} reveal-up" data-unit="${w.unit}">
      <div class="glare"></div>
      <div class="row-top">
        <span class="wk">SEMANA<br><b>${pad(w.n)}</b></span>
        <span class="unit-tag">${unitNames[w.unit]}</span>
      </div>
      <div class="w-title">${w.title}</div>
      <div class="row-bottom">
        <span class="status-label"><span class="led-mini"></span>${statusText}</span>
        ${href ? `<a class="dl" href="${href}" target="_blank" rel="noopener">Descargar</a>` : `<a class="dl" href="#">Ver detalle</a>`}
      </div>
    </div>
  `;
}).join('');

revealBatch('.week-card', {duration:0.6});

/* ---------- 3D tilt on all .tilt-card ---------- */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    if(reduceMotion) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotX = (0.5 - py) * 14;
    const rotY = (px - 0.5) * 14;
    gsap.to(card, {rotateX:rotX, rotateY:rotY, duration:0.4, ease:'power2.out', transformPerspective:800});
    card.style.setProperty('--gx', (px*100)+'%');
    card.style.setProperty('--gy', (py*100)+'%');
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {rotateX:0, rotateY:0, duration:0.6, ease:'power3.out'});
  });
});

/* ---------- unit filter ---------- */
const unitCards = document.querySelectorAll('.unit-card');
const weeksCount = document.getElementById('weeksCount');
let activeUnit = null;

function applyFilter(){
  const cards = document.querySelectorAll('.week-card');
  let visible = 0;
  cards.forEach(c => {
    const match = !activeUnit || c.dataset.unit === String(activeUnit);
    c.classList.toggle('hidden-by-filter', !match);
    if(match) visible++;
  });
  weeksCount.textContent = `Mostrando ${visible} de ${cards.length} semanas`;
  unitCards.forEach(u => u.classList.toggle('active', activeUnit === u.dataset.unit));
}

unitCards.forEach(u => {
  u.addEventListener('click', () => {
    activeUnit = (activeUnit === u.dataset.unit) ? null : u.dataset.unit;
    applyFilter();
    document.getElementById('semanas').scrollIntoView({behavior:'smooth', block:'start'});
  });
});
document.getElementById('resetFilter').addEventListener('click', () => { activeUnit = null; applyFilter(); });
