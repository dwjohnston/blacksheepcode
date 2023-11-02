[![Netlify Status](https://api.netlify.com/api/v1/badges/54ab69dd-1ada-4558-9bb9-5ff3b5b8f124/deploy-status)](https://app.netlify.com/sites/amazing-turing-828569/deploys)

My blog. [https://blacksheepcode.com/](https://blacksheepcode.com/)

Markdown files, turned into a blog with Remix. 



# Remix stuff

> **Warning**  
> The `@remix-run/netlify` runtime adapter has been deprecated in favor of
> `@netlify/remix-adapter` and will be removed in Remix v2. Please update your
> code by changing all `@remix-run/netlify` imports to `@netlify/remix-adapter`.  
> Keep in mind that `@netlify/remix-adapter` requires `@netlify/functions@^1.0.0`,
> which is a breaking change compared to the current supported `@netlify/functions`
> versions in `@remix-run/netlify`.

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)
- [Netlify Functions](https://www.netlify.com/products/functions/)

## Netlify Setup

1. Install the [Netlify CLI](https://www.netlify.com/products/dev/):

```sh
npm i -g netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
npm i -g netlify-cli@latest
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

3. Create a new site:

```sh
netlify init
```

## Development

The Remix dev server starts your app in development mode, rebuilding assets on file changes. To start the Remix dev server:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

The Netlify CLI builds a production version of your Remix App Server and splits it into Netlify Functions that run locally. This includes any custom Netlify functions you've developed. The Netlify CLI runs all of this in its development mode.

```sh
netlify dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

Note: When running the Netlify CLI, file changes will rebuild assets, but you will not see the changes to the page you are on unless you do a browser refresh of the page. Due to how the Netlify CLI builds the Remix App Server, it does not support hot module reloading.

## Deployment

There are two ways to deploy your app to Netlify, you can either link your app to your git repo and have it auto deploy changes to Netlify, or you can deploy your app manually. If you've followed the setup instructions already, all you need to do is run this:

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```
