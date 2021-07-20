/*

 * RUTA: /api/search

*/
const { Router } = require('express');

const route = Router();

const { validarCampos, validarJWT } = require('../middlewares/index.js');
const { buscarTodo, buscar } = require('../controllers/search.controller');



route.get('/todo/:termino', validarJWT, buscarTodo);
route.get('/:coleccion/:termino',  validarJWT, buscar);


module.exports = route;