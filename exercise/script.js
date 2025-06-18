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
    /* ==========================================================================================
      FIXME: Podem fer algun selector que permeti saber tots els focusables del diàleg 
    ========================================================================================== */
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

// Taula de dades: sort i filtre accessibles
(function() {
  const table = document.getElementById('equip-table');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const filterInput = document.getElementById('filter-input');
  const filterResults = document.getElementById('filter-results');
  let sortCol = null;
  let sortAsc = true;

  function renderTable(filteredRows) {
    tbody.innerHTML = '';
    filteredRows.forEach(row => tbody.appendChild(row));
    if (filterResults) {
      filterResults.textContent = filteredRows.length === 1
        ? '1 resultat trobat'
        : filteredRows.length + ' resultats trobats';
    }
  }

  function filterRows() {
    const val = filterInput.value.trim().toLowerCase();
    const filtered = rows.filter(row => {
      return Array.from(row.cells).some(cell =>
        cell.textContent.toLowerCase().includes(val)
      );
    });
    renderTable(filtered);
  }

  function sortRows(colIdx) {
    sortAsc = (sortCol !== colIdx) ? true : !sortAsc;
    sortCol = colIdx;
    rows.sort((a, b) => {
      const aText = a.cells[colIdx].textContent.trim().toLowerCase();
      const bText = b.cells[colIdx].textContent.trim().toLowerCase();
      if (aText < bText) return sortAsc ? -1 : 1;
      if (aText > bText) return sortAsc ? 1 : -1;
      return 0;
    });
    filterRows();
  }

  filterInput.addEventListener('input', filterRows);
  table.addEventListener('click', (e) => {
    const btn = e.target.closest('.sort-btn');
    if (btn) {
      const colIdx = btn.dataset.sort === 'nom' ? 0 : 1;
      sortRows(colIdx);
    }
  });

  table.querySelectorAll('.sort-btn').forEach((btn, idx) => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sortRows(idx);
      }
    });
  });

  renderTable(rows);
})();

// Barra de cerca accessible amb suggeriments automàtics
(function() {
  const searchInput = document.getElementById('search-input');
  const suggestionsList = document.getElementById('search-suggestions');
  // Opcions variades, més de 10 per mostrar scroll si cal
  const suggestions = [
    "Desenvolupament Web",
    "Formació",
    "Consultoria",
    "Accessibilitat",
    "Frontend",
    "Backend",
    "Auditoria",
    "Contacte",
    "Equip",
    "Serveis",
    "Disseny",
    "SEO",
    "Usabilitat",
    "Testing",
    "Documentació",
    "Projectes",
    "Clients",
    "Blog",
    "Notícies",
    "Suport"
  ];
  let filtered = [];
  let selectedIdx = -1;

  if (!searchInput || !suggestionsList) return;

  function updateSuggestions() {
    const val = searchInput.value.trim().toLowerCase();
    filtered = suggestions.filter(s => s.toLowerCase().includes(val));
    suggestionsList.innerHTML = '';
    if (filtered.length === 0 || !val) {
      suggestionsList.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
      return;
    }
    filtered.forEach((s, i) => {
      const li = document.createElement('li');
      li.role = 'option';
      li.id = 'suggestion-' + i;
      li.tabIndex = -1;
      li.textContent = s;
      li.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
      li.addEventListener('mousedown', function(e) {
        e.preventDefault();
        searchInput.value = s;
        suggestionsList.hidden = true;
        searchInput.setAttribute('aria-expanded', 'false');
      });
      suggestionsList.appendChild(li);
    });
    suggestionsList.hidden = false;
    searchInput.setAttribute('aria-expanded', 'true');
    selectedIdx = -1;
    // Si hi ha moltes opcions, mostra scroll
    if (filtered.length > 7) {
      suggestionsList.style.maxHeight = '14em';
      suggestionsList.style.overflowY = 'auto';
    } else {
      suggestionsList.style.maxHeight = '';
      suggestionsList.style.overflowY = '';
    }
  }

  searchInput.addEventListener('input', updateSuggestions);

  searchInput.addEventListener('keydown', function(e) {
    const items = suggestionsList.querySelectorAll('li');
    if (suggestionsList.hidden || items.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = (selectedIdx + 1) % items.length;
      updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = (selectedIdx - 1 + items.length) % items.length;
      updateSelection(items);
    } else if (e.key === 'Enter') {
      if (selectedIdx >= 0 && items[selectedIdx]) {
        e.preventDefault();
        searchInput.value = items[selectedIdx].textContent;
        suggestionsList.hidden = true;
        searchInput.setAttribute('aria-expanded', 'false');
      }
    } else if (e.key === 'Escape') {
      suggestionsList.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
    }
  });

  function updateSelection(items) {
    items.forEach((li, i) => {
      li.setAttribute('aria-selected', i === selectedIdx ? 'true' : 'false');
      if (i === selectedIdx) li.scrollIntoView({block: 'nearest'});
    });
  }

  // Oculta suggeriments si el focus marxa
  searchInput.addEventListener('blur', function() {
    setTimeout(() => {
      suggestionsList.hidden = true;
      searchInput.setAttribute('aria-expanded', 'false');
    }, 100);
  });
})();

