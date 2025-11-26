const express = require("express");
require("dotenv").config();
const cors = require("cors");
const conectarDB = require("./config/db");
const servicioRoutes = require("./routes/servicios.routes");
const usuarioRoutes = require("./routes/usuarios.routes");
const app = express();

// Conxión BBDD
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Para cuando se trabaja con formularios
app.use(express.urlencoded());

// Rutas
app.use("/api/v1/servicios", servicioRoutes);
app.use("/api/v1/usuarios", usuarioRoutes);
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: "Ruta no encontrada",
    });
});

// Puerto
const PORT = process.env.PORT;

// Listener
app.listen(PORT, () => {
    console.log(`Servidor en el puerto: ${PORT}`);
});
