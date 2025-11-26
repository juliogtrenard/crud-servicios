const { Schema, model } = require("mongoose");

/**
 * @description Esquema y modelo para los usuarios
 */
const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
});

module.exports = model("Usuario", UsuarioSchema);
