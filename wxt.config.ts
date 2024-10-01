import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions:  [
      "tabs",
      "scripting",
      "activeTab"
    ],
    name: "linkedin-ai-reply",
    description: "ai generated reply for linkedin messages, now paste the message and get deserve reply! "
  },
});
