const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Volodymyr Mirchuk'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Volodymyr Mirchuk'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'FAQ',
        title: 'Help',
        name: 'Volodymyr Mirchuk'
    })
})

app.get('/weather', (req,res) => {
    const {address} = req.query
    if (!address) {
        return res.send({
            error: 'Address is mandatory field. Please try again.'
        })
    } 
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
           return res.send({ error })
        }
        forecast(latitude, longitude, (error, {forecast}) => {
            if(error) {
                return res.send({ error })
            }
            res.send({ location, forecast, address })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Volodymyr Mirchuk',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Volodymyr Mirchuk',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})