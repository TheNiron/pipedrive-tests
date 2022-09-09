/// <reference types="cypress" />

import {PIPEDRIVE_URL, TIMEOUT_MEDIUM } from '../constants';


export class HomePage {

  static navigateToPipedrive() {
    cy.viewport(1920,1080)
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    //url is defined as an environment variable in cypress.config.js
    cy.visit(Cypress.env(PIPEDRIVE_URL));
    cy.title().should('eq', 'Sales CRM & Pipeline Management Software | Pipedrive')
    return this;
  }

  static navigateToLogin() {
  cy.get('[class="puco-navigation-link__text"]',{timeout: TIMEOUT_MEDIUM}).contains("Log in").click({force: true});
  }




}