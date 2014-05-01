
var util = require("util");
var hash = require("bcn-hash");
var stringify = require("bcn-stringify").stringify;

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
		if (c < 0) {
		    return -1;
		}

		if (c > 0) {
		    return 1;
		}
	    }
	    return 0;

	case OBJECT:
	    var id1 = hash.hashString(stringify(a));
	    var id2 = hash.hashString(stringify(b));
	    return compare(id1, id2);
    }
};

