export interface AppCostants
{
  FILE_ENCODING: string;
  FOLDER: {
    ORIGINAL_VALUES: string;
    BINARY_VALUES: string;
  };
  VALUES: {
    SHORT: number;
    LONG: number;
    INTRO: number;
    INTRO2: number;
    SEPARATOR: number;
  }
}

export const Constants: AppCostants = {
  FILE_ENCODING: 'utf8',
  FOLDER: {
    ORIGINAL_VALUES: 'values' + '/' + 'original',
    BINARY_VALUES: 'values' + '/' + 'binary',
  },
  VALUES: {
    SHORT: 440,
    LONG: 1290,
    INTRO: 3470,
    INTRO2: 1720,
    SEPARATOR: 9950,
  },
};
