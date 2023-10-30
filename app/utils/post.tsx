import parseFrontMatter from "front-matter";
import { readFile, stat, readdir } from "./fs.server"
import path from "path";
import { bundleMDX } from "./mdx.server";
export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};


export type Frontmatter = {
  meta?: {
    title?: string;
    description?: string;
  }

  _fileStats: {
    dateCreated: string;
    dateLastModified: string;
  }
}

export async function getPost(slug: string) {

  const filePath = path.join(`${__dirname}/../../app/blog-posts`, slug + ".mdx");

  const [source, stats] = await Promise.all([
    readFile(
      filePath,
      "utf-8"
    ),
    stat(filePath)

  ]);
  const rehypeHighlight = await import("rehype-highlight").then(
    (mod) => mod.default
  );
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: rehypeAutolinkHeadings } = await import(
    "rehype-autolink-headings"
  );

  const { default: remarkMdxImages } = await import("remark-mdx-images")

  const { default: rehypeToc } = await import("rehype-toc");
  const { default: rehypeSlug } = await import("rehype-slug");

  const [remarkToc] = await Promise.all([
    import("remark-toc").then((mod) => mod.default),
  ]);


  console.log(process.cwd())

  const post = await bundleMDX<Frontmatter>({
    source,
    cwd: process.cwd(),

    esbuildOptions: (options) => {

      console.log(options)
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
      };

      return options;
    },
    mdxOptions: (options) => {


      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkToc, remarkMdxImages],
        options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight, rehypeAutolinkHeadings]

      return options

    }

  });


  return {
    ...post,
    frontmatter: {
      ...post.frontmatter,
      _fileStats: {
        dateLastModified: stats.mtime,
        dateCreated: stats.ctime,

      }
    }
  }
}

export async function getPosts() {
  const postsPath = await readdir(`${__dirname}/../../app/blog-posts/posts`, {
    withFileTypes: true,
  });

  const posts = await Promise.all(
    postsPath.map(async (dirent) => {

      const filePath = path.join(`${__dirname}/../../app/blog-posts/posts`, dirent.name)
      const [file, stats] = await Promise.all([readFile(
        filePath,
      ), 
      stat(filePath)
    ])
      const frontmatter = parseFrontMatter(file.toString());
      const attributes = frontmatter.attributes as Frontmatter;

      return {
        slug: dirent.name.replace(/\.mdx/, ""),
        frontmatter: {
          ...attributes, 
          _fileStats: {
            dateLastModified: stats.mtime,
            dateCreated: stats.ctime,
    
          }
        }
      };
    })
  );
  return posts;
}