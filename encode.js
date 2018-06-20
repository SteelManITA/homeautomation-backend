const fs = require('fs');

const FILE_ENCODING = 'utf8';
const MAIN_FOLDER = 'values';
const ORIGINAL_VALUES_FOLDER = MAIN_FOLDER + '/' + 'original';
const BINARY_VALUES_FOLDER = MAIN_FOLDER + '/' + 'binary';
const SHORT = 440;
const LONG = 1290;
const MARGIN = 150;
const INTRO = 3470;
const INTRO2 = 1720;
const SEPARATOR = 9950;

const compare = function (a, b, margin = MARGIN)
{
  if (Math.abs(a - b) < margin) {
    return true;
  } else {
    return false;
  }
};

const rawCoupleToBit = function (on, off)
{
  if (compare(on, INTRO) && compare(off, INTRO2)) {
    // return '[';
    return '';
  }
  if (compare(on, SHORT) && compare(off, SHORT)) {
    return '0';
  }
  if (compare(on, SHORT) && compare(off, LONG)) {
    return '1';
  }
  if (compare(on, SHORT) && compare(off, SEPARATOR)) {
    // return ']';
    return ':';
  }
  throw 'Error: Out of range ('+ on + ', ' + off +')';
};

const encode = function (rawData) {
  let s = '';
  for (let i = 1; i < rawData.length; i+=2) {
    const on = parseInt(rawData[i-1]);
    const off = parseInt(rawData[i]);
    s += rawCoupleToBit(on, off);
  }
  // s += ']';
  return s;
};

const encodeFile = function (file)
{
  const fileIn = ORIGINAL_VALUES_FOLDER + '/' + file;
  const fileOut = BINARY_VALUES_FOLDER + '/' + file;

  fs.readFile(fileIn, FILE_ENCODING, (err, fileData) => {
    if (err) throw err;

    const rawData = fileData
      .match(/[0-9]+/g) // cerca tutti i valori numerici e li mette in un array
      .splice(1); // elimina il primo valore

    const encodedString = encode(rawData);

    fs.writeFile(
      fileOut,
      encodedString,
      // encodedString.split(']')[1].substr(1),
      // encodedString.split(':')[1].substr(1),
      FILE_ENCODING,
      (err) => { if (err) throw err; }
    );
  });
};

fs.readdir(ORIGINAL_VALUES_FOLDER, (err, files) => {
  if (err) throw err;
  files.forEach(file => encodeFile(file));
  console.log('Completed');
});
