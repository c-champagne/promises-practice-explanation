
function getNewPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
}


function log1(){
    console.log('Step 1');
}

function log2(){
    console.log('Step 2');
}
function log3(){
    console.log('Step 3');
    throw new Error();
}


function catchError() {
    console.log('An error')
}

getNewPromise()
.then(log1)
.then(log2)
.then(log3)