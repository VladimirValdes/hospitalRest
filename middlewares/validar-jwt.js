
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const  { Usuario } = require('../models/index');

const validarJWT = async ( req = request, res = response, next ) => {
    

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(400).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        // Verificar si es un token valido
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById( uid );



        // Veficar si el usuario es null o undefined

        if ( !usuario ) {
            return res.status(400).json({
                
                msg: 'Token no valido - El usuario no existe en la DB'

            });
        }

        // Verificar si el uid tiene estado en true

        if ( !usuario.estado ) {
            return res.status(400).json({
                
                msg: 'Token no valido - El usuario no esta activo'

            });
        }

        req.usuario = usuario;

        next();


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'   
        });
    }


}

const validarRole = async( req = request, res = response, next ) => {

    const { _id } = req.usuario;

    const usuario = await Usuario.findById( _id );

    if ( !usuario ) {
        return res.status(400).json({
            
            msg: 'Token no valido - El usuario no existe en la DB'

        });
    }

    // Verificar si el uid tiene estado en true

    if ( !usuario.estado ) {
        return res.status(400).json({
            
            msg: 'Token no valido - El usuario no esta activo'

        });
    }

    if ( usuario.rol !== 'ADMIN_ROLE') {
        return res.status(403).json({
            msg: 'Lo sentimos no puede realizar esta operacion'
        });
    } 

    next();

}

const validarRole_MismoUser = async( req = request, res = response, next ) => {

    const { _id } = req.usuario;
    const idU = req.params.id;

    const usuario = await Usuario.findById( _id );

    if ( !usuario ) {
        return res.status(400).json({
            
            msg: 'Token no valido - El usuario no existe en la DB'

        });
    }

    // Verificar si el uid tiene estado en true

    if ( !usuario.estado ) {
        return res.status(400).json({
            
            msg: 'Token no valido - El usuario no esta activo'

        });
    }

    if ( usuario.rol === 'ADMIN_ROLE' || usuario._id == idU) {
        
        next();
        
    } else {
        return res.status(403).json({
            msg: 'Lo sentimos no puede realizar esta operacion'
        });
    }


}

module.exports = {
    validarJWT,
    validarRole,
    validarRole_MismoUser
}