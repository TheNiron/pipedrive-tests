/// <reference types="cypress" />

import {TIMEOUT_SHORT, TIMEOUT_MEDIUM, TIMEOUT_LONG } from '../constants';

// Need to add proper IDs for the following elements.
// I have captured them by relative paths cause there were no proper IDs.
let addDealbutton = 'button[data-test="pipeline-add-deal"]';
let personField = '[data-test-key="person_id"]>div>div>[role="combobox"]';
let orgNameField = '[data-test-key="org_id"]>div>div>div>div>div>div>div>div>[type="text"]';
let titleField = '[data-test-key="title"]>div>div>div>input[type="text"]';
let dealValueField = '[data-test-key="value"]>div>div>div>div>div>input[data-testid="compound-input"]';
let currencyMenu = '[data-test-key="value"]>div>div>div>span[aria-label="open menu"]';
let currencyField = 'div[class="cui5-input cui5-input--icon cui5-select__filter"]>div>input[aria-autocomplete="list"]';
let pipelineField = '[data-test="pipeline_id"]';
let closeDateField = '[placeholder="MM/DD/YYYY"]';
let visibilityField = '[data-test="add-modals-visibility-field"]>button';
let phoneNoField = '[data-test-key="phone"]>div>div>div>div>section>div>div>div>div>div>div>input[data-testid="compound-input"]';
let emailField = '[data-test-key="email"]>div>div>div>div>section>div>div>div>div>div>div>input[data-testid="compound-input"]';
let saveButton = 'button[data-test="add-modals-save"]';
let dealPipelineTile = '[data-test="pipeline-deal-tile"]>div>div>div>a>span';
let dealOptionsbutton = 'span[class="input selectSettings"]>button[data-coachmark="marketplace-extensions"]';
let deleteButton = 'li[class="delete"]';
let errorMessageLabel = '[class="cui5-input__error-message"]';
let AddProductsButton = '[data-test="toggle-products"]';
let productsTitle = '[role="button"]>span';
let itemInputField = '[data-test="product-input"]';
let itemPriceField = '[data-test="product-price"]';
let itemQuantityField = '[data-test="product-quantity"]';
let itemTaxField = '[data-test="product-tax"]';
let itemTotalAmount = '[data-test="total-amount"]';
let addMoreItemsButton = '[data-test="products-add-more"]';

export class Deals {

    static verifyDealsPage() {
        cy.wait(30000);
        cy.get(addDealbutton, { timeout: TIMEOUT_LONG }).should('be.visible');
    }

    static ClickAddNewDeal() {
        cy.get(addDealbutton).click();
        cy.get('[title="Add deal"]', { timeout: TIMEOUT_MEDIUM }).should('be.visible');
    }

    static typePersonName(person_id) {
        cy.get(personField).type(person_id)
    }

    static typeOrgName(org_id) {
        cy.get(orgNameField).type(org_id)
    }

    static clearTitle() {
        cy.get(titleField).clear()
    }

    static typeDealTitle(dealName) {
        cy.get(titleField).type(dealName)
    }


    static typeDealValue(dealValue) {
        cy.get(dealValueField).type(dealValue)
    }

    static addCurrency(currency) {
        cy.get(currencyMenu).click();
        cy.get(currencyField).type(currency);
        cy.get('div[value="LKR"]').contains(currency).click();
    }

    static verifyPipeline(pipeline) {
        cy.get(pipelineField).contains(pipeline)
    }

    static enterExpectedCloseDate(date) {
        cy.get(closeDateField).type(date).type('Cypress.io{enter}')
        this.clickAddPhone();
    }

    static verifyVisibility(visibility) {
        cy.get(visibilityField).contains(visibility);
    }

    static enterPhoneNumber(phoneNo, phoneIndex) {
        let fieldIndex = phoneIndex - 1;
        cy.get(phoneNoField).eq(fieldIndex).click().type(phoneNo);
    }

    static enterEmailAddress(email, emailIndex) {
        let fieldIndex = emailIndex - 1;
        cy.get(emailField).eq(fieldIndex).type(email)
        cy.wait(1000)
        cy.get(emailField).eq(fieldIndex).click()
    }

    static saveNewDeal() {
        cy.get(saveButton).click();
    }

    static deleteDeal(dealName) {
        cy.reload(true);
        cy.get(dealPipelineTile, { timeout: TIMEOUT_LONG }).contains(dealName).click();
        cy.get(dealOptionsbutton, { timeout: TIMEOUT_SHORT }).click({ force: true });
        cy.get(deleteButton).click();
    }

    static verifyErrorMessage(errorMessage) {
        cy.get(errorMessageLabel, { timeout: TIMEOUT_SHORT }).contains(errorMessage).should('be.visible');
    }

    static selectExistingPerson(person) {
        cy.get('[data-testid="option"]').contains(person).click();
    }

    static verifyTextInOrganizationField(org) {
        cy.get(orgNameField).should('have.value', org);
    }

    static verifyTextInTitleField(dealName) {
        cy.get(titleField).should('have.value', dealName)
    }

    static verifyTextInPhoneField(phoneNo) {
        cy.get(phoneNoField).should('have.value', phoneNo);
    }

    static verifyTextInEmailField(email) {
        cy.get(emailField).should('have.value', email);
    }

    static verifyAddingPhoneAndEmailDisabled() {
        this.clickAddPhone();
        this.clickAddEmail();
        cy.get('[data-testid="compound-input"]').should('have.length', 3)
    }

    static clickAddPhone() {
        cy.get('a[href="#"]').contains('Add phone').click();
    }

    static selectPhoneType(index, type) {
        let fieldIndex = index + 1;
        cy.get('[aria-label="open menu"]').eq(fieldIndex).click();
        cy.get('div[value="' + type + '"]').click();
    }

    static clickAddEmail() {
        cy.get('a[href="#"]').contains('Add email').click();
    }

    static selectEmailType(index, type) {
        let fieldIndex = index + 2;
        cy.get('[aria-label="open menu"]').eq(fieldIndex).click();
        cy.get('div[value="' + type + '"]').click({ force: true })
    }

    static verifyNewDealSavedMessage(dealName) {
        cy.get('.cui5-snackbar__message', { timeout: TIMEOUT_LONG }).contains('New deal "' + dealName + '" created').should('be.visible');
    }

    static clickAddProductsButton() {
        cy.get(AddProductsButton).click();
    }

    static addProducts(index, productName, price, quantity, tax) {
        let elementIndex = index - 1;
        cy.get(productsTitle).contains("PRODUCTS").should('be.visible');
        cy.get(itemInputField).eq(elementIndex).type(productName);
        cy.get(itemPriceField).eq(elementIndex).type(price);
        cy.get(itemQuantityField).eq(elementIndex).clear();
        cy.get(itemQuantityField).eq(elementIndex).type(quantity);
        cy.get(itemTaxField).eq(elementIndex).type(tax);
    }

    static verifyAddedProductvalue(price, quantity) {
        let total = price * quantity;
        let number = this.numberWithCommas(total);
        cy.get('input[value="' + number + '"]').should('have.length', 2);
        cy.get(itemTotalAmount).contains(number).should('be.visible');
    }

    static verifyTotalProductvalue(price1, price2) {
        let total = price1 + price2;
        let number = this.numberWithCommas(total);
        cy.get(itemTotalAmount).contains(number).should('be.visible');
    }

    static addMultipleItems() {
        cy.get(addMoreItemsButton).click();
    }

    static numberWithCommas(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}

