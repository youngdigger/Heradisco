const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a MySQL (ejemplo con async/await)
async function connectToMySQL() {
  try {
    const connection = await mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
    console.log('Connected to MySQL');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  }
}

// Función para ejecutar una consulta SQL
async function executeQuery(connection, sql, params) {
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// Ruta para obtener datos de MySQL
app.get('/data-mysql', async (req, res) => {
  const connection = await connectToMySQL();
  try {
    const [results] = await connection.execute('SELECT * FROM your_table');
    res.json(results);
  } catch (error) {
    console.error('Error fetching data from MySQL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});

// Resto de tu código...
const mysql = require('mysql2');

// Datos de conexión (reemplázalos con tus propios datos)
const pool = mysql.createPool({
  host:  us-cluster-east-o01.k8s.cleardb.net
  ,
  user: bfac6564b0a035,
  password: admin
  ,
  database: heroku 
});

// Ejecutar una consulta
pool.query('SELECT * FROM usuarios', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results); // Procesar los resultados
  }
});

// Cerrar la conexión cuando ya no sea necesaria
pool.end();