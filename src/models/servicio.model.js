const mongoose = require("mongoose");

/**
 * @description Esquema y modelo para los servicios
 */
const ServicioSchema = new mongoose.Schema({
    nombre: { type: String, unique: true, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
});

module.exports = mongoose.model("Servicio", ServicioSchema);
