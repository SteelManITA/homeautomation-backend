/**
 * Data una stringa binaria
 * restituisce una raw string
 */

import { Constants } from './constants';
import { BinaryString } from './utils/binary';
import { Utils } from "./utils/utils";

export class Decode
{
  private arr: any[] = [];

  binaryToRaw(binaryString: BinaryString): string
  {
    const binaryStrings: BinaryString[] = Utils.chunk(binaryString, 1);
    let raw: string = '';

    binaryStrings
      .forEach((bit: '0' | '1') => {
        this.arr.push({text: 1, time: Constants.SIGNAL_VALUES.SHORT.toString()});

        if (bit === '0') {
          this.arr.push({text: 0, time: Constants.SIGNAL_VALUES.SHORT.toString()});

          raw += Constants.SIGNAL_VALUES.SHORT.toString() + " "
            + Constants.SIGNAL_VALUES.SHORT.toString() + " ";
        } else if (bit === '1') {
          this.arr.push({text: 0, time: Constants.SIGNAL_VALUES.LONG.toString()});

          raw += Constants.SIGNAL_VALUES.SHORT.toString() + " "
            + Constants.SIGNAL_VALUES.LONG.toString() + " ";
        }
      });

    return raw;
  }

  decode(binaryString: BinaryString): string
  {
    /**
     * Scorre la stringa binaria
     * scompone lo 0 in SHORT SHORT e l'1 in SHORT LONG
     *
     * La risposta inizia sempre per INTRO INTRO2
     * i : diventano SHORT SEPARATOR
     */

    const bs: BinaryString[] = binaryString.split(':');

    const header: BinaryString = bs[0];
    const payload: BinaryString = bs[1];

    return Constants.SIGNAL_VALUES.INTRO.toString() + " "
      + Constants.SIGNAL_VALUES.INTRO2.toString() + " "
      + this.binaryToRaw(header)
      + Constants.SIGNAL_VALUES.SHORT.toString() + " "
      + Constants.SIGNAL_VALUES.SEPARATOR.toString() + " "
      + Constants.SIGNAL_VALUES.INTRO.toString() + " "
      + Constants.SIGNAL_VALUES.INTRO2.toString() + " "
      + this.binaryToRaw(payload)
      + Constants.SIGNAL_VALUES.SHORT;
  }
}
