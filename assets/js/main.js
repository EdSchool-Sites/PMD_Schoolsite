(() => {
  const root = document.documentElement;
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const year = document.querySelector('[data-year]');

  const savedTheme = localStorage.getItem('pcmundial-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (prefersDark ? 'dark' : 'light');

  const updateThemeLabel = () => {
    if (!themeBtn) return;
    const dark = root.dataset.theme === 'dark';
    themeBtn.textContent = dark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  };
  updateThemeLabel();

  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pcmundial-theme', root.dataset.theme);
    updateThemeLabel();
  });

  menuBtn?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(Boolean(open)));
  });

  document.addEventListener('click', (event) => {
    if (!menu || !menuBtn || window.innerWidth >= 980) return;
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('[data-form-status]');
    if (status) status.textContent = 'Formulario demostrativo: en GitHub Pages necesitarás un servicio externo para enviar mensajes.';
  });

  if (year) year.textContent = new Date().getFullYear();
})();
