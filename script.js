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

// Photo carousels (adapts to however many images are inside each track)
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  if (!track || !prevBtn || !nextBtn) return;

  if (track.querySelectorAll('img').length === 0) {
    carousel.style.display = 'none';
    return;
  }

  const scrollByAmount = () => {
    const firstImg = track.querySelector('img');
    if (!firstImg) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return firstImg.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 1;
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft >= maxScroll || maxScroll <= 0;
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });

  track.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
});
