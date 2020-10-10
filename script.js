const id = 'j-hernandez';

function updateUI(info) {
    console.log('ui updated')
    document.getElementById('weather').innerHTML = JSON.stringify(info)
}

function showError() {
    console.error('something went wrong')
}

function getLocationURL(city, state) {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&APPID=3060eaf8e5ca982d7b7c0ca84d8fd887`
}

//Initial code. Callback Hell! Not very readable
document.getElementById('get-user').addEventListener('click', function() {
    $.getJSON({
        url: `https://api.github.com/users/${id}`,
        success: function(info) {
            document.getElementById('user').innerHTML = JSON.stringify(info)
            $.getJSON({
                url:getLocationURL(info.location),
                success: function(weather) {
                    document.getElementById('weather').innerHTML = JSON.stringify(weather)
                    console.log(weather)
                }
            })
        },
        error: showError
    })
})
///////////////////////////////////////////////////////////////////////////////////////////
//Re-factor 1 - Still Callback Hell, just a little shorter, still not very readable...
function getUser(id, successCallback, failureCallback) {
    $.getJSON({
        url: `https://api.github.com/users/${id}`,
        success: successCallback,
        error: failureCallback
    })
}

function getWeather(location, successCallback, failureCallback) {
    $.getJSON({
        url:getLocationURL(location),
        success: successCallback,
        error: failureCallback
})
}

document.getElementById('get-user').addEventListener('click', function() {
    getUser(
        id,                 //our first parameter for getUser (id)
        function(userInfo) { //our second parameter for getUser begins (successCallback) - this is a callback function
            getWeather(
                userInfo.location, //our first parameter for getWeather (location)
                function(weather) {updateUI(weather)}, //our second parameter for getWeather (successCallback) - this is a callback function
                showError)}, // This showError is our third parameter for getWeather. This is a callback function.  Note that the last yellow bracket here marks the 
                             // END of the successCallback for getUser
         showError) //this 2nd showError is the third parameter (failureCallback) for getUser

})

///////////////////////////////////////////////////////////////////////////////////////////
//Re-factor 2 - promises

//Function that defines and returns a promise
function getUser(id) {
    return new Promise(function(resolve, reject) {
        $.getJSON({
            url: `https://api.github.com/users/${id}`,
            success: resolve,
            error: reject
        })
    })
}
//Function that defines and returns a promise
function getWeather(location) {
    return new Promise(function(resolve,reject) {
        $.getJSON({
            url:getLocationURL(location),
            success: resolve,
            error: reject
    })
    })
}
document.getElementById('get-user').addEventListener('click', function() {
    const userPromise = getUser(id);        //assigning userPromise to the promise that is returned from the getUser function.
    userPromise.then(function (userinfo) { //.then is defining our resolve for the user promise. Everything in the yellow brackets, lines 94-101, is what will run when 
                                            //our promise is resolved/successful
        const weatherPromise = getWeather(userinfo.location); //assigning weatherPromise to the promise that is returned from the getWeather function
        weatherPromise.then(function(weather) { //.then is defining our resolve for the weather promise
            updateUI(weather); //this is what will run when our promise is resolved/successful
        });
        weatherPromise.catch(showError) //.catch is defining our reject for the weather promise
    });
    userPromise.catch(showError)  //.catch is defining our reject for the user promise
})


///////////////////////////////////////////////////////////////////////////////////////////
//Re-factor 3 - promises with .then chaining
function getUser(id) {
    return new Promise(function(resolve, reject) {
        $.getJSON({
            url: `https://api.github.com/users/${id}`,
            success: function(userInfo) {   //this tells our code what to do with the data received from url. 
                                            //This makes the data we receive usable and we can pass it on to     
                                            //.then(getWeather)
                console.log(userInfo)
                resolve(userInfo.location)
                //This resolve will be getWeather() 
                //and we're passing in the location 
                //from the user object so that we can look it up successfully.
            },
            error: reject
        })
    })
}

function getWeather(location) {
    return new Promise(function(resolve,reject) {
        $.getJSON({
            url:getLocationURL(location),
            success: resolve,
            error: reject
        })
    })
}
document.getElementById('get-user').addEventListener('click', function() {
    getUser(id)
    .then(getWeather)  //the resolver
    .then(function (weather) {
        updateUI(weather);
    })
    .catch(showError)  //only one catch error needed.
})

///////////////////////////////////////////////////////////////////////////////////////////
//Re-factor 4 promise async/await
function getUser(id) {
    return new Promise(function(resolve, reject) {
        $.getJSON({
            url: `https://api.github.com/users/${id}`,
            success: function(userInfo) {
                console.log(userInfo)
                resolve(userInfo.location)
            },
            error: reject
        })
    })
}
function getWeather(location) {
    return new Promise(function(resolve,reject) {
        $.getJSON({
            url:getLocationURL(location),
            success: resolve,
            error: reject
        })
    })
}
document.getElementById('get-user').addEventListener('click', async function() {
    let location = await getUser(id)
    let weather = await getWeather(location)
    updateUI(weather)
})