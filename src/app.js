require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const servicioRoutes = require("./routes/servicios.routes");
const app = express();

// Conxión BBDD
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/v1/servicios", servicioRoutes);
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
