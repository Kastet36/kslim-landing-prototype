(() => {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  let lastFocusedElement = null;

  const getModal = (id) => document.getElementById(id);

  const openModal = (modal) => {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    body.classList.add('is-locked');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    modal.querySelector('.modal__close, input, button')?.focus();
  };

  const closeModal = (modal, restoreFocus = true) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    body.classList.remove('is-locked');
    if (restoreFocus) lastFocusedElement?.focus();
  };

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-modal-open]');
    if (opener) {
      openModal(getModal(opener.dataset.modalOpen));
      return;
    }

    const switcher = event.target.closest('[data-modal-switch]');
    if (switcher) {
      closeModal(switcher.closest('.modal'), false);
      openModal(getModal(switcher.dataset.modalSwitch));
      return;
    }

    const closer = event.target.closest('[data-modal-close]');
    if (closer) {
      closeModal(closer.closest('.modal'));
      return;
    }

    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openModalElement = document.querySelector('.modal.is-open');
    if (openModalElement) closeModal(openModalElement);
  });

  document.querySelectorAll('.prototype-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const result = form.querySelector('.form-result');
      result.hidden = false;
    });
  });

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });

  mobileMenu?.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    mobileMenu.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
})();
