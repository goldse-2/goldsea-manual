// Fix layout issues with Material for MkDocs theme
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box !important;
    }
    
    html {
      width: 100% !important;
    }
    
    body {
      width: 100% !important;
      display: block !important;
      flex: none !important;
    }
    
    .md-sidebar,
    .md-sidebar--primary,
    .md-sidebar--secondary {
      display: none !important;
      visibility: hidden !important;
      width: 0 !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    .md-container {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      display: block !important;
      flex: none !important;
    }
    
    .md-main {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      display: block !important;
      flex: none !important;
    }
    
    .md-main__inner {
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
      display: block !important;
      margin: 0 !important;
    }
    
    .md-content {
      width: 100% !important;
      max-width: 100% !important;
      flex: none !important;
      padding: 40px !important;
      display: block !important;
      margin: 0 !important;
    }
    
    article {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 auto;
      padding: 0 !important;
    }
  `;
  document.head.appendChild(style);
  const trustSection = document.getElementById('brand-trust');
  if (!trustSection) return;

  const track = trustSection.querySelector('[data-trust-track]');
  const dots = Array.from(trustSection.querySelectorAll('.trust-progress-dots span'));

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateHorizontalTrust() {
    const rect = trustSection.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    const translateX = -maxTranslate * progress;
    const dotIndex = Math.min(dots.length - 1, Math.floor(progress * dots.length));

    track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === dotIndex));
  }

  let horizontalTicking = false;
  function requestHorizontalTrustUpdate() {
    if (horizontalTicking) return;
    horizontalTicking = true;
    requestAnimationFrame(() => {
      updateHorizontalTrust();
      horizontalTicking = false;
    });
  }

  updateHorizontalTrust();
  window.addEventListener('scroll', requestHorizontalTrustUpdate, { passive: true });
  window.addEventListener('resize', requestHorizontalTrustUpdate);
});
