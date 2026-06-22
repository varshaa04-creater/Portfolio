const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// EmailJS contact form integration
const EMAILJS_PUBLIC_KEY = '91vQTylskMuZ6QWED';
const EMAILJS_SERVICE_ID = 'service_u3jlihe';
const EMAILJS_TEMPLATE_ID = 'template_vglquyt';

(function initEmailJS() {
  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const sendBtn = document.getElementById('send-btn');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!window.emailjs) {
      formStatus.textContent = 'Email service is loading. Please try again.';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    formStatus.textContent = '';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
      .then(() => {
        formStatus.textContent = 'Message sent successfully!';
        contactForm.reset();
      })
      .catch(() => {
        formStatus.textContent = 'Message failed. Please try again or email me directly.';
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Message';
      });
  });
}
