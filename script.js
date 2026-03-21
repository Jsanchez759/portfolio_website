const menuToggle = document.querySelector('.menu-toggle');
const topMenu = document.getElementById('top-menu');
const navLinks = document.querySelectorAll('.topmenu');
const observedSections = document.querySelectorAll('section[id]');

if (menuToggle && topMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = topMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      topMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${sectionId}`;
          link.classList.toggle('active', active);
        });
      });
    },
    { threshold: 0.35 }
  );

  observedSections.forEach((section) => navObserver.observe(section));
}
