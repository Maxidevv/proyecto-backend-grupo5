const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const entradaSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    apellido: {
        type: String
    },
    dni: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pagado', 'pendiente', 'cancelado'],
        default: 'pendiente'
    },
    paymentID: {
        type: String
    },
    nroTelefono: {
        type: String
    }
});

const eventoSchema = new mongoose.Schema({
    clave: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    lugar: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    bannerUrl: {
        type: String
    },
    conEntrada: {
        type: Boolean,
        default: true
    },
    descripcion: {
        type: String
    },
    entradas: [entradaSchema]
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
