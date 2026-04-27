// Google translator feature
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,hi,fr,mi,tl,ko,zh-CN,ja', 
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

// settings
const settingsMenu = document.querySelector(".settings-menu");
const settingsBtn  = document.querySelector(".settings-btn");
 
if (settingsBtn && settingsMenu) {
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = settingsMenu.classList.toggle("show");
    settingsBtn.setAttribute("aria-expanded", isOpen);
  });
 
  document.addEventListener("click", (e) => {
    if (!settingsMenu.contains(e.target)) {
      settingsMenu.classList.remove("show");
      settingsBtn.setAttribute("aria-expanded", false);
    }
  });
}

// dyslexic font
const dyslexicToggle = document.getElementById("dyslexic-toggle");

if (dyslexicToggle) {
  dyslexicToggle.addEventListener("change", () => {
    document.body.classList.toggle("dyslexic-mode", dyslexicToggle.checked);
  });
}

// hamburger
const hamburger = document.getElementById("hamburger") 
               || document.querySelector(".hamburger-menu");
const navLinks  = document.querySelector(".nav-links");
 
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("active");
    navLinks.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });
 
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      hamburger.setAttribute("aria-expanded", false);
    });
  });
}

// search
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

if (searchContainer && searchInput) {

  function clearHighlights() {
    document.querySelectorAll('mark.search-highlight').forEach(mark => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  function highlightMatches(query) {
    clearHighlights();
    if (!query) return;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const tag = node.parentElement.tagName;
          if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'MARK'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.textContent.toLowerCase().includes(query.toLowerCase())
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
      }
    );

    const matches = [];
    let node;
    while ((node = walker.nextNode())) matches.push(node);

    matches.forEach(textNode => {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const fragment = document.createDocumentFragment();
      const parts = textNode.textContent.split(regex);

      parts.forEach(part => {
        if (regex.test(part)) {
          const mark = document.createElement('mark');
          mark.className = 'search-highlight';
          mark.textContent = part;
          fragment.appendChild(mark);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      textNode.parentNode.replaceChild(fragment, textNode);
    });

    // scroll to first match
    const first = document.querySelector('mark.search-highlight');
    if (first) {
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    highlightMatches(query);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      clearHighlights();
      searchInput.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      clearHighlights();
      searchInput.value = '';
    }
  });
}

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

if (carouselSection && carouselCards.length > 0) {
  let current = 0;
  let autoSlide;

  // initialise positions
  carouselCards.forEach((card, i) => {
    card.style.transform = `translateX(${i * 100}%)`;
  });

  function goTo(index) {
    const total = carouselCards.length;
    current = (index + total) % total;
    carouselCards.forEach((card, i) => {
      card.style.transform = `translateX(${(i - current) * 100}%)`;
    });
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  // build dots
  if (carouselDots) {
    carouselCards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        clearInterval(autoSlide);
        goTo(i);
        autoSlide = setInterval(() => goTo(current + 1), 4000);
      });
      carouselDots.appendChild(dot);
    });
  }

  // arrows
  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      clearInterval(autoSlide);
      goTo(current - 1);
      autoSlide = setInterval(() => goTo(current + 1), 4000);
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      clearInterval(autoSlide);
      goTo(current + 1);
      autoSlide = setInterval(() => goTo(current + 1), 4000);
    });
  }

  // auto slide
  autoSlide = setInterval(() => goTo(current + 1), 4000);
}

// charity cards
const charityModal = document.getElementById('charity-modal');
const modalTitle   = document.getElementById('modal-title');
const modalText    = document.getElementById('modal-text');
const modalClose   = document.getElementById('charity-modal-close');

if (charityModal && modalClose) {
  document.querySelectorAll('.charity-card').forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.dataset.title;
      modalText.textContent  = card.dataset.text;
      const existingLink = document.querySelector('.modal-starship-link');
      if (existingLink) existingLink.remove();
      if (card.dataset.title === 'Starship Foundation') {
        const link = document.createElement('a');
        link.href = 'https://starship.org.nz';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Visit Starship Foundation ↗';
        link.classList.add('modal-starship-link');
        document.querySelector('.charity-modal-box').appendChild(link);
      }
      charityModal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', () => charityModal.classList.remove('active'));
  charityModal.addEventListener('click', (e) => {
    if (e.target === charityModal) charityModal.classList.remove('active');
  });
}
//  donation slider
const donationSlider = document.getElementById('donation-slider');
const donationValue  = document.getElementById('donation-value');
if (donationSlider) {
  donationSlider.addEventListener('input', () => {
    donationValue.textContent = donationSlider.value;
  });
}

