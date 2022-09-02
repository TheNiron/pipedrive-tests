/// <reference types="cypress" />

let nameField = "[name='name']";


export class LoginPage {

    static login(username,password) {
        cy.get('[class="auth-form__title"]').contains("Log in");
        cy.get('[data-test="login"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="submit-button"]').click();
        LoginPage.verifyAccountMenuButton;
        }

    static verifyAccountMenuButton() {
        cy.get('[data-test="account-menu-button"]').should('be.visible');
            }


        
  }

