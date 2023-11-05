const fs = require('fs');

const filePaths = process.argv.slice(2);
let concatenatedContent = '';

filePaths.forEach((filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}: ${err}`);
      return;
    }
    concatenatedContent += data;
    if (filePaths.indexOf(filePath) === filePaths.length - 1) {
      fs.writeFile('output.txt', concatenatedContent, (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          return;
        }
        console.log('Concatenated content written to output.txt');
      });
    }
  });
});
