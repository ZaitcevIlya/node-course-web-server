const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = (`${now}: ${req.method} ${req.url}`)
  
  fs.appendFile('console.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})


app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Hello and Welcome!',
    currentYear: new Date().getFullYear()
  })
})

app.get('/help', (req, res) => {
  res.send('./public/help.html')
})


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something bad happened'
  })
})

app.listen(port, () => {
  console.log(`Server is up on the port ${port}`)
})