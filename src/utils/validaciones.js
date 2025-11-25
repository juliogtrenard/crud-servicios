const Servicio = require("../models/servicio.model");
const { check } = require("express-validator");

/**
 * @description Valida si un servicio con el mismo nombre ya existe
 * @param {string} nombre - El nombre del servicio a validar
 * @returns {boolean} - True si no existe un servicio con ese nombre
 * @throws {Error} - Si ya existe un servicio con ese nombre
 */
const servicioExistente = async (nombre) => {
    const servicioExistente = await Servicio.findOne({ nombre });
    if (servicioExistente) {
        throw new Error("Ya existe un servicio con ese nombre");
    }
    return true;
};

/**
 * @description Valida el estado del servicio
 * @param {*} value - El valor del estado a validar
 * @returns {boolean} - True si el estado es válido
 * @throws {Error} - Si el estado no es válido
 */
const validarEstado = (value) => {
    if (value !== "Disponible" && value !== "No disponible") {
        throw new Error("Campos válidos: 'Disponible' o 'No disponible'");
    }
    return true;
};

const validarNombre = check("nombre")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo tiene que ser una cadena de texto.")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Longitud entre 2 y 50")
    .bail()
    .custom(servicioExistente);

const validarDescripcion = check("descripcion")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo tiene que ser una cadena de texto.")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Longitud entre 2 y 100");

const validarPrecio = check("precio")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("El campo tiene que ser numérico.");

const validarEmail = check("email")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isEmail()
    .withMessage("Email incorrecto.");

const validarDescuento = check("descuento")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Valor entre 0 y 100");

const validarEstadoServicio = check("estado")
    .notEmpty()
    .withMessage("El campo no puede estar vacío.")
    .bail()
    .isString()
    .withMessage("El campo debe ser una cadena de texto.")
    .bail()
    .custom(validarEstado);

module.exports = {
    validarNombre,
    validarDescripcion,
    validarPrecio,
    validarEmail,
    validarDescuento,
    validarEstadoServicio,
    servicioExistente,
    validarEstado,
};
