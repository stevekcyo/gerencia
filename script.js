gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const glow = document.getElementById('cursorGlow');

let mx = innerWidth / 2;
let my = innerHeight / 2;
let rx = mx;
let ry = my;

window.addEventListener('mousemove', event => {
  mx = event.clientX;
  my = event.clientY;
  dot.style.left = `${mx}px`;
  dot.style.top = `${my}px`;
  glow.style.left = `${mx}px`;
  glow.style.top = `${my}px`;
});

(function cursorLoop() {
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;
  requestAnimationFrame(cursorLoop);
}());

document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseenter', () => ring.classList.add('big'));
  element.addEventListener('mouseleave', () => ring.classList.remove('big'));
});

document.querySelectorAll('.magnetic').forEach(element => {
  element.addEventListener('mousemove', event => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.6;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0,0)';
  });
});

const marqueeItems = [
  'UPLA',
  'INGENIERÍA DE SISTEMAS',
  'GERENCIA DE SISTEMAS',
  'CICLO 2026',
  'NUBE · APPS · INFRAESTRUCTURA'
];

const track = document.getElementById('marqueeTrack');
const marquee = marqueeItems.map(item => `<span><b>${item}</b></span>`).join('');
track.innerHTML = marquee + marquee;

gsap.to('.hero h1 .line span', {
  y: '0%',
  duration: 1,
  ease: 'power4.out',
  stagger: 0.12,
  delay: 0.2
});

gsap.to('.hero-tag, .hero-sub .reveal-up, .stat-row .reveal-up', {
  opacity: 1,
  y: 0,
  duration: 0.9,
  ease: 'power3.out',
  stagger: 0.08,
  delay: 0.5
});

document.querySelectorAll('.num[data-count]').forEach(element => {
  const target = Number(element.dataset.count);

  gsap.fromTo(element, { innerText: 0 }, {
    innerText: target,
    duration: 1.4,
    ease: 'power2.out',
    snap: { innerText: 1 },
    delay: 0.9,
    onUpdate() {
      element.textContent = Math.round(this.targets()[0].innerText);
    }
  });
});

gsap.utils.toArray('.blob').forEach((blob, index) => {
  gsap.to(blob, {
    yPercent: index % 2 === 0 ? 30 : -30,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  });
});

function revealBatch(selector, options = {}) {
  gsap.utils.toArray(selector).forEach(element => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%'
        },
        ...options
      }
    );
  });
}

revealBatch('.section .eyebrow, .section h2, .section .lede, .weeks-toolbar');
revealBatch('.unit-card', { duration: 0.7 });

const FILES_PATH = 'trabajos';

const pad = number => String(number).padStart(2, '0');

const fileName = chapter =>
  `Capitulo_${pad(chapter)}_Desarrollo_Resumen_Aplicacion.docx`;

const fileHref = chapter =>
  `${FILES_PATH}/${encodeURIComponent(fileName(chapter))}`;

const weeks = [
  { n: 1, unit: 1, chapter: 1, title: 'Trabajo 01' },
  { n: 2, unit: 1, chapter: 2, title: 'Trabajo 02' },
  { n: 3, unit: 1, chapter: 3, title: 'Trabajo 03' },
  { n: 4, unit: 1, chapter: 4, title: 'Trabajo 04' },
  { n: 5, unit: 2, chapter: 5, title: 'Trabajo 05' },
  { n: 6, unit: 2, chapter: 6, title: 'Trabajo 06' },
  { n: 7, unit: 2, chapter: 7, title: 'Trabajo 07' },
  { n: 8, unit: 2, chapter: 8, title: 'Trabajo 08' },
  { n: 9, unit: 3, chapter: 9, title: 'Trabajo 09' },
  { n: 10, unit: 3, chapter: 10, title: 'Trabajo 10' },
  { n: 11, unit: 3, chapter: 11, title: 'Trabajo 11' },
  { n: 12, unit: 3, chapter: 12, title: 'Trabajo 12' },
  { n: 13, unit: 4, chapter: 13, title: 'Trabajo 13' },
  { n: 14, unit: 4, chapter: 14, title: 'Trabajo 14 — Desarrollo / Resumen de Aplicación' },
  { n: 15, unit: 4, chapter: 15, title: 'Trabajo 15' },
  { n: 16, unit: 4, chapter: null, title: 'Cierre de curso / Examen final' }
];

const unitNames = {
  1: 'Unidad I',
  2: 'Unidad II',
  3: 'Unidad III',
  4: 'Unidad IV'
};

const grid = document.getElementById('weeksGrid');

grid.innerHTML = weeks.map(week => {
  const isFinal = !week.chapter;
  const href = isFinal ? null : fileHref(week.chapter);
  const expectedFile = isFinal ? '' : fileName(week.chapter);

  return `
    <article class="tilt-card week-card ${isFinal ? 'final' : 'available'} reveal-up" data-unit="${week.unit}">
      <div class="glare"></div>
      <div class="row-top">
        <span class="wk">SEMANA<br><b>${pad(week.n)}</b></span>
        <span class="unit-tag">${unitNames[week.unit]}</span>
      </div>
      <div class="w-title">${week.title}</div>
      <div class="row-bottom">
        <span class="status-label">
          <span class="led-mini"></span>
          ${isFinal ? 'Cierre de curso' : expectedFile}
        </span>
        ${
          href
            ? `<a class="dl" href="${href}" download="${expectedFile}">Descargar</a>`
            : '<a class="dl" href="#semanas">Ver detalle</a>'
        }
      </div>
    </article>
  `;
}).join('');

revealBatch('.week-card', { duration: 0.6 });

document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    if (reduceMotion) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    gsap.to(card, {
      rotateX: (0.5 - y) * 14,
      rotateY: (x - 0.5) * 14,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800
    });

    card.style.setProperty('--gx', `${x * 100}%`);
    card.style.setProperty('--gy', `${y * 100}%`);
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  });
});

const unitCards = document.querySelectorAll('.unit-card');
const weeksCount = document.getElementById('weeksCount');
let activeUnit = null;

function applyFilter() {
  const cards = document.querySelectorAll('.week-card');
  let visible = 0;

  cards.forEach(card => {
    const matches = !activeUnit || card.dataset.unit === String(activeUnit);
    card.classList.toggle('hidden-by-filter', !matches);

    if (matches) visible += 1;
  });

  weeksCount.textContent = `Mostrando ${visible} de ${cards.length} semanas`;

  unitCards.forEach(card => {
    card.classList.toggle('active', card.dataset.unit === String(activeUnit));
  });
}

unitCards.forEach(card => {
  card.addEventListener('click', () => {
    activeUnit = activeUnit === card.dataset.unit ? null : card.dataset.unit;
    applyFilter();

    document.getElementById('semanas').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

document.getElementById('resetFilter').addEventListener('click', () => {
  activeUnit = null;
  applyFilter();
}); u.dataset.unit) ? null : u.dataset.unit;
    applyFilter();
    document.getElementById('semanas').scrollIntoView({behavior:'smooth', block:'start'});
  });
});
document.getElementById('resetFilter').addEventListener('click', () => { activeUnit = null; applyFilter(); });
