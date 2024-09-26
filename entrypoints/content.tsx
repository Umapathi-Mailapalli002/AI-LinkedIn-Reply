export default defineContentScript({
  matches: ['https://www.linkedin.com/messaging/thread/*'],
  main() {
    console.log('Hello content.');
    const createIcon = () => {
      const iconContainer = document.createElement('div');
      iconContainer.id = 'ai-icon';
      iconContainer.style.position = 'absolute';
      iconContainer.style.bottom = '80px'; // Adjust as needed
      iconContainer.style.right = '20px';  // Adjust as needed
      iconContainer.style.cursor = 'pointer';
      iconContainer.style.display = 'none'; // Initially hidden

      // Adding image element
      const iconImage = document.createElement('img');
      iconImage.src = chrome.runtime.getURL('public/wxt.svg');
      iconImage.alt = 'AI Icon';
      iconImage.style.width = '40px';
      iconImage.style.height = '40px';

      // Append the image to the container
      iconContainer.appendChild(iconImage);
      document.body.appendChild(iconContainer);
      console.log('AI icon added to DOM.');

      // Handle icon click
      iconContainer.onclick = () => {
        console.log("Icon clicked");
        // Logic to show modal (if applicable)
      };

      // Select the input area
      const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable');

      if (messageInput) {
        console.log("Message input found:", messageInput);

        const handleFocus = () => {
          iconContainer.style.display = 'block'; // Show icon
          console.log('Icon displayed.');
        };

        messageInput.addEventListener('click', handleFocus);
        // Cleanup function
        return () => {
          messageInput.removeEventListener('focus', handleFocus);
          messageInput.removeEventListener('blur', handleBlur);
          iconContainer.remove();
          console.log('Event listeners removed and icon container removed.');
        };
      } else {
        console.error("Message input not found.");
      }
    };

    // Set up a MutationObserver to detect when the messaging area is loaded
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable');
      if (messageInput) {
        console.log("Message input found.",messageInput);
        createIcon(); // Create the icon once the input is available
        observer.disconnect(); // Stop observing after adding the icon
      } else {
        console.log("Message input not found. Continuing to observe...");
      }
    });

    // Start observing the body for changes
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
