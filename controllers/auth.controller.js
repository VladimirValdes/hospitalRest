const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT, googleVerify, getMenuFrontEnd } = require('../helpers/index');
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
                token,
                menu: getMenuFrontEnd( usuario.rol )
            })

        
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

  
}

const googleSignin = async( req, res = response ) => {
    
    const id_token = req.body.id_token;

    try {
        
        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Hay que crearlo

            const data = {
                nombre,
                correo,
                img,
                password: ':P',
                google: true
            };


            usuario = new Usuario( data );

            await usuario.save();

        }

        // Si el usuario existe

        if ( !usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }


         // Generar  el JWT
         const token = await generarJWT( usuario.id )


        res.json({
            usuario,
            token,
            menu: getMenuFrontEnd( usuario.rol )

        });
    

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token de Google no es valido'
        });
    }

}

const renewToken = async( req, res = response ) => {

    const uid = req.usuario._id;

     // Generar  el JWT
     const token = await generarJWT( uid );

     // Get Usuario
    const user = await Usuario.findById(uid);

     res.json({
        token,
        user,
        menu: getMenuFrontEnd( user.rol )
        
     })
}

module.exports = {
    login,
    googleSignin,
    renewToken
}