 const fs = require('fs');
 const { Usuario, Hospitales, Medicos } = require('../models');

const borrarImagen = ( path ) => {

    if ( fs.existsSync( path )) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }

}

const actulizarImagen = async( colleccion, id, nombreArchivo ) => {

    let pathViejo = '';

    switch ( colleccion ) {

        case 'medicos':

            const medico = await Medicos.findById(id);
            
            if ( !medico ) {
                console.log(' No es un medico por id ');
                return false;
            }

             pathViejo = `./uploads/medicos/${ medico.img }`;

            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
        case 'hospitales':
            const hospital = await Hospitales.findById(id);
            
            if ( !hospital ) {
                console.log(' No es un hospital por id ');
                return false;
            }

             pathViejo = `./uploads/hospitales/${ hospital.img }`;

            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            
            if ( !usuario ) {
                console.log(' No es un usuario por id ');
                return false;
            }

             pathViejo = `./uploads/usuarios/${ usuario.img }`;

            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        
    }
}

module.exports = {
    actulizarImagen
}