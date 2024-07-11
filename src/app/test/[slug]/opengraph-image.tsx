
import { getFrontmatterFromSlug } from "@/utils/blogPosts";
import * as allImages from "../../../generated/images";
import DEFAULT_IMAGE from "@/assets/blacksheep_100x100.webp";
import { ImageResponse } from "next/og";
import { StaticImageData } from "next/image";

export default async function Image(props: { params: { slug: string } }) {

    const frontmatter = await getFrontmatterFromSlug(props.params.slug);
    const image: StaticImageData = (frontmatter.frontmatter.meta.image && allImages[frontmatter.frontmatter.meta.image as keyof typeof allImages]) as unknown as StaticImageData ?? DEFAULT_IMAGE;

    return new ImageResponse(<img src={image.src} />, {
        height: image.height,
        width: image.width,
    })

}