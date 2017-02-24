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

const map = (array,fn) => {
  let results = []
  for(const value of array)
      results.push(fn(value))

  return results;  
}

const filter = (array,fn) => {
  let results = []
  for(const value of array)
     (fn(value)) ? results.push(value) : undefined

  return results;  
}

const concatAll = (array,fn) => {
  let results = []
  for(const value of array)
     results.push.apply(results, value);

  return results;  
}

const reduce = (array,fn,initialValue) => {
  let accumlator;

  if(initialValue != undefined)
    accumlator = initialValue;
  else
    accumlator = array[0];

  for(const value of array)
    accumlator = fn(accumlator,value)

  return [accumlator] 
}

const zip = (leftArr,rightArr,fn) => {
  let index, results = [];

  for(index = 0;index < Math.min(leftArr.length, rightArr.length);index++)
    results.push(fn(leftArr[index],rightArr[index]));
  
  return results; 
}

const curry = (binaryFn) => {
  return function (firstArg) {
    return function (secondArg) {
      return binaryFn(firstArg, secondArg);
    };
  };
};

const curryN =(fn) => {
    if(typeof fn!=='function'){
        throw Error('No function provided');
    }

    return function curriedFn(...args){
      
      //make it bold
      if(args.length < fn.length){
        return function(){
          return curriedFn.apply(null, args.concat( [].slice.call(arguments) ));
        };
      }
      //make it bold

      return fn.apply(null, args);
    };
};

const partial = function (fn,...partialArgs){
  let args = partialArgs.slice(0);
  return function(...fullArguments) {
    let arg = 0;
    for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = fullArguments[arg++];
        }
      }
      return fn.apply(this, args);
  };
};

const arrayUtils = {
  map : map,
  filter : filter,
  concatAll : concatAll,
  flatten : concatAll,
  reduce : reduce,
  zip : zip
}

const composeN = (...fns) =>
  (value) =>
    reduce(fns.reverse(),(acc, fn) => fn(acc), value);

const pipe = (...fns) =>
  (value) =>
    reduce(fns,(acc, fn) => fn(acc), value);

const Container = function(val) {
  this.value = val;
}

Container.of = function(value) {
  return new Container(value);
} 

Container.prototype.map = function(fn){ 
  return Container.of(fn(this.value));
}

const MayBe = function(val) {
  this.value = val;
}

MayBe.of = function(val) {
  return new MayBe(val);
}

MayBe.prototype.isNothing = function() {
  return (this.value === null || this.value === undefined);
};

MayBe.prototype.map = function(fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
};

const Nothing = function(val) {
  this.value = val;
};

Nothing.of = function(val) {
  return new Nothing(val);
};

Nothing.prototype.map = function(f) {
  return this;
};

const Some = function(val) {
  this.value = val;
};

Some.of = function(val) {
  return new Some(val);
};

Some.prototype.map = function(fn) {
  return Some.of(fn(this.value));
}

const Either = {
  Some : Some,
  Nothing: Nothing
}

export {forEach, forEachObject, unless,times,sortBy,every,some,
  tap,unary,once,memoized,arrayUtils,curry,curryN,partial,composeN,pipe,
  Container, MayBe, Some, Nothing, Either
}
