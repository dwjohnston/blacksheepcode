# Contract Testing With Jest

In this series I'm going to explore a contract testing solution using test alone. 

The requirements are the same as I've outlined in [this post](./generating_apps_from_openapi_part4a.md), that is I want: 

- Basic contract tests
- Ideally I can do performance test too
- Potentially I want to be able to executive imperitive logic between tests runs, eg. to clear down a server. 

## Some tooling I'm considering 

This [closed jest issue](https://github.com/facebook/jest/issues/2694) requests performance snapshots. 

There are a couple of tools people have mentioned: 

- [async-benchmark-runner](https://github.com/JeffRMoore/async-benchmark-runner)
- [jest-bench](https://github.com/pckhoi/jest-bench)

So I might have a look at these. 

One of the problems I think that a jest based solution might have is in reporting. But perhaps this is just a matter of configuring a custom reporter that can display the result in a nicer manner. 



