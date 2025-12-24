// YouTube Shorts Blocker Popup Script
(function() {
  'use strict';

  const toggleSwitch = document.getElementById('toggleSwitch');
  const status = document.getElementById('status');

  // Load current state from storage
  chrome.storage.sync.get(['shortsBlockerEnabled'], (result) => {
    const isEnabled = result.shortsBlockerEnabled !== false; // Default to true
    toggleSwitch.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Handle toggle switch change
  toggleSwitch.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    chrome.storage.sync.set({ shortsBlockerEnabled: isEnabled }, () => {
      updateStatus(isEnabled);
      
      // Send message to content script to update immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com/shorts')) {
          chrome.tabs.sendMessage(tabs[0].id, { 
            action: 'updateState', 
            enabled: isEnabled 
          }).catch(() => {
            // Content script might not be loaded yet, that's okay
            // The storage listener will handle it
          });
        }
      });
    });
  });

  // Update status text
  function updateStatus(isEnabled) {
    if (isEnabled) {
      status.textContent = 'Shorts are being blocked';
      status.className = 'status enabled';
    } else {
      status.textContent = 'Shorts are visible';
      status.className = 'status disabled';
    }
  }
})();

