const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/index');
const { Usuario } = require('../models/index');


const login = async( req, res = response) => {

    const { correo, password } = req.body;

    try {

          // Verificar si existe el correo 
            const usuario = await Usuario.findOne({ correo });

            if ( !usuario) {
                return res.status(400).json({
                    msg: ' Usuario / Password no son correctos - Correo'
                });
            }

            // Si el usuario esta activo

            if ( !usuario.estado ) {
                return res.status(400).json({
                    msg: ' Usuario / Password  no son correctos - estado: false '
                });
            }


            // Verificar el password

            const validPassword = bcryptjs.compareSync( password, usuario.password );

            if ( !validPassword ) {

                return res.status(400).json({
                    msg: ' Usuario / Password  no son correctos - password '
                });
            }

            // Generar jwt

            const token = await generarJWT( usuario.id );

            res.json({
                usuario,
                token
            })

        
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

  
}


module.exports = {
    login
}