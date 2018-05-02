const forEach = (array,fn) => {
   let i;
   for(i=0;i<array.length;i++)
      fn(array[i])
}

const Sum = (array) => {
  let sum = 0 , i;
  for(i =0;i<array.length ;i++)
    sum += array[i];
  return sum;
}

const fetchTextByPromise = () => {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve("es8");
      }, 2000);
  });
}

export { forEach, Sum, fetchTextByPromise }
