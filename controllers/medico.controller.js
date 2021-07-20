const { response } = require('express');

const { Medicos } = require('../models/index');


const medicoGet = async( req, res = response ) => {

    const { limite = 5, page = 1 } = req.query;
    const query = { estado: true };


    let desde = ( Number(page) - 1) * limite;

    const [ total, medicos ] = await Promise.all([
        Medicos.countDocuments(query),
        Medicos.find(query)
               .skip(Number(desde))
               .limit(Number(limite))
               .populate('usuario', 'nombre')
               .populate('hospital', 'nombre')
    ]);

    res.json({
        total,
        medicos,
        desde
    })
}


const medicoGetById = async( req, res = response ) => {

    const { id } = req.params;

    const medico = await Medicos.findById( id );

    
    if ( !medico.estado ) {
        res.status(400).json({
            msg: `El medico no esta activo - estado false`
        })
    }

    res.json({
        medico
    });
}


const medicoPost = async( req, res = response ) => {

    const { nombre, hospital } = req.body;

    nombre.toUpperCase();

    const data = {
        nombre,
        hospital,
        usuario: req.usuario._id
    }

    const medico = new Medicos(data);

    // Save en la DB
    await medico.save();

     res.json({
        medico
     })
}

const medicoPut = async( req, res= response ) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    const medico = await Medicos.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        medico
    });

}

const medicoDelete = async( req, res = response ) => {
    const { id } = req.params;

    const medico = await Medicos.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        medico
    });
}
                            





module.exports = {
    medicoPost,
    medicoGet,
    medicoGetById,
    medicoPut,
    medicoDelete
}