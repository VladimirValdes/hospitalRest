 const path = require('path');
 const fs = require('fs');
 const { v4: uuidv4 } = require('uuid');
 const { response } = require('express');
 const { actulizarImagen } = require('../helpers/index');


 const coleccionesPermitidas = [
     "usuarios",
     "hospitales",
     "medicos"
 ];


 const fileUpload = async( req, res = response ) => {

    const { colleccion, id } = req.params;

    if ( !coleccionesPermitidas.includes( colleccion )) {
        return res.status(400).json({
            msg: `No es una coleccion permitida - colecciones permitidas ${ coleccionesPermitidas }`
        });
    }

    // Validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No hay ningun archivo'
        });
      }

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivado = nombreCortado[ nombreCortado.length - 1 ];


    // Validar Extension

    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ];

    if ( !extensionesValidas.includes( extensionArchivado )) {
        return res.status(400).json({
            msg: 'No es una extension permitidas'
        });
    }


    // Generar el nombre del archivo

    const nombreArchivo = `${ uuidv4() }.${ extensionArchivado }`;

    // Path para guardar la imagen

    const path = `./uploads/${ colleccion }/${ nombreArchivo }`;


    // Mover la imagen

    file.mv( path, (err) => {

        if (err) {
            return res.status(500).json({
                msg: 'Error al mover una el archivo'
            });
        }
        
        // Actualizar la imagen

        actulizarImagen( colleccion, id, nombreArchivo );

        res.json({
            nombreArchivo,
            msg: 'from fileupload'
         });

      });

   

 }



 const retornaImagen = ( req, res = response ) => {

    const { colleccion, foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${ colleccion }/${ foto }`);

    // imagen por defecto 

    if ( fs.existsSync( pathImg )) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`)
        res.sendFile( pathImg );
    }

 }


 module.exports = {
     fileUpload,
     retornaImagen
 }



 /*
     var serveIndex = require('serve-index');
    app.use(express.static(__dirname + '/'))
    app.use('/uploads', serveIndex(__dirname + '/uploads'));
 */