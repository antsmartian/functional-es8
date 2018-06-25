import { forEach, Sum, fetchTextByPromise, httpLibrary } from '../lib/es6-functional.js'
const fetch = require('node-fetch');

var array = [1, 2, 3]

//print the console
console.log(Sum(array))

let sayHello = async () => {
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Response from SayHello: Hello, ${externalFetchedText}`); // Hello, es8
}

sayHello()

httpLibrary.getAsyncCaller("https://jsonplaceholder.typicode.com/users", (usernames) => console.log("Usernames: " + usernames));



