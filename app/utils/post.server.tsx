import parseFrontMatter from "front-matter";
import { readFile, readdir } from "./fs.server"
import path from "path";
import { bundleMDX } from "./mdx.server";

// The frontmatter can be any set of key values 
// But that's not especially useful to use
// So we'll declare our own set of properties that we are going to expect to exist 
export type Frontmatter = {
  meta?: {
    title?: string;
    description?: string;
  }
}

/**
 * Get the React component, and frontmatter JSON for a given slug
 * @param slug 
 * @returns 
 */
export async function getPost(slug: string) {

  const filePath = path.join(`${process.cwd()}/app/blog-posts`, slug + ".mdx");

  const [source] = await Promise.all([
    readFile(
      filePath,
      "utf-8"
    )
  ]);
  const post = await bundleMDX<Frontmatter>({
    source,

    cwd: process.cwd(),


    esbuildOptions: (options) => {

      // Configuration to allow image loading 
      // https://github.com/kentcdodds/mdx-bundler#image-bundling
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
        '.webp': "dataurl",
      };
      options.platform="neutral",
      options.define = {
        ...options.define, 
        // Not sure what the purpose of this is, but it is neccessary
        // Netlify production builds fail at runtime otherwise
        // https://github.com/evanw/esbuild/issues/44
        // "process.env.NODE_ENV": "production"
        "process.env": JSON.stringify(process.env)

      }

      return options;
    },

  });

  return {
    ...post,
    frontmatter: {
      ...post.frontmatter,
    }
  }
}

/**
 * Get all frontmatter for all posts
 * @returns 
 */
export async function getPosts() {
  const postsPath = await readdir(`${process.cwd()}/app/blog-posts/posts`, {
    withFileTypes: true,
  });

  const posts = await Promise.all(
    postsPath.map(async (dirent) => {

      const filePath = path.join(`${process.cwd()}/app/blog-posts/posts`, dirent.name)
      const [file] = await Promise.all([readFile(
        filePath,
      )
      ])
      const frontmatter = parseFrontMatter(file.toString());
      const attributes = frontmatter.attributes as Frontmatter;

      return {
        slug: dirent.name.replace(/\.mdx/, ""),
        frontmatter: {
          ...attributes, 
        }
      };
    })
  );
  return posts;
}