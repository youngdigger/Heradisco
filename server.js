const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const twilio = require('twilio'); // Importa Twilio
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

// Configura Twilio con tus credenciales
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Ruta para insertar una reserva y enviar el mensaje de confirmación
app.post('/reservar', async (req, res) => {
  const { nombre, fecha, personas, tipolugar, telefono } = req.body;

  try {
    // Insertar la reserva en la base de datos
    const result = await pool.query(
      'INSERT INTO reservas (nombre, telefono, fecha, personas, tipolugar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, telefono, fecha, personas, tipolugar]
    );

    // Enviar mensaje de WhatsApp con Twilio
    const message = await twilioClient.messages.create({
      from: 'whatsapp:+573208134717', // Tu número de WhatsApp de Twilio (actualizado)
      to: `whatsapp:+57${telefono}`, // El número de teléfono del cliente (usando WhatsApp)
      body: `Hola ${nombre}, tu reserva para ${personas} personas en el tipo de lugar ${tipolugar} está confirmada para el día ${fecha}. ¡Gracias por reservar!`
    });

    // Confirmar que la reserva fue registrada y el mensaje enviado
    console.log('Mensaje enviado:', message.sid);
    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error('Error al insertar la reserva o enviar el mensaje:', error);
    res.status(500).json({ error: 'Error al insertar la reserva o enviar el mensaje' });
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
