const waitForOne = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(new Date().toLocaleTimeString());
      resolve(new Date().toLocaleTimeString());
    }, 3000)
  );

const waitForTwo = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(new Date().toLocaleTimeString());
      resolve(new Date().toLocaleTimeString());
    }, 1000)
  );

// const waitForOne = () =>
//   setTimeout(() => console.log(new Date().toLocaleTimeString()), 3000);
// const waitForTwo = () =>
//   setTimeout(() => console.log(new Date().toLocaleTimeString()), 3000);

const func = () => {
  //   waitForTwo();
  waitForOne();
  waitForTwo();
  //console.log(waitForOne());
  //console.log(waitForTwo());
};
console.log(new Date().toLocaleTimeString());
func();
