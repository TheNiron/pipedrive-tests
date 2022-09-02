module.exports = {
  reporter: 'cypress-mochawesome-reporter',
  defaultCommandTimeout: 8000,
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    chromeWebSecurity: false,
    env: {
      pipedrive_url: 'https://www.pipedrive.com',
    },

  },

}
