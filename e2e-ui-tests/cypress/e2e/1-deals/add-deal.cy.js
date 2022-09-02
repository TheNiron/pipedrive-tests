/// <reference types="cypress" />

import { HomePage } from '../../support/pages/home-page';
import { LoginPage } from '../../support/pages/login-page';
import { Deals } from '../../support/pages/deals-page';

const DATAJSON = require('../../fixtures/mixedInputDataSet');

describe('Test the Pipeline adding a new deal flow', () => {
  beforeEach(() => {
    HomePage.navigateToPipeline();
    HomePage.navigateToLogin();
    LoginPage.login('niron@wso2.com', 'rasanjana29');
  });

  it('Add a new deal filling main fields', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Adam Levine');
    Deals.typeOrgName('Coconut Hammock');
    Deals.clearTitle();
    Deals.typeDealTitle("Coconut Hammock's Deal-29");
    Deals.typeDealValue('20000');
    Deals.addCurrency('Sri Lanka');
    Deals.verifyPipeline('Pipeline');
    Deals.enterExpectedCloseDate('06/22/2023');
    Deals.verifyVisibility("Owner's visibility group");
    Deals.enterPhoneNumber('+94711340909', 1);
    Deals.enterEmailAddress('niron@wso2.com', 1);
    Deals.saveNewDeal();
    Deals.deleteDeal('Coconut Hammock');
  });

  // Following test is a data driven test where valid mixed set of inputs are fed from mixedInputDataSet.json
  DATAJSON.forEach((userInput) => {
    it(`Add new deal with and without Person name, organization and Deal title combinations - ${userInput.test_Name}`, () => {
      Deals.verifyDealsPage();
      Deals.ClickAddNewDeal();
      Deals.typePersonName(userInput.person);
      Deals.typeOrgName(userInput.org);
      Deals.clearTitle();
      Deals.typeDealTitle(userInput.title);
      Deals.saveNewDeal();
      Deals.deleteDeal(userInput.title);
    });
  });

  it('Add new deal without filling any fields', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.saveNewDeal();
    Deals.verifyErrorMessage('A person or organization is required');
  });

  it('Add new deal without filling the mandatory field Title', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Adam west');
    Deals.clearTitle();
    Deals.saveNewDeal();
    Deals.verifyErrorMessage('Title is required');
  });

  it('Add new deal without filling the mandatory field Title', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typeDealTitle('Sample title for nothing');
    Deals.saveNewDeal();
    Deals.verifyErrorMessage('A person or organization is required');
  });

  it('Add new deal filling the mandatory fields only - Person name', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('James bond');
    Deals.saveNewDeal();
    Deals.deleteDeal('James bond');
  });

  it('Add new deal filling the mandatory fields only - Organization', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typeOrgName('Umbrella organization');
    Deals.saveNewDeal();
    Deals.deleteDeal('Umbrella organization');
  });

  it('Select existing Person and validate autofilling', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Adam Levine');
    Deals.selectExistingPerson('Adam Levine (Coconut Hammock)');
    Deals.verifyTextInOrganizationField('Coconut Hammock');
    Deals.verifyTextInTitleField('Coconut Hammock deal');
    Deals.verifyTextInPhoneField('+94711340909');
    Deals.verifyTextInEmailField('niron@wso2.com');
    Deals.verifyAddingPhoneAndEmailDisabled();
  });

  it('Verify already exisitng person contacts uneditable', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Adam Levine');
    Deals.selectExistingPerson('Adam Levine (Coconut Hammock)');
    Deals.verifyAddingPhoneAndEmailDisabled();
  });

  it('Add invalid phone number', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Zeus');
    Deals.typeOrgName('Olympus');
    Deals.clearTitle();
    Deals.typeDealTitle('Olympus Deal-29');
    Deals.enterPhoneNumber('@32-SRI-94711340909', 1);
    //  This step witll fail cause there is no such error message added and it's a bug
    Deals.verifyErrorMessage('Invalid phone Number');
  });

  it('Add invalid email address', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Zeus');
    Deals.typeOrgName('Olympus');
    Deals.clearTitle();
    Deals.typeDealTitle('Olympus Deal-29');
    Deals.enterEmailAddress('Doggyworkd#pup-.com', 1);
    Deals.verifyErrorMessage('Email is not valid');
    Deals.saveNewDeal();
    // This step witll fail cause there is no such error message added and it's a bug
    Deals.verifyErrorMessage('Can not submit with invalid data');
  });

  it('Add multiple phone numbers', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Zeus Fernando');
    Deals.typeOrgName('Olympus');
    Deals.clearTitle();
    Deals.typeDealTitle('Olympus Deal-29');
    Deals.enterPhoneNumber('+9471124345789', 1);
    Deals.selectPhoneType(1, 'mobile');
    Deals.clickAddPhone();
    Deals.enterPhoneNumber('+6523200093232', 2);
    Deals.selectPhoneType(2, 'other');
    Deals.clickAddPhone();
    Deals.enterPhoneNumber('+2177700093124', 3);
    Deals.selectPhoneType(3, 'work');
    Deals.saveNewDeal();
    Deals.deleteDeal('Olympus Deal');
  });

  it('Add multiple email addresses', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Pearson Fernando');
    Deals.typeOrgName('Newyork@24');
    Deals.clearTitle();
    Deals.typeDealTitle('Newyork@24 Deal');
    Deals.enterEmailAddress('home@office.com', 1);
    Deals.selectEmailType(1, 'home');
    Deals.clickAddEmail();
    Deals.enterEmailAddress('other@office.com', 2);
    Deals.selectPhoneType(2, 'other');
    Deals.clickAddEmail();
    Deals.enterEmailAddress('work@office.com', 3);
    Deals.selectPhoneType(3, 'work');
    Deals.saveNewDeal();
    Deals.verifyNewDealSavedMessage('Newyork@24 Deal');
    Deals.deleteDeal('Newyork@24 Deal');
  });

  it('Add invalid date as expected closing date', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typeOrgName('Umbrella organization');
    Deals.enterExpectedCloseDate('26/22/2023');
    Deals.verifyErrorMessage('Invalid date format');
    Deals.saveNewDeal();
    // This step witll fail cause there is no such error message currently and it's a bug
    Deals.verifyErrorMessage('Invalid expected closing date');
  });

  it('Add older date as expected closing date', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typeOrgName('Umbrella organization');
    Deals.enterExpectedCloseDate('12/22/2013');
    // This step witll fail cause there is no such error message currently and it's a bug
    Deals.verifyErrorMessage('Older dates can not be added as expected close date');
  });

  it('Verify auto generated deal title', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Damon Salvator');
    Deals.verifyTextInTitleField('Damon Salvator deal');
  });

  it('Verify deal title is generated from Org name over person name', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Damon Salvator');
    Deals.verifyTextInTitleField('Damon Salvator deal');
    Deals.typeOrgName('SmallVille');
    Deals.verifyTextInTitleField('SmallVille deal');
  });

  it('Verify contact info fields only available when person name is entered, not for organization', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typeOrgName('SmallVille');
    Deals.verifyAddingPhoneAndEmailDisabled();
    Deals.typePersonName('Damon Salvator');
    Deals.clickAddPhone();
    Deals.enterPhoneNumber('+78-45678943', '1');
    Deals.verifyTextInPhoneField('+78-45678943');
  });

  it('Add a product', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Clark Kent');
    Deals.clickAddProductsButton();
    Deals.addProducts(1, 'Our first Product', 250, 5, 12);
    Deals.verifyAddedProductvalue(250, 5);
  });

  it('Add multiple products', () => {
    Deals.verifyDealsPage();
    Deals.ClickAddNewDeal();
    Deals.typePersonName('Bruce Wayne');
    Deals.clickAddProductsButton();
    Deals.addMultipleItems();
    Deals.addProducts(1, 'Our first Product', 250, 5, 12);
    Deals.clickAddPhone();
    Deals.addProducts(2, 'Our Second Product', 100.25, 10, 13.30);
    Deals.verifyTotalProductvalue(1250, 1002.50);
  });
});
