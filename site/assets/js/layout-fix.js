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

  const showcase = document.getElementById('scroll-showcase');
  if (!showcase) return;

  const device = showcase.querySelector('.scroll-device');
  const copyBlocks = Array.from(showcase.querySelectorAll('.scroll-copy'));
  const orbitCards = Array.from(showcase.querySelectorAll('.scroll-orbit-card'));

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateScrollShowcase() {
    const rect = showcase.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const step = Math.min(copyBlocks.length - 1, Math.floor(progress * copyBlocks.length));

    showcase.dataset.step = String(step);
    if (device) device.style.setProperty('--scroll-progress', progress.toFixed(4));

    copyBlocks.forEach((block, index) => {
      block.classList.toggle('is-active', index === step);
    });

    orbitCards.forEach((card, index) => {
      const offset = (index + 1) * 24;
      const direction = index % 2 === 0 ? 1 : -1;
      card.style.transform = `translate3d(${direction * progress * offset}px, ${Math.sin(progress * Math.PI + index) * 22}px, 0)`;
    });
  }

  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateScrollShowcase();
      ticking = false;
    });
  }

  updateScrollShowcase();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
});
