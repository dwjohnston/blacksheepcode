

// Ignore the hydration error - which appears to be product of Cypress 
// https://github.com/cypress-io/cypress/issues/27204
// I'm not too happy with this solution though 
Cypress.on('uncaught:exception', (err) => {
    if (
        err.message.includes('Hydration failed because the initial UI does not match what was rendered on the server.') ||
        err.message.includes("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.")
        || err.message.includes("Minified React error #418;")
        || err.message.includes("Minified React error #423;")
    ) {
        return false;
    }
    // Enable uncaught exception failures for other errors
});


it("400s OK", () => {
    cy.request({ url: '/blah', failOnStatusCode: false }).its("status").should("eq", 404);
    cy.visit("blah", { failOnStatusCode: false });

    cy.findByText("404 - Page Not Found").should("exist");

})

it("SiteMap exists", () => {
    cy.request({ url: '/sitemap.xml', failOnStatusCode: false }).its("body").should("include", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
})

it("robots.txt exists", () => {
    cy.request({ url: '/robots.txt', failOnStatusCode: false }).its("body").should("include", 'Sitemap: https://blacksheepcode.com/sitemap.xml');
})

it("rss.xml exists", () => {
    cy.request({ url: '/rss.xml', failOnStatusCode: false }).its("body").should("include", '<rss version="2.0">');

})


