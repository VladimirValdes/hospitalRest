/**
 * RUTA: /api/medicos
 */

 const { check } = require('express-validator');

 const { Router } = require('express');
 
 // Validacion contra la DB
 const { medicoExiste, hospitalExiste } = require('../helpers/db-validators');
 
 const { validarCampos, validarJWT } = require('../middlewares/index.js');
 
 const {
     medicoGet,
     medicoGetById,
     medicoPost,
     medicoPut,
     medicoDelete
 } = require('../controllers/medico.controller');
 
 const route = Router();
 
 route.get('/',validarJWT, medicoGet);

 route.get('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( medicoExiste ),
    validarCampos
], medicoGetById);

 
 route.post('/',[
     validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('hospital', 'El hosítal es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital no es valido').isMongoId(),
     check('hospital').custom( hospitalExiste ),
     validarCampos
 ], medicoPost);
 
 
 route.put('/:id', [
     validarJWT,
     check('id', 'El id no es valido').isMongoId(),
     check('id').custom( medicoExiste ),
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //  check('hospital').custom( hospitalExiste ),
     validarCampos
 ], medicoPut );
 
 route.delete('/:id', [
     validarJWT,
     check('id', 'El id no es valido').isMongoId(),
     check('id').custom( medicoExiste ),
     validarCampos
 ], medicoDelete);
 
 module.exports = route;