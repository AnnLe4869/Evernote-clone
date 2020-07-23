// const waitForOne = () =>
//   new Promise((resolve) =>
//     setTimeout(() => {
//       console.log(new Date().toLocaleTimeString());
//       resolve(new Date().toLocaleTimeString());
//     }, 3000)
//   );

// const waitForTwo = () =>
//   new Promise((resolve) =>
//     setTimeout(() => {
//       console.log(new Date().toLocaleTimeString());
//       resolve(new Date().toLocaleTimeString());
//     }, 1000)
//   );

// // const waitForOne = () =>
// //   setTimeout(() => console.log(new Date().toLocaleTimeString()), 3000);
// // const waitForTwo = () =>
// //   setTimeout(() => console.log(new Date().toLocaleTimeString()), 3000);

// const func = () => {
//   //   waitForTwo();
//   waitForOne();
//   waitForTwo();
//   //console.log(waitForOne());
//   //console.log(waitForTwo());
// };
// console.log(new Date().toLocaleTimeString());
// func();

const convertStringToASCII = (word) => {
  const arrayOfChar = word.toUpperCase().split("");
  return arrayOfChar.map((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode === 32) return 27; // For Space
    if (charCode === 46) return 28; // For .
    if (charCode === 33) return 29; // For !
    if (charCode === 63) return 30; // For ?
    if (charCode === 44) return 31; // For ,
    return charCode - 64;
  });
};

const encryptWithRSA = (arrayOfNumber) => {
  return arrayOfNumber.map((num) => (num * num * num) % 55);
};

const encryptText = (text) => {
  const arrayOfConvertingNumber = convertStringToASCII(text);
  return encryptWithRSA(arrayOfConvertingNumber);
};

//console.log(encryptText("I find your lack of faith disturbing.").join(" "));

const decryptText = (text) => {
  const arrayOfEncryptedNumber = text.split(" ").map((char) => parseInt(char));
  // eslint-disable-next-line array-callback-return
  const arrayOfDecryptedNumber = arrayOfEncryptedNumber.map((number) => {
    const upperLimit = Math.pow(40, 3);
    for (let i = 0; i < Math.floor(upperLimit / 55); i++) {
      const value = parseFloat(Math.pow(number + i * 55, 1 / 3).toPrecision(5));
      const isInteger = Number.isInteger(value);
      if (isInteger) return value;
    }
  });
  return arrayOfDecryptedNumber.map((number) => {
    if (number === 27) return String.fromCharCode(32);
    if (number === 28) return String.fromCharCode(46);
    if (number === 29) return String.fromCharCode(33);
    if (number === 30) return String.fromCharCode(63);
    if (number === 31) return String.fromCharCode(44);
    return String.fromCharCode(number + 64);
  });
};
console.log(
  decryptText(
    "14 48 17 1 33 15 48 49 15 33 15 2 48 15 49 27 2 5 26 25 15 9 48 8 15 51 20 2 15 7"
  ).join("")
);
