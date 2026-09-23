// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal animations
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal, .stagger');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimal || '0');
    const suffix = el.dataset.suffix || '';
    const dur = 1300;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

// Tour filter pills
const pills = document.querySelectorAll('.pill');
const tcards = document.querySelectorAll('.tcard');
pills.forEach(p => p.addEventListener('click', () => {
  pills.forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  const region = p.dataset.region;
  tcards.forEach(c => {
    c.style.display = (region === 'all' || c.dataset.region === region) ? '' : 'none';
  });
}));

// Destination selector
const destData = [
  { name: 'Hunza Valley', desc: "Terraced orchards, glacial peaks and centuries-old forts strung along the Karakoram Highway.", img: 'https://destinoventuresltd.com/tours/Hunza/Hunza.jpg' },
  { name: 'Skardu', desc: "Cold desert landscapes, Deosai's high plateau, and base camp routes into the world's tallest peaks.", img: 'https://destinoventuresltd.com/tours/Skardu/Skardu.jpg' },
  { name: 'Naran & Kaghan', desc: 'Saif-ul-Malook, Kunhar river rafting, and the high pass at Babusar Top.', img: 'https://destinoventuresltd.com/tours/Naran/Naran.jpg' },
  { name: 'Swat & Kumrat', desc: "Pine-covered slopes and the switchback road to Kumrat's deodar forests.", img: 'https://destinoventuresltd.com/tours/Kumrat/Kumrat.jpg' },
  { name: 'Neelum Valley', desc: "Turquoise rivers, Arang Kel's wooden villages, and Ratti Gali's high alpine lake.", img: 'https://destinoventuresltd.com/tours/Gilgit/Gilgit.JPG' },
];
const destPills = document.querySelectorAll('.dest-pill');
const destImg = document.getElementById('destImg');
const destName = document.getElementById('destName');
const destDesc = document.getElementById('destDesc');
destPills.forEach(p => p.addEventListener('click', () => {
  destPills.forEach(x => x.classList.remove('active'));
  p.classList.add('active');
  const d = destData[parseInt(p.dataset.i)];
  destImg.src = d.img;
  destImg.alt = d.name;
  destName.textContent = d.name;
  destDesc.textContent = d.desc;
}));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => q.addEventListener('click', () => {
  const item = q.closest('.faq-item');
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(o => {
    o.classList.remove('open');
    o.querySelector('.faq-a').style.maxHeight = null;
  });
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}));

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gal-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});
function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// Booking form -> WhatsApp
document.getElementById('enquiryForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const phone = document.getElementById('fphone').value;
  const tour = document.getElementById('ftour').value;
  const travelers = document.getElementById('ftravelers').value;
  const month = document.getElementById('fmonth').value;
  const notes = document.getElementById('fnotes').value;
  const text = `Hi! I'd like to enquire about a tour.%0AName: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}%0ATour: ${encodeURIComponent(tour)}%0ATravelers: ${encodeURIComponent(travelers)}%0AMonth: ${encodeURIComponent(month)}%0ANotes: ${encodeURIComponent(notes)}`;
  window.open(`https://wa.me/923190121289?text=${text}`, '_blank');
});
