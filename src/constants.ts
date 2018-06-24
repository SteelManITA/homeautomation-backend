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
}

const SignalValues: SignalValuesAttr = {
  SHORT: 440,
  LONG: 1290,
  INTRO: 3470,
  INTRO2: 1720,
  SEPARATOR: 9950,
}

const RemoteValues: RemoteValuesAttr = {
  HEADER: '',
  FAN_SPEED: {
    LOWEST: '',
    LOW: '',
    MEDIUM: '',
    HIGH: '',
    HIGHEST: '',
    AUTO: '',
  },
  SWING: {
    LOWEST: '',
    LOW: '',
    MEDIUM: '',
    HIGH: '',
    HIGHEST: '',
    AUTO: '',
  },
  MODE: {
    COOL: '',
    HEAT: '',
    DRY: '',
    AUTO: '',
  },
  STATE: {
    ON: '',
    OFF: '',
  },
  TEMPERATURE: {
    18: '',
    19: '',
    20: '',
    21: '',
    22: '',
    23: '',
    24: '',
    25: '',
    26: '',
    27: '',
    28: '',
    29: '',
    30: '',
  }
};

const RemotePositions: RemotePositionsAttr = {
  STATE: 0,
  MODE: 0,
  FAN_SPEED: 0,
  SWING: 0,
  TEMPERATURE: 0,
  CHECKSUM: 0,
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
};
