

// Ignore the hydration error - which appears to be product of Cypress 
// https://github.com/cypress-io/cypress/issues/27204
// I'm not too happy with this solution though 
Cypress.on('uncaught:exception', (err) => {
    if (
      err.message.includes('Hydration failed because the initial UI does not match what was rendered on the server.') ||
      err.message.includes("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.")
      || err.message.includes("Minified React error")
      ||err.message.includes("Unknown root exit status.")
    ) {
      return false;
    }
    // Enable uncaught exception failures for other errors
  });


describe("real pages", () => {
    it("code blocks exist", () => {
        cy.visit('posts/adding_msw_bundler_to_remix_app_2'); 
        cy.get(".react-github-permalink").its("length").should('eq', 10);
     })
  
      it.skip("comment blocks", () => {
        cy.visit('posts/adding_msw_bundler_to_remix_app_2'); 
  
        cy.get("iframe.utterances-frame").should("exist");
      })
  
      it("homepage table of contents links to blog posts correctly", () => {
        cy.visit('/'); 
  
        cy.findByRole("link", {name: "How to configure Remix and mdx-bundler for a serverless platform - barrel files approach, Remix v1"}).should("exist").click({force:true});  
      
        cy.findByText("In this post, we'll we'll talk about how to achieve the same effect for use in a serverless platform, such a Netlify or AWS Lambda.").should('exist');
  
  
        cy.get('title:contains("How to configure Remix and mdx-bundler for a serverless platform - barrel files approach, Remix v1")').should("exist");
        cy.get('meta[name="twitter:title"][content="How to configure Remix and mdx-bundler for a serverless platform - barrel files approach, Remix v1"]').should("exist");
        
        cy.get('meta[name="description"][content="If using Remix on a serverless platform such as Netlify we can use a build time compilation and barrel files to access frontmatter metadata."]').should("exist");
        cy.get('meta[name="twitter:description"][content="If using Remix on a serverless platform such as Netlify we can use a build time compilation and barrel files to access frontmatter metadata."]').should("exist");
        
        cy.get('meta[name="twitter:image"][content="https://blacksheepcode.com/_next/static/media/blacksheep_100x100.f7b856af.webp"]').should("exist");
        cy.get('meta[property="og:image"][content="https://blacksheepcode.com/_next/static/media/blacksheep_100x100.f7b856af.webp"]').should("exist");
      })
  
  
      it("rss exists", () => {
        cy.visit('/'); 
  
        cy.findByRole("link", {name: "rss feed"}).should("exist");      
      })
  
      it ('custom social image works', () => {
        cy.visit('posts/adding_dark_mode_to_the_blog'); 
  
  
           
        cy.get('meta[name="twitter:image"][content="https://blacksheepcode.com/_next/static/media/bsc_dark.3b1c38e3.webp"]').should("exist");
        cy.get('meta[property="og:image"][content="https://blacksheepcode.com/_next/static/media/bsc_dark.3b1c38e3.webp"]').should("exist");
     
      }); 
}); 