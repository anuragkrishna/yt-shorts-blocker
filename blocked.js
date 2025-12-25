// Blocked page script
(function() {
  'use strict';

  function goToYouTube() {
    // Use top-level window navigation
    if (window.top) {
      window.top.location.href = 'https://www.youtube.com/';
    } else {
      window.location.href = 'https://www.youtube.com/';
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      const button = document.getElementById('backButton');
      if (button) {
        button.addEventListener('click', goToYouTube);
      }
    });
  } else {
    const button = document.getElementById('backButton');
    if (button) {
      button.addEventListener('click', goToYouTube);
    }
  }
})();

