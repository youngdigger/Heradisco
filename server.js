
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // Importa la conexión a la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba para asegurarse de que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor corriendo');
});

// Ruta para manejar reservas
app.post('/reservar', (req, res) => {
    const { nombre, email, fecha, personas } = req.body;

    if (!nombre || !email || !fecha || !personas) {
        return res.status(400).json({ error: 'Todos los campos son necesarios' });
    }

    const query = 'INSERT INTO reservas (nombre, email, fecha, personas) VALUES (?, ?, ?, ?)';
    const values = [nombre, email, fecha, personas];

    db.run(query, values, function(err) {
        if (err) {
            console.error('Error al insertar reserva:', err);
            return res.status(500).json({ error: 'Error al realizar la reserva' });
        }

        res.json({ message: 'Reserva realizada con éxito', id: this.lastID });
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


