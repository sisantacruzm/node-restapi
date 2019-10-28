const express = require('express')

const Categoria = require('../models/categoria')

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')

const app = express()

// Obtener Categoria
app.get('/categoria', verificaToken, (req, res) => {

  Categoria
    .find()
    .sort('descripcion')
    .populate('usuario', 'nombre email')
    .exec( (err, categoria) => {

      if ( err ) {
        return res.status(502).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        categoria
      })
    })
})

// Obtener Categoria por ID
app.get('/categoria/:id', verificaToken, (req, res) => {
  
  let id = req.params.id

  Categoria.findById(id, (err, categoria) => {
    
    if ( err ) {
      return res.status(502).json({
        ok: false,
        err
      })
    }

    if ( !categoria ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID de la categoria no existe"
        }
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
    descripcion: body.descripcion,
    usuario: req.usuario._id
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
  let id = req.params.id
  let body = req.body

  let descCategoria = {
    descripcion: body.descripcion
  }

  let options = {
    new: true,
    runValidators: true
  }

  Categoria.findByIdAndUpdate( id, descCategoria, options, (err, categoriaDB) => {

    if ( err ) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if ( !categoriaDB ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID no existe"
        }
      })
    }
    
    res.json({
      ok: true,
      categoria: categoriaDB
    })
  })
})

// Borrar Categoria por ID
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

  let id = req.params.id

  Categoria.findByIdAndRemove( id, (err, categoriaDB) => {

    if ( err ) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    
    if ( !categoriaDB ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID no existe"
        }
      })
    }

    res.json({
      ok: true,
      message: 'Categoria Borrada',
      categortia_borrrada: categoriaDB
    })


  })

})

module.exports = app