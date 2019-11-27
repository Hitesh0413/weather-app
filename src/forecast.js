const request = require('request')

const forecast = (longitude, latitude, location, callback) => {
    const url = 'https://api.darksky.net/forecast/904bfaa4c05874446de59685259b36c4/'+longitude+','+latitude+'?units=si'

    request({url: url, json : true},(error, response)=>{ 
        if(error){
            callback('Unable to connect weather service', undefined)
        }
        else if(response.length == 0){
            callback('Not Able to collect weather information for '+location+' location ', undefined)
        }
        else{
            const temp = response.body.currently.temperature
            const prob = response.body.currently.precipProbability
            callback(undefined,{temp, prob})
        }
    })
}

module.exports = forecast
