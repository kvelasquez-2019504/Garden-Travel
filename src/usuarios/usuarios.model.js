import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"]
        },
        apellido: {
            type: String,
            required: [true, "El apellido es obligatorio"]
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"]
        },
        role: {
            type: String,
            enum: ["ADMIN_WEB_ROLE", "USER_ROLE", "ADMIN_HOTEL_ROLE" ],
            default: "USER_ROLE"
        },
        state: {
            type: Boolean,
            default: true
        }
});

export default mongoose.model('Usuario', UsuarioSchema)