<?php
// Datos de la conexión a PostgreSQL
$host = "c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com";
$dbname = "db45nqrv72v28h";
$user = "u3kgugcfieu7ee";
$port = "5432";
$password = "pad10af0240351ee60c13cd73d4390930866d18150129af3b0986c5d1e7e57ba9";

// Crear conexión a PostgreSQL
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password port=$port");

// Verificar si la conexión fue exitosa
if (!$conn) {
    die("Error de conexión a la base de datos");
}

// Obtener los datos enviados desde el frontend
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$fecha = $_POST['fecha'] ?? '';
$personas = $_POST['personas'] ?? '';

// Validar que todos los campos tengan datos
if (empty($nombre) || empty($email) || empty($fecha) || empty($personas)) {
    die("Todos los campos son obligatorios");
}

// Crear la consulta SQL para insertar los datos
$query = "INSERT INTO reservas (nombre, email, fecha, personas) VALUES ($1, $2, $3, $4)";
$result = pg_query_params($conn, $query, array($nombre, $email, $fecha, $personas));

// Verificar si la inserción fue exitosa
if ($result) {
    echo "Reserva realizada con éxito";
} else {
    echo "Error al realizar la reserva";
}

// Cerrar la conexión
pg_close($conn);
?>
