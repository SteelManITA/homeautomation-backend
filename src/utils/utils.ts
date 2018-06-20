export class Utils
{
  static isDefined(value: any): boolean
  {
    return value !== undefined && value !== null;
  }

  static isNotDefined(value: any): boolean
  {
    return value === undefined || value === null;
  }

  static replaceAt(index: number, replace: string, string: string): string
  {
    return string.substr(0, index) + replace + string.substr(index + replace.length);
  }

  static reverse(string: string): string
  {
    let newString = "";
    for (var i = this.length - 1; i >= 0; --i) {
        newString += string[i];
    }
    return newString;
  }

  static chunk(string: string, pieces: number): string
  {
    return string
      .match(new RegExp('.{1,' + pieces + '}', 'g'))
      .toString();
  }

  static compare(n1: number, n2: number, margin: number): boolean
  {
    if (Math.abs(n1 - n2) < margin) {
      return true;
    } else {
      return false;
    }
  };
}