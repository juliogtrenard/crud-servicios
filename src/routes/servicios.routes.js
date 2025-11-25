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
    validarID,
    validarNombre,
    validarNombreOpcional,
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
const {
    validarErrores,
    validarBody,
} = require("../middlewares/servicios.middleware");

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

router.get("/:id", [validarID, validarErrores], obtenerServicio);

router.put(
    "/:id",
    [
        validarID,
        validarBody,
        validarNombreOpcional,
        validarDescripcion.optional(),
        validarPrecio.optional(),
        validarEmail.optional(),
        validarDescuento.optional(),
        validarEstadoServicio.optional(),
        validarFecha.optional(),
        validarErrores,
    ],
    actualizarServicio
);

router.delete("/:id", [validarID, validarErrores], eliminarServicio);

module.exports = router;
