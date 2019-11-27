const path = require('path')
const express = require('express')
const geocode = require('./geocode')
const forecast = require('./forecast')
const hbs = require('hbs')


// ANCHOR setting paths for express server
const publicDirPath = path.join(__dirname,'../public')
const templateDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(templateDirPath, '../partials')

app = express()
const port = process.env.PORT || 3000
app.use(express.static(publicDirPath))
app.set('view engine', 'hbs')
app.set('views', templateDirPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res) => {
    res.render('index', {
        title:'Current Weather | Created By Hitesh Aloney',
    })
})

app.get('/index',(req,res) => {
    res.render('index', {
        title:'Current Weather | Created By Hitesh Aloney',
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title:'About | Created By Hitesh Aloney',
    })
})


app.get('/weather',(req, res) => {
    if(!req.query.search){
        return res.send({
            error:'Please Enter the location'
        })
    }
    else{
        geocode(req.query.search, (error,{longitude, latitude, place}) =>{
            if(error){
                return res.send({
                    error
                })
            }    
            
            forecast(latitude,longitude, req.query.search, (error, {temp, prob}) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                
                return res.send({
                    place,
                    response : 'The tempreture at this place is '+temp+' degree Celcius  and the there is '+prob+'% probability of rain. '
                })
            })
        })
    }
})

app.get('/*',(req,res) => {
    res.send({
        Error:'Page Not Found'
    })
})


app.listen(port,()=> {
    console.log('Server Started at port '+port+'')
})






