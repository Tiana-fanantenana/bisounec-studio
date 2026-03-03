// ══════════════════════════════════════
// NAV SCROLL
// ══════════════════════════════════════
const nav = document.getElementById('nav')
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60)
  })
}

// ══════════════════════════════════════
// BURGER MENU
// ══════════════════════════════════════
const burger = document.getElementById('burger')
const mobileMenu = document.getElementById('mobileMenu')
if (burger && mobileMenu) {
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'))
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'))
  })
}

// ══════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80)
      }
    })
  },
  { threshold: 0.1 }
)
document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

// ══════════════════════════════════════
// FORMULAIRE → ENVOI EMAIL via EmailJS
// ══════════════════════════════════════
// ÉTAPE 1 : Allez sur https://www.emailjs.com → créez un compte GRATUIT
// ÉTAPE 2 : Créez un "Email Service" avec votre Gmail bisounecstudio@gmail.com
// ÉTAPE 3 : Créez un "Email Template" avec ces variables :
//           {{from_name}}, {{from_email}}, {{phone}}, {{service}}, {{message}}
// ÉTAPE 4 : Remplacez les 3 valeurs ci-dessous par vos vraies clés

const EMAILJS_PUBLIC_KEY  = 'CGbgvzDWSIB_YXVNq'   // ← depuis Account > API Keys
const EMAILJS_SERVICE_ID  = 'service_z2ytozx'   // ← depuis Email Services
const EMAILJS_TEMPLATE_ID = 'template_f88ovck'  // ← depuis Email Templates

// Chargement automatique d'EmailJS
;(function () {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
  script.onload = () => emailjs.init(EMAILJS_PUBLIC_KEY)
  document.head.appendChild(script)
})()

const form = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')
const formError   = document.getElementById('formError')
const submitBtn   = document.getElementById('submitBtn')

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    submitBtn.textContent = 'Envoi en cours...'
    submitBtn.disabled = true
    formSuccess.classList.remove('show')
    formError.classList.remove('show')

    const templateParams = {
      from_name:    document.getElementById('name').value,
      from_email:   document.getElementById('email').value,
      phone:        document.getElementById('phone').value || 'Non renseigné',
      service:      document.getElementById('service').value || 'Non précisé',
      message:      document.getElementById('message').value,
      to_email:     'bisounecstudio@gmail.com',
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      formSuccess.classList.add('show')
      form.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      formError.classList.add('show')
    } finally {
      submitBtn.textContent = 'Envoyer ma demande →'
      submitBtn.disabled = false
    }
  })
}

// ══════════════════════════════════════
// SMOOTH SCROLL
// ══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})