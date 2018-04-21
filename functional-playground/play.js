import {arrayUtils,partial,composeN,pipe} from '../lib/es6-functional.js'

let map = arrayUtils.map;
let filter = arrayUtils.filter;

let apressBooks = [
    {
        "id": 111,
        "title": "C# 6.0",
        "author": "ANDREW TROELSEN",
        "rating": [4.7],
        "reviews": [{good : 4 , excellent : 12}]
    },
    {
        "id": 222,
        "title": "Efficient Learning Machines",
        "author": "Rahul Khanna",
        "rating": [4.5],
        "reviews": []
    },
    {
        "id": 333,
        "title": "Pro AngularJS",
        "author": "Adam Freeman",
        "rating": [4.0],
        "reviews": []
    },
    {
        "id": 444,
        "title": "Pro ASP.NET",
        "author": "Adam Freeman",
        "rating": [4.2],
        "reviews": [{good : 14 , excellent : 12}]
    }
];

console.log("Query result",map(filter(apressBooks, (book) => book.rating[0] > 4.5),(book) => {
    return {title: book.title,author:book.author}
}))

var compose = (a, b) =>
  (c) => a(b(c))

let number = compose(Math.round,parseFloat)
console.log("Number is ",number("3.56"))

let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;

//count words via compose
const countWords = compose(count,splitIntoSpaces);
console.log("Counting words for",countWords("hello your reading about composition"));

//util functions
let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) =>  book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

let projectTitleAndAuthor = (book) => { return {title: book.title,author:book.author} }
let projectAuthor = (book) => { return {author:book.author}  }
let projectTitle = (book) => { return {title: book.title} }

//compose new function. 
let queryGoodBooks = partial(filter,undefined,filterGoodBooks);
let mapTitleAndAuthor = partial(map,undefined,projectTitleAndAuthor)

let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor,queryGoodBooks)
// console.log("Good book title and author via compose",titleAndAuthorForGoodBooks(apressBooks))

//compose other new functions
let mapTitle = partial(map,undefined,projectTitle)
let titleForGoodBooks = compose(mapTitle,queryGoodBooks)

//console.log("Good book title",titleForGoodBooks(apressBooks))

//composeN many functions
let oddOrEven = (ip) => ip % 2 == 0 ? "even" : "odd"
var oddOrEvenWords = composeN(oddOrEven,count,splitIntoSpaces);
console.log("Even or odd via compose ?",oddOrEvenWords("hello your reading about composition"))

//using pipes as data flow
oddOrEvenWords = pipe(splitIntoSpaces,count,oddOrEven);
console.log("Even or odd via pipe ?",oddOrEvenWords("hello your reading about composition"))

let associativeCheckL = compose(compose(oddOrEven,count),splitIntoSpaces)
console.log("Associative check L",associativeCheckL("hello your reading about composition"))

let associativeCheckR = compose(oddOrEven,compose(count,splitIntoSpaces))
console.log("Associative check R",associativeCheckR("hello your reading about composition"))

//identity function!
const identity = (it) => { 
  console.log(it); 
  return it 
}

console.log("Debugging",compose(oddOrEven,count,identity,splitIntoSpaces)("Test string"))

