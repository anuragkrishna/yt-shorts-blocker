// YouTube Shorts Blocker Content Script
(function() {
  'use strict';

  let isEnabled = true;
  const SHORTS_SELECTORS = [
    'a[href*="/shorts/"]',
    'ytd-reel-item-renderer',
    'ytd-rich-shelf-renderer[is-shorts]',
    'ytd-rich-section-renderer[is-shorts]',
    '[overlay-style="SHORTS"]',
    'ytd-mini-guide-entry-renderer[aria-label*="Shorts"]',
    'ytd-guide-entry-renderer[aria-label*="Shorts"]',
    // Shorts video player containers
    'ytd-shorts, ytd-reel-video-renderer, #shorts-player'
  ];

  // Redirect from Shorts to a custom motivational page
  function maybeRedirectFromShorts() {
    if (!isEnabled) return;
    try {
      const url = window.location.href;
      if (url.includes('youtube.com/shorts')) {
        const target = chrome.runtime.getURL('blocked.html');
        // Avoid redirect loops if, for some reason, this runs on the extension page
        if (!url.startsWith(target)) {
          window.location.replace(target);
        }
      }
    } catch (e) {
      // Best-effort redirect; ignore errors
    }
  }

  // Load initial state from storage
  chrome.storage.sync.get(['shortsBlockerEnabled'], (result) => {
    isEnabled = result.shortsBlockerEnabled !== false; // Default to true
    if (isEnabled) {
      maybeRedirectFromShorts();
    }
  });

  // Listen for storage changes
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.shortsBlockerEnabled) {
      isEnabled = changes.shortsBlockerEnabled.newValue !== false;
      if (isEnabled) {
        maybeRedirectFromShorts();
      }
    }
  });

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateState') {
      isEnabled = request.enabled !== false;
      if (isEnabled) {
        maybeRedirectFromShorts();
      }
      sendResponse({ success: true });
    }
    return true;
  });

  // Start observing when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      maybeRedirectFromShorts();
    });
  } else {
    maybeRedirectFromShorts();
  }

  // Also handle YouTube SPA navigation: watch for URL changes
  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      if (isEnabled) {
        maybeRedirectFromShorts();
      }
    }
  });

  urlObserver.observe(document, { subtree: true, childList: true });
})();

