import User from './usuario.model.js';
import bcryptjs from 'bcryptjs';

// Listar usuarios (GET)
export const listarUsuarios = async (req, res) => {
    const usuarios = await User.find({ state: true });
    res.status(200).json({
        usuarios
    });
}

// Crear usuario (POST)
export const crearUsuario = async (req, res) => {
    const { nombre, apellido, email, password, role } = req.body;
    const usuario = new User({ nombre, apellido, email, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        msg: "Usuario creado exitosamente"
    });
}

export const updateOwnUser = async (req, res) => {
    const id = req.user;
    const { password, email, role, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, rest);

    const usuario = await User.findById(id);
    res.status(200).json({
        msg: "Usuario actualizado exitosamente",
        usuario
    });
}

export const deleteOwnUser = async (req, res) => {
    const id = req.user;
    const usuario = await User.findByIdAndUpdate(id, { state: false });
    res.status(200).json({
        msg: "Usuario eliminado exitosamente",
        usuario
    });
}

// Actualizar usuario (PUT)
export const actualizarUsuario = async (req, res) => {
    const { id, ...rest } = req.body;
    await User.findByIdAndUpdate(id, rest);
    res.status(200).json({
        msg: "Usuario actualizado exitosamente"
    });
}

// Eliminar usuario (DELETE)
export const eliminarUsuario = async (req, res) => {
    const { id } = req.body
    await User.findByIdAndUpdate(id, { state: false });
    res.status(200).json({
        msg: "Usuario eliminado exitosamente"
    });
}