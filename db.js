const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta a tu archivo de base de datos SQLite
const dbPath = path.join(__dirname, 'reservas.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

module.exports = db;



