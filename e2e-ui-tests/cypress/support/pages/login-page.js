/// <reference types="cypress" />

export class LoginPage {

    static login(username, password) {
        cy.get('[class="auth-form__container"]>h3').contains("Log in");
        cy.get('[name="login"]').type(username);
        cy.get('[name="password"]').type(password);
        cy.get('[class="login"]>button').click();
        LoginPage.verifyAccountMenuButton;
    }

    static verifyAccountMenuButton() {
        cy.get('[data-test="account-menu-button"]').should('be.visible');
    }



}

