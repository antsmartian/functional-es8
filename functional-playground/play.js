import {
  forEach,
  forEachObject,
  unless,
  times,
  sortBy,
  every,
  some,
  tap,
  unary,
  once,
  memoized,
  objectAssign
} from '../lib/es6-functional.js'


let object = {
  a: 1,
  b: 2
}
//Print the object key and value
forEachObject(object, (k, v) => console.log(k + ":" + v))

//finding even number of the given array
forEach([1, 2, 3, 4, 5, 6, 7], (number) => {
  unless((number % 2), () => {
    console.log(number, " is even")
  })
})

//finding the first 100 even numbers
times(100, function (n) {
  unless(n % 2, function () {
    console.log(n, "is even");
  });
});

console.log(every([NaN, NaN, NaN], isNaN))
console.log(every([NaN, NaN, 1], isNaN))

console.log(some([NaN, NaN, 4], isNaN))
console.log(some([3, 4, 4], isNaN))

var people = [{
    firstname: "aaFirstName",
    lastname: "cclastName"
  },
  {
    firstname: "ccFirstName",
    lastname: "aalastName"
  },
  {
    firstname: "bbFirstName",
    lastname: "bblastName"
  }
];

//sorting with respect to firstname
console.log("FirstName sort manually", people.sort((a, b) => {
  return (a.firstname < b.firstname) ? -1 : (a.firstname > b.firstname) ? 1 : 0
}))

//sorting with respect to lastname
console.log("LastName sort manually", people.sort((a, b) => {
  return (a.lastname < b.lastname) ? -1 : (a.lastname > b.lastname) ? 1 : 0
}))

//sorting with respect to firstname using sortBy
console.log("Firstname using sortBy hoc", people.sort(sortBy("firstname")))

//sorting with respect to firstname using sortBy
console.log("lastName using sortBy hoc", people.sort(sortBy("lastname")))


forEach([1, 2, 3], (a) =>
  tap(a)(() => {
    console.log(a)
  })
)


//parseInt doesnt work in node
//http://stackoverflow.com/questions/16880327/why-am-i-getting-weird-result-using-parseint-in-node-js-different-result-from
//['1', '2', '3'].map(unary(parseInt))

var doPayment = once(() => {
  console.log("Payment is done")
})

//this should work
doPayment()

//oops bad, we are doing second time!
doPayment()

//slow factorial
var factorial = (n) => {
  if (n === 0) {
    return 1;
  }

  // This is it! Recursion!!
  return n * factorial(n - 1);
}

console.log("Factorial of 2 is", factorial(2))
console.log("Factorial of 3 is", factorial(3))

//memoized factorial
let fastFactorial = memoized((n) => {
  if (n === 0) {
    return 1;
  }

  // This is it! Recursion!!
  return n * fastFactorial(n - 1);
})

console.log("Fast Factorial of 2 is", fastFactorial(2))
console.log("Fast Factorial of 3 is", fastFactorial(3))
console.log("Fast Factorial of 7 is", fastFactorial(7))


/************************************************************************* */
// Custom implementation of Object.assign

var a = {  name: "srikanth" };
var b = {  age: 30 };
var c = {  sex: 'M' };

var customObjectAssign = objectAssign(a, b, c);

// ES6 Object.Assign
var nativeObjectAssign = Object.assign({}, a, b, c);

console.log(customObjectAssign);
console.log(nativeObjectAssign);
console.log(a);
console.log(b);
console.log(c);

var book = {
  "id": 111,
  "title": "C# 6.0",
  "author": "ANDREW TROELSEN",
  "rating": [4.7],
  "reviews": [{good : 4 , excellent : 12}]    
};

console.log(Object.entries(book)[1]);