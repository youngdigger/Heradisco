PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "reservas" (
	" id"	INTEGER,
	"nombre"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"fecha"	TEXT NOT NULL,
	"personas"	INTEGER NOT NULL,
	PRIMARY KEY(" id" AUTOINCREMENT)
);
INSERT INTO reservas VALUES(1,'ricardo','heradisco@gmail.com','2024-09-09',5);
INSERT INTO reservas VALUES(2,'ricardo','heradisco@gmail.com','2024-09-16',5);
INSERT INTO reservas VALUES(3,'sebas','heradisco@gmail.com','2024-09-26',6);
INSERT INTO reservas VALUES(4,'ricardo','heradisco@gmail.com','2024-09-10',5);
INSERT INTO reservas VALUES(5,'ricardo','heradisco@gmail.com','2024-09-16',5);
INSERT INTO reservas VALUES(6,'ricardo','heradisco@gmail.com','2024-09-16',5);
INSERT INTO reservas VALUES(7,'ana','rita@gmail.com','2024-09-23',-6);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('reservas',7);
COMMIT;
