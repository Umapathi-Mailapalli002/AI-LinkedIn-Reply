import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './overlays.content/App'; // Adjust the import path as necessary

export default defineContentScript({
  matches: ['https://www.linkedin.com/messaging/thread/*'],
  main() {
    console.log('Hello content.');

    // Set up a MutationObserver to detect when the messaging area is loaded
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable');

      if (messageInput) {
        console.log('Message input found.');

        // Create a container for the React app
        const container = document.createElement('div');
        container.id = 'react-extension-container'; // Set an ID for the container
        container.style.position = 'relative'; // Change to relative to position within the contenteditable
        container.style.zIndex = '10000'; // Ensure it's above other elements
        container.style.width = '100%'; // Make it full width of the input area

        // Clear any existing container to avoid duplicates
        

        // Append the container inside the message input
        messageInput.appendChild(container);

        // Use createRoot to render the React app
        const root = createRoot(container);
        root.render(<App />); // Render the App component

        observer.disconnect(); // Stop observing after adding the app
      } else {
        console.log('Message input not found. Continuing to observe...');
      }
    });

    // Start observing the body for changes
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
