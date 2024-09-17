const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const venom = require('venom-bot'); // Agrega Venom
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

// Iniciar Venom para enviar mensajes de WhatsApp
let venomClient;
venom.create({
  session: 'sessionName', // Nombre de la sesión para guardar el estado de la sesión
  headless: true, // Cambia a false si necesitas ver el navegador
  useChrome: true, // Usa Chrome en lugar de Chromium (si es necesario)
  debug: false, // Cambia a true si necesitas más información de depuración
}).then(client => {
  venomClient = client;
  console.log('Venom está listo para enviar mensajes de WhatsApp');
}).catch(err => {
  console.error('Error iniciando Venom:', err);
});

// Ruta para insertar una reserva y enviar el mensaje de WhatsApp
app.post('/reservar', async (req, res) => {
  const { nombre, fecha, personas, tipolugar, telefono } = req.body;

  try {
    // Insertar la reserva en la base de datos
    const result = await pool.query(
      'INSERT INTO reservas (nombre, telefono, fecha, personas, tipolugar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, telefono, fecha, personas, tipolugar]
    );

    // Obtener el registro insertado
    const reserva = result.rows[0];

    // Enviar el mensaje de WhatsApp usando Venom
    const mensaje = `¡Hola ${nombre}!
      Tu reserva ha sido confirmada:
      - Fecha: ${fecha}
      - Número de personas: ${personas}
      - Tipo de lugar: ${tipolugar}
      
     Debes consignar 50k para apartar tu reserva, consígnalos a este número de Nequi: +57 304 3690811. ¡Te esperamos en Hera!`;

    // Número de teléfono en formato internacional
    const numeroWhatsapp = `57${telefono}@c.us`; // Asegúrate de que el número esté en formato internacional (sin espacios)

    if (venomClient) {
      venomClient.sendText(numeroWhatsapp, mensaje)
        .then(() => {
          console.log('Mensaje de WhatsApp enviado con éxito');
        })
        .catch(error => {
          console.error('Error al enviar el mensaje de WhatsApp:', error);
        });
    } else {
      console.error('VenomClient no está disponible');
    }

    // Responder al cliente con la reserva confirmada
    res.status(200).json(reserva);

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
