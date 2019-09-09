const express = require('express')

const bcrypt = require('bcryptjs')
const _ = require('underscore')

const Usuario = require('../models/usuario')

const { verificaToken, virificaAdmin_Role } = require('../middlewares/autenticacion')

const app = express()

// Obtener Usuarios
app.get('/usuario', verificaToken, (req, res) => {
  
  let desde = req.query.desde || 0
  desde = Number(desde)

  let limite = req.query.limite || 5
  limite = Number(limite)

  Usuario
    .find({ estado: true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec( (err, usuarios) => {
      
      if ( err ) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        })
      })

    })
  
})
  
// Crear un nuevo usuario
app.post('/usuario', [verificaToken, virificaAdmin_Role], (req, res) => {

    let body = req.body 

    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
    })

    usuario.save( (err, usuarioDB) => {

      if ( err ) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      // usuario.password = null

      res.json({
        ok: true,
        usuario: usuarioDB
      })

    })
})

// Actualizar un usuario por su ID
app.put('/usuario/:id', [verificaToken, virificaAdmin_Role], (req, res) => {
  
  let id = req.params.id
  let body = _.pick( req.body, ['nombre','email', 'img', 'role', 'estado'] )

  let options = {
    new: true, 
    runValidators: true
  }

  Usuario.findByIdAndUpdate( id, body, options, (err, usuarioDB) => {

    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    })
  })
})

// Deshabiltiar un Usuario por ID
app.delete('/usuario/:id', [verificaToken, virificaAdmin_Role], (req, res) => {
  
  let id = req.params.id

  let cambiaEstado = { 
    estado: false 
  }

  let options = {
    new: true, 
    runValidators: true
  }

  Usuario.findByIdAndUpdate(id, cambiaEstado, options, (err, usuario) => {

    if ( err ) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    
    if ( !usuario ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      usuario
    })

  })

})

module.exports = app