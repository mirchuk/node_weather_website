const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoidm9sYW5kMjAxNyIsImEiOiJjazdmN3NjYm4wMDM2M2xwZmV3bDNmMWs0In0.cBaqlE9Fnr-x_xrOJmdZmw&limit=1`

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to geolocation service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try with other search criteries', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0] ,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode