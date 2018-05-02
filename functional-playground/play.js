import { forEach, Sum, fetchTextByPromise } from '../lib/es6-functional.js'

var array = [1,2,3]

//print the console
console.log(Sum(array))

let sayHello = async () => {
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Response from SayHello: Hello, ${externalFetchedText}`); // Hello, es8
}

sayHello()
