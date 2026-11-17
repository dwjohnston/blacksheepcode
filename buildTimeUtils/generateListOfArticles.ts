const PATH_TO_ARTICLES_COMPONENT = "app/generated/ListOfArticles.tsx"; 
const PATH_TO_BLOG_POSTS = "app/routes/posts"

async function generateListOfArticles() {
    try {
        const files = await Array.fromAsync(new Bun.Glob("*").scan({ cwd: PATH_TO_BLOG_POSTS }));


        let output = (`
        export const ListOfArticles = () => {



            return <ul>`);

        for (const file of files) {

            if (!file.endsWith(".mdx")){
                console.warn(`Found a non-mdx file in ${PATH_TO_BLOG_POSTS}: ${file}`)
            }


            // TODO proper handling of illegal characters
            else if (file.includes(' ')) {
                console.warn(`Found a space in file: ${file}`)
            }


            else {
                const fileName = file.split('.mdx')[0]; 

                output += (`
                <li>
                <a
                    href="/posts/${fileName}"
                >
                    ${fileName}        </a>
            </li>
                `)
            }

           
        }

        output += (`
        </ul>
    }
    `)

        await Bun.write(PATH_TO_ARTICLES_COMPONENT, output);


    } catch (err) {
        throw err; 
      }
}

generateListOfArticles().then(() => {
    console.info(`Successfully generated ${PATH_TO_ARTICLES_COMPONENT}`)
})