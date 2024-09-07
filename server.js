const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar JSON
app.use(express.json());

// Ruta POST para manejar las reservas
app.post('/reservar', (req, res) => {
    const { nombre, email, fecha, personas } = req.body;

    // Validar que los campos no estén vacíos
    if (!nombre || !email || !fecha || !personas) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Comando para ejecutar el script PHP
    const cmd = `php ${path.join(__dirname, 'reservar.php')} "${nombre}" "${email}" "${fecha}" "${personas}"`;

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando PHP: ${stderr}`);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (parseError) {
            console.error(`Error al parsear respuesta: ${parseError}`);
            res.status(500).json({ error: 'Respuesta inválida del servidor' });
        }
    });
});

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
