const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = `https://api.darksky.net/forecast/f121ddd20e409be9c76bb197c99363f4/${latitude},${longitude}?units=si&lang=en`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('There no connection with forecast service! Please, try later!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const {temperature, precipProbability, windSpeed} = body.currently
            const {summary, temperatureMin, temperatureMax} = body.daily.data[0]

            callback(undefined, {
                forecast: `${summary} It is currently ${temperature}°C. There is a ${precipProbability}% chance of rain.  Wind speed is ${windSpeed} m/s. The lowest temperature today was ${temperatureMin}°C and the highest is ${temperatureMax}°C.`
            })
        }
    })
}

module.exports = forecast