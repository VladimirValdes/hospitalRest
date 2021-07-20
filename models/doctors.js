
const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre : {
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    usuario : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    hospital : {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    },

}, { collection: 'medicos'});
// Removiendo de mi respuesta la __v y el password

MedicoSchema.methods.toJSON = function() {
    const { __v, ...object } = this.toObject();

    return object;
}

module.exports = model('Medico', MedicoSchema );