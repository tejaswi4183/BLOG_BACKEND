//importing user defined module
const xyz = require('./people');
console.log(xyz);
console.log(xyz.people,xyz.age);
//or
const {people,age}=require('./people');
console.log(people,age);
//importing os
const os=require('os');
console.log(os.platform(),os.homedir());
