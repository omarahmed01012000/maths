if (!window.AHMED_MATHS_INITIALIZED) {
window.AHMED_MATHS_INITIALIZED = true;
document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });
}

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = form.querySelector('.form-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const config = window.SUPABASE_CONFIG;

    if (!config) {
      message.textContent = 'The enquiry service is not configured yet. Please try again later.';
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    message.textContent = '';

    try {
      const response = await fetch(`${config.url}/rest/v1/enquiries`, {
        method: 'POST',
        headers: {
          apikey: config.publishableKey,
          Authorization: `Bearer ${config.publishableKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      message.textContent = 'Thank you—your enquiry has been sent. Ahmed will be in touch soon.';
    } catch (error) {
      message.textContent = 'Sorry, your enquiry could not be sent right now. Please use WhatsApp or email instead.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send enquiry <span>→</span>';
    }
  });
}
}
