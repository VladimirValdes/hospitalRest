
const { Usuario, Hospitales, Medicos } = require('../models');

const emailExiste = async( correo = '') => {
    
    const correoExiste = await Usuario.findOne({ correo });

    if( correoExiste ) {
        throw new Error(`El correo ${ correo } ya esta registrado `);
    }
}

const usuarioExiste = async( id = '' ) => {
    

    const usuarioExiste = await Usuario.findById(id);

    if( !usuarioExiste ) {
        throw new Error(`El usuario ${ usuarioExiste } no existe `);
    }

}

const hospitalExiste = async( id = '') => {
    const hospExiste = await Hospitales.findById(id);

    if ( !hospExiste ) {
        throw new Error(`El hospital ${ hospExiste } no existe `);
        
    }
}


const medicoExiste = async( id = '') => {
    const medicExiste = await Medicos.findById(id);

    if ( !medicExiste ) {
        throw new Error(`El hospital ${ medicExiste } no existe `);
        
    }
}





module.exports = {
    emailExiste,
    usuarioExiste,
    hospitalExiste,
    medicoExiste
}