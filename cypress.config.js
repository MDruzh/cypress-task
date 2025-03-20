const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrlForUI: 'https://www.saucedemo.com',
    baseUrlForAPI: 'https://jsonplaceholder.typicode.com',
    username: 'standard_user',
    // Not a good way to keep password visible here
    // But I leave it as it is a test framework
    password: 'secret_sauce'
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
