const jwt = require("jsonwebtoken");

/**
 * @description Genera un token JWT con el payload proporcionado
 * @param {Object} payload
 * @returns {Promise<string>} Token JWT generado
 */
const obtenerJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "2h",
            },
            (error, token) => {
                if (error) {
                    reject("Error al generar el token");
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    obtenerJWT,
};
