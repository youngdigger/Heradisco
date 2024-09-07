<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Datos de la conexión a PostgreSQL
$host = "c6sfjnr30ch74e.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com";
$dbname = "db45nqrv72v28h"; // Asegúrate de que el nombre de la base de datos sea correcto
$user = "u3kgugcfieu7ee";
$port = "5432";
$password = "pad10af0240351ee60c13cd73d4390930866d18150129af3b0986c5d1e7e57ba9";

// Crear conexión a PostgreSQL
$conn = pg_connect("host=$host dbname=$dbname user=$user password=$password port=$port");

// Verificar si la conexión fue exitosa
if (!$conn) {
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit;
}

// Obtener los datos de los argumentos de línea de comandos
$nombre = $argv[1];
$email = $argv[2];
$fecha = $argv[3];
$personas = $argv[4];

// Validar que todos los campos tengan datos
if (empty($nombre) || empty($email) || empty($fecha) || empty($personas)) {
    echo json_encode(["error" => "Todos los campos son obligatorios"]);
    exit;
}

// Crear la consulta SQL para insertar los datos
$query = "INSERT INTO reservas (nombre, email, fecha, personas) VALUES ($1, $2, $3, $4)";
$result = pg_query_params($conn, $query, array($nombre, $email, $fecha, $personas));

// Verificar si la inserción fue exitosa
if ($result) {
    echo json_encode(["success" => "Reserva realizada con éxito"]);
} else {
    echo json_encode(["error" => "Error al realizar la reserva"]);
}

// Cerrar la conexión
pg_close($conn);
?>
