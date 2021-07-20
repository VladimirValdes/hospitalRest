
const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre : {
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    usuario : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },

}, { collection: 'hospitales'});
// Removiendo de mi respuesta la __v y el password

HospitalSchema.methods.toJSON = function() {
    const { __v, ...object } = this.toObject();

    return object;
}

module.exports = model('Hospital', HospitalSchema );