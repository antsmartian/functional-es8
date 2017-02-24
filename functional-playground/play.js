import {forEach,forEachObject,unless,times,sortBy,every,some} from '../lib/es6-functional.js'

let object = {a:1,b:2}
//Print the object key and value
forEachObject(object, (k,v) => console.log(k + ":" + v))

//finding even number of the given array
forEach([1,2,3,4,5,6,7],(number) => {
	unless((number % 2), () => {
		console.log(number, " is even")
	})
})

//finding the first 100 even numbers
times(100, function(n) {
  unless(n % 2, function() {
    console.log(n, "is even");
  });
});

console.log(every([NaN, NaN, NaN], isNaN))
console.log(every([NaN, NaN, 1], isNaN))

console.log(some([NaN,NaN, 4], isNaN))
console.log(some([3,4, 4], isNaN))

var people = [
    {firstname: "aaFirstName", lastname: "cclastName"},
    {firstname: "ccFirstName", lastname: "aalastName"},
    {firstname:"bbFirstName", lastname:"bblastName"}
];

//sorting with respect to firstname
console.log("FirstName sort manually",people.sort((a,b) => { return (a.firstname < b.firstname) ? -1 : (a.firstname > b.firstname) ? 1 : 0 }))

//sorting with respect to lastname
console.log("LastName sort manually",people.sort((a,b) => { return (a.lastname < b.lastname) ? -1 : (a.lastname > b.lastname) ? 1 : 0 }))

//sorting with respect to firstname using sortBy
console.log("Firstname using sortBy hoc",people.sort(sortBy("firstname")))

//sorting with respect to firstname using sortBy
console.log("lastName using sortBy hoc",people.sort(sortBy("lastname")))


