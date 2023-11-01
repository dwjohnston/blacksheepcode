

[
    "PR_NUMBER", 
    "BRANCH_NAME", 
    "NETLIFY_SITE_ID", 
    "NETLIFY_TOKEN", 
    "UPDATED_AT"
].forEach((v) => {
    if(!(process.env[v])){
        throw new Error(`Env var: '${v}' was not provided`)
    }
})
const {
    PR_NUMBER, 
    BRANCH_NAME, 
    NETLIFY_SITE_ID, 
    NETLIFY_TOKEN, 
    UPDATED_AT
} = process.env; 

console.log({PR_NUMBER, BRANCH_NAME, NETLIFY_SITE_ID, UPDATED_AT})



const MAX_NUM_TRIES = 10; 

// async function main() {

//     let numTries = 0; 
//     while (numTries < MAX_NUM_TRIES) {
//         const result = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys?branch=${BRANCH_NAME}`,{
//             headers: {
//                 "Authorization" : `Bearer ${NETLIFY_TOKEN}`
//             }
//         }); 

//         if(!result.ok){
//             throw new Error(`Result was not ok: ${result.statusText}`)
//         }

//         const json = await result.json(); 

//         if(json.length ===100){
//             throw new Error("Result length was 100, you have there is probably another page of results")
//         }



//     }
// }

// main(); 