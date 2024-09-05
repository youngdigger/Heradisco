const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();

// Configura las variables de entorno manualmente
const PORT = 3000;

app.use(express.json());

// Ruta para manejar reservas
app.post('/reservar', (req, res) => {
    const { nombre, email, fecha, personas } = req.body;

    if (!nombre || !email || !fecha || !personas) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    exec(`php "${path.join(__dirname, 'reservar.php')}" "${nombre}" "${email}" "${fecha}" "${personas}"`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error ejecutando PHP:', error);
            console.error('Error stderr:', stderr);
            return res.status(500).json({ error: 'Error al procesar la reserva' });
        }
        if (stderr) {
            console.error('Error del PHP:', stderr);
            return res.status(500).json({ error: 'Error al procesar la reserva' });
        }
        try {
            const result = JSON.parse(stdout);
            if (result.error) {
                return res.status(400).json({ error: result.error });
            }
            res.json(result);
        } catch (e) {
            console.error('Error al analizar la respuesta de PHP:', e);
            res.status(500).json({ error: 'Error al procesar la reserva' });
        }
    });
});

// Configura la carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
