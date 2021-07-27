const bycryptjs = require('bcryptjs');
const { response } = require('express');

const { generarJWT } = require('../helpers/index');
const { Usuario } = require('../models/index');


const usuariosGet = async( req, res = response ) => {

    const { limite = 5, page = 1 } = req.query;
    const query = { estado: true };


    let desde = ( Number(page) - 1) * limite;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
               .skip(Number(desde))
               .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios,
        desde
    })
}

const usuarioGetById = async( req, res = response ) => {
    
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    
    if ( !usuario.estado ) {
        res.status(400).json({
            msg: `El usuario no esta activo - estado false`
        })
    }

    res.json({
        usuario
    })

}


const usuariosPost = async( req, res = response ) => {

    const { nombre, password, correo, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // validar contraseña
    const salt = bycryptjs.genSaltSync();
    usuario.password = bycryptjs.hashSync( password, salt );

    // Save en la DB
    await usuario.save();

    // Generar  el JWT
    const token = await generarJWT( usuario.id );

     res.json({
        usuario,
        token
     })
}

const usuariosPut = async( req, res= response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;


    // Cambiando la contra
    // if ( password ) {
    //     const salt = bycryptjs.genSaltSync();
    //     resto.password = bycryptjs.hashSync( password, salt );
    // }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        usuario
    });

}

const usuariosDelete = async( req, res = response ) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        usuario
    });
}
                            





module.exports = {
    usuariosPost,
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuarioGetById
}