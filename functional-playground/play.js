import {Container,MayBe,arrayUtils,Some,Nothing} from '../lib/es6-functional.js'

var request = require('sync-request');


let searchReddit = (search) => {
    let response  
    try{
       response = JSON.parse(request('GET',"https://www.reddit.com/search.json?q=" + encodeURI(search) + "&limit=2").getBody('utf8'))
    }catch(err) {
        response = { message: "Something went wrong" , errorCode: err['statusCode'] }
    }
    return response
}

let getComments = (link) => {
    let response
    try {
        console.log("https://www.reddit.com/" + link)
        response = JSON.parse(request('GET',"https://www.reddit.com/" + link).getBody('utf8'))
    } catch(err) {
        console.log(err)
        response = { message: "Something went wrong" , errorCode: err['statusCode'] }
    }

    return response 
}

let mergeTitleAndComments = (searchMayBe,commentsMayBe) => {
    searchMayBe.map((value) => {
        commentsMayBe.map((commentsValue) => {
            console.log(value)
            console.log(commentsValue)
        })
    })
}

let mergeViaMayBe = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe
               .map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    } 
                ))
               .map((obj) => arrayUtils.map(obj, (x) => {
                    return {
                        title: x.title,
                       comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json")))
                    }
               }))

   return ans;
}


let mergeViaJoin = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe.map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    } 
                ))
               .map((obj) => arrayUtils.map(obj, (x) => {
                    return {
                        title: x.title,
                       comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json"))).join()
                    }
               }))
               .join()

   return ans;
}

let answer;
answer = mergeViaMayBe("functional programming")

console.log(answer)

// Via MayBe functor 
/*
    See how deep we map to get the answers
*/
answer.map((result) => {
    arrayUtils.map(result,(mergeResults) => {
        mergeResults.comments.map(comment => {
            console.log(comment)
        })
    }) 
})

//simple examples of join
let joinExample = MayBe.of(MayBe.of(5))
console.log("Without Join Example",joinExample.map((outsideMayBe) => {
    return outsideMayBe.map((x) => x + 4)
}))
console.log("Join Example",joinExample.join().map((v) => v + 4))

//trying our old problem with join
answer = mergeViaJoin("functional programming")

console.log(answer)

arrayUtils.map(answer,a => {
    console.log(a.comments)
})


let mergeViaChain = (searchText) => {
    let redditMayBe = MayBe.of(searchReddit(searchText))
    let ans = redditMayBe.map((arr) => arr['data'])
               .map((arr) => arr['children'])
               .map((arr) => arrayUtils.map(arr,(x) => {
                        return {
                            title : x['data'].title,
                            permalink : x['data'].permalink
                        }
                    } 
                ))
               .chain((obj) => arrayUtils.map(obj, (x) => {
                    return {
                       title: x.title,
                       comments: MayBe.of(getComments(x.permalink.replace("?ref=search_posts",".json"))).chain(x => {
                            return x.length
                       })
                    }
               }))

   return ans;
}

//trying our old problem with chain
answer = mergeViaChain("functional programming")

console.log(answer)
