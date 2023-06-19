
/**
 * ChatGPT prompt:
 * 
 * I have a series of files that look start like this: 
```
---
meta:
  title: Generating server and client code using OpenAPI tooling? 
  description: We'll use openapi-generators to generate a Go backend and a React frontend. 
---
```


Generate a node script that will convert them to look like this: 

```
---
meta:
  title: Generating server and client code using OpenAPI tooling? 
  twitter:title: Generating server and client code using OpenAPI tooling? 

  description: We'll use openapi-generators to generate a Go backend and a React frontend. 
  twitter:description: We'll use openapi-generators to generate a Go backend and a React frontend. 

---
``` 


It struggled with inserting the tags into the right place though
 */

const fs = require('fs');
const path = require('path');

const inputDirectory = 'app/routes/posts';
const outputDirectory = 'app/routes/posts';

// Read the files from the input directory
fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  // Process each file
  files.forEach(file => {
    const inputFile = path.join(inputDirectory, file);
    const outputFile = path.join(outputDirectory, file);

    // Read the content of the input file
    fs.readFile(inputFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading input file:', err);
        return;
      }

      // Modify the metadata
      const modifiedData = addTwitterMetadata(data);

      // Write the modified content to the output file
      fs.writeFile(outputFile, modifiedData, 'utf8', err => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }
        console.log(`File ${outputFile} written successfully.`);
      });
    });
  });
});

// Function to add Twitter metadata to the input data
function addTwitterMetadata(data) {
  const lines = data.split('\n');

  // Find the position to insert the Twitter metadata
  let insertIndex = lines.findIndex(line => line.trim() === 'meta:'); // ChatGPT struggled with this line

  // Extract the title and description from metadata
  const title = getValueFromMetadata(lines, 'title');
  const description = getValueFromMetadata(lines, 'description');

  // Add Twitter metadata lines
  lines.splice(insertIndex + 1, 0, `  twitter:title: ${title}`, `  twitter:description: ${description}`);

  return lines.join('\n');
}

// Helper function to get a value from metadata
function getValueFromMetadata(lines, key) {
  const line = lines.find(line => line.includes(` ${key}:`));
  return line ? line.split(` ${key}: `)[1] : '';
}