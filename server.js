const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // Usamos 'pg' para PostgreSQL

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

// Configura tu base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Ruta para manejar reservas
app.post('/reservar', async (req, res) => {
    const { nombre, email, fecha, personas } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO reservas (nombre, email, fecha, personas) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, email, fecha, personas]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar la reserva:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
