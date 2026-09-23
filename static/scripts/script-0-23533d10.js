
    function setBgImages() {
      document.querySelectorAll('[data-src]').forEach(function(el) {
        if (el.classList.contains('hero-bg') || el.classList.contains('page-banner')) {
          el.style.backgroundImage = 'url("' + el.getAttribute('data-src') + '")';
        }
      });
    }
    setBgImages();
    document.addEventListener('nav', () => setTimeout(setBgImages, 0));
  