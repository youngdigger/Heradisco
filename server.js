const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware para manejar JSON
app.use(express.json());

// Función para ejecutar una consulta SQL
async function executeQuery(sql, params) {
  try {
    const client = await pool.connect();
    const res = await client.query(sql, params);
    client.release(); // Liberamos el cliente después de usarlo
    return res.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Ruta para obtener datos de PostgreSQL
app.post('/api/reservas', async (req, res) => {
  const { nombre, email, fecha, personas } = req.body;
  try {
    // Inserta la reserva en la base de datos
    await executeQuery(
      'INSERT INTO reservas (nombre, email, fecha, personas) VALUES ($1, $2, $3, $4)',
      [nombre, email, fecha, personas]
    );
    res.status(201).json({ message: 'Reserva creada con éxito' });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
