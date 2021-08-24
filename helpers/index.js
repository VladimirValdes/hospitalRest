const bdValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const actulizarImagen = require('./actualizar-img');
const googleVerify = require('./google-verify');
const getMenuFrontEnd = require('./menu-frontend');



module.exports = {
    ...bdValidators,
    ...generarJWT,
    ...actulizarImagen,
    ...googleVerify,
    ...getMenuFrontEnd
}