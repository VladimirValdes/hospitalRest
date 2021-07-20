const { response } = require('express');

const { Hospitales } = require('../models/index');


const hospitalGet = async( req, res = response ) => {

    const { limite = 5, page = 1 } = req.query;
    const query = { estado: true };


    let desde = ( Number(page) - 1) * limite;

    const [ total, hopitales ] = await Promise.all([
        Hospitales.countDocuments(query),
        Hospitales.find(query)
               .skip(Number(desde))
               .limit(Number(limite))
               .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        hopitales,
        desde
    })
}


const hospitalGetById = async( req, res = response ) => {

    const { id } = req.params;

    const hospital = await Hospitales.findById( id );

    
    if ( !hospital.estado ) {
        res.status(400).json({
            msg: `El hospital no esta activo - estado false`
        })
    }

    res.json({
        hospital
    });
}


const hospitalPost = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const hospital = new Hospitales(data);

    // Save en la DB
    await hospital.save();

     res.json({
        hospital
     })
}

const hospitalPut = async( req, res= response ) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const hospital = await Hospitales.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        hospital
    });

}

const hospitalDelete = async( req, res = response ) => {
    const { id } = req.params;

    const hospital = await Hospitales.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        hospital
    });
}
                            





module.exports = {
    hospitalPost,
    hospitalGet,
    hospitalGetById,
    hospitalPut,
    hospitalDelete
}