var assert = require("assert");
var compare = require("..").compare;

var tests = [
    { 
	a: undefined, 
	b: undefined,
	result: 0
    },
    { 
	a: null, 
	b: undefined,
	result: 1
    },
    { 
	a: undefined, 
	b: null,
	result: -1
    },
    { 
	a: undefined, 
	b: "test",
	result: -1
    },
    { 
	a: undefined, 
	b: ["hello"],
	result: -1
    },
    { 
	a: ["hello"], 
	b: {},
	result: -1
    },
    { 
	a: [1, "hello"], 
	b: [1, "there"],
	result: -1
    },
    { 
	a: {"a":"this is a test", b: "this is b test"}, 
	b: {"b":"this is b test", a: "this is a test"},
	result: 0
    },
    { 
	a: {"a":"this isa test", b: "this is b test"}, 
	b: {"b":"this is b test", a: "this isb test"},
	result: -1
    },
    { 
	a: {"a":undefined, b: "this is b test"}, 
	b: {"b":"this is b test"},
	result: 0
    },
    { 
	a: {"a":"this isa test", b: "this is b test", c: null}, 
	a: {"a":"this isa test", b: "this is b test"}, 
	result: 1 
    }
];

for (var i=0; i<tests.length; i++) {
    assert(compare(tests[i].a, tests[i].b) === tests[i].result,
	"TEST " + i + " failed! " + JSON.stringify(tests[i]));
} 

console.log("all good!");


