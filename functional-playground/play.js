import {arrayUtils} from '../lib/es6-functional.js'

const map = arrayUtils.map;
const filter = arrayUtils.filter;
const concatAll = arrayUtils.concatAll;
const reduce = arrayUtils.reduce;
const zip = arrayUtils.zip;

let squaredArray = map([1,2,3], (x) => x * x)
console.log(squaredArray)

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

//get only title and author fields
let resultOfTitleName = map(apressBooks,(book) => {
  return {title: book.title,author:book.author}
})

console.log(resultOfTitleName)

//get only book with above rating 4.5s
let filteredArray = filter(apressBooks, (book) => book.rating[0] > 4.5)

console.log(filteredArray)

//get title and author whose rating is above 4.5
let goodRatingBooks =
 filter(apressBooks, (book) => book.rating[0] > 4.5)

console.log("Good Rated books",map(goodRatingBooks,(book) => {
  return {title: book.title,author:book.author}
}))

//modified data structure.
let apressBooks2 = [
  {
    name : "beginners",
    bookDetails : [
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
      }
    ]
  },
  {
      name : "pro",
      bookDetails : [
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
    ]
  }
];

console.log('Mapped new data structure',
map(apressBooks2,(book) => {
  return book.bookDetails
}))

console.log('Flattend Array',
concatAll(
  map(apressBooks2,(book) => {
    return book.bookDetails
  })
))

//result of our problem
let goodRatingCriteria = (book) => book.rating[0] > 4.5;
console.log("Result using map,filter,concatAll",
filter(
  concatAll(
    map(apressBooks2,(book) => {
      return book.bookDetails
    })
  )
,goodRatingCriteria))

console.log("Sum of the array",
reduce([1,2,3,4,5],(acc,val) => acc + val,0))

console.log("Product of the array",
reduce([1,2,3,4,5],(acc,val) => acc * val,1))

let bookDetails = concatAll(
  map(apressBooks2,(book) => {
    return book.bookDetails
  })
)

let resultOfCountReviews = reduce(bookDetails,(acc,bookDetail) => {
  let goodReviews = bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].good : 0
  let excellentReviews = bookDetail.reviews[0] != undefined ? bookDetail.reviews[0].excellent : 0
  return {good: acc.good + goodReviews,excellent : acc.excellent + excellentReviews}
},{good:0,excellent:0})

console.log("Good and Excellent count",resultOfCountReviews)

console.log("Addition of two arrays using zip",
zip([1,2,3],[4,5,6],(x,y) => x+y))

let apressBooks3 = [
  {
    name : "beginners",
    bookDetails : [
      {
        "id": 111,
        "title": "C# 6.0",
        "author": "ANDREW TROELSEN",
        "rating": [4.7]
      },
      {
        "id": 222,
        "title": "Efficient Learning Machines",
        "author": "Rahul Khanna",
        "rating": [4.5],
        "reviews": []
      }
    ]
  },
  {
      name : "pro",
      bookDetails : [
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
        "rating": [4.2]
      }
    ]
  }
];

let reviewDetails = [
  {
    "id": 111,
    "reviews": [{good : 4 , excellent : 12}]
  },
  {
    "id" : 222,
    "reviews" : []
  },
  {
    "id" : 333,
    "reviews" : []
  },
  {
    "id" : 444,
    "reviews": [{good : 14 , excellent : 12}]
  }
]

let bookDetails3 = concatAll(
  map(apressBooks3,(book) => {
    return book.bookDetails
  })
)

let mergedBookDetails = zip(bookDetails3,reviewDetails,(book,review) => {
  if(book.id === review.id)
  {
    let clone = Object.assign({},book)
    clone.ratings = review
    return clone
  }
})

console.log("Merged details",mergedBookDetails)