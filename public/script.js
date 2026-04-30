const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const contactForm = document.querySelector('[data-contact-form]');
const formMessage = document.querySelector('[data-form-message]');

const syncHeader = () => {
  if (!header) return;

  const isScrolled = window.scrollY > 12;
  header.classList.toggle('bg-white/95', isScrolled);
  header.classList.toggle('shadow-header', isScrolled);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  if (!nav) return;

  const isOpen = nav.classList.contains('hidden');
  nav.classList.toggle('hidden', !isOpen);
  nav.classList.toggle('flex', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Zavřít menu' : 'Otevřít menu');
});

nav?.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;
  if (window.innerWidth >= 768) return;

  nav.classList.add('hidden');
  nav.classList.remove('flex');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Otevřít menu');
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalLabel = submitButton?.textContent ?? '';

  if (formMessage) {
    formMessage.textContent = 'Odesíláme zprávu...';
  }

  submitButton?.setAttribute('disabled', 'disabled');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: new FormData(contactForm),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || 'Formulář se nepodařilo odeslat.');
    }

    if (formMessage) {
      formMessage.textContent = 'Děkujeme za zprávu. Ozveme se vám co nejdříve.';
    }

    contactForm.reset();
  } catch (error) {
    if (formMessage) {
      formMessage.textContent =
        error instanceof Error ? error.message : 'Formulář se nepodařilo odeslat.';
    }
  } finally {
    submitButton?.removeAttribute('disabled');
    if (submitButton) {
      submitButton.textContent = originalLabel;
    }
  }
});
