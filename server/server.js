require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// Configuración Rutas
app.use( require('./routes/index') )

mongoose.connect(process.env.URLDB, 
    { useNewUrlParser: true, useCreateIndex: true }, 
    (err, res) => {

  if (err) throw err;
   
  console.log('Base de Datos ONLINE');
   
})

// Puerto Habilitado
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT, "Conectado a la BD", process.env.URLDB)
})