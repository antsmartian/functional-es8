import forEach from '../lib/es6-functional.js'

var array = [1,2,3]
//print the console
forEach(array,(data) => console.log(data))
//double the contents
forEach(array,(data) => console.log(2 * data))