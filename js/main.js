document.getElementById('year').textContent = new Date().getFullYear();

const phrases = [
  'backend systems.',
  'AI-powered dev tooling.',
  'cloud-native microservices.',
  'CI-native guardrails.'
];

const typingEl = document.getElementById('typing');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(tick, deleting ? 40 : 70);
}

tick();

// PROJECT MODAL
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');
const modalClose = document.getElementById('modalClose');
const modalLink = document.getElementById('modalLink');
let lastFocused = null;

function openModal(card) {
  modalTitle.textContent = card.querySelector('h3').textContent;
  modalDesc.textContent = card.querySelector('p').textContent;
  modalTags.innerHTML = card.querySelector('.tags').innerHTML;

  if (card.dataset.repo) {
    modalLink.href = card.dataset.repo;
    modalLink.hidden = false;
  } else {
    modalLink.hidden = true;
  }

  lastFocused = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card);
    }
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert("Thanks — I'll get back to you within 24 hours.");
    contactForm.reset();
  });
}
