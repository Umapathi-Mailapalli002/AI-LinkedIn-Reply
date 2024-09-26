export default defineContentScript({
  matches: ['https://www.linkedin.com/messaging/thread/*'],
  main() {
    console.log('Hello content.');

    // Set up a MutationObserver to detect when the messaging area is loaded
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable p').textContent;
      if (messageInput) {
        console.log("Message input found.",messageInput);
         // Create the icon once the input is available
        observer.disconnect(); // Stop observing after adding the icon
      } else {
        console.log("Message input not found. Continuing to observe...");
      }
    });

    // Start observing the body for changes
    observer.observe(document.body, { childList: true, subtree: true });
  },
});
