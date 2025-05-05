/* script.js */

document.addEventListener('DOMContentLoaded', function () {
    // ✅ Versió millorada (bo.html)
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-usuari');
  
    if (menuToggle && menu) {
      menuToggle.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!isExpanded));
        menu.toggleAttribute('hidden');
      });
    }
  
    // ❌ Versió amb errors (mal.html)
    // El menú es mostra i s'amaga visualment amb opacity i visibility,
    // però els enllaços romanen focusables
    const badMenuToggle = document.getElementById('bad-menu-toggle');
    const badMenu = badMenuToggle?.nextElementSibling;
  
    if (badMenuToggle && badMenu) {
      let badMenuVisible = true;
  
      badMenuToggle.addEventListener('click', function () {
        badMenuVisible = !badMenuVisible;
        if (badMenuVisible) {
            badMenu.classList.add('tancat');
        } else {
            badMenu.classList.remove('tancat');
        }
        // Sense modificar tabindex ni aria-hidden → focus incorrecte
      });
    }
  });