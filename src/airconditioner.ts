import { Constants } from './constants';
import { Binary } from './utils/binary';
/**
 * Funzione che prende in input
 * stato, temperatura, modalità, velocità, altezza alette
 * restituisce una stringa binaria
 */

type AirConditionerArgKeys = 'STATE' | 'MODE' | 'FAN_SPEED' | 'SWING' | 'TEMPERATURE';

export interface AirConditionerArgs {
  state: 'on' | 'off';
  mode: 'cool' | 'heat' | 'dry' | 'auto';
  fanSpeed: 'lowest' | 'low' | 'medium' | 'high' | 'highest' | 'auto';
  swing: 'lowest' | 'low' | 'medium' | 'high' | 'highest' | 'auto';
  temperature: 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
}

export class AirConditioner
{
  getBinaryValue(property: AirConditionerArgKeys, value: string | number): string
  {
    property = <AirConditionerArgKeys>(property as string).toUpperCase();

    if (typeof value === 'string') {
      value = value.toUpperCase();
    }
    if (!Constants.REMOTE_VALUES.hasOwnProperty(property)) {
      throw 'Error: ' + property + ' not found in Constants.REMOTE_VALUES';
    }
    if (!Constants.REMOTE_VALUES[property].hasOwnProperty(value)) {
      throw 'Error: ' + value + ' not found in Constants.REMOTE_VALUES.' + property;
    }

    return Constants.REMOTE_VALUES[property][value];
  }

  toBin(args: AirConditionerArgs): string
  {
    let bin: Binary = new Binary(Constants.REMOTE_VALUES.BASE);

    bin
      .write(
        this.getBinaryValue('STATE', args.state),
        Constants.REMOTE_POSITIONS.STATE
      ).write(
        this.getBinaryValue('MODE', args.mode),
        Constants.REMOTE_POSITIONS.MODE
      ).write(
        this.getBinaryValue('FAN_SPEED', args.fanSpeed),
        Constants.REMOTE_POSITIONS.FAN_SPEED
      ).write(
        this.getBinaryValue('SWING', args.swing),
        Constants.REMOTE_POSITIONS.SWING
      ).write(
        this.getBinaryValue('TEMPERATURE', args.temperature),
        Constants.REMOTE_POSITIONS.TEMPERATURE
      ).write(
        bin.checksum(),
        Constants.REMOTE_POSITIONS.CHECKSUM
      );

    return Constants.REMOTE_VALUES.HEADER + ':' + bin.read();
  }
}
