const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { obtenerJWT } = require("../utils/jwt");

/**
 * @description Obtiene todos los usuarios registrados
 * @param {Object} req - La petición
 * @param {Object} res - La respuesta
 */
const allUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        res.status(200).json({
            ok: true,
            message: "Lista de usuarios.",
            users: usuarios,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error, algo salió mal en el servidor.",
        });
    }
};

/**
 * @description Crea un nuevo usuario
 * @param {Object} req - La petición
 * @param {Object} res - La respuesta
 * @returns {JSON} Respuesta con el estado de la creación del usuario
 */
const createUser = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const existe = await Usuario.findOne({ email });

        if (existe) {
            return res.status(400).json({
                ok: false,
                message: "Error, el usuario ya existe.",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const nuevoUsuario = {
            nombre,
            email,
            password: hash,
        };

        const usuario = new Usuario(nuevoUsuario);
        await usuario.save();

        const token = await obtenerJWT({ nombre, email });

        res.status(201).json({
            ok: true,
            message: "Usuario creado correctamente.",
            token,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            message: "Error, algo salió mal en el servidor.",
        });
    }
};

/**
 * @description Inicia sesión con un usuario existente
 * @param {Object} req - La petición
 * @param {Object} res - La respuesta
 * @returns {JSON} Respuesta con el estado del inicio de sesión
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({ email });

        if (!usuarioExistente) {
            return res.status(400).json({
                ok: false,
                message: "No hay usuario con ese email",
            });
        }

        const coinciden = await bcrypt.compare(
            password,
            usuarioExistente.password
        );

        if (!coinciden) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es válida",
            });
        }

        const token = await obtenerJWT({ email, password });

        const user = {
            nombre: usuarioExistente.nombre,
            email,
            uid: usuarioExistente._id,
        };

        res.status(200).json({
            ok: true,
            message: "login de usuario",
            user: user,
            token: token,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            message: "Error, algo salió mal en el servidor.",
        });
    }
};

const renewToken = async (req, res) => {
    try {
    } catch (error) {}
};

module.exports = { allUsers, createUser, loginUser, renewToken };
