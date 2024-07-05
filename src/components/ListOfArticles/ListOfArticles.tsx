import { FrontMatterPlusSlug } from "../../../utils/frontmatterTypings";
import { DatePublished } from "../DatePublished/DatePublished"
import Link from "next/link"

export function ListOfArticles(props: {
    allFrontmatter: Array<FrontMatterPlusSlug>
  }) {
    return <div data-testid="bsc-homepage-all-article-previews">
      {props.allFrontmatter.map((v) => {
        return <Link href={v.slug} key={v.slug} className="homepage-article-link" data-testid="bsc-homepage-article-preview-box">
          <div>
            <p className="homepage-article-link-title">{v.frontmatter.meta?.title ?? v.slug}</p>
            {v.frontmatter.meta?.dateCreated && <DatePublished date={v.frontmatter.meta.dateCreated} />}
            <p className="homepage-article-link-description">{v.frontmatter.meta?.description ?? ''}</p>
          </div>
        </Link>
      })}
  
    </div>
  }