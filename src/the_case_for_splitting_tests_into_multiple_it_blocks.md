# The case for splitting tests into multiple it blocks

Cypress' documentation is very clear about how they suggest you structure your tests. 

In their [best practises documentation](https://docs.cypress.io/guides/references/best-practices#Having-tests-rely-on-the-state-of-previous-tests) they say: 

>Tests should always be able to be run independently from one another **and still pass**. 
>
>You only need to do one thing to know whether you've coupled your tests incorrectly, or if one test is relying on the state of a previous one.
>
>Change `it` to `it.only` on the test and refresh the browser.
>
>If this test can run by itself and pass - congratulations you have written a good test.
>
>... How to solve this: 
>
>Combine multiple tests into one larger test. 

and

> **Anti-Pattern**: Acting like you're writing unit tests.
> 
> **Best Practice**: Add multiple assertions and don't worry about it


This [GitHub issue](https://github.com/cypress-io/cypress/issues/2901) asks 'Is the execution order of `it` blocks within a `describe` block deterministic?'. 

To which the answer is 'yes, but we don't recommend doing that', and a pointer to the above best practises documentation. 

I respect that Cypress are clear about what their opinion is. 

And, it's not that I disagree - I agree that a test should stand by it self, but I want to make the case 

