const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validarJWT");
const {
    allUsers,
    createUser,
    loginUser,
    renewToken,
} = require("../controllers/usuarios.controller");

router.get("/", allUsers);

router.post("/new", /*[validacion],*/ createUser);

router.post("/", /*[validación],*/ loginUser);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
