import {z} from "zod";

const metaSchema = z.object({
    title: z.string(),
    description: z.string(), 
    dateCreated: z.date().or(z.string()),
    image: z.string().optional(),
  }); 

  const seriesSchema = z.object({
    name: z.string(),
    part: z.number(),
    description: z.string().optional()
  }); 

export const frontMatterSchema = z.object({
    meta:  metaSchema,
    series: seriesSchema.optional(),
})

export type FrontMatter = z.infer<typeof frontMatterSchema>;

export type FrontMatterPlusSlug = {
    slug: string; 
    frontmatter: FrontMatter; 
}


export type EnrichedFrontMatterPlusSlug = FrontMatterPlusSlug & {
  seriesFrontmatter: Array<FrontMatterPlusSlug> | null;
}