// Saltar targetes de producte/servei amb botó només visible amb focus de teclat
(function() {
  const cardsList = document.getElementById('cards-list');
  const postCards = document.getElementById('post-cards');
  if (!cardsList || !postCards) return;

  const allCards = cardsList.querySelectorAll('.product-card');
  allCards.forEach(card => {
    card.addEventListener('keydown', function(e) {
      const actions = Array.from(card.querySelectorAll('.card-action'));
      const idx = actions.indexOf(document.activeElement);
      if (e.key === 'ArrowRight' && idx !== -1) {
        e.preventDefault();
        actions[(idx + 1) % actions.length].focus();
      } else if (e.key === 'ArrowLeft' && idx !== -1) {
        e.preventDefault();
        actions[(idx - 1 + actions.length) % actions.length].focus();
      } else if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === card) {
        e.preventDefault();
        // Focus primer botó d'acció
        if (actions.length) actions[0].focus();
      }
    });
    // No cal res més, el focus ja arriba al card i als botons
  });
})();

// Slider funcional accessible (div amb rols)
(function() {
  const slider = document.getElementById('satisfaccio-slider');
  const thumb = document.getElementById('slider-thumb');
  const bar = document.getElementById('slider-bar');
  const valueSpan = document.getElementById('satisfaccio-value');
  const min = 0, max = 10;
  let value = 5;

  function updateSlider(newValue, fireEvent = true) {
    value = Math.max(min, Math.min(max, newValue));
    slider.setAttribute('aria-valuenow', value);
    valueSpan.textContent = value;
    // Update thumb position
    const percent = (value - min) / (max - min);
    thumb.style.left = `calc(${percent * 100}% - 10px)`;
    if (fireEvent) {
      const event = new CustomEvent('input', { detail: value });
      slider.dispatchEvent(event);
    }
  }

  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      updateSlider(value - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      updateSlider(value + 1);
      e.preventDefault();
    } else if (e.key === 'Home') {
      updateSlider(min);
      e.preventDefault();
    } else if (e.key === 'End') {
      updateSlider(max);
      e.preventDefault();
    }
  });

  // Click a la barra per moure el thumb
  bar.addEventListener('click', function(e) {
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    updateSlider(Math.round(percent * (max - min) + min));
  });

  // Drag amb el ratolí
  let dragging = false;
  thumb.addEventListener('mousedown', function(e) {
    dragging = true;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    updateSlider(Math.round(percent * (max - min) + min));
  });
  document.addEventListener('mouseup', function() {
    if (dragging) {
      dragging = false;
      document.body.style.userSelect = '';
    }
  });

  // Focus visual al thumb quan el slider té focus
  slider.addEventListener('focus', () => thumb.style.boxShadow = '0 0 0 3px #ff9800');
  slider.addEventListener('blur', () => thumb.style.boxShadow = '');

  // Inicialitza
  updateSlider(value, false);
})();