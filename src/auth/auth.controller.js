import bcryptjs from 'bcryptjs';
import User from '../usuarios/usuario.model.js';
import { generateToken } from '../helpers/generate-jwt.js';

// Login de usuario (POST)
export const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await User.findOne({ email: email });

    if(usuario.state === false){
        return res.status(400).json({
            msg: "Usuario eliminado"
        });
    }

    console.log(usuario);
    if (!usuario) {
        return res.status(400).json({
            msg: "Usuario o contraseña incorrectos"
        });
    }
    const passwordCorrect = bcryptjs.compareSync(password, usuario.password);
    if (!passwordCorrect) {
        return res.status(400).json({
            msg: "Usuario o contraseña incorrectos"
        });
    }
    const token = await generateToken(usuario._id);
    req.headers.authorization = token;

    res.status(200).json({
        msg: "Login exitoso",
        token
    });
}
