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

  const stories = [
    {
      leftLabel: 'Brand Report',
      leftTitle: 'Goldse quality program improves product consistency by 41%',
      leftText: 'Our internal inspection workflow combines material checks, assembly review, and documentation validation for every product line.',
      leftCta: 'Learn more',
      leftHref: 'about/',
      rightLabel: 'Creator Story',
      rightTitle: 'How makers use Goldse documentation to launch faster',
      rightText: 'Clear manuals and modular product resources help teams reduce setup time and improve customer confidence.',
      rightCta: 'View story',
      rightHref: 'Products/',
      mediaHref: 'about/',
      gradient: 'linear-gradient(135deg, #4b5563, #111827 54%, #0f766e)'
    },
    {
      leftLabel: 'Customer Trust',
      leftTitle: 'Reliable support resources for every product stage',
      leftText: 'From first setup to maintenance, Goldse keeps product guidance structured and easy to access.',
      leftCta: 'Read support',
      leftHref: 'manuals/',
      rightLabel: 'Service Standard',
      rightTitle: 'Documentation that reduces repeated questions',
      rightText: 'Consistent product pages and manuals help customers solve common issues faster.',
      rightCta: 'Open manuals',
      rightHref: 'manuals/',
      mediaHref: 'manuals/',
      gradient: 'linear-gradient(135deg, #1e3a8a, #020617 56%, #0ea5e9)'
    },
    {
      leftLabel: 'Product Confidence',
      leftTitle: 'A cleaner path from product display to purchase decision',
      leftText: 'Focused product modules help users compare product lines and understand features quickly.',
      leftCta: 'See products',
      leftHref: 'Products/',
      rightLabel: 'Brand System',
      rightTitle: 'Reusable modules keep the whole website consistent',
      rightText: 'The same visual system can support product launches, manuals, and support pages.',
      rightCta: 'Explore modules',
      rightHref: 'Products/',
      mediaHref: 'Products/',
      gradient: 'linear-gradient(135deg, #064e3b, #111827 52%, #65a30d)'
    },
    {
      leftLabel: 'Global Readiness',
      leftTitle: 'English public pages for international customers',
      leftText: 'Public-facing pages stay clean, consistent, and easy to understand for global visitors.',
      leftCta: 'About Goldse',
      leftHref: 'about/',
      rightLabel: 'Clear Structure',
      rightTitle: 'Private tools stay hidden from public navigation',
      rightText: 'Operational tools can remain accessible by direct URL without appearing in public menus.',
      rightCta: 'Contact us',
      rightHref: 'contact/',
      mediaHref: 'contact/',
      gradient: 'linear-gradient(135deg, #581c87, #111827 50%, #2563eb)'
    },
    {
      leftLabel: 'Long-term Value',
      leftTitle: 'A website foundation ready for future content growth',
      leftText: 'New product stories, trust badges, and support resources can be added without changing the whole structure.',
      leftCta: 'Start here',
      leftHref: 'Products/',
      rightLabel: 'Support Promise',
      rightTitle: 'Make product information easier to find and easier to trust',
      rightText: 'Every module is designed to improve clarity, reduce confusion, and support stronger customer decisions.',
      rightCta: 'Get support',
      rightHref: 'contact/',
      mediaHref: 'about/',
      gradient: 'linear-gradient(135deg, #7c2d12, #111827 52%, #0891b2)'
    }
  ];

  const left = trustSection.querySelector('[data-trust-link]');
  const right = trustSection.querySelector('[data-trust-link-right]');
  const media = trustSection.querySelector('[data-trust-media]');
  const tabs = Array.from(trustSection.querySelectorAll('[data-trust-tab]'));
  let activeTrustIndex = 0;
  let trustTimer;

  function fillTrustStory(element, story, side) {
    const label = element.querySelector('span');
    const title = element.querySelector('h2');
    const text = element.querySelector('p');
    const cta = element.querySelector('strong');
    label.textContent = story[`${side}Label`];
    title.textContent = story[`${side}Title`];
    text.textContent = story[`${side}Text`];
    cta.textContent = story[`${side}Cta`];
    element.href = story[`${side}Href`];
  }

  function setTrustStory(index) {
    activeTrustIndex = (index + stories.length) % stories.length;
    const story = stories[activeTrustIndex];
    trustSection.classList.add('is-switching');

    window.setTimeout(() => {
      fillTrustStory(left, story, 'left');
      fillTrustStory(right, story, 'right');
      media.href = story.mediaHref;
      media.style.background = story.gradient;
      tabs.forEach((tab, tabIndex) => tab.classList.toggle('is-active', tabIndex === activeTrustIndex));
      trustSection.classList.remove('is-switching');
    }, 180);
  }

  let wheelLocked = false;

  function handleTrustWheel(event) {
    const rect = trustSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.28;
    if (!inView || Math.abs(event.deltaY) < 8) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    const nextIndex = activeTrustIndex + direction;
    const canSwitch = nextIndex >= 0 && nextIndex < stories.length;

    if (!canSwitch) return;

    event.preventDefault();
    if (wheelLocked) return;

    wheelLocked = true;
    setTrustStory(nextIndex);
    window.setTimeout(() => {
      wheelLocked = false;
    }, 620);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setTrustStory(Number(tab.dataset.trustTab));
      trustSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  setTrustStory(0);
  window.addEventListener('wheel', handleTrustWheel, { passive: false });
});
