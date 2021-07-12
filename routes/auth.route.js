/*
*** RUTA: api/auth ****

*/


const { check } = require('express-validator');

const { Router } = require('express');


const { login } = require('../controllers/auth.controller');

const { validarCampos, validarJWT } = require('../middlewares/index');

const route = Router();

route.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)

module.exports = route;