const postmanrequest = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=997fca8b6044db2e5184417f34fb9d52&query='+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) +'&units=m'
   // m =celsius, f=far, k=kelvin
    postmanrequest({ url, json: true }, (error, {body}) => { 
        if(error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + ' out. It feels like ' + body.current.feelslike + ' degrees out.') 
        }
    })
}

module.exports = forecast