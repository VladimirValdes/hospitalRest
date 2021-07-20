const bdValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const actulizarImagen = require('./actualizar-img');



module.exports = {
    ...bdValidators,
    ...generarJWT,
    ...actulizarImagen
    
}