import { loginPage } from '../support/pages/LoginPage';

describe('UI Tests', () => {
    beforeEach('Open Webpage', () => {
        // Open homepage
        cy.visit(Cypress.env('baseUrlForUI'));
    });

    it('Successful Login with Valid Credentials', () => {
        // Check if user can be logged in with correct credentials
        loginPage.fillTheForm(Cypress.env('username'), Cypress.env('password'));
        cy.verifyTitleOnPage('Products');
    });

    it('Error Message for Invalid Credentials', () => {
        // Check error message in case of incorrect username and password
        loginPage.fillTheForm('invalid_user', 'invalid_sauce');
        loginPage.verifyErrorMessage('Username and password do not match any user in this service');
    });

    it('Password Input Masking', () => {
        // Check if password is hidden by checking it's attribute "type" that should have value "password"
        cy.get('[data-test="password"]').should('have.attr', 'type', 'password');
    });

    it('Complete Flow for Purchasing', () => {
        // Successful log in
        loginPage.fillTheForm(Cypress.env('username'), Cypress.env('password'));
        cy.verifyTitleOnPage('Products');
        // Find item with name "Sauce Labs Backpack" and add it to cart
        cy.contains('.inventory_item', 'Sauce Labs Backpack').find('.btn:contains(Add to cart)').click();
        // Verify there is number 1 near Cart icon
        cy.get('[data-test="shopping-cart-badge"]').should('contain', '1');
        // Go to cart
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.verifyTitleOnPage('Your Cart');
        // Click on Checkout button
        cy.get('[data-test="checkout"]').click();
        cy.verifyTitleOnPage('Checkout: Your Information');
        // Fill the form
        cy.get('[data-test="firstName"]').type('Andrew');
        cy.get('[data-test="lastName"]').type('Robertson');
        cy.get('[data-test="postalCode"]').type('000000');
        cy.get('[data-test="continue"]').click();
        cy.verifyTitleOnPage('Checkout: Overview');
        // Verify there is a correct item that was added before
        cy.get('[data-test="inventory-item"]').should('contain', 'Sauce Labs Backpack');
        // Click on Finish button
        cy.get('[data-test="finish"]').click();
        // Verify successful order
        cy.verifyTitleOnPage('Checkout: Complete!');
        cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!');
    });
});