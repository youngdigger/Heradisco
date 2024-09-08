DROP TABLE IF EXISTS reservas;(


CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100),
  fecha DATE,
  personas INT
);
);

);

-- Inserción de datos
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (1, 'ricardo', 'heradisco@gmail.com', '2024-09-09', 5);
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (2, 'ricardo', 'heradisco@gmail.com', '2024-09-16', 5);
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (3, 'sebas', 'heradisco@gmail.com', '2024-09-26', 6);
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (4, 'ricardo', 'heradisco@gmail.com', '2024-09-10', 5);
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (5, 'ricardo', 'heradisco@gmail.com', '2024-09-16', 5);
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (6, 'ricardo', 'heradisco@gmail.com', '2024-09-16', 5);
INSERT INTO reservas (id, nombre, email, fecha, ) VALUES (7, 'ana', 'rita@gmail.com', '2024-09-23', -6);

COMMIT;
