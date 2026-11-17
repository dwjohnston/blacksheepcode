import { imageSize } from "image-size";


const imageExtensions = [".webp", ".png", ".jpg", ".gif", ".jpeg"]; 

function getExtension(fileName: string) {
    const dotIndex = fileName.lastIndexOf(".");
    return dotIndex <= 0 ? "" : fileName.slice(dotIndex);
}

export async function generateImageBarrelFiles(locationOfImages ="src/assets", locationOfBarrelFile="src/generated/images.js", importLocation= "@/assets"){
    const files = (await Array.fromAsync(new Bun.Glob("*").scan({ cwd: locationOfImages }))).sort();
    const images = await Promise.all(files
        .filter((fileName) => imageExtensions.includes(getExtension(fileName)))
        .map(async (fileName) => ({
            fileName,
            extension: getExtension(fileName),
            bytes: await Bun.file(`${locationOfImages}/${fileName}`).bytes(),
        })));
    const lines = images.reduce((acc, { fileName: cur, extension, bytes }) => {
        const dimensions = imageSize(bytes); 

        const imageName = cur.slice(0, -extension.length)


        acc = `import ${imageName}_image from "${importLocation}/${cur}";\n` + acc; 

        acc += `export const ${imageName} = {
   str: ${imageName}_image, 
   width: ${dimensions.width}, 
   height: ${dimensions.height}
}\n`

        return acc;
    }, ''); 
    await Bun.write(locationOfBarrelFile, lines);
    

}

await generateImageBarrelFiles();