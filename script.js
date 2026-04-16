function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,pa', 
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// header scroll
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// hamburger
const menuToggle = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// timeline slider
const slider = document.querySelector('.timeline-slider');
const prevBtn = document.querySelector('.timeline-prev');
const nextBtn = document.querySelector('.timeline-next');

if (slider && prevBtn && nextBtn) {
  const cards = document.querySelectorAll('.timeline-card');
  const dotsContainer = document.querySelector('.timeline-dots');
  let current = 0;

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
    const cardWidth = cards[0].offsetWidth + 20;
    slider.scrollLeft = cardWidth * current;
    document.querySelectorAll('.timeline-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
}

// experience carousel 

const carouselSection = document.querySelector('.carousel-section');
const carouselPrev    = document.querySelector('.carousel-prev');
const carouselNext    = document.querySelector('.carousel-next');
const carouselDots    = document.querySelector('.carousel-dots');
const carouselCards   = document.querySelectorAll('.carousel-hero-card');

if (carouselSection && carouselPrev && carouselNext) {
  let current = 0;

  //build dot automatically 

  carouselCards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    carouselDots.appendChild(dot);
  });

function goTo(index) {
  const total = carouselCards.length;
  current = (index + total) % total;
  carouselCards[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

  carouselPrev.addEventListener('click', () => goTo(current - 1));
  carouselNext.addEventListener('click', () => goTo(current + 1));
}


