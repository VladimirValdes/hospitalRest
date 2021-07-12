const bdValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');



module.exports = {
    ...bdValidators,
    ...generarJWT,
    
}