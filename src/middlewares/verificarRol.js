/**
 * @description Middleware para verificar el rol del usuario
 * @param {string} rol - Rol requerido para acceder a la ruta
 * @param {Object} req - La petición
 * @param {Object} res - La respuesta
 * @param {Function} next - La función next
 * @returns {JSON} Respuesta con error si el usuario no tiene el rol requerido
 */
const verificarRol = (rol) => (req, res, next) => {
    if (req.tokenData.role !== rol) {
        return res.status(403).json({
            ok: false,
            message: "No tienes permisos para realizar esta acción.",
        });
    }

    next();
};

module.exports = { verificarRol };
