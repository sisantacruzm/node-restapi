const express = require('express')

const Categoria = require('../models/categoria')

const { verificaToken } = require('../middlewares/autenticacion')

const app = express()

// Obtener Categoria
app.get('/categoria', verificaToken, (req, res) => {

  Categoria
    .find({ estado: true })
    .exec( (err, categoria) => {

      if ( err ) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      Categoria.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          categoria,
          cuantos: conteo
        })
      })

    })

})

// Obtener Categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
  
  let id = req.params.id

  Categoria.findById(id, (err, categoria) => {
    
    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    return res.json({
      ok: true,
      categoria
    })

  })
})

// Crear una categoria
app.post('/categoria', verificaToken, (req, res) => {

  let body = req.body

  let categoria = new Categoria({
    nombre: body.nombre
  })

  categoria.save( (err, categoriaDB) => {
    
    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      categoria: categoriaDB
    })

  })

})

// Actualizar una categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
  // Categoria.findbyid
})

// Borrar Categoria por ID
app.delete('/categoria/:id', verificaToken, (req, res) => {

  // Solo un administrador puede borrar
  // findByIdAndRemove
})

