import { FrontMatterPlusSlug } from "../../../utils/frontmatterTypings";
import { DatePublished } from "../DatePublished/DatePublished"
import Link from "next/link"


function FilterInformation(props: {
  filterInformation: {
    tagFilter: string | null,
    didFindArticles: boolean
  }
}) {
  return <div>
  {props.filterInformation.tagFilter && props.filterInformation.didFindArticles && <h1>Articles tagged <i>&quot;{props.filterInformation.tagFilter}&quot;</i>:</h1>}
  {props.filterInformation.tagFilter && !props.filterInformation.didFindArticles && <><h1>No articles found for tag <i>&quot;{props.filterInformation.tagFilter}&quot;</i></h1><p>You might find these articles useful: </p></>}
</div>  
}

export function  ListOfArticles(props: {
    allFrontmatter: Array<FrontMatterPlusSlug>, 
    filterInformation?: {
      tagFilter: string | null,
      didFindArticles: boolean
    }
  }) {
    return <div data-testid="bsc-homepage-all-article-previews">

      {props.filterInformation && <FilterInformation filterInformation={props.filterInformation} />}

      {props.allFrontmatter.map((v) => {
        return <Link href={v.slug} key={v.slug} className="homepage-article-link" data-testid="bsc-homepage-article-preview-box" aria-label={v.frontmatter.meta.title}>
          <div>
            <p className="homepage-article-link-title">{v.frontmatter.meta?.title ?? v.slug}</p>
            {v.frontmatter.meta?.dateCreated && <DatePublished date={v.frontmatter.meta.dateCreated} />}
            <p className="homepage-article-link-description">{v.frontmatter.meta?.description ?? ''}</p>
          </div>
        </Link>
      })}
  
    </div>
  }