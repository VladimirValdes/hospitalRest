
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

module.exports = {
    validarJWT
}