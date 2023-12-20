import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import * as allDraftMetaData from "../generated/frontmatter/drafts";
import * as allPostMetaData from "../generated/frontmatter/posts";
import * as allTestMetaData from "../generated/frontmatter/test";

export type BlogPostFolders = "drafts" | "posts" | "test";

export type SeriesInfo = {
    name: string;
    part: number;
} | {
    name: string;
    part: 1;
    description: string;
};

/**
 * This typing reflects what is generated into JSON
 */
export type BaseFrontmatter = {
    slug: string,
    frontmatter: {
        meta?: {
            title?: string;
            description?: string;
            dateCreated?: string;
        }
        series?: SeriesInfo;
    }
}

type BaseFrontmatterWithMandatorySeriesInfo = BaseFrontmatter & {frontmatter: {series: SeriesInfo}}

/**
 * This typing reflects any additional enrichment we may provide
 */
export type EnrichedFrontMatter = BaseFrontmatter & {
    seriesFrontmatter?: Array<BaseFrontmatterWithMandatorySeriesInfo>;
}

export const allMetadata = {
    "drafts": allDraftMetaData as Record<string, BaseFrontmatter>,
    "posts": allPostMetaData as Record<string, BaseFrontmatter>,
    "test": allTestMetaData as Record<string, BaseFrontmatter>
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
export async function getFrontmatterFromSlug(slug: string): Promise<EnrichedFrontMatter | null> {
    const { folder, filename } = getFolderAndFilenameFromSlug(slug);

    const frontmatter = allMetadata[folder][filename] as BaseFrontmatter;
    if (!frontmatter) {
        return null;
    }

    let seriesFrontmatter : Array<BaseFrontmatterWithMandatorySeriesInfo> | undefined; 
    if (frontmatter.frontmatter.series) {
        seriesFrontmatter = Object.values(allMetadata[folder]).filter((v) => {
            return v.frontmatter.series?.name === frontmatter.frontmatter.series?.name
        }) as Array<BaseFrontmatterWithMandatorySeriesInfo>;


    }

    return { ...frontmatter, url: slug, seriesFrontmatter } as EnrichedFrontMatter;
}


export function createLoaderFunction(folder: BlogPostFolders): LoaderFunction {
    return async (loaderArgs) => {

        // Unfortunately we don't have access to the path via loader args, so we have to manually extract
        // it from the request. 
        const url = loaderArgs.request.url;
        const parts = url.split('/');
        const desiredPart = ["", parts[parts.length - 2], parts[parts.length - 1]].join("/"); 
        return getFrontmatterFromSlug(desiredPart)
    }
}


function mergeFrontmatterAndDefaultMetadata(frontmatter: BaseFrontmatter | null) {

    if (!frontmatter) {
        return DEFAULT_METADATA;
    }

    return {
        ...DEFAULT_METADATA,
        title: frontmatter.frontmatter.meta?.title,
        description: frontmatter.frontmatter?.meta?.description,
        "twitter:title": frontmatter.frontmatter.meta?.title,
        "twitter:description": frontmatter.frontmatter?.meta?.title,
    }
}

export function createMetaFunction(folder: BlogPostFolders): MetaFunction {
    return (metaInput) => {
        const loaderResult = metaInput.data as BaseFrontmatter | null;
        return mergeFrontmatterAndDefaultMetadata(loaderResult ?? null);
    }

}


export async function getAllPostFrontmatter() :  Promise<Array<BaseFrontmatter>> {
    return Object.values(allPostMetaData as Record<string, BaseFrontmatter>).sort((a,b) => {
        return new Date(b.frontmatter.meta?.dateCreated ?? 0).valueOf() - new Date(a.frontmatter.meta?.dateCreated ?? 0).valueOf();
    });
}