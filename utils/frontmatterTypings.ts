import {z} from "zod";

const metaSchema = z.object({
    title: z.string(),
    description: z.string(), 
    dateCreated: z.date(),
  }); 

  const seriesSchema = z.object({
    name: z.string(),
    part: z.number(),
  }); 

export const frontMatterSchema = z.object({
    meta:  metaSchema,
    series: seriesSchema.optional(),
})

export type FrontMatter = z.infer<typeof frontMatterSchema>;

export type FrontmatterPayload = {
    slug: string; 
    frontmatter: FrontMatter; 
}



