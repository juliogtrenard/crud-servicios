const { validationResult } = require("express-validator");

/**
 * @description Middleware para validar errores de express-validator
 * @param {Object} req - objeto de solicitud
 * @param {Object} res - objeto de respuesta
 * @param {Function} next - función para pasar al siguiente middleware
 * @returns {void}
 */
const validarErrores = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            message: "Errores de validación",
            errors: errores.array(),
        });
    }

    next();
};

module.exports = { validarErrores };
