 
 const { response } = require('express');
 const { ObjectId } = require('mongoose').Types;
 const { Usuario, Hospitales, Medicos } = require('../models');


 const coleccionesPermitidas = [
     "usuarios",
     "hospitales",
     "medicos"
 ];


 const buscarTodo = async( req, res = response ) => {

    const { termino } = req.params;

    
    const regex = new RegExp( termino, 'i');


    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    }),
        Hospitales.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    }),
        Medicos.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    })
    ]);


    res.json({
        usuarios,
        hospitales,
        medicos
    });

 }


 const buscar = ( req, res = response ) => {
     
    const { coleccion, termino } = req.params;


    if ( !coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json({
            msg: `Las condiciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch ( coleccion ) {
        case 'usuarios':
             buscarUsuarios( termino, res );
            break;
        case 'hospitales':
            buscarHospitales( termino, res );
            break;
        case 'medicos':
            buscarMedicos( termino, res );
            break;
        default:
            res.status(500).json({
                msg: `Esa busqueda aun no esta viejo :P`
            });
            break;
    }
 }


const buscarUsuarios = async( termino, res = response ) => {

    const isMongoID = ObjectId.isValid( termino );

    if(  isMongoID ) {
        
        const usuario =  await Usuario.findById( termino );

        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const usuario = await Usuario.find({
                            $or: [{ nombre: regex }, { correo: regex }],
                            $and: [{ estado: true }]
                        });

    res.json({
        results: usuario
    })

}

const buscarHospitales = async( termino, res = response ) => {

    const isMongoID = ObjectId.isValid( termino );

    if(  isMongoID ) {
        
        const hospital =  await Hospitales.findById( termino )
                                          .populate('usuario', 'nombre');

        return res.json({
            results: ( hospital ) ? [ hospital ] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const hospital = await Hospitales.find({
                            $or: [{ nombre: regex }],
                            $and: [{ estado: true }]
                        }).populate('usuario', 'nombre');
                    

    res.json({
        results: hospital
    })

}

const buscarMedicos = async( termino, res = response ) => {

    const isMongoID = ObjectId.isValid( termino );

    if(  isMongoID ) {
        
        const medico =  await Medicos.findById( termino )
                                     .populate('usuario', 'nombre')
                                     .populate('hospital', 'nombre');

        ;

        return res.json({
            results: ( medico ) ? [ medico ] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const medico = await Medicos.find({
                            $or: [{ nombre: regex }],
                            $and: [{ estado: true }]
                        }).populate('usuario', 'nombre')
                          .populate('hospital', 'nombre');

    res.json({
        results: medico
    })

}



 module.exports = {
     buscarTodo,
     buscar
 }

