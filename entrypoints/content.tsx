import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './overlays.content/App'; // Adjust the import path if necessary

export default defineContentScript({
  matches: ['https://www.linkedin.com/messaging/thread/*'],
  main() {
    console.log('Hello content.');

    function renderReactApp(messageInput :Element) {
      const container = document.createElement('div');
      container.id = 'react-extension-container';
      container.style.position = 'absolute';
      container.style.zIndex = '10000';
      container.style.right = '0';
      container.style.bottom = '0';

      // Append the container to the message input
      messageInput.appendChild(container);

      // Render the React app
      const root = createRoot(container);
      root.render(<App />);
      console.log('React app rendered.');
    }

    function observeMessageInput() {
      const observer = new MutationObserver(() => {
        const messageInput = document.querySelector('.msg-thread .msg-form__msg-content-container--scrollable');

        if (messageInput) {
          console.log('Message input found, rendering React app.');
          renderReactApp(messageInput);
          observer.disconnect(); // Stop observing after rendering
        } else {
          console.log('Message input not found. Continuing to observe...');
        }
      });

      // Start observing the body for changes
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Check if the message input is already present
    const initialCheck = document.querySelector('.msg-thread .msg-form__msg-content-container--scrollable');
    if (initialCheck) {
      console.log('Message input found on initial check, rendering React app.');
      renderReactApp(initialCheck);
    } else {
      observeMessageInput(); // Start observing if not found
    }
  },
});
