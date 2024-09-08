const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Configuración de Express
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Configuración de bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Ruta para manejar las reservas
app.post('/reservar', async (req, res) => {
    const { nombre, email, fecha, personas } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO reservas (nombre, email, fecha, personas) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, fecha, personas]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar la reserva:', error);
        res.status(500).send('Error al procesar la reserva');
    }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Servir el archivo principal HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
