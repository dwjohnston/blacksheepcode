

// Ignore the hydration error - which appears to be product of Cypress 
// https://github.com/cypress-io/cypress/issues/27204
// I'm not too happy with this solution though 
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Hydration failed because the initial UI does not match what was rendered on the server.') ||
    err.message.includes("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.")
    || err.message.includes("Minified React error")
  ) {
    return false;
  }
  // Enable uncaught exception failures for other errors
});

describe('Test pages', () => {
  it('Basic MDX Rendering', () => {
    cy.visit('test/basic_mdx'); 

    cy.findByRole("heading", {name: "This is a basic MDX test."}).should("exist");
    cy.findByText("This is some text").should("exist");
  })
  
  it('Image rendering', () => {
    cy.visit('/test/images'); 

    cy.findByRole("heading", {name: "images"}).should("exist");
    cy.findByRole("img", {name: "this is the image alt text"}).should("exist");
  })

  it('Frontmatter ', () => {
    cy.visit('/test/frontmatter'); 

    cy.findByRole("heading", {name: "frontmatter"}).should("exist");

    cy.get('title:contains("I am the title")').should("exist");
    cy.get('meta[name="twitter:title"][content="I am the title"]').should("exist");
    
    cy.get('meta[name="description"][content="I am the description"]').should("exist");
    cy.get('meta[name="twitter:description"][content="I am the description"]').should("exist");

    })

    it("external component", () => {
      cy.visit('/test/external_component'); 

      // I'm not asserting on actual content it should encounter 
      // Because we quickly hit the rate limit
      cy.get(".react-github-permalink").should("exist");
    })

    it("series - has the right content", () => {
      cy.visit('/test/series1'); 

      cy.findByText("I am series - post 1 content").should("exist"); 
      cy.findByText('I am the series description').should("exist")


      cy.findByRole("link", {name: "Series - Post 1"}).should("exist");
      cy.findByRole("link", {name: "Series - Post 2"}).should("exist");

      cy.findByRole("link", {name: "Next: Series - Post 2"}).should("exist").click(); 
      cy.findByText("I am series - post 2 content").should("exist");
      cy.findByRole("link", {name: "Next: Series - Post 2"}).should("not.exist");

    }
    )

    it("trailing slash doesn't matter", () => {
      cy.visit('test/basic_mdx/'); 

      cy.findByRole("heading", {name: "This is a basic MDX test."}).should("exist");
      cy.findByText("This is some text").should("exist");
    })

    it("query params - won't break things", () => {
      cy.visit('test/basic_mdx?q=foo'); 

      cy.findByRole("heading", {name: "This is a basic MDX test."}).should("exist");
      cy.findByText("This is some text").should("exist");
    })

    it("/test will redirect home", () => {
      cy.visit('test').its("status"); 
      cy.findByText("Tech writings from David Johnston.").should("exist");

      cy.request({url: '/test', failOnStatusCode: false}).its('status').should('be.ok')

    })

    it("comment blocks", () => {
      cy.visit('test/basic_mdx?q=foo'); 

      cy.get("iframe.utterances-frame").should("exist");
    })

    it ('custom social image works', () => {
      cy.visit('/test/images'); 
         
      cy.get('meta[name="twitter:image"][content="https://blacksheepcode.com/build/_assets/bsc_dark-HMODRY4K.webp"]').should("exist");
      cy.get('meta[property="og:image"][content="https://blacksheepcode.com/build/_assets/bsc_dark-HMODRY4K.webp"]').should("exist");
   
    }); 

})