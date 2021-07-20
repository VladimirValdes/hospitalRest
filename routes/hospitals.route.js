/**
 * RUTA: /api/hospitales
 */

 const { check } = require('express-validator');

 const { Router } = require('express');
 
 // Validacion contra la DB
 const { hospitalExiste } = require('../helpers/db-validators');
 
 const { validarCampos, validarJWT } = require('../middlewares/index.js');
 
 const {
     hospitalGet,
     hospitalGetById,
     hospitalPost,
     hospitalPut,
     hospitalDelete
 } = require('../controllers/hospitals.controller');
 
 const route = Router();
 
 route.get('/',validarJWT, hospitalGet);

 route.get('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( hospitalExiste ),
    validarCampos
], hospitalGetById);

 
 route.post('/',[
     validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos
 ], hospitalPost);
 
 
 route.put('/:id', [
     validarJWT,
     check('id', 'El id no es valido').isMongoId(),
     check('id').custom( hospitalExiste ),
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos
 ], hospitalPut );
 
 route.delete('/:id', [
     validarJWT,
     check('id', 'El id no es valido').isMongoId(),
     check('id').custom( hospitalExiste ),
     validarCampos
 ], hospitalDelete);
 
 module.exports = route;