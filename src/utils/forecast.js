const request = require('request');

const forecast = (latitude, longitude, callback) => {
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=ba54d553d011873d41486999f334c616&units=metric`

request ({url, json: true}, (error, response) => {
    if (error) {
        callback('Unable to connect to Weather API', undefined)
    }
    else if (response.body.cod == 400){    
        callback('Unable to find your location', undefined)
    }
    else {
        callback(undefined, `Description: ${response.body.current.weather[0].description} The temperature is ${response.body.current.temp}℃. Feel like is ${response.body.daily[0].feels_like.day}
        The high today is ${response.body.daily[0].temp.max} with a low of ${response.body.daily[0].temp.min}. 
        There is ${response.body.current.clouds}% chance of rain`)
    }

})

}


module.exports = forecast