import { Utils } from "./utils";

export type BinaryType = 0 | 1 | '0' | '1';
export type BinaryString = ByteString;

export class Binary
{
  private byteString: BinaryString;

  private validateByteString(byteString: BinaryString): void
  {
    if (!byteString.match(/^[0-1]*$/)) {
      throw 'Error: ByteString must be composed only by 0 and 1';
    }
  }

  constructor (byteString: BinaryString = undefined) {
    if (Utils.isDefined(byteString)) {
      this.validateByteString(byteString);
      this.byteString = byteString;
    }
  }

  length(): number
  {
    return this.byteString.length;
  }

  put(byte_value: BinaryType): this
  {
    this.byteString += byte_value;
    return this;
  }

  read(position: number = 0, length: number = undefined): BinaryString
  {
    if (Utils.isNotDefined(length) || length > this.byteString.length) {
      length = this.byteString.length;
    }
    return this.byteString.substr(position, length);
  }

  value(): BinaryString
  {
    return this.byteString;
  }

  write(string: BinaryString, offset: number = undefined): this
  {
    this.validateByteString(string);
    if (Utils.isNotDefined(offset)) {
      offset = this.byteString.length;
    }
    this.byteString = Utils.replaceAt(offset, string, this.byteString)
    return this;
  }

  static addLeadingZeros(binaryString: BinaryString, length: number = 8)
  {
    while (binaryString.length < length) {
      binaryString = '0' + binaryString;
    }
    return binaryString;
  }

  static add(a: BinaryString, b: BinaryString): BinaryString
  {
    let sum: BinaryString = '';
    let carry: BinaryString = '';

    if (a.length > b.length) {
      b = this.addLeadingZeros(b, a.length)
    } else if (b.length > a.length) {
      a = this.addLeadingZeros(a, b.length)
    }

    for(let i = a.length - 1; i >= 0; --i) {
      if(i == a.length - 1) {
        //half add the first pair
        const halfAdd1 = this.halfAdder(a[i], b[i]);
        sum = halfAdd1[0] + sum;
        carry = halfAdd1[1];
      } else {
        //full add the rest
        const fullAdd = this.fullAdder(a[i], b[i], carry);
        sum = fullAdd[0] + sum;
        carry = fullAdd[1];
      }
    }
    return carry ? carry + sum : sum;
  }

  checksum(): BinaryString
  {
    const bytes = Utils.chunk(this.byteString, 8);

    const checksum = bytes.reduce(
      (prev, curr) => {
        return Binary.add(prev, Utils.reverse(curr))
      },
      '00000000'
    );

    return Utils.reverse(checksum);
  }

  static xor(a, b): number
  {
    return (a === b ? 0 : 1);
  }

  static and(a, b): number
  {
    return a == 1 && b == 1 ? 1 : 0;
  }

  static or(a, b): number
  {
    return (a || b);
  }

  static fullAdder(a, b, carry): any
  {
    const halfAdd = this.halfAdder(a, b);
    const sum = this.xor(carry, halfAdd[0]);
    carry = this.and(carry, halfAdd[0]);
    carry = this.or(carry, halfAdd[1]);
    return [sum, carry];
  }

  static halfAdder(a, b): any
  {
    const sum = this.xor(a, b);
    const carry = this.and(a, b);
    return [sum, carry];
  }
}