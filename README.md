# YouTube Shorts Blocker 🚫🎥

### Disclaimer: Only for educational purposes

A lightweight, open-source Chrome Extension designed to help you regain focus by removing YouTube Shorts from your browsing experience.

## Features

If you navigate directly to a Shorts URL (e.g., via a shared link), the extension blocks the page.


## 🚀 How to Use
When the blocker is Enabled:
If you click a Shorts video or paste a link like youtube.com/shorts/[video-id], the extension intercepts the request, and blocks the short from loading.

## 🛠️ Installation (Developer Mode)
Since this is an open-source project, you can install it manually on your Mac:

1. Download/Clone this repository to your Mac.
2. Open Google Chrome and navigate to chrome://extensions/
3. In the top right corner, toggle Developer mode to ON.
4. Click the Load unpacked button at the top left.
5. Select the folder containing these files.

The extension is now active! Pin it to your toolbar to access the toggle switch.

## 📂 Project Structure

1. manifest.json: Configuration and permissions for Chrome.
2. content.js: The "brains" that monitors the page for Shorts elements and handles redirects.
3. popup.html / popup.js: The user interface for toggling the blocker on/off.
