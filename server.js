const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Usa `pg` para PostgreSQL

const app = express();
const port = process.env.PORT || 3000;

// Configura la base de datos PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Configuración SSL para Heroku
    }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar reservas
app.post('/reservar', (req, res) => {
    const { nombre, correo, fecha, cantidad } = req.body;

    // Validación básica
    if (!nombre || !correo || !fecha || !cantidad) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Inserta en la base de datos
    pool.query(
        'INSERT INTO reservas (nombre, correo, fecha, cantidad) VALUES ($1, $2, $3, $4)',
        [nombre, correo, fecha, cantidad],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al crear la reserva' });
            }

            res.status(200).json({ message: 'Reserva creada exitosamente' });
        }
    );
});

// Configura el puerto y arranca el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
