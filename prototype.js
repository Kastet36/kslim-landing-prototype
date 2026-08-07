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
    const keyboardOpener = event.target.closest('[data-modal-open][role="button"]');
    if (keyboardOpener && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openModal(getModal(keyboardOpener.dataset.modalOpen));
      return;
    }

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

  document.querySelectorAll('.detail-equipment').forEach((section) => {
    const label = section.querySelector(':scope > span');
    const image = section.querySelector(':scope > img');
    const title = section.querySelector(':scope > strong');
    if (!label || !image || !title) return;

    label.textContent = 'Подходящие машины';
    label.className = 'detail-equipment__heading';

    const grid = document.createElement('div');
    grid.className = 'detail-equipment__grid';

    for (let index = 1; index <= 6; index += 1) {
      const card = document.createElement('article');
      card.className = 'detail-equipment__card';

      const cardImage = image.cloneNode(true);
      const cardBody = document.createElement('div');
      const cardLabel = document.createElement('small');
      const cardTitle = title.cloneNode(true);

      cardLabel.textContent = `Пример карточки ${String(index).padStart(2, '0')}`;
      cardBody.append(cardLabel, cardTitle);
      card.append(cardImage, cardBody);
      grid.append(card);
    }

    section.replaceChildren(label, grid);
  });

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });

  mobileMenu?.addEventListener('click', (event) => {
    if (!event.target.closest('a, [data-modal-open]')) return;
    mobileMenu.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
})();
