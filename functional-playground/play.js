import {curry,curryN,partial} from '../lib/es6-functional.js'

const add = (x,y) => x + y;
let autoCurriedAdd = curry(add)
console.log("Curried summation",autoCurriedAdd(2)(2))

const genericTable = (x,y) => x * y

const tableOf2 = curry(genericTable)(2)
const tableOf3 = curry(genericTable)(3)
const tableOf4 = curry(genericTable)(4)

console.log("Table via currying")
console.log("2 * 2 =",tableOf2(2))
console.log("2 * 3 =",tableOf2(3))
console.log("2 * 4 =",tableOf2(4))

console.log("3 * 2 =",tableOf3(2))
console.log("3 * 3 =",tableOf3(3))
console.log("3 * 4 =",tableOf3(4))

console.log("4 * 2 =",tableOf4(2))
console.log("4 * 3 =",tableOf4(3))
console.log("4 * 4 =",tableOf4(4))

//There is no console.log in node world :) 
//So you can run the code by copying paste in browser!
/*
const loggerHelper = (mode,initialMessage,errorMessage,lineNo) => {
  if(mode === "DEBUG")
    console.debug(initialMessage,errorMessage + "at line: " + lineNo)
  else if(mode === "ERROR")
    console.error(initialMessage,errorMessage + "at line: " + lineNo)
  else if(mode === "WARN")
    console.warn(initialMessage,errorMessage + "at line: " + lineNo)
  else 
    throw "Wrong mode"
}

let errorLogger = curryN(loggerHelper)("ERROR")("Error At Stats.js");
let debugLogger = curryN(loggerHelper)("DEBUG")("Debug At Stats.js");
let warnLogger = curryN(loggerHelper)("WARN")("Warn At Stats.js");


//for error
errorLogger("Error message",21)

//for debug
debugLogger("Debug message",233)

//for warn
warnLogger("Warn message",34)
*/

let match = curryN(function(expr, str) {
  return str.match(expr);
});

let hasNumber = match(/[0-9]+/)

let filter = curryN(function(f, ary) {
  return ary.filter(f);
});

let findNumbersInArray = filter(hasNumber)
console.log("Finding numbers via curry",findNumbersInArray(["js","number1"]))

let map = curry(function(f, ary) {
  return ary.map(f);
});

let squareAll = map((x) => x * x)

console.log("Squaring the array with currying",squareAll([1,2,3]))

setTimeout(() => console.log("Print after 10 ms."),10);

const setTimeoutWrapper = (time,fn) => {
  setTimeout(fn,time);
}
//using curring
const delayTenMs = curryN(setTimeoutWrapper)(10)
delayTenMs(() => console.log("Do X task"))
delayTenMs(() => console.log("Do Y task"))

//using partial application
let delayTenMsPartial = partial(setTimeout,undefined,10);
delayTenMsPartial(() => console.log("Do X. . .  task"))
delayTenMsPartial(() => console.log("Do Y . . . . task"))

let prettyPrintJson = partial(JSON.stringify,undefined,null,2)
console.log("JSON pretty print via partial",prettyPrintJson({foo: "bar", bar: "foo"}))