document.addEventListener('DOMContentLoaded', function() {
    // Додаємо обробники кліків для плавного скролу
    document.querySelectorAll('.header__menu-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Плавний скрол до елементу
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Оновлюємо URL без перезавантаження сторінки
          history.pushState(null, null, targetId);
          
          // Видаляємо активний клас у всіх посиланнях
          document.querySelectorAll('.header__menu-link').forEach(item => {
            item.classList.remove('header__menu-link--active');
          });
          
          // Додаємо активний клас до поточного посилання
          this.classList.add('header__menu-link--active');
        }
      });
    });
    
    // Додаємо стилі для активного посилання
    const style = document.createElement('style');
    style.textContent = `
      .header__menu-link--active {
        color: var(--secondary-color) !important;
      }
      .header__menu-link--active::after {
        width: 100% !important;
      }
    `;
    document.head.appendChild(style);
    
    // Встановлюємо активний пункт меню при завантаженні сторінки
    const currentHash = window.location.hash;
    if (currentHash) {
      const activeLink = document.querySelector(`.header__menu-link[href="${currentHash}"]`);
      if (activeLink) {
        activeLink.classList.add('header__menu-link--active');
      }
    }
  });