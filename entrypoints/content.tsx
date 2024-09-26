export default defineContentScript({
  matches: ['https://www.linkedin.com/messaging/thread/*'],
  main() {
    console.log('Hello content.');
   const message = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable');
   if (message) {
    console.log("found the input", message)
   } else {
    console.log("message input not found");
   }
  },
});
