// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const toolbarLinks = document.querySelector('.toolbar-links');

if (navToggle && toolbarLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = toolbarLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  toolbarLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toolbarLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal for each sheet
const sheets = document.querySelectorAll('.sheet');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  sheets.forEach((sheet) => observer.observe(sheet));
} else {
  sheets.forEach((sheet) => sheet.classList.add('in-view'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Photo stages: single large photo at a time, stacked and swapped on arrow press.
// Adapts to however many <img> tags are inside each .stage-window.
document.querySelectorAll('[data-stage]').forEach((stage) => {
  const window_ = stage.querySelector('.stage-window');
  const prevBtn = stage.querySelector('.stage-prev');
  const nextBtn = stage.querySelector('.stage-next');
  if (!window_ || !prevBtn || !nextBtn) return;

  const slides = Array.from(window_.querySelectorAll('img'));

  if (slides.length === 0) {
    stage.style.display = 'none';
    return;
  }

  let current = 0;
  slides[0].classList.add('active');

  if (slides.length === 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const goTo = (nextIndex) => {
    const outgoing = slides[current];
    outgoing.classList.remove('active');
    outgoing.classList.add('exit-left');

    current = (nextIndex + slides.length) % slides.length;
    const incoming = slides[current];
    incoming.classList.remove('exit-left');
    // Force reflow so the transition replays even if this slide exited before
    void incoming.offsetWidth;
    incoming.classList.add('active');

    window.setTimeout(() => outgoing.classList.remove('exit-left'), 420);
  };

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
});

