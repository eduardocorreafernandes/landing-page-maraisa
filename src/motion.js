export function initMotion() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('is-revealing');
      target.addEventListener('animationend', () => target.classList.remove('is-revealing'), { once: true });
      observer.unobserve(target);
    });
  }, { threshold: .14, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}
