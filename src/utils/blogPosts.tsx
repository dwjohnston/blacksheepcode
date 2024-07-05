import * as allDraftMetaData from "../generated/frontmatter/drafts";
import * as allPostMetaData from "../generated/frontmatter/posts";
import * as allTestMetaData from "../generated/frontmatter/test";
import type { EnrichedFrontMatterPlusSlug, FrontMatterPlusSlug } from "../../utils/frontmatterTypings";
import * as allImages from "../generated/images";
import { getDomainUrl } from "../../utils/getDomainUrl";

export type BlogPostFolders = "drafts" | "posts" | "test";

export const allMetadata = {
    "drafts": allDraftMetaData as Record<string, FrontMatterPlusSlug>,
    "posts": allPostMetaData as Record<string, FrontMatterPlusSlug>,
    "test": allTestMetaData as Record<string, FrontMatterPlusSlug>,
}


const DEFAULT_METADATA = {}

export function getFolderAndFilenameFromSlug(slug: string): {
    folder: BlogPostFolders,
    filename: string;

} {

    const [, folder, fName] = slug.split(/[?/#]/);



    if (!folder) {
        throw new Error("Expected folder to exist");
    }
    if (!fName) {
        throw new Error("Expect fName to exist");
    }
    return {
        folder: folder as BlogPostFolders,
        filename: fName,
    }
}

/**
 * Although it is currently unnecessary for this function to be async
 * In future we may be retrieving the frontmatter from a database or async import 
 * So let's handle for it being async now
 * @param slug 
 * @returns 
 */
export async function getFrontmatterFromSlug(slug: string): Promise<EnrichedFrontMatterPlusSlug> {
    const { folder, filename } = getFolderAndFilenameFromSlug(slug);
    const data = allMetadata[folder][filename];
    if (!data) {
        throw new Error(`Frontmatter did not exist for slug: '${slug}`)
    }

    let seriesFrontmatter: Array<FrontMatterPlusSlug> | null = null;

    // If it's a series, then we get the frontmatter for all of the series, so we can show the table of contents
    if ('series' in data.frontmatter) {
        seriesFrontmatter = (Object.values(allMetadata[folder]).filter((v) => {
            return v.frontmatter.series?.name === data.frontmatter.series?.name
        })).sort((a, b) => {
            return (a.frontmatter.series?.part ?? 0) - (b.frontmatter.series?.part ?? 0)
        });
    }

    return { ...data, seriesFrontmatter } as EnrichedFrontMatterPlusSlug;
}


// export function createLoaderFunction(folder: BlogPostFolders): LoaderFunction {
//     return async (loaderArgs) => {

//         // Unfortunately we don't have access to the path via loader args, so we have to manually extract
//         // it from the request. 
//         const url = loaderArgs.request.url;

//         const path = new URL(url).pathname; 

//         if(path.slice(1) === folder) {
//             return null; 
//         }


//         return getFrontmatterFromSlug(path)
//     }
// }

type ImageData = {
    str: string,
    width: number,
    height: number,
}

export function getImageTags(imageName: string) {

    //@ts-expect-error
    const image: ImageData | undefined = allImages[imageName];


    if (!image) {
        return {};
    }

    return {
        "og:image": `${getDomainUrl()}${image.str}`,
        "og:image:width": image.width,
        "og:image:height": image.height,
        "twitter:image": `${getDomainUrl()}${image.str}`,
        "twitter:image:width": image.width,
        "twitter:image:height": image.height,
    }
}



function mergeFrontmatterAndDefaultMetadata(frontmatter: FrontMatterPlusSlug | null) {

    if (!frontmatter) {
        return DEFAULT_METADATA;
    }

    return {
        ...DEFAULT_METADATA,
        ...(frontmatter.frontmatter.meta.image ? getImageTags(frontmatter.frontmatter.meta.image) : {}),
        title: frontmatter.frontmatter.meta?.title,
        description: frontmatter.frontmatter?.meta?.description,
        "twitter:title": frontmatter.frontmatter.meta?.title,
        "twitter:description": frontmatter.frontmatter?.meta?.description,
    }
}



export async function getAllPostFrontmatter(group: BlogPostFolders = "posts"): Promise<Array<FrontMatterPlusSlug>> {
    return Object.values(allMetadata[group] as Record<string, FrontMatterPlusSlug>).sort((a, b) => {
        return new Date(b.frontmatter.meta?.dateCreated ?? 0).valueOf() - new Date(a.frontmatter.meta?.dateCreated ?? 0).valueOf();
    });
}