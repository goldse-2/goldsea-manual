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
  const hasStorefrontHeader = Boolean(document.querySelector('.storefront-page .storefront-topbar, .storefront-page-header'));
  if (!excludedHeaderPages && hasStorefrontHeader) {
    document.body.classList.add('goldse-storefront-header');
    document.querySelectorAll('.md-header, .md-tabs').forEach((element) => element.remove());
  }

  const translations = {
    en: {
      byCategory: 'By Category',
      catalogTitle: 'Product collection',
      priceAmazon: 'Price shown on Amazon',
      viewAmazon: 'View on Amazon',
      backCatalog: 'Back to catalog',
      productGallery: 'Product Gallery',
      aplusImages: 'A+ Detail Images',
      viewProduct: 'View product →',
      catScrewdrivers: 'Electric Screwdrivers',
      catChainsaws: 'Mini Chainsaws',
      catParts: 'Chainsaw Accessories',
      catEarbuds: 'Translation Earbuds',
      visibleProducts: '9 visible products',
      sortButton: 'Sort ▾'
    },
    ja: {
      byCategory: 'カテゴリー',
      catalogTitle: '商品コレクション',
      priceAmazon: '価格はAmazonでご確認ください',
      viewAmazon: 'Amazonで見る',
      backCatalog: 'カタログに戻る',
      productGallery: '商品ギャラリー',
      aplusImages: 'A+ 詳細画像',
      viewProduct: '商品を見る →',
      catScrewdrivers: '電動ドライバー',
      catChainsaws: 'ミニチェーンソー',
      catParts: 'チェーンソーアクセサリー',
      catEarbuds: '翻訳イヤホン',
      visibleProducts: '9件の商品を表示',
      sortButton: '並び替え ▾'
    },
    de: {
      byCategory: 'Kategorie',
      catalogTitle: 'Produktkollektion',
      priceAmazon: 'Preis auf Amazon anzeigen',
      viewAmazon: 'Auf Amazon ansehen',
      backCatalog: 'Zurück zum Katalog',
      productGallery: 'Produktgalerie',
      aplusImages: 'A+ Detailbilder',
      viewProduct: 'Produkt ansehen →',
      catScrewdrivers: 'Elektroschrauber',
      catChainsaws: 'Mini-Kettensägen',
      catParts: 'Kettensägen-Zubehör',
      catEarbuds: 'Übersetzungs-Ohrhörer',
      visibleProducts: '9 Produkte sichtbar',
      sortButton: 'Sortieren ▾'
    },
    it: {
      byCategory: 'Categoria',
      catalogTitle: 'Collezione prodotti',
      priceAmazon: 'Prezzo disponibile su Amazon',
      viewAmazon: 'Vedi su Amazon',
      backCatalog: 'Torna al catalogo',
      productGallery: 'Galleria prodotto',
      aplusImages: 'Immagini dettagliate A+',
      viewProduct: 'Vedi prodotto →',
      catScrewdrivers: 'Cacciaviti elettrici',
      catChainsaws: 'Mini motoseghe',
      catParts: 'Accessori per motoseghe',
      catEarbuds: 'Auricolari traduttori',
      visibleProducts: '9 prodotti visibili',
      sortButton: 'Ordina ▾'
    }
  };

  const languageSelect = document.querySelector('[data-language-select]');
  const supportedLanguages = ['en', 'ja', 'de', 'it'];
  const browserLanguages = [navigator.language, ...(navigator.languages || [])]
    .filter(Boolean)
    .map((language) => language.toLowerCase());
  const storedLanguage = localStorage.getItem('goldse-language');
  const detectedLanguage = browserLanguages.reduce((match, language) => {
    if (match) return match;
    const baseLanguage = language.split('-')[0];
    return supportedLanguages.includes(baseLanguage) ? baseLanguage : '';
  }, '') || 'en';
  const currentLanguage = supportedLanguages.includes(storedLanguage) ? storedLanguage : detectedLanguage;

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


  const catalogTranslations = {"b09yrdy3ys": {"en": {"title": "Goldsea 4.2V Mini Electric Screwdriver", "category": "Electric Screwdrivers", "code": "B09YRDY3YS"}, "ja": {"title": "Goldsea 4.2V 小型コードレス電動ドライバー", "category": "電動ドライバー", "code": "B09YRDY3YS"}, "de": {"title": "Goldsea 4,2V Mini-Akkuschrauber", "category": "Elektroschrauber", "code": "B09YRDY3YS"}, "it": {"title": "Goldsea mini cacciavite elettrico cordless 4,2V", "category": "Cacciaviti elettrici", "code": "B09YRDY3YS"}}, "b0bblmbyp8": {"en": {"title": "Goldsea 6 Inch Mini Chainsaw with 4000 mAh Battery", "category": "Mini Chainsaws", "code": "B0BBLMBYP8"}, "ja": {"title": "Goldsea 6インチ バッテリー式ミニチェーンソー", "category": "ミニチェーンソー", "code": "B0BBLMBYP8"}, "de": {"title": "Goldsea 6-Zoll Akku-Mini-Kettensäge", "category": "Mini-Kettensägen", "code": "B0BBLMBYP8"}, "it": {"title": "Goldsea mini motosega a batteria da 6 pollici", "category": "Mini motoseghe", "code": "B0BBLMBYP8"}}, "b0bbvg9zln": {"en": {"title": "Goldsea 4.2V Adjustable Electric Screwdriver", "category": "Electric Screwdrivers", "code": "B0BBVG9ZLN"}, "ja": {"title": "Goldsea 4.2V 小型コードレス電動ドライバー", "category": "電動ドライバー", "code": "B0BBVG9ZLN"}, "de": {"title": "Goldsea 4,2V Mini-Akkuschrauber", "category": "Elektroschrauber", "code": "B0BBVG9ZLN"}, "it": {"title": "Goldsea mini cacciavite elettrico cordless 4,2V", "category": "Cacciaviti elettrici", "code": "B0BBVG9ZLN"}}, "b0bcwdf3kb": {"en": {"title": "Goldsea Chainsaw Guide Plate and Saw Chain Set", "category": "Chainsaw Accessories", "code": "B0BCWDF3KB"}, "ja": {"title": "Goldsea ミニチェーンソー交換用ガイドバー・チェーンセット", "category": "チェーンソーアクセサリー", "code": "B0BCWDF3KB"}, "de": {"title": "Goldsea Ersatzschwert- und Sägeketten-Set für Mini-Kettensäge", "category": "Kettensägen-Zubehör", "code": "B0BCWDF3KB"}, "it": {"title": "Goldsea set barra guida e catena di ricambio per mini motosega", "category": "Accessori per motoseghe", "code": "B0BCWDF3KB"}}, "b0bqw4mbn4": {"en": {"title": "Goldsea 4.2V Cordless Electric Screwdriver", "category": "Electric Screwdrivers", "code": "B0BQW4MBN4"}, "ja": {"title": "Goldsea 4.2V 小型コードレス電動ドライバー", "category": "電動ドライバー", "code": "B0BQW4MBN4"}, "de": {"title": "Goldsea 4,2V Mini-Akkuschrauber", "category": "Elektroschrauber", "code": "B0BQW4MBN4"}, "it": {"title": "Goldsea mini cacciavite elettrico cordless 4,2V", "category": "Cacciaviti elettrici", "code": "B0BQW4MBN4"}}, "b0c48z1hbr": {"en": {"title": "Goldsea 6 Inch Mini Chainsaw with Battery and Charger", "category": "Mini Chainsaws", "code": "B0C48Z1HBR"}, "ja": {"title": "Goldsea 6インチ バッテリー式ミニチェーンソー", "category": "ミニチェーンソー", "code": "B0C48Z1HBR"}, "de": {"title": "Goldsea 6-Zoll Akku-Mini-Kettensäge", "category": "Mini-Kettensägen", "code": "B0C48Z1HBR"}, "it": {"title": "Goldsea mini motosega a batteria da 6 pollici", "category": "Mini motoseghe", "code": "B0C48Z1HBR"}}, "b0cffk4v9k": {"en": {"title": "Goldsea White 4.2V Mini Electric Screwdriver", "category": "Electric Screwdrivers", "code": "B0CFFK4V9K"}, "ja": {"title": "Goldsea 4.2V 小型コードレス電動ドライバー", "category": "電動ドライバー", "code": "B0CFFK4V9K"}, "de": {"title": "Goldsea 4,2V Mini-Akkuschrauber", "category": "Elektroschrauber", "code": "B0CFFK4V9K"}, "it": {"title": "Goldsea mini cacciavite elettrico cordless 4,2V", "category": "Cacciaviti elettrici", "code": "B0CFFK4V9K"}}, "b0gc6chlqt": {"en": {"title": "Goldsea AI Translation Earbuds", "category": "Translation Earbuds", "code": "B0GC6CHLQT"}, "ja": {"title": "Goldsea AIリアルタイム翻訳イヤホン", "category": "翻訳イヤホン", "code": "B0GC6CHLQT"}, "de": {"title": "Goldsea KI-Echtzeit-Übersetzungs-Ohrhörer", "category": "Übersetzungs-Ohrhörer", "code": "B0GC6CHLQT"}, "it": {"title": "Goldsea auricolari AI per traduzione in tempo reale", "category": "Auricolari traduttori", "code": "B0GC6CHLQT"}}, "b0gwzcbmb7": {"en": {"title": "Goldsea Portable Battery Hand Chainsaw", "category": "Mini Chainsaws", "code": "B0GWZCBMB7"}, "ja": {"title": "Goldsea 6インチ バッテリー式ミニチェーンソー", "category": "ミニチェーンソー", "code": "B0GWZCBMB7"}, "de": {"title": "Goldsea 6-Zoll Akku-Mini-Kettensäge", "category": "Mini-Kettensägen", "code": "B0GWZCBMB7"}, "it": {"title": "Goldsea mini motosega a batteria da 6 pollici", "category": "Mini motoseghe", "code": "B0GWZCBMB7"}}};

  function renderCatalogCopy(language) {
    document.querySelectorAll('[data-catalog-product]').forEach((card) => {
      const key = card.getAttribute('data-catalog-product');
      const data = catalogTranslations[key] && (catalogTranslations[key][language] || catalogTranslations[key].en);
      if (!data) return;
      const title = card.querySelector('h3');
      const meta = card.querySelector('p');
      if (title) title.textContent = data.title;
      if (meta) meta.textContent = `${data.category} · ${data.code}`;
    });
  }

  function renderFullLanguage(language) {
    applyLanguage(language);
    renderCatalogCopy(language);
    renderProductCopy(language);
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      localStorage.setItem('goldse-language', languageSelect.value);
      renderFullLanguage(languageSelect.value);
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

  renderFullLanguage(currentLanguage);

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




