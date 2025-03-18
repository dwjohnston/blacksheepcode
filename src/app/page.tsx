import { ListOfArticles } from "@/components/ListOfArticles/ListOfArticles";
import { ListOfTagsPanel } from "@/components/ListOfTagsPanel/ListOfTagsPanel";
import { SheepImage } from "@/components/SheepImage/SheepImage";
import { getAllPostFrontmatter } from "@/utils/blogPosts";

async function getAllArticles() {
	return getAllPostFrontmatter();
}

export default async function Home() {
	const articles = await getAllArticles();

	return (
		<>
			<div>
				<div className="headline">
					<SheepImage />
					<div>
						<h1>Black Sheep Code</h1>
						<p>A blog about modern web development.</p>
					</div>
				</div>
			</div>

			<div className="main">
				<ListOfTagsPanel/>
				<h2>Blog</h2>
				<ListOfArticles allFrontmatter={articles} />
			</div>

			<p className="open-source">
				I support open source:{" "}
				<a
					href="https://opencollective.com/blacksheepcode"
					target="_blank"
					rel="noreferrer"
				>
					Open Collective
				</a>
			</p>
		</>
	);
}
