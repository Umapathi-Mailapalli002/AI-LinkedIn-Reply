import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './overlays.content/App';

export default defineContentScript({
  matches: ['https://www.linkedin.com/messaging/thread/*'],
  main() {
    console.log('Content script loaded.');

    let root: ReturnType<typeof createRoot> | null = null;

    function renderReactApp(messageInput: HTMLElement) {
      const container = document.createElement('div');
      container.id = 'react-extension-container';
      container.style.position = 'absolute';
      container.style.zIndex = '10000';
      container.style.right = '0';
      container.style.bottom = '0';
      messageInput.appendChild(container);

      root = createRoot(container);
      root.render(<App />);
      console.log('React app rendered.');
    }

    function unmountReactApp() {
      if (root) {
        root.unmount();
        root = null;
        console.log('React app unmounted.');
      }
    }

    function observeMessageInput(messageInput: HTMLElement) {
      const observer = new MutationObserver(() => {
        const isFocused = messageInput.getAttribute('data-artdeco-is-focused') === 'true';
        console.log('Focus attribute status:', isFocused ? 'focused' : 'not focused');

        if (isFocused && !root) {
          console.log('Input focused, rendering React app.');
          renderReactApp(messageInput);
        } else if (!isFocused && root) {
          console.log('Input unfocused, unmounting React app.');
          unmountReactApp();
        }
      });

      // Start observing for attribute changes
      observer.observe(messageInput, { attributes: true });
      console.log('Started observing message input for attribute changes.');
    }

    const checkForInput = () => {
      const messageInput = document.querySelector('.msg-form__contenteditable') as HTMLElement;
      if (messageInput) {
        console.log('Message input found, starting observation.');
        observeMessageInput(messageInput);
        return true;
      }
      console.log('Message input not found.');
      return false;
    };

    // Observe the body for changes to find the input
    const bodyObserver = new MutationObserver(() => {
      if (checkForInput()) {
        bodyObserver.disconnect(); // Stop observing body after finding the input
      }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // Initial check for the message input
    if (!checkForInput()) {
      console.log('No input found initially. Observing body for changes...');
    }
  },
});
