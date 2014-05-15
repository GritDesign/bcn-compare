
var util = require("util");

var UNDEFINED = 0,
    NULL = 1,
    NUMBER = 2,
    STRING = 3,
    ARRAY = 4,
    OBJECT = 5;

function type(o) {
    switch (typeof(o)) {
	case "undefined":
	    return UNDEFINED;
	case "number":
	    return NUMBER;
	case "string":
	    return STRING;
	case "object":
	    if (o === null) {
		return NULL;
	    }
	    if (util.isArray(o)) {
		return ARRAY;
	    }

	    return OBJECT;
    }
}

exports.compare = function compare(a, b) {
    var typea = type(a);
    var typeb = type(b); 

    if (typea < typeb) {
	return -1;
    } 
    if (typea > typeb) {
	return 1;
    }

    switch (typea) {
	case UNDEFINED:
	    return 0;	

	case NULL:
	    return 0;	

	case STRING:
	    if (a < b) {
		return -1;
	    } else if (a > b) {
		return 1;
	    } else {
		return 0;
	    }
	case NUMBER:
	    if (a < b) {
		return -1;
	    } else if (a > b) {
		return 1;
	    } else {
		return 0;
	    }
	case ARRAY:
	    var maxSize = Math.max(a.length, b.length);
	    for (var i=0; i<maxSize; i++) {
		var c = compare(a[i], b[i]);
		if (c) {
		    return c;
		}
	    }
	    return 0;

	case OBJECT:
	    var keysA = keysForObject(a);
	    var keysB = keysForObject(b);

	    if (keysA.length < keysB.length) {
		return -1;
	    }

	    if (keysA.length > keysB.length) {
		return 1;
	    }

	    for (var i=0; i<keysA.length; i++) {
		var c = compare(keysA[i], keysB[i]);
		if (c) {
		    return c;
		}

		c = compare(a[keysA[i]], b[keysB[i]]);
		if (c) {
		    return c;
		}
	    }

	    return 0;
    }
};

function keysForObject(o) {
    var result = [];

    for (var key in o) {
	if (Object.prototype.hasOwnProperty.call(o, key)) {
	    if (typeof o[key] !== "undefined") {
		result.push(key);
	    }
	}
    }

    result.sort();    
    return result;
}


