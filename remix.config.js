/** @type {import('@remix-run/dev').AppConfig} */

const fs = require('fs');
const path = require('path');

function generateRoutes(folders) {
  return folders.map((folder) => {
    const currentPath = `./src/routes/${folder}`
    const files = fs.readdirSync(currentPath);
    const routes = files.map((file) => {
      const filePath = path.join(currentPath, file);
      const fileStats = fs.statSync(filePath);

      if (fileStats.isDirectory()) {
        // If it's a directory, recursively traverse it
        throw new Error("Did not expect to find a directory");
      } else {
        // If it's a file, add a route definition

        if(path.basename(file).startsWith("_index") || path.basename(file).startsWith("index") ){
          return;
        }
        
        const routePath = path.basename(file).split('.')[0];
        const filePathRelativeToApp = path.relative('src', filePath);
        return ([routePath, filePathRelativeToApp]); 
      }
    });

    return {
      folder, 
      routes
    }
  })
}
const routeDefinitions = generateRoutes(['posts', 'test', 'drafts']);


module.exports = {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "src",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.ts"
      : undefined,
  serverBuildPath: ".netlify/functions-internal/server.js",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
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

  // routes: (defineRoutes) => {
  //   return defineRoutes((route) => {
  //     console.log("Declaring route:", '/', '-->', `routes/_index.tsx`)
  //     route('/', "routes/_index.tsx");
  //     routeDefinitions.forEach((v) => {     
  //       console.log("Declaring route:", v.folder, '-->', `routes/posts.tsx`)
  //       route(v.folder, `routes/${v.folder}.tsx`, () => {
  //         v.routes.forEach((w) => {
  //           console.log("Declaring route:", '-->', ...w)
  //           route(...w);
  //         })
  //       })
  //     });

  //   }); 
  // },

  serverModuleFormat: "cjs",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: false,
    v2_normalizeFormMethod: true,
    v2_routeConvention: false,
  },
};
