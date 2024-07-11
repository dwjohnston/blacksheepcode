import { Metadata, } from "next";
import { StaticImageData } from "next/image"
import * as allDraftMetaData from "../generated/frontmatter/drafts";
import * as allPostMetaData from "../generated/frontmatter/posts";
import * as allTestMetaData from "../generated/frontmatter/test";
import type { EnrichedFrontMatterPlusSlug, FrontMatterPlusSlug } from "../../utils/frontmatterTypings";
import * as allImages from "../generated/images";
import DEFAULT_IMAGE from "@/assets/blacksheep_100x100.webp";
import { getDomainUrl, getSiteName } from "../../utils/getDomainUrl";

export type BlogPostFolders = "drafts" | "posts" | "test";

export const allMetadata = {
    "drafts": allDraftMetaData as Record<string, FrontMatterPlusSlug>,
    "posts": allPostMetaData as Record<string, FrontMatterPlusSlug>,
    "test": allTestMetaData as Record<string, FrontMatterPlusSlug>,
}


const DEFAULT_METADATA = {
    title: "Black Sheep Code",
    description: "A blog about modern web development"
} satisfies Metadata

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
    str: StaticImageData,
    width: number,
    height: number,
}

export function getImageTags(imageName?: string): {
    url: string;
    width: number;
    height: number;
} {

    //@ts-expect-error
    const image: ImageData = allImages[imageName] ?? { str: DEFAULT_IMAGE };

    return {
        url: image.str.src,
        height: image.str.height,
        width: image.str.width
    }
}



export function mergeFrontmatterAndDefaultMetadata(meta: Partial<FrontMatterPlusSlug["frontmatter"]["meta"]> | null): Metadata {

    if (!meta) {
        return DEFAULT_METADATA;
    }

    const image = getImageTags(meta.image);

    const data = {
        title: meta?.title ?? DEFAULT_METADATA.title,
        description: meta?.description ?? DEFAULT_METADATA.description,
        openGraph: {
            title: meta?.title ?? DEFAULT_METADATA.title,
            description: meta?.description ?? DEFAULT_METADATA.description,
            url: getDomainUrl(),
            siteName: getSiteName(),
            type: "website",
            locale: "en_AU",
            images: [
                image
            ]
        }


    }
    return data;
}

export async function getMetadata(slug: string): Promise<Metadata> {
    const metadata = await getFrontmatterFromSlug(slug);
    return mergeFrontmatterAndDefaultMetadata(metadata.frontmatter.meta);
}



export async function getAllPostFrontmatter(group: BlogPostFolders = "posts"): Promise<Array<FrontMatterPlusSlug>> {
    return Object.values(allMetadata[group] as Record<string, FrontMatterPlusSlug>).sort((a, b) => {
        return new Date(b.frontmatter.meta?.dateCreated ?? 0).valueOf() - new Date(a.frontmatter.meta?.dateCreated ?? 0).valueOf();
    });
}