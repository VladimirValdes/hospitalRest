/*

 * RUTA: /api/uploads

*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const route = Router();

const { validarCampos, validarJWT } = require('../middlewares/index.js');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');

route.use(expressfileUpload());

route.put('/:colleccion/:id',  validarJWT, fileUpload);
route.get('/:colleccion/:foto', retornaImagen );

module.exports = route;