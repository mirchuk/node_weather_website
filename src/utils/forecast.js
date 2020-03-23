const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = `https://api.darksky.net/forecast/f121ddd20e409be9c76bb197c99363f4/${latitude},${longitude}?units=si&lang=uk`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('There no connection with forecast service! Please, try later!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const {temperature, precipProbability} = body.currently
            const {summary} = body.daily.data[0]

            callback(undefined, {
                forecast: `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
            })
        }
    })
}

module.exports = forecast