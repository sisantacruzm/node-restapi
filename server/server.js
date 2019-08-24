require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {
  res.json('Get Usuario')
})

app.post('/usuario', function (req, res) {

    let body = req.body;

    res.json({
        body
    })
})

app.put('/usuario', function (req, res) {
  res.json('Put Usuario')
})

app.delete('/usuario', function (req, res) {
  res.json('Delete Usuario')
})

app.listen(process.env.PORT, () => {
    console.log("escuchando el puerto", process.env.PORT)
})