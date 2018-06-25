/***Functional code library******************************************************************************************************** */
const https = require("https");

const forEach = (array,fn) => {
   let i;
   for(i=0;i<array.length;i++)
      fn(array[i]);
};

const Sum = (array) => {
  let sum = 0 , i;
  for(i =0;i<array.length ;i++)
    sum += array[i];
  return sum;
};

const fetchTextByPromise = () => {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve("es8");
      }, 2000);
  });
};

var httpLibrary = {};

function httpGetAsync(url,callback) {
  return https.get(url, 
      function(response) {
          var body = "";
          response.on("data", function(d) {
              body += d;
          });
          response.on("end", function() {
              let parsed = JSON.parse(body);
              callback(parsed);
          });
      }
  );
}


httpLibrary.httpGetAsync = httpGetAsync;
httpLibrary.usernames = "";
httpLibrary.getAsyncCaller = function (url, callback) {
  try {
      // https://jsonplaceholder.typicode.com/users is a sample API which returns a JSON Array of dummy users
      const response = httpLibrary.httpGetAsync(url, function (response) {
          if (response.length > 0) {
              for (let i = 0; i < response.length; i++) {
                httpLibrary.usernames += response[i].username + ",";
              }
              callback(httpLibrary.usernames);
          }
      });
  } catch (error) {
      throw error;
  }
};

export { forEach, Sum, fetchTextByPromise, httpLibrary };
