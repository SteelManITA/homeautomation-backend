const BASE_STRING = '';
const POSITION_POWER = 10;
const POSITION_FAN = 15;
const POSITION_MODE = 20;
const POSITION_SWING = 25;

String.prototype.replaceAt = function (index, replacement)
{
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
};

String.prototype.reverse = function ()
{
  let newString = "";
  for (var i = this.length - 1; i >= 0; --i) {
      newString += this[i];
  }
  return newString;
};

String.prototype.chunk = function (piece)
{
  return this.match(new RegExp('.{1,' + piece + '}', 'g'));
};

const validateData = function (data) {
  if (!data.hasOwnProperty('power')) {
    data.power = true;
  }
  if (!data.hasOwnProperty('temperature')) {
    data.temperature = 20;
  }
  if (!data.hasOwnProperty('fan')) {
    data.fan = 'auto';
  }
  if (!data.hasOwnProperty('mode')) {
    data.mode = 'auto';
  }
  if (!data.hasOwnProperty('swing')) {
    data.swing = 'auto';
  }
  // if (!data.hasOwnProperty('mildDry')) {
  //   data.mildDry = false;
  // }
};

const produceBinaryString = function (data) {
  // data = validateData(data);

  let binaryString = BASE_STRING;

  binaryString = binaryString.replaceAt(POSITION_POWER, data.power);
  binaryString = binaryString.replaceAt(POSITION_FAN, data.fan);
  binaryString = binaryString.replaceAt(POSITION_MODE, data.mode);
  binaryString = binaryString.replaceAt(POSITION_SWING data.swing);

  binaryString += checksum(binaryString);

  return binaryString;
};

const checksum = function (binaryString)
{
  const bytes = binaryString.chunk(8);

  let sum = '00000000';
  for (let byte of bytes) {
    sum = addBinary(sum, byte.reverse());
  }

  return sum.reverse();
};

const bitToRawCouple = function (bit)
{

};

const encode = function (binaryString)
{
  binaryString
    .chunk(1)
    .forEach(
      function(elem, index) {
        bitToRawCouple(elem);
      }
    );
};









// LIB

function addBinary(a, b){

  let sum = '';
  let carry = '';

  for(var i = a.length-1;i>=0; i--){
    if(i == a.length-1){
      //half add the first pair
      const halfAdd1 = halfAdder(a[i],b[i]);
      sum = halfAdd1[0]+sum;
      carry = halfAdd1[1];
    }else{
      //full add the rest
      const fullAdd = fullAdder(a[i],b[i],carry);
      sum = fullAdd[0]+sum;
      carry = fullAdd[1];
    }
  }

  return carry ? carry + sum : sum;
}

function xor(a, b){return (a === b ? 0 : 1);}
function and(a, b){return a == 1 && b == 1 ? 1 : 0;}
function or(a, b){return (a || b);}

function fullAdder(a, b, carry){
  halfAdd = halfAdder(a,b);
  const sum = xor(carry, halfAdd[0]);
  carry = and(carry, halfAdd[0]);
  carry = or(carry, halfAdd[1]);
  return [sum, carry];
}

function halfAdder(a, b){
  const sum = xor(a,b);
  const carry = and(a,b);
  return [sum, carry];
}
