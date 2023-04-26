/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  serverBuildTarget: "netlify",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*", ...(process.env.NODE_ENV === 'development' ? [] : ["drafts/*"])],
  mdx: async (filename) => {

    const [rehypeHighlight] = await Promise.all([
      import("rehype-highlight").then((mod) => mod.default),

    ]);

    return {
      rehypePlugins: [rehypeHighlight]
    }
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
