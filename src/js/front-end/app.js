function isInViewport(section) {
  const rect = section.getBoundingClientRect();
  const offset = 120;
  return rect.top <= offset && rect.bottom >= offset;
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navBar = document.querySelector('nav');

  if (window.scrollY > 0) {
    navBar.classList.add('sticky');
  } else {
    navBar.classList.remove('sticky');
  }

  sections.forEach((section) => {
    const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
    if (!navLink) {
      return;
    }

    const navItem = navLink.closest('.navbar-item');
    if (isInViewport(section)) {
      navItem.classList.add('active');
    } else {
      navItem.classList.remove('active');
    }
  });
}

function initMobileMenu() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('[data-menu="navbar-menu"]');
  const burgerLabel = burger?.querySelector('.burger-label');
  const closeLabel = burger?.querySelector('.close-label');
  const burgerIcon = burger?.querySelector('.burger-icon');
  const closeIcon = burger?.querySelector('.close-icon');

  if (!burger || !menu) {
    return;
  }

  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');

    burgerLabel?.classList.toggle('is-hide');
    closeLabel?.classList.toggle('is-hide');
    burgerIcon?.classList.toggle('is-hide');
    closeIcon?.classList.toggle('is-hide');
  });

  const links = menu.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024 && menu.classList.contains('is-active')) {
        menu.classList.remove('is-active');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        burgerLabel?.classList.remove('is-hide');
        closeLabel?.classList.add('is-hide');
        burgerIcon?.classList.remove('is-hide');
        closeIcon?.classList.add('is-hide');
      }
    });
  });
}

window.addEventListener('scroll', updateActiveNav);
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  updateActiveNav();
});
