import { Constants } from './constants';
import { Utils } from './utils/utils';
import * as fs from "fs";

export class Encode
{
  private readonly MARGIN = 150;

  private compare(n1: number, n2: number): boolean
  {
    return Utils.compare(n1, n2, this.MARGIN);
  }

  private rawCoupleToBit(on: number, off: number): string
  {
    if (this.compare(on, Constants.VALUES.INTRO) && this.compare(off, Constants.VALUES.INTRO2)) {
      return '';
    }
    if (this.compare(on, Constants.VALUES.SHORT) && this.compare(off, Constants.VALUES.SHORT)) {
      return '0';
    }
    if (this.compare(on, Constants.VALUES.SHORT) && this.compare(off, Constants.VALUES.LONG)) {
      return '1';
    }
    if (this.compare(on, Constants.VALUES.SHORT) && this.compare(off, Constants.VALUES.SEPARATOR)) {
      return ':';
    }
    throw 'Error: Out of range ('+ on + ', ' + off +')';
  }

  private encode(rawData: string[]): string
  {
    let s = '';
    for (let i = 1; i < rawData.length; i+=2) {
      const on = parseInt(rawData[i-1]);
      const off = parseInt(rawData[i]);
      s += this.rawCoupleToBit(on, off);
    }
    return s;
  }

  private encodeFile(fileName: string): void
  {
    const fileIn = Constants.FOLDER.ORIGINAL_VALUES + '/' + fileName;
    const fileOut = Constants.FOLDER.BINARY_VALUES + '/' + fileName;

    fs.readFile(fileIn, Constants.FILE_ENCODING, (err, fileData) => {
      if (err) throw err;

      const rawData = fileData
        .match(/[0-9]+/g) // cerca tutti i valori numerici e li mette in un array
        .splice(1); // elimina il primo valore

      const encodedString = this.encode(rawData);

      fs.writeFile(
        fileOut,
        encodedString,
        Constants.FILE_ENCODING,
        (err) => { if (err) throw err; }
      );
    });
  }

  public init(): void
  {
    fs.readdir(Constants.FOLDER.ORIGINAL_VALUES, (err, files) => {
      if (err) throw err;
      files.forEach(file => this.encodeFile(file));
      console.log('Completed');
    });
  }
}

new Encode().init();