// active nav link
document.querySelectorAll('.nav-links li a').forEach(link => {
  const page = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const linkPage = link.pathname.replace(/\/$/, '');
  if (linkPage === page) link.classList.add('active');
});

// form submition message
const forms = document.querySelectorAll('.reservation-form, .contact-form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.querySelector('.form-confirmation')) return;
    const confirmation = document.createElement('p');
    confirmation.classList.add('form-confirmation');
    confirmation.textContent = 'Thank you! Your message has been received. We will be in touch shortly.';
    form.appendChild(confirmation);
  });
});

const donationBtn = document.querySelector('.donation-pay-btn');
if (donationBtn) {
  donationBtn.addEventListener('click', () => {
    const panel = document.querySelector('.donation-form-panel');
    if (panel.querySelector('.form-confirmation')) return;
    const confirmation = document.createElement('p');
    confirmation.classList.add('form-confirmation');
    confirmation.textContent = 'Thank you for your generous donation! Your contribution means a lot.';
    panel.appendChild(confirmation);
  });
}

// =================== Scroll animations ===================
(function () {

  const map = [
    // home
    { s: '.purpose-container h2',                type: 'fade-up' },
    { s: '.purpose-container p',                 type: 'fade-up' },
    { s: '.section-heading',                     type: 'fade-up' },
    { s: '.events-grid',                         type: 'fade-up' },
    { s: '.info-row .info-img',                  type: 'slide-left' },
    { s: '.info-row .info-text',                 type: 'slide-right' },
    { s: '.info-row-reverse .info-img',          type: 'slide-right' },
    { s: '.info-row-reverse .info-text',         type: 'slide-left' },
    // reservations
    { s: '.reservations-hero-img',               type: 'slide-left' },
    { s: '.reservations-hero-text',              type: 'slide-right' },
    { s: '.reservation-details',                 type: 'slide-left' },
    { s: '.reservation-form-wrapper',            type: 'slide-right' },
    { s: '.findus-header',                       type: 'fade-up' },
    { s: '.findus-map',                          type: 'fade-up' },
    { s: '.contact-header',                      type: 'fade-up' },
    { s: '.contact-form',                        type: 'fade-up' },
    // menu
    { s: '.chef-header',                         type: 'fade-up' },
    { s: '.chef-strips',                         type: 'fade-up' },
    { s: '.menu-header',                         type: 'fade-up' },
    { s: '.menu-cta-img',                        type: 'slide-left' },
    { s: '.menu-cta-text',                       type: 'slide-right' },
    // experience
    { s: '.kitchen-row-content',                 type: 'fade-up' },
    { s: '.experience-row .experience-img',      type: 'slide-left' },
    { s: '.experience-row .experience-text',     type: 'slide-right' },
    { s: '.experience-row--reverse .experience-img',  type: 'slide-right' },
    { s: '.experience-row--reverse .experience-text', type: 'slide-left' },
    { s: '.charity-section .charity-img',        type: 'slide-left' },
    { s: '.charity-section .charity-text',       type: 'slide-right' },
    // charity page
    { s: '.charity-events-grid',                 type: 'fade-up' },
    { s: '.donation-form-panel',                 type: 'slide-right' },
    { s: '.thankyou-banner h2',                  type: 'fade-up' },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // register all mapped elements
  map.forEach(({ s, type }) => {
    document.querySelectorAll(s).forEach(el => {
      el.classList.add('anim-' + type);
      observer.observe(el);
    });
  });

  // menu cards alternate left/right by position
  document.querySelectorAll('.menu-card').forEach((card, i) => {
    const type = i % 2 === 0 ? 'slide-left' : 'slide-right';
    card.classList.add('anim-' + type);
    observer.observe(card);
  });

})();