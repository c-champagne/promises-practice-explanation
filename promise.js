const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve() // Change status to 'fulfilled'
    }, 2000)
  })
  
  console.log(`Promise before being resolved `, promise);
  
  setTimeout(() => {
      console.log(`Promise after being resolved`, promise);
  }, 3000)

  // set up then and catch named functions

  function thenFunction() {
    return 'then'
  }

  function catchFunction() {
    return 'catch'
  }

  let newPromise = {
    then: thenFunction,
    catch: catchFunction
  }

  newPromise.then();
  newPromise.catch();