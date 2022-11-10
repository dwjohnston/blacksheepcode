import { readdir, writeFile, appendFile} from 'node:fs/promises';

const PATH_TO_ARTICLES_COMPONENT = "app/generated/ListOfArticles.tsx"; 
const PATH_TO_BLOG_POSTS = "app/routes/posts"

async function generateListOfArticles() {
    try {
        const files = await readdir(PATH_TO_BLOG_POSTS);


        await writeFile(PATH_TO_ARTICLES_COMPONENT, `
        export const ListOfArticles = () => {



            return <ul>`);

        for (const file of files) {

            if (!file.endsWith(".mdx")){
                console.warn(`Found a non-mdx file in ${PATH_TO_BLOG_POSTS}: ${file}`)
            }
            else {
                const fileName = file.split('.mdx')[0]; 

                await appendFile(PATH_TO_ARTICLES_COMPONENT,  `
                <li>
                <a
                    href="/posts/${fileName}"
                >
                    ${fileName}        </a>
            </li>
                `)
            }

           
        }

        appendFile(PATH_TO_ARTICLES_COMPONENT, `
        </ul>
    }
    `)


    } catch (err) {
        throw err; 
      }
}

generateListOfArticles().then(() => {
    console.info(`Successfully generated ${PATH_TO_ARTICLES_COMPONENT}`)
})