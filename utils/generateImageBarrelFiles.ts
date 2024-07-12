import fs from 'fs';
import path from "path";
import imageSize from "image-size";


const imageExtensions = [".webp", ".png", ".jpg", ".gif", ".jpeg"]; 

export function generateImageBarrelFiles(locationOfImages ="src/assets", locationOfBarrelFile="src/generated/images.js", importLocation= "@/assets"){
    const files = fs.readdirSync(locationOfImages);
    const lines = files.reduce((acc, cur) => {
        if (imageExtensions.includes(path.extname(cur))){

            const dimensions = imageSize(`${locationOfImages}/${cur}`); 

            const imageName = path.basename(cur, path.extname(cur))


            acc = `import ${imageName}_image from "${importLocation}/${cur}";\n` + acc; 

            acc += `export const ${imageName} = {
   str: ${imageName}_image, 
   width: ${dimensions.width}, 
   height: ${dimensions.height}
}\n`
        }
        else {
            // do nothing
        }

        return acc;
    }, ''); 
    fs.writeFileSync(locationOfBarrelFile, lines);
    

}

generateImageBarrelFiles();