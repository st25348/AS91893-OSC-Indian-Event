function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,pa', 
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const menuToggle = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

//lightbox functionality

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// Open on click
document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

// Close on button or background click
lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// timeline slider

const slider = document.querySelector('.timeline-slider');
const cards = document.querySelectorAll('.timeline-card');
const dotsContainer = document.querySelector('.timeline-dots');
const prevBtn = document.querySelector('.timeline-prev');
const nextBtn = document.querySelector('.timeline-next');

let current = 0;

// build dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('timeline-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(index) {
  const total = cards.length;
  current = (index + total) % total;
  const cardWidth = cards[0].offsetWidth + 20; // 20 = gap
  slider.scrollLeft = cardWidth * current;

  document.querySelectorAll('.timeline-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));