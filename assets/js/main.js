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
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('.form-message').textContent = 'Thank you! Your enquiry is ready to send. Connect this form to Formspree, Netlify Forms, or your email service before publishing.';
    form.reset();
  });
}
