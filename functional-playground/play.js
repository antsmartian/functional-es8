import { Container, MayBe, arrayUtils, Some, Nothing } from '../lib/es6-functional.js'
const fetch = require('node-fetch');
let https = require('https');

function* gen() {
    return 'first generator';
}

let generatorResult = gen()

console.log("For first time",generatorResult.next().value)
console.log("For second time time",generatorResult.next().value)

let generatorResult2 = gen()
generatorResult = gen() //re-create again

console.log("First generator",generatorResult.next().value)
console.log("Second generator",generatorResult2.next().value)

function* generatorSequence() {
    yield 'first';
    yield 'second';
    yield 'third';
}

let generatorSequenceResult = generatorSequence();

console.log("\n\n\n")
console.log('First time sequence value',generatorSequenceResult.next().value)
console.log('Second time sequence value',generatorSequenceResult.next().value)
console.log('thrid time sequence value',generatorSequenceResult.next().value)


generatorSequenceResult = generatorSequence();

console.log("\n\n")
console.log('done value for the first time',generatorSequenceResult.next())
console.log('done value for the second time',generatorSequenceResult.next())
console.log('done value for the third time',generatorSequenceResult.next())
console.log('done value for the fourth time',generatorSequenceResult.next())

console.log("\n\n")
for(let value of generatorSequence())
    console.log("for of value of generatorSequence is",value)


//passing data to generators
function* sayFullName() {
    var firstName = yield 
    var secondName = yield
    console.log(firstName + secondName);
}

let fullName = sayFullName()
fullName.next()
fullName.next('anto')
fullName.next('aravinth')

let getDataOne = (cb) => {
    setTimeout(function(){
        //calling the callback
        cb('dummy data one')
    }, 1000);
}

let getDataTwo = (cb) => {
    setTimeout(function(){
        //calling the callback
        cb('dummy data two')
    }, 1000);
}

getDataOne((data) => console.log("data received",data))
getDataTwo((data) => console.log("data received",data))

//using generator
let generator;
getDataOne = () => {
    setTimeout(function(){
        //call the generator and
        //pass data via `next`
        generator.next('dummy data one')
    }, 1000);
}

getDataTwo = () => {
    setTimeout(function(){
        //call the generator and
        //pass data via `next`
        generator.next('dummy data two')
    }, 1000);
}

function* main() {
    let dataOne = yield getDataOne();
    let dataTwo = yield getDataTwo();
    console.log("data one",dataOne)
    console.log("data two",dataTwo)
}

generator = main()
generator.next()


function httpGetAsync(url,callback) {
    return https.get(url, 
        function(response) {
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                let parsed = JSON.parse(body)
                callback(parsed)
            })
        }
    );

}

httpGetAsync('https://www.reddit.com/r/pics/.json',(picJson)=> {
    httpGetAsync(picJson.data.children[0].data.url+".json",(firstPicRedditData) => {
        console.log(firstPicRedditData)
    })
})


function request(url) {
    httpGetAsync( url, function(response){
        generator.next( response );
    } );
}

function *main() {
    let picturesJson = yield request( "https://www.reddit.com/r/pics/.json" );
    let firstPictureData = yield request(picturesJson.data.children[0].data.url+".json")
}

generator = main()
generator.next()

/**************************************************************************************************************************************************** */
//Promise Examples
let grade = "A+";
let examResults = new Promise(
    function (resolve, reject) {
        if (grade == "A+")
            resolve("You will get an XBOX");
        else
            reject("Better luck next time");
    }
);

let conductExams = () => {
    examResults
        .then(x => console.log(x)) // captures resolve and logs "You will get an XBOX"
        .catch(x => console.error(x)); // captures rejection and logs "Better luck next time"
};

conductExams();

// /**************************************************************************************************************************************************** */
// Simple Async / Await example using Promise
function fetchTextByPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("es8");
        }, 2000);
    });
}

let sayHello = async () => {
    const externalFetchedText = await fetchTextByPromise();
    console.log(`Response from SayHello: Hello, ${externalFetchedText}`); // Hello, es8
}

console.log("Before Calling SayHello");
sayHello(); // this returns after 2 seconds
console.log("After Calling SayHello"); // this will be printed before SayHello, because SayHello is a non blocking call

/**************************************************************************************************************************************************** */
// Simple Async / Await example using Remote API Call

// returns a promise
const getAsync = (url) => {
    return fetch(url)
        .then(x => x)
        .catch(x =>
            console.log("Error in getAsync:" + x)
        );
}

// 'async' con only be used in functions where 'await' is used
async function getAsyncCaller() {
    try {
        // https://jsonplaceholder.typicode.com/users is a sample API which returns a JSON Array of dummy users
        const response = await getAsync("https://jsonplaceholder.typicode.com/users"); // pause until promise completes
        const result = await response.json(); //removing .json here demonstrates the error handling in promises
        console.log("GetAsync fetched " + result.length + " results");
        return result;
    } catch (error) {
        await Promise.reject("Error in getAsyncCaller:" + error.message);
    }
}

getAsyncCaller()
    .then(async (x) => {
        console.log("Call to GetAsync function completed");
        const website = await getAsync("http://" + x[0].website);
        console.log("The website (http://" + x[0].website + ") content length is " + website.toString().length + " bytes");
    })
    .catch(x => console.log("Error: " + x)); // Promise.Reject is caught here, the error message can be used to perform custom error handling

console.log("This message is displayed while waiting for async operation to complete, you can do any compute here...");

/**************************************************************************************************************************************************** */