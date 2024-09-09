const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Ruta para insertar una reserva
app.post('/reservar', async (req, res) => {
  const { nombre, email, fecha, personas, tipoLugar } = req.body; // Añadir tipoLugar

  try {
    // Modificar la consulta para incluir tipoLugar
    const result = await pool.query(
      'INSERT INTO reservas (nombre, email, fecha, personas, tipo_lugar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, email, fecha, personas, tipoLugar] // Pasar tipoLugar como parámetro
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al insertar la reserva:', error);
    res.status(500).json({ error: 'Error al insertar la reserva' });
  }
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Ruta de prueba para asegurarse de que la aplicación está en funcionamiento
app.get('/', (req, res) => {
  res.send('¡La aplicación está funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
