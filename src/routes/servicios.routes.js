const express = require("express");
const router = express.Router();

/**
 * @description Rutas para los servicios
 */
const {
    crearServicio,
    obtenerServicios,
    obtenerServicio,
    actualizarServicio,
    eliminarServicio,
} = require("../controllers/servicios.controller");

/**
 * @description Funciones y constantes para validar
 */
const {
    validarNombre,
    validarDescripcion,
    validarPrecio,
    validarEmail,
    validarDescuento,
    validarEstadoServicio,
    validarFecha,
} = require("../utils/validaciones");

/**
 * @description Middlewares de validación
 */
const { validarErrores } = require("../middlewares/servicios.middleware");

router.post(
    "/",
    [
        validarNombre,
        validarDescripcion,
        validarPrecio,
        validarEmail,
        validarDescuento,
        validarEstadoServicio,
        validarFecha,
        validarErrores,
    ],
    crearServicio
);
router.get("/", obtenerServicios);
router.get("/:id", obtenerServicio);
router.put("/:id", actualizarServicio);
router.delete("/:id", eliminarServicio);

module.exports = router;
