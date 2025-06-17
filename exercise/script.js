// Exemple de gestió de formulari accessible
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-missatge').textContent = 'Missatge enviat correctament!';
  this.reset();
});

// Menú lateral
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const sideMenuBackdrop = document.getElementById('side-menu-backdrop');
const sideMenuClose = document.getElementById('side-menu-close');

function openSideMenu() {
  sideMenu.hidden = false;
  sideMenuBackdrop.hidden = false;
  sideMenu.setAttribute('open', '');
  sideMenuBackdrop.setAttribute('open', '');
  menuToggle.setAttribute('aria-expanded', 'true');
  // Focus al primer enllaç del menú
  const firstLink = sideMenu.querySelector('a');
  if (firstLink) firstLink.focus();
  // Atrapa el focus dins del menú
  document.addEventListener('focusin', trapFocusSideMenu);
  document.body.style.overflow = 'hidden';
}
function closeSideMenu() {
  sideMenu.hidden = true;
  sideMenuBackdrop.hidden = true;
  sideMenu.removeAttribute('open');
  sideMenuBackdrop.removeAttribute('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.focus();
  document.removeEventListener('focusin', trapFocusSideMenu);
  document.body.style.overflow = '';
}
menuToggle?.addEventListener('click', openSideMenu);
sideMenuClose?.addEventListener('click', closeSideMenu);
sideMenuBackdrop?.addEventListener('click', closeSideMenu);
document.addEventListener('keydown', (e) => {
  if (!sideMenu.hidden && e.key === 'Escape') {
    closeSideMenu();
  }
});

// Atrapar focus dins del menú lateral
function trapFocusSideMenu(e) {
  if (!sideMenu.contains(e.target)) {
    const focusables = sideMenu.querySelectorAll('a,button:not([disabled])');
    if (focusables.length) focusables[0].focus();
    e.stopPropagation();
  }
}

// Diàleg de logout
const logoutBtn = document.getElementById('logout-btn');
const logoutDialog = document.getElementById('logout-dialog');
const logoutCancel = document.getElementById('logout-cancel');
const logoutConfirm = document.getElementById('logout-confirm');

logoutBtn?.addEventListener('click', () => {
  if (logoutDialog.showModal) {
    logoutDialog.showModal();
  } else {
    logoutDialog.hidden = false;
  }
  logoutCancel?.focus();
});

logoutCancel?.addEventListener('click', () => {
  logoutDialog.close();
  logoutBtn.focus();
});
logoutDialog?.addEventListener('close', () => {
  logoutBtn.focus();
});
logoutDialog?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    logoutDialog.close();
  }
  if (e.key === 'Tab') {
    const focusables = logoutDialog.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const focusable = Array.prototype.slice.call(focusables);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (focusable.length === 0) return;
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  }
});

// Carrousel accessible
const carouselMessages = [
  "Benvingut a la nostra web accessible!",
  "Tots els serveis són pensats per a tothom.",
  "Consulta el nostre equip d'experts en accessibilitat.",
  "Contacta amb nosaltres per a més informació."
];
let carouselIndex = 0;
let carouselPaused = false;
let carouselInterval = null;

const carouselMessageEl = document.getElementById('carousel-message');
const carouselPauseBtn = document.getElementById('carousel-pause');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');
const pauseIcon = carouselPauseBtn?.querySelector('i.fa') || null;
const pauseLabel = carouselPauseBtn?.querySelector('.sr-only') || null;

function showCarouselMessage(idx) {
  carouselMessageEl.textContent = carouselMessages[idx];
  carouselMessageEl.focus();
}

function nextCarouselMessage() {
  carouselIndex = (carouselIndex + 1) % carouselMessages.length;
  showCarouselMessage(carouselIndex);
}

function prevCarouselMessage() {
  carouselIndex = (carouselIndex - 1 + carouselMessages.length) % carouselMessages.length;
  showCarouselMessage(carouselIndex);
}

function autoCarouselMessage() {
  if (!carouselPaused) {
    nextCarouselMessage();
  }
}

