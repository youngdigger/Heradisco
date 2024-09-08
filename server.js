const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');  // Asegúrate de que este archivo esté configurado correctamente

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar reservas
app.post('/reservar', (req, res) => {
    const { nombre, correo, fecha, cantidad } = req.body;

    const sql = 'INSERT INTO reservas (nombre, correo, fecha, cantidad) VALUES (?, ?, ?, ?)';
    db.run(sql, [nombre, correo, fecha, cantidad], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
