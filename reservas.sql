DROP TABLE IF EXISTS reservas;

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora INTEGER NOT NULL
);

-- Inserción de datos
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (1, 'ricardo', 'heradisco@gmail.com', '2024-09-09', 5);
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (2, 'ricardo', 'heradisco@gmail.com', '2024-09-16', 5);
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (3, 'sebas', 'heradisco@gmail.com', '2024-09-26', 6);
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (4, 'ricardo', 'heradisco@gmail.com', '2024-09-10', 5);
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (5, 'ricardo', 'heradisco@gmail.com', '2024-09-16', 5);
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (6, 'ricardo', 'heradisco@gmail.com', '2024-09-16', 5);
INSERT INTO reservas (id, nombre, email, fecha, hora) VALUES (7, 'ana', 'rita@gmail.com', '2024-09-23', -6);

COMMIT;
