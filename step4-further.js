const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

function handleOutput(data) {
  outputFile ? (
    fs.writeFile(outputFile, data, { 'flag': 'a', 'encoding': 'utf8' }, (err) => {
      if (err) {
        console.error(`Couldn't write ${outputFile}: ${err}`);
        process.exit(1);
      }
    })
  ) : console.log(data);
}

let inputs = [];
let outputFile;

if (process.argv[2] === '--out') {
  outputFile = process.argv[3];
  inputs = process.argv.slice(4);
} else {
  inputs = process.argv.slice(2);
}

for (input of inputs) {
  input.startsWith('http') ? webCat(input) : cat(input);
}
