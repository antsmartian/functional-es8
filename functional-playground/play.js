import {Container,MayBe,arrayUtils,Some,Nothing} from '../lib/es6-functional.js'
var request = require('sync-request');

//using bare new keyword
console.log("Container using bare new keyword")
let testValue = new Container(3)
console.log("Value inside container",testValue)

let testObj = new Container({a:1})
console.log("Object inside container",testObj)

let testArray = new Container([1,2])
console.log("Array inside container",testArray)

//using `of` method
console.log("\n\nContainer using `of` util method")
testValue = Container.of(3)
console.log("Value inside container",testValue)

testObj = Container.of({a:1})
console.log("Object inside container",testObj)

testArray = Container.of([1,2])
console.log("Array inside container",testArray)

console.log("Nested conatiner",Container.of(Container.of(3)))

let double = (x) => x + x;
console.log("Double container",Container.of(3).map(double));


console.log("May Be Example",MayBe.of("string").map((x) => x.toUpperCase()))
console.log("May Be null example",MayBe.of(null).map((x) => x.toUpperCase()))
console.log("MayBe chaining",MayBe.of("George")
     .map((x) => x.toUpperCase())
     .map((x) => "Mr. " + x))

console.log("MayBe chaining null",
    MayBe.of("George")
     .map(() => undefined)
     .map((x) => "Mr. " + x))

let getTopTenSubRedditPosts = (type) => {

    let response  
    try{
       response = JSON.parse(request('GET',"https://www.reddit.com/r/subreddits/" + type + ".json?limit=10").getBody('utf8'))
    }catch(err) {
        response = { message: "Something went wrong" , errorCode: err['statusCode'] }
    }
    return response
}

let getTopTenSubRedditData = (type) => {
    let response = getTopTenSubRedditPosts(type);
    return MayBe.of(response).map((arr) => arr['data'])
                             .map((arr) => arr['children'])
                             .map((arr) => arrayUtils.map(arr,
                                (x) => { 
                                    return {
                                        title : x['data'].title,
                                        url   : x['data'].url
                                    } 
                                }
                            ))
}

console.log("Proper reddit type",getTopTenSubRedditData('new'))
console.log("Wrong reddit type",getTopTenSubRedditData('neww'))

console.log("\nEither example\n")
console.log("Something example", Some.of("test").map((x) => x.toUpperCase()))
console.log("Nothing example", Nothing.of("test").map((x) => x.toUpperCase()))

let getTopTenSubRedditPostsEither = (type) => {

    let response  
    try{
       response = Some.of(JSON.parse(request('GET',"https://www.reddit.com/r/subreddits/" + type + ".json?limit=10").getBody('utf8')))
    }catch(err) {
        response = Nothing.of({ message: "Something went wrong" , errorCode: err['statusCode'] })
    }
    return response
}

let getTopTenSubRedditDataEither = (type) => {
    let response = getTopTenSubRedditPostsEither(type);
    return response.map((arr) => arr['data'])
                             .map((arr) => arr['children'])
                             .map((arr) => arrayUtils.map(arr,
                                (x) => { 
                                    return {
                                        title : x['data'].title,
                                        url   : x['data'].url
                                    } 
                                }
                            ))
}

console.log("Correct reddit type ",getTopTenSubRedditDataEither('new'))
console.log("Wrong reddit type ",getTopTenSubRedditDataEither('new2'))
