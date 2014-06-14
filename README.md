# bcn-compare 

Provides comparator to fully sort any javascript data regardless of type

compare(a, b) -> -1 | 0 | 1

rules are:

undefined < null
null < number
number < string 
string < array
array < object 

* for arrays of unequal length, out of bounds values are treated as undefined

* objects are sorted by the following rules where:
	- keys whose value is undefined are treated as not existing
	- objects with fewer keys < objects with more keys
	- keys are checked in sorted order where first keys that are not identical
	  determine sort order 


### Installation

```
npm install bcn-compare
```

### Usage

```javascript
var compare = require("bcn-compare").compare;

var a = ["test", {}, ["an", "array"], 4, 3, 2, {"hello": 3}];

a.sort(compare);

```






