const request = require('request')

const geocode = (location, callback) => {
    
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?limit=1&access_token=pk.eyJ1IjoiaGl0ZXNoYWxvbmV5IiwiYSI6ImNrMzh0ZmEwbzBjNTkzZG92cGdkYWYyMHgifQ.YSGxTtfWU0gfjSK5Ft94mg'
    
    request({url, json: true},(error, response) => {
        if(error){
            return callback('Error : Unable to connect to tracking server.', undefined)
        }
        else if(response.length==0){
            return callback('Error : Unable to find your location, Search with differtent location.', undefined)
        }
        else{
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const place = response.body.features[0].place_name
            callback(undefined,{longitude, latitude, place})
        }
        
    })
}

module.exports = geocode

