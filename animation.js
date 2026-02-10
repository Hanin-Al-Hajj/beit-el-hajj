// Stats counter
const counters = document.querySelectorAll('.counter');
const statsSection = document.getElementById('stats');

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