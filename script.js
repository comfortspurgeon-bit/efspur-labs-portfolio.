const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

// Mobile menu
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

// Header turns solid once the page scrolls
const updateHeader = () => header.classList.toggle('solid', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Footer year
document.querySelector('#year').textContent = new Date().getFullYear();

// Scroll reveal, with a small stagger for items inside the same grid
const revealItems = document.querySelectorAll('.reveal');
['.service-grid', '.price-grid', '.steps', '.mini-cases'].forEach((selector) => {
  document.querySelectorAll(selector + ' .reveal').forEach((item, index) => item.style.setProperty('--d', (index * 0.08) + 's'));
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