function startCarousel() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(autoCarouselMessage, 5000);
}

function pauseCarousel() {
  carouselPaused = true;
  carouselPauseBtn.setAttribute('aria-pressed', 'true');
  if (pauseIcon) {
    pauseIcon.classList.remove('fa-pause');
    pauseIcon.classList.add('fa-play');
  }
  if (pauseLabel) pauseLabel.textContent = 'Reprèn el carrousel';
}

function resumeCarousel() {
  carouselPaused = false;
  carouselPauseBtn.setAttribute('aria-pressed', 'false');
  if (pauseIcon) {
    pauseIcon.classList.remove('fa-play');
    pauseIcon.classList.add('fa-pause');
  }
  if (pauseLabel) pauseLabel.textContent = 'Pausa el carrousel';
  startCarousel();
}

carouselPauseBtn?.addEventListener('click', () => {
  if (carouselPaused) {
    resumeCarousel();
  } else {
    pauseCarousel();
  }
});

carouselPrevBtn?.addEventListener('click', () => {
  pauseCarousel();
  prevCarouselMessage();
});

carouselNextBtn?.addEventListener('click', () => {
  pauseCarousel();
  nextCarouselMessage();
});

showCarouselMessage(carouselIndex);
startCarousel();

// Atura el carrousel si l'usuari passa el focus al missatge o als controls
// carouselMessageEl?.addEventListener('focus', pauseCarousel);
// carouselPauseBtn?.addEventListener('focus', pauseCarousel);
// carouselPrevBtn?.addEventListener('focus', pauseCarousel);
// carouselNextBtn?.addEventListener('focus', pauseCarousel);

// Permet canviar missatge amb fletxes del teclat
carouselMessageEl?.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    pauseCarousel();
    prevCarouselMessage();
  } else if (e.key === 'ArrowRight') {
    pauseCarousel();
    nextCarouselMessage();
  }
});

// Validació en viu i missatges d’error accessibles al formulari de contacte
document.addEventListener("DOMContentLoaded", function () {
  // Validació en viu del formulari de contacte
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    const nameError = contactForm.querySelector("#name-error");
    const emailError = contactForm.querySelector("#email-error");

    function validateName() {
      if (!nameInput.value.trim()) {
        nameError.textContent = "El nom és obligatori.";
        return false;
      } else {
        nameError.textContent = "";
        return true;
      }
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      const valid = /^[^@]+@[^@]+\.[^@]+$/.test(value);
      if (!value) {
        emailError.textContent = "L'email és obligatori.";
        return false;
      } else if (!valid) {
        emailError.textContent = "Email invàlid.";
        return false;
      } else {
        emailError.textContent = "";
        return true;
      }
    }

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const validName = validateName();
      const validEmail = validateEmail();
      if (validName && validEmail) {
        showNotification("Formulari enviat correctament!");
        contactForm.reset();
        nameError.textContent = "";
        emailError.textContent = "";
      }
    });
  }

  // Notificació flotant accessible
  function showNotification(msg) {
    const notif = document.getElementById("notification");
    if (!notif) return;
    notif.textContent = msg;
    notif.hidden = false;
    notif.setAttribute("aria-live", "assertive");
    setTimeout(() => {
      notif.hidden = true;
      notif.textContent = "";
    }, 3000);
  }

  // Exposa la funció globalment si vols cridar-la des d'altres llocs
  window.showNotification = showNotification;
});

// Accessible accordion logic
document.addEventListener('DOMContentLoaded', function () {
  var accordion = document.getElementById('faq-accordion');
  if (!accordion) return;
  var buttons = accordion.querySelectorAll('button[aria-controls]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      var content = document.getElementById(btn.getAttribute('aria-controls'));
      if (content) {
        content.hidden = expanded;
      }
    });
    /** 
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        var idx = Array.prototype.indexOf.call(buttons, btn);
        var nextIdx = e.key === 'ArrowDown'
          ? (idx + 1) % buttons.length
          : (idx - 1 + buttons.length) % buttons.length;
        buttons[nextIdx].focus();
      }
    });
    */
  });
});