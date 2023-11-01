

// Ignore the hydration error - which appears to be product of Cypress 
// https://github.com/cypress-io/cypress/issues/27204
// I'm not too happy with this solution though 
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Hydration failed because the initial UI does not match what was rendered on the server.') ||
    err.message.includes("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.")
  ) {
    return false;
  }
  // Enable uncaught exception failures for other errors
});



describe('template spec', () => {
  it('Basic MDX Rendering', () => {
    cy.visit('localhost:3000/test/basic_mdx'); 

    cy.findByRole("heading", {name: "This is a basic MDX test."}).should("exist");
    cy.findByText("This is some text").should("exist");
  })
  
  it('Image rendering', () => {
    cy.visit('localhost:3000/test/images'); 

    cy.findByRole("heading", {name: "images"}).should("exist");
    cy.findByRole("img", {name: "this is the image alt text"}).should("exist");
  })

  it('Frontmatter ', () => {
    cy.visit('localhost:3000/test/frontmatter'); 

    cy.findByRole("heading", {name: "frontmatter"}).should("exist");

    cy.get('title:contains("I am the title")').should("exist");
    cy.get('meta[name="twitter:title"][content="I am the title"]').should("exist");
    
    cy.get('meta[name="description"][content="I am the description"]').should("exist");
    cy.get('meta[name="twitter:description"][content="I am the description"]').should("exist");

    })

    it("external component", () => {
      cy.visit('localhost:3000/test/external_component'); 

      // I'm not asserting on actual content it should encounter 
      // Because we quickly hit the rate limit
      cy.get(".react-github-permalink").should("exist");
    })
})