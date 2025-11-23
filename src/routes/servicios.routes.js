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

router.post("/", crearServicio);
router.get("/", obtenerServicios);
router.get("/:id", obtenerServicio);
router.put("/:id", actualizarServicio);
router.delete("/:id", eliminarServicio);

module.exports = router;
