const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MySQL
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Verifica la ruta de la base de datos SQLite
console.log('SQLite DB Path:', process.env.SQLITE_DB_PATH);

// Conexión a SQLite
const sqliteConnection = new sqlite3.Database(process.env.SQLITE_DB_PATH, (err) => {
  if (err) {
    console.error('SQLite connection failed:', err);
  } else {
    console.log('Connected to SQLite Database');
  }
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ejemplo de consulta a SQLite
app.get('/data', (req, res) => {
  sqliteConnection.all('SELECT * FROM your_table', [], (err, rows) => {
    if (err) {
      console.error('Error fetching data from SQLite:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Ejemplo de consulta a MySQL
app.get('/data-mysql', (req, res) => {
  mysqlConnection.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
