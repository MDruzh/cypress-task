export class LoginPage {

    elements = {
        username: () => cy.get('[data-test="username"]'),
        password: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]')
    }

    fillTheForm(username, password) {
        this.elements.username().type(username);
        this.elements.password().type(password);
        this.elements.loginButton().click();
    }

    verifyErrorMessage(errorMsg) {
        this.elements.errorMessage().should('be.visible').and('contain', errorMsg);
    }
}

export const loginPage = new LoginPage();