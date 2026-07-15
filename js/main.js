/* ========================================
   SHARED JS - VisaWork Peru Platform
   ======================================== */

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

function initFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Run immediately if DOM already loaded, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFadeIn);
} else {
  initFadeIn();
}

// Accordion Toggle
function toggleAcc(item) {
  item.classList.toggle('open');
}

// FAQ Toggle
function toggleFaq(item) {
  item.classList.toggle('open');
}

// Keyboard support for accordion
document.querySelectorAll('.acc-header').forEach(h => {
  h.setAttribute('tabindex', '0');
  h.setAttribute('role', 'button');
  h.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAcc(h.parentElement);
    }
  });
});

// Keyboard support for FAQ
document.querySelectorAll('.faq-question').forEach(q => {
  q.setAttribute('tabindex', '0');
  q.setAttribute('role', 'button');
  q.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(q.parentElement);
    }
  });
});

// Active nav highlight on scroll
function initNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  if (sections.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// Initialize nav highlight
document.addEventListener('DOMContentLoaded', initNavHighlight);
