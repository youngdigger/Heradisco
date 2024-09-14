const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const twilio = require('twilio');
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

// Validar el formato del número de teléfono
function validarTelefono(telefono) {
  const telefonoLimpio = telefono.replace(/\s+/g, '').replace(/\D+/g, ''); // Elimina espacios y caracteres no numéricos
  if (!/^\d{10,15}$/.test(telefonoLimpio)) {
    return null;  // Número inválido
  }
  return telefonoLimpio;  // Número válido
}

// Ruta para insertar una reserva y enviar el mensaje de confirmación
app.post('/reservar', async (req, res) => {
  const { nombre, fecha, personas, tipolugar, telefono } = req.body;

  // Validar el número de teléfono
  const telefonoLimpio = validarTelefono(telefono);
  if (!telefonoLimpio) {
    return res.status(400).json({ error: 'Número de teléfono inválido' });
  }

  try {
    // Insertar la reserva en la base de datos
    const result = await pool.query(
      'INSERT INTO reservas (nombre, telefono, fecha, personas, tipolugar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, telefonoLimpio, fecha, personas, tipolugar]
    );

    // Enviar mensaje de WhatsApp con Twilio desde tu número registrado
    const message = await twilioClient.messages.create({
      from: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`, // Número de WhatsApp de Twilio
      to: `whatsapp:+57${telefonoLimpio}`, // Número del cliente con prefijo del país
      body: `Hola ${nombre}, tu reserva para ${personas} personas en el tipo de lugar ${tipolugar} está confirmada para el día ${fecha}. ¡Gracias por reservar!`
    });

    // Confirmar que la reserva fue registrada y el mensaje enviado
    console.log('Mensaje enviado:', message.sid);
    res.status(200).json(result.rows[0]);

  } catch (error) {
    // Manejar errores de la base de datos y Twilio
    console.error('Error al insertar la reserva o enviar el mensaje:', error);
    
    // Diferenciar los errores de Twilio y la base de datos para mayor claridad
    if (error.code) {
      // Error de PostgreSQL
      res.status(500).json({ error: 'Error al insertar la reserva en la base de datos' });
    } else {
      // Error de Twilio
      res.status(500).json({ error: 'Error al enviar el mensaje de WhatsApp' });
    }
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
