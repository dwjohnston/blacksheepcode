/** @type {import('@remix-run/dev').AppConfig} */
const {
  remarkMdxFrontmatter,
} = require("remark-mdx-frontmatter");

module.exports = {
  serverBuildTarget: "netlify",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*", ...(process.env.NODE_ENV === 'development' ? [] : ["drafts/*"])],
  mdx: async (filename, ...rest) => {
    const [rehypeHighlight, remarkToc] = await Promise.all([
      import("rehype-highlight").then((mod) => mod.default),
      import("remark-toc").then((mod) => mod.default),
    ]);
  
    return {
      remarkPlugins: [remarkToc],
      rehypePlugins: [rehypeHighlight],
    };
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
