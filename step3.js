const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      outputFile ? write(outputFile, data) : console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    outputFile ? write(outputFile, response.data) : console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

function write(path, data) {
  fs.writeFile(path, data, 'utf8', (err) => {
    if (err) {
      console.error(`Couldn't write ${path}: ${err}`);
      process.exit(1);
    }
  });
}

let input;
let outputFile;

if (process.argv[2] === '--out') {
  outputFile = process.argv[3];
  input = process.argv[4];
} else {
  input = process.argv[2];
}

input.startsWith('http') ? webCat(input) : cat(input);
