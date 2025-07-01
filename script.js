// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Dark Mode Toggle
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
    });
  }

  // Image Zoom Modal w/ Panzoom
  const images = document.querySelectorAll('.zoom-container img');
  const zoomModal = document.getElementById('zoomModal');
  const zoomedImg = document.getElementById('zoomedImg');
  const closeModal = document.getElementById('closeModal');
  let panzoomInstance = null;

  images.forEach(function (img) {
    img.addEventListener('click', function () {
      zoomedImg.src = img.src;
      zoomedImg.alt = img.alt;
      zoomModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // Wait for image load then enable panzoom
      zoomedImg.onload = function () {
        if (panzoomInstance) panzoomInstance.destroy();
        panzoomInstance = Panzoom(zoomedImg, {
          maxScale: 5,
          minScale: 1,
          contain: 'outside'
        });
        // Enable mouse wheel zoom
        zoomedImg.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel, { passive: false });
      };
    });
  });

  function closeZoomModal() {
    zoomModal.classList.add('hidden');
    document.body.style.overflow = '';
    if (panzoomInstance) {
      panzoomInstance.destroy();
      panzoomInstance = null;
    }
    zoomedImg.src = '';
  }

  closeModal.addEventListener('click', closeZoomModal);

  zoomModal.addEventListener('click', function (e) {
    if (e.target === zoomModal) {
      closeZoomModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeZoomModal();
    }
  });
});
