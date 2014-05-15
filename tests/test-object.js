var compare = require("..").compare;


var a = {a:"this isa test", b: "this is b test"};
var b = {b:"this is b test", a: "this isb test"};

console.log(compare(a, b));

