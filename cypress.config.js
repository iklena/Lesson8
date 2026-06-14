const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttemps: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      return
    },
    baseUrl: 'https://api.clickup.com/api/v2',
    // env: {
    //   token: 'pk_302428217_Q0SH3L1KRFHUY6Z5W0FON35SHCRQ3TOH'
    // }
        
  },
});
