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

    body.goldse-storefront-header .md-header,
    body.goldse-storefront-header .md-tabs {
      display: none !important;
    }

    body.goldse-storefront-header .storefront-global-topbar {
      margin: -40px -40px 32px -40px;
      position: sticky;
      top: 0;
      z-index: 100;
    }
  `;
  document.head.appendChild(style);

  const pathName = window.location.pathname.toLowerCase();
  const excludedHeaderPages = pathName.includes('/1131503090') || pathName.includes('/3d') || pathName.includes('/3d.md');
  const hasHomeHeader = Boolean(document.querySelector('.storefront-page .storefront-topbar'));
  if (!excludedHeaderPages && hasHomeHeader) {
    document.body.classList.add('goldse-storefront-header');
  }

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

  const productThumbs = Array.from(document.querySelectorAll('.product-thumb img'));
  const mainProductImage = document.querySelector('[data-main-product-image]');
  let activeProductImage = 0;

  function setProductImage(index) {
    if (!mainProductImage || !productThumbs.length) return;
    activeProductImage = (index + productThumbs.length) % productThumbs.length;
    mainProductImage.src = productThumbs[activeProductImage].src;
    productThumbs.forEach((thumb, thumbIndex) => {
      thumb.closest('.product-thumb')?.classList.toggle('active', thumbIndex === activeProductImage);
    });
  }

  productThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => setProductImage(index));
  });

  const gallerySurface = document.querySelector('.amazon-detail-image');
  if (gallerySurface && productThumbs.length > 1) {
    let galleryStartX = 0;
    let galleryDragging = false;
    const galleryX = (event) => event.touches ? event.touches[0].clientX : event.clientX;
    gallerySurface.addEventListener('mousedown', (event) => { galleryDragging = true; galleryStartX = galleryX(event); });
    gallerySurface.addEventListener('touchstart', (event) => { galleryDragging = true; galleryStartX = galleryX(event); }, { passive: true });
    window.addEventListener('mouseup', (event) => {
      if (!galleryDragging) return;
      const delta = galleryX(event) - galleryStartX;
      galleryDragging = false;
      if (Math.abs(delta) > 50) setProductImage(activeProductImage + (delta < 0 ? 1 : -1));
    });
    gallerySurface.addEventListener('touchend', (event) => {
      if (!galleryDragging) return;
      const touch = event.changedTouches && event.changedTouches[0];
      if (!touch) return;
      const delta = touch.clientX - galleryStartX;
      galleryDragging = false;
      if (Math.abs(delta) > 50) setProductImage(activeProductImage + (delta < 0 ? 1 : -1));
    });
    setProductImage(0);
  }


  const productTranslationScript = document.querySelector('[data-product-translations]');
  let productTranslations = null;
  try {
    productTranslations = productTranslationScript ? JSON.parse(productTranslationScript.textContent || '{}') : null;
  } catch (error) {
    productTranslations = null;
  }

  function renderProductCopy(language) {
    if (!productTranslations || !productTranslations[language]) return;
    const data = productTranslations[language];
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element && value) element.textContent = value;
    };
    setText('[data-product-title]', data.title);
    setText('[data-product-desc]', data.desc);
    setText('[data-buy-title]', data.buyTitle || data.title);
    setText('[data-buy-price]', data.buyPrice);
    setText('[data-product-about-title]', data.aboutTitle);
    setText('[data-product-features-title]', data.featuresTitle);
    setText('[data-product-specs-title]', data.specsTitle);
    setText('[data-product-analysis-title]', data.analysisTitle);
    setText('[data-product-qa-title]', data.qaTitle);
    const about = document.querySelector('[data-product-about]');
    if (about && Array.isArray(data.about)) about.innerHTML = data.about.map((item) => `<li>${item}</li>`).join('');
    const features = document.querySelector('[data-product-features]');
    if (features && Array.isArray(data.features)) features.innerHTML = data.features.map((item) => `<li>${item}</li>`).join('');
    const specs = document.querySelector('[data-product-specs]');
    if (specs && Array.isArray(data.specs)) specs.innerHTML = data.specs.map((row) => `<tr><th>${row[0]}</th><td>${row[1]}</td></tr>`).join('');
    const analysis = document.querySelector('[data-product-analysis]');
    if (analysis && Array.isArray(data.analysis)) analysis.innerHTML = data.analysis.map((item) => `<li>${item}</li>`).join('');
    const qa = document.querySelector('[data-product-qa]');
    if (qa && Array.isArray(data.qa)) qa.innerHTML = data.qa.map((row) => `<details><summary>${row[0]}</summary><p>${row[1]}</p></details>`).join('');
  }

  renderProductCopy(currentLanguage);
  if (languageSelect) {
    languageSelect.addEventListener('change', () => renderProductCopy(languageSelect.value));
  }

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




