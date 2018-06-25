const forEach = (array,fn) => {
   let i;
   for(i=0;i<array.length;i++)
      fn(array[i])
}

const forEachObject = (obj,fn) => {
    for (var property in obj) {
	    if (obj.hasOwnProperty(property)) {
	    	//calls the fn with key and value as its argument
	        fn(property, obj[property]) 
	    }
    }
}

const unless = (predicate,fn) => {
	if(!predicate)
		fn()
}

const times = (times, fn) => {
  for (var i = 0; i < times; i++) fn(i);
}

/*
ES5 implementation
const every = (arr,fn) => {
    let result = true;
    for(let i=0;i<arr.length;i++)
       result = result && fn(arr[i])
    return result
}
*/

const every = (arr,fn) => {
    let result = true;
    for(const value of arr)
       result = result && fn(value)
    return result
}

const some = (arr,fn) => {
    let result = false;
    for(const value of arr)
       result = result || fn(value)
    return result
}

const sortBy = (property) => {
    return (a,b) => {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    }
}

const tap = (value) =>
  (fn) => (
    typeof(fn) === 'function' && fn(value),
    console.log(value)
  )

const unary = (fn) =>
  fn.length === 1
    ? fn
    : (arg) => fn(arg) 

const once = (fn) => {
  let done = false;

  return function () {
    return done ? undefined : ((done = true), fn.apply(this, arguments))
  }
}

const memoized = (fn) => {
  const lookupTable = {};
    
  return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
}

function objectAssign(target, source) {
    var to = {};
    for (var i = 0; i < arguments.length; i += 1) {
      var from = arguments[i];
      var keys = Object.keys(from);
      for (var j = 0; j < keys.length; j += 1) {
        to[keys[j]] = from[keys[j]];
      }
    }
    return to;
  }

export {forEach, forEachObject, unless,times,sortBy,every,some,tap,unary,once,memoized, objectAssign}
