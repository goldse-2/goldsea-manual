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

  const translations = {
    en: {
      byCategory: 'By Category',
      catalogTitle: 'Amazon ASIN collection',
      priceAmazon: 'Price shown on Amazon',
      viewAmazon: 'View on Amazon',
      backCatalog: 'Back to catalog',
      productGallery: 'Product Gallery',
      aplusImages: 'A+ Detail Images',
      viewProduct: 'View product →'
    },
    ja: {
      byCategory: 'カテゴリー',
      catalogTitle: 'Amazon ASIN コレクション',
      priceAmazon: '価格はAmazonでご確認ください',
      viewAmazon: 'Amazonで見る',
      backCatalog: 'カタログに戻る',
      productGallery: '商品ギャラリー',
      aplusImages: 'A+ 詳細画像',
      viewProduct: '商品を見る →'
    },
    de: {
      byCategory: 'Kategorie',
      catalogTitle: 'Amazon-ASIN-Kollektion',
      priceAmazon: 'Preis auf Amazon anzeigen',
      viewAmazon: 'Auf Amazon ansehen',
      backCatalog: 'Zurück zum Katalog',
      productGallery: 'Produktgalerie',
      aplusImages: 'A+ Detailbilder',
      viewProduct: 'Produkt ansehen →'
    },
    it: {
      byCategory: 'Categoria',
      catalogTitle: 'Collezione ASIN Amazon',
      priceAmazon: 'Prezzo disponibile su Amazon',
      viewAmazon: 'Vedi su Amazon',
      backCatalog: 'Torna al catalogo',
      productGallery: 'Galleria prodotto',
      aplusImages: 'Immagini dettagliate A+',
      viewProduct: 'Vedi prodotto →'
    }
  };

  const languageSelect = document.querySelector('[data-language-select]');
  const browserLanguage = (navigator.language || 'en').toLowerCase();
  const storedLanguage = localStorage.getItem('goldse-language');
  const detectedLanguage = browserLanguage.startsWith('ja') ? 'ja' : browserLanguage.startsWith('de') ? 'de' : browserLanguage.startsWith('it') ? 'it' : 'en';
  const currentLanguage = storedLanguage || detectedLanguage;

  function applyLanguage(language) {
    const dictionary = translations[language] || translations.en;
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-goldse-lang', language);
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (dictionary[key]) element.textContent = dictionary[key];
    });
    document.querySelectorAll('[data-lang-content]').forEach((element) => {
      const isActive = element.getAttribute('data-lang-content') === language;
      element.hidden = !isActive;
      element.style.display = isActive ? 'block' : 'none';
    });
    if (languageSelect) languageSelect.value = language;
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      localStorage.setItem('goldse-language', languageSelect.value);
      applyLanguage(languageSelect.value);
    });
  }
  applyLanguage(currentLanguage);

  const hero = document.getElementById('hero-carousel');
  if (!hero) return;

  const track = hero.querySelector('[data-hero-track]');
  const dots = Array.from(hero.querySelectorAll('[data-hero-dots] button'));
  const slideCount = dots.length;
  let activeSlide = 0;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  function setHeroSlide(index, animate = true) {
    activeSlide = Math.max(0, Math.min(slideCount - 1, index));
    if (!animate) hero.classList.add('is-dragging');
    track.style.transform = `translate3d(${-activeSlide * 100}%, 0, 0)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === activeSlide));
    if (!animate) requestAnimationFrame(() => hero.classList.remove('is-dragging'));
  }

  function pointerX(event) {
    return event.touches ? event.touches[0].clientX : event.clientX;
  }

  function startDrag(event) {
    dragging = true;
    startX = pointerX(event);
    currentX = startX;
    hero.classList.add('is-dragging');
  }

  function moveDrag(event) {
    if (!dragging) return;
    currentX = pointerX(event);
    const delta = currentX - startX;
    const offsetPercent = (delta / Math.max(1, hero.clientWidth)) * 100;
    track.style.transform = `translate3d(${(-activeSlide * 100) + offsetPercent}%, 0, 0)`;
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    hero.classList.remove('is-dragging');
    const delta = currentX - startX;
    const threshold = hero.clientWidth * 0.12;
    if (delta < -threshold) setHeroSlide(activeSlide + 1);
    else if (delta > threshold) setHeroSlide(activeSlide - 1);
    else setHeroSlide(activeSlide);
  }

  hero.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('mouseup', endDrag);
  hero.addEventListener('touchstart', startDrag, { passive: true });
  hero.addEventListener('touchmove', moveDrag, { passive: true });
  hero.addEventListener('touchend', endDrag);

  dots.forEach((dot, index) => dot.addEventListener('click', () => setHeroSlide(index)));
  setHeroSlide(0);
});


