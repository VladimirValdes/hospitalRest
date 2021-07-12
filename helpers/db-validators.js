
const { Usuario } = require('../models');

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






module.exports = {
    emailExiste,
    usuarioExiste
}