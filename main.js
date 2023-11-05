const fs = require('fs');

const filePaths = process.argv.slice(2);

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file ${filePath}: ${err}`);
      } else {
        resolve(data);
      }
    });
  });
}

function concatenateFiles(paths) {
  return Promise.all(paths.map(readFilePromise))
    .then(contents => {
      const concatenatedContent = contents.join('');
      return new Promise((resolve, reject) => {
        /* since writeFile is an asynchronouse function, we need to wrap this in a Promise as well. */
        fs.writeFile('output.txt', concatenatedContent, err => {
          if (err) {
            console.error(`Error writing file: ${err}`);
            reject(err);
          } else {
            console.log('Concatenated content written to output.txt');
            resolve();
          }
        });
      });
    });
}

// Check if this module is the main module, i.e., not required by another module.
if (require.main === module) {
  concatenateFiles(filePaths).catch(console.error);
}

module.exports = { readFilePromise, concatenateFiles };
