//     HOME PAGE


// Stats counter
const counters = document.querySelectorAll('.counter');
const statsSection = document.getElementById('stats');

if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const step = target / 120;
        function update() {
          count += step;
          if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        }
        update();
      });
      observer.disconnect();
    });
  });
  observer.observe(statsSection);
}

// Nav drawer toggle
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('navOverlay');
  if (navLinks) navLinks.classList.toggle('open');
  if (navOverlay) navOverlay.classList.toggle('open');
}

// ON SCROLL ANIMATIONS
const scrollElements = document.querySelectorAll(
  '.service-item, .about-content, .about-images, .testimonial-card, .stat, .our-work-header, .footer-section'
);

scrollElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

if (scrollElements.length) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  scrollElements.forEach(el => scrollObserver.observe(el));
}

// STAGGERED CHILDREN
const staggerParents = document.querySelectorAll('.services-row, .footer-content');
staggerParents.forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.12}s`;
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Header shrink on scroll
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}
