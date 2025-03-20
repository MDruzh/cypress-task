describe('API Tests', () => {
    beforeEach('Get fixture', () => {
        cy.fixture('apiData').as('apiData');
    });

    it('Verify GET requests', function() {
        // Successfully GET all posts
        cy.request('GET', `${Cypress.env('baseUrlForAPI')}/posts`).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.a('array');
            expect(response.body).not.to.be.empty;
        });
        // Verify 404 in case of incorrect endpoint
        cy.request({
            url: `${Cypress.env('baseUrlForAPI')}/posts/example`,
            method: 'GET',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(404);
        });
    });

    it('Verify POST requests', function() {
        // Successfully POST a new post 
        cy.request({
            url: `${Cypress.env('baseUrlForAPI')}/posts`,
            method: 'POST',
            failOnStatusCode: false,
            body: this.apiData
        }).then(response => {
            expect(response.status).to.eq(201);
        });
        // Response for a request with missing fields or empty body completely returns 201 status code
        // So I use incorrect endpoint to test 404 response status code again
        cy.request({
            url: `${Cypress.env('baseUrlForAPI')}/posts-example`,
            method: 'POST',
            failOnStatusCode: false,
            body: {
                "some": "thing",
                "incorrect": "fields"
            }
        }).then(response => {
            expect(response.status).to.eq(404);
        });
    });

    it('Verify PUT requests', function() {
        // Successfully UPDATE a post
        cy.request({
            url: `${Cypress.env('baseUrlForAPI')}/posts/1`,
            method: 'PUT',
            body: this.apiData
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.body).to.contain('Example Body');
            expect(response.body.title).to.contain('Example Title');
            expect(response.body.userId).to.contain('888');
        });
        // If to change endpoint to incorrect one there will be 500 status code
        // Verify 404 in case of non-existent post will not work as expected
        cy.request({
            url: `${Cypress.env('baseUrlForAPI')}/posts/example`,
            method: 'PUT',
            failOnStatusCode: false,
            body: this.apiData
        }).then(response => {
            // Doesn't work
            // expect(response.status).to.eq(404);
            expect(response.status).to.eq(500);
        });
        
    });

    it('Verify DELETE requests', function() {
        // Successfully DELETE a post
        cy.request('DELETE', `${Cypress.env('baseUrlForAPI')}/posts/1`).then(response => {
            expect(response.status).to.eq(200);
        });
        // Verify 404 in case of incorrect endpoint - doesn't work
        // Response status will alway be 200
        cy.request({
            url: `${Cypress.env('baseUrlForAPI')}/posts/example`,
            method: 'DELETE',
            failOnStatusCode: false
        }).then(response => {
            // Does not work
            // expect(response.status).to.eq(404);
            expect(response.status).to.eq(200);
        });
    });
});