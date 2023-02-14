//console.log(global);
setTimeout( () =>{
    console.log('in the timeout');
    clearInterval(int);
},3000);

const int = setInterval(() =>
{
  console.log('in the interval');
},1000);


// actually we are written call backs first but dirnames are run firstly, because call backs takes some time to execute theri functions on that time 
// java script run the remaining part of code.
console.log(__dirname);
console.log(__filename);