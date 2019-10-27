const express = require('express')

const Producto = require('../models/producto')

const { verificaToken } = require('../middlewares/autenticacion')

const app = express()

// Obtener todos los productos

app.get('/productos', verificaToken, (req, res) => {

    // Trae todos los productos
    // Populate usuario categoria
    // Paginado

  let desde = req.query.desde || 0
  desde = Number(desde)

  let limite = req.query.limite || 5
  limite = Number(limite)

  Producto
    .find({ disponible: true })
    .sort('nombre')
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .skip(desde)
    .limit(limite)
    .exec( (err, producto) => {

      if ( err ) {
        return res.status(500).json({
          ok: false,
          err
        })
      }

      res.json({
        ok: true,
        producto
      })
    })

})

// Obtener un producto por Id
app.get('/productos/:id', verificaToken, (req, res) => {

  let id = req.params.id

  Producto
    .findById( id )
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec( (err, producto) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
  
      if ( !producto ) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El ID del producto no existe"
          }
        })
      }
  
      return res.json({
        ok: true,
        producto
      })
    })
    
})

// Buscar un producto por nombre
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

  let termino = req.params.termino
  let regex = new RegExp(termino, 'i')

  Producto
    .find({ nombre: regex })
    .populate('categoria', 'descripcion')
    .exec((err, producto) => {

      if ( err ) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
  
      return res.json({
        ok: true,
        producto
      })
    })

})


// Crear un nuevo producto
app.post('/productos', verificaToken, (req, res) => {

    // Al crearlo 
    // Grabar el usuario
    // Grabar una categoria del listado
    // Es decir, debe existir, de lo contrairo error

    let body = req.body

    let producto = new Producto({
      nombre: body.nombre, 
      precioUni: body.precioUni, 
      descripcion: body.descripcion, 
      categoria: body.categoria, 
      usuario: req.usuario._id
    })

    producto.save( (err, productoDB) => {

      if ( err ) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
  
      res.json({
        ok: true,
        producto: productoDB
      })

    })

})

// Actualizar un nuevo producto
app.put('/productos/:id', verificaToken, (req, res) => {

  let id = req.params.id
  let body = req.body

  let detalleProducto = {
    nombre: body.nombre, 
    precioUni: body.precioUni, 
    descripcion: body.descripcion, 
    categoria: body.categoria,
    disponible: body.disponible
  }

  let options = {
    new: true,
    runValidators: true
  }

  Producto.findByIdAndUpdate(id, detalleProducto, options, (err, productoDB) => {

    if ( err ) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if ( !productoDB ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El ID del pruducto no existe"
        }
      })
    }
    
    res.json({
      ok: true,
      producto: productoDB
    })

  })

})

// Actualizar un nuevo producto
app.delete('/productos/:id', verificaToken, (req, res) => {

  let id = req.params.id

  let cambiaEstado = {
    disponible: false
  }

  let options = {
    new: true,
    runValidators: true
  }

  Producto.findByIdAndUpdate(id, cambiaEstado, options, (err, productoDB) => {

    if ( err ) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    
    if ( !productoDB ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Producto no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      producto: productoDB,
      mensaje: 'Producto Borrado'
    })

  })

})

module.exports = app