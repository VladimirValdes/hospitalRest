/**
 * RUTA: /api/usuarios
 */

const { check } = require('express-validator');

const { Router } = require('express');

// Validacion contra la DB
const { emailExiste, usuarioExiste } = require('../helpers/db-validators');

const { validarCampos, validarJWT } = require('../middlewares/index.js');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuarioGetById
} = require('../controllers/user.controller');

const route = Router();

route.get('/', validarJWT, usuariosGet);

route.get('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], usuarioGetById);

route.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos
], usuariosPost);


route.put('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    validarCampos
], usuariosPut );

route.delete('/:id', [
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], usuariosDelete)

module.exports = route;