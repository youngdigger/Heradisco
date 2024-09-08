const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(bodyParser.json());

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
