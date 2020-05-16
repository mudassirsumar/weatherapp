const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000
//Defining Paths for express config
const publicDirectory = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mudassir Sumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mudassir Sumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "FAQ's",
        message: 'For more information read this page',
        name: 'Mudassir Sumar'
    })
})


//weather page route
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address !!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
}) 

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide your location to check WEATHER'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Mudassir Sumar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'My 404 page',
        name: 'Mudassir Sumar'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})