const Servicio = require("../models/servicio.model");

/**
 * @description Crear un nuevo servicio
 * @async
 * @param {Object} req - La petición
 * @param {Object} req.body - Datos enviados para crear el servicio
 * @param {Object} res - La respuesta
 * @returns {JSON} Respuesta con el servicio creado o un error
 */
const crearServicio = async (req, res) => {
    try {
        const servicio = new Servicio(req.body);
        await servicio.save();

        res.status(201).json({
            ok: true,
            message: "Servicio creado correctamente",
            data: servicio,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                ok: false,
                message: "Ya existe un servicio con ese nombre",
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                ok: false,
                message: "Datos insuficientes",
            });
        }

        res.status(500).json({
            ok: false,
            message: "Error al crear el servicio",
        });
    }
};

/**
 * @description Obtener todos los servicios
 * @async
 * @param {Object} req - La petición
 * @param {Object} res - La respuesta
 * @returns {JSON} Lista de servicios o un error
 */
const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find();

        res.status(200).json({
            ok: true,
            message: "Lista de servicios",
            data: servicios,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener los servicios",
        });
    }
};

/**
 * @description Obtener un servicio por su ID
 * @async
 * @param {Object} req - La petición
 * @param {string} req.params.id - ID del servicio a buscar
 * @param {Object} res - La respuesta
 * @returns {JSON} Servicio encontrado o mensaje de error
 */
const obtenerServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                message: "Servicio no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Servicio encontrado",
            data: servicio,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al obtener el servicio",
        });
    }
};

/**
 * @description Actualizar un servicio por su ID
 * @async
 * @param {Object} req - La petición
 * @param {string} req.params.id - ID del servicio a actualizar
 * @param {Object} req.body - Datos a actualizar
 * @param {Object} res - La respuesta
 * @returns {JSON} Servicio actualizado o mensaje de error
 */
const actualizarServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findByIdAndUpdate(
            req.params.id,
            req.body,
            //{ new: true }
            { returnDocument: "after" }
        );

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                message: "Servicio no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Servicio actualizado correctamente",
            data: servicio,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al actualizar el servicio",
        });
    }
};

/**
 * @description Eliminar un servicio por su ID
 * @async
 * @param {Object} req - La petición
 * @param {string} req.params.id - ID del servicio a eliminar
 * @param {Object} res - La respuesta
 * @returns {JSON} Confirmación de eliminación o error
 */
const eliminarServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findByIdAndDelete(req.params.id);

        if (!servicio) {
            return res.status(404).json({
                ok: false,
                message: "Servicio no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            message: "Servicio eliminado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error al eliminar el servicio",
        });
    }
};

module.exports = {
    crearServicio,
    obtenerServicios,
    obtenerServicio,
    actualizarServicio,
    eliminarServicio,
};
