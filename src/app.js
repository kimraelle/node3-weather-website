const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebarsengine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kim'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kim'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kim',
        message: 'HEEEELLLLPPPP'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send ({
            error: 'you must input the address'
        })
    }
    geocode(req.query.address, (error, {long, lat, loc} = {}) => {
        if(error){
          return res.send({ error })
        }
        forecast(long, lat, (error, foredata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: foredata,
                location: loc,
                address: req.query.address
            })
        })
      })
    // res.send({
    //     forecast: 'Its snowing',
    //     location: 'Kim',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
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
        name: 'Kim',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Kim',
        message: 'My 404 page'
    })
})
//static doesn't change a page
//dynamic docs: handlebars module

// req for request access on the site
// res for accessing other services such as database

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Kim',
//         age: 21
//     },{
//         name: 'LALA',
//         age: 21 
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })


//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port) // this will output to browser
}) // app opens server, 3000 as example