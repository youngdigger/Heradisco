const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MySQL (si es necesario)
const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Conexión a SQLite
const sqliteConnection = new sqlite3.Database('./path_to_your_db.sqlite', (err) => {
  if (err) {
    console.error('SQLite connection failed:', err);
  } else {
    console.log('Connected to SQLite Database');
  }
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Rutas
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ejemplo de consulta a SQLite
app.get('/data', (req, res) => {
  sqliteConnection.all('SELECT * FROM your_table', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Ejemplo de consulta a MySQL
app.get('/data-mysql', (req, res) => {
  mysqlConnection.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
