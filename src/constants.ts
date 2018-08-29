import { BinaryString } from './utils/binary';

interface SignalValuesAttr {
  SHORT: number;
  LONG: number;
  INTRO: number;
  INTRO2: number;
  SEPARATOR: number;
}

interface RemoteValuesAttr {
  HEADER: BinaryString,
  BASE: BinaryString,
  FAN_SPEED: {
    LOWEST: BinaryString;
    LOW: BinaryString;
    MEDIUM: BinaryString;
    HIGH: BinaryString;
    HIGHEST: BinaryString;
    AUTO: BinaryString;
  };
  SWING: {
    LOWEST: BinaryString;
    LOW: BinaryString;
    MEDIUM: BinaryString;
    HIGH: BinaryString;
    HIGHEST: BinaryString;
    AUTO: BinaryString;
  };
  MODE: {
    COOL: BinaryString;
    HEAT: BinaryString;
    DRY: BinaryString;
    AUTO: BinaryString;
  };
  STATE: {
    ON: BinaryString;
    OFF: BinaryString;
  };
  TEMPERATURE: {
    16: BinaryString,
    17: BinaryString,
    18: BinaryString,
    19: BinaryString,
    20: BinaryString,
    21: BinaryString,
    22: BinaryString,
    23: BinaryString,
    24: BinaryString,
    25: BinaryString,
    26: BinaryString,
    27: BinaryString,
    28: BinaryString,
    29: BinaryString,
    30: BinaryString,
  }
}

interface RemotePositionsAttr {
  STATE: number;
  MODE: number;
  FAN_SPEED: number;
  SWING: number;
  TEMPERATURE: number;
  CHECKSUM: number;
}

interface ConstantsAttr
{
  FILE_ENCODING: string;
  FOLDER: {
    ORIGINAL_VALUES: string;
    BINARY_VALUES: string;
  };
  SIGNAL_VALUES: SignalValuesAttr;
  REMOTE_VALUES: RemoteValuesAttr;
  REMOTE_POSITIONS: RemotePositionsAttr;
  OUT_PIN: string;
}

const SignalValues: SignalValuesAttr = {
  SHORT: 440,
  LONG: 1290,
  INTRO: 3470,
  INTRO2: 1720,
  SEPARATOR: 9950,
}

const RemoteValues: RemoteValuesAttr = {
  HEADER: '0100000000000100000001110010000000000000000000000000000001100000',
  BASE: '01000000000001000000011100100000000000000000000000000100000000010000000010110000000000000111000000000111000000000000000010000001000000000000000000000000',
  FAN_SPEED: {
    LOWEST: '1100',
    LOW: '0010',
    MEDIUM: '1010',
    HIGH: '0110',
    HIGHEST: '1110',
    AUTO: '0101',
  },
  SWING: {
    // TODO: Controllare se sono scritti correttamente o invertiti (lowest <-> highest & low <-> high)
    LOWEST: '1000',
    LOW: '0100',
    MEDIUM: '1100',
    HIGH: '0010',
    HIGHEST: '1010',
    AUTO: '1111',
  },
  MODE: {
    COOL: '1110',
    HEAT: '1001',
    DRY: '1010',
    AUTO: '1000',
  },
  STATE: {
    ON: '1',
    OFF: '0',
  },
  TEMPERATURE: {
    16: '0000',
    17: '1000',
    18: '0100',
    19: '1100',
    20: '0010',
    21: '1010',
    22: '0110',
    23: '1110',
    24: '0001',
    25: '1001',
    26: '0101',
    27: '1101',
    28: '0011',
    29: '1011',
    30: '0111',
  }
};

const RemotePositions: RemotePositionsAttr = {
  STATE: 40,
  MODE: 43,
  FAN_SPEED: 68,
  SWING: 64,
  TEMPERATURE: 49,
  CHECKSUM: 144,
}

export const Constants: ConstantsAttr = {
  FILE_ENCODING: 'utf8',
  FOLDER: {
    ORIGINAL_VALUES: 'values' + '/' + 'original',
    BINARY_VALUES: 'values' + '/' + 'binary',
  },
  SIGNAL_VALUES: SignalValues,
  REMOTE_VALUES: RemoteValues,
  REMOTE_POSITIONS: RemotePositions,
  OUT_PIN: 'GPIO17',
};
