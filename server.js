const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(bodyParser.json());

// Ruta para manejar el formulario de reservas
app.post('/reservar', async (req, res) => {
  const { nombre, email, fecha, personas } = req.body;
  try {
    await pool.query('INSERT INTO reservas (nombre, email, fecha, personas) VALUES ($1, $2, $3, $4)', [nombre, email, fecha, personas]);
    res.status(200).json({ message: 'Reserva realizada con éxito' });
  } catch (err) {
    console.error('Error al insertar la reserva:', err);
    res.status(500).json({ error: 'Error al insertar la reserva' });
  }
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
