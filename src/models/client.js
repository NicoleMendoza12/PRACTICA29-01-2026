const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        trim: true
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria'],
        trim: true
    },
    pais: {
        type: String,
        required: [true, 'El país es obligatorio'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);