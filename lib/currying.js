 const curry = (binaryFn) => {
   return function (firstArg) {
     return function (secondArg) {
       return binaryFn(firstArg, secondArg);
     };
   };
 };
 
 const curryN =(fn) => {
     
     if(typeof fn!=='function'){
         throw Error('No function provided');
     }
 
     return function curriedFn(...args){
       
       //make it bold
       if(args.length < fn.length){
         return function(){
           return curriedFn.apply(null, args.concat( [].slice.call(arguments) ));
         };
       }
       //make it bold
 
       return fn.apply(null, args);
     };
 };
 
 export {curry,curryN}