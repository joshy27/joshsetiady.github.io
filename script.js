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
