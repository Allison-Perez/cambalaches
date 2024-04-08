
create database cambalaches;
USE cambalaches;

CREATE TABLE rol (
  identificador int NOT NULL AUTO_INCREMENT,
  nombre varchar(30) NOT NULL,
  PRIMARY KEY (identificador)
);

INSERT INTO `rol` (`nombre`) VALUES
('administrador'),
('usuario');


CREATE TABLE `usuarios` (
  `identificador` int NOT NULL AUTO_INCREMENT,
  `tipo_documento` varchar(50)  NOT NULL,
  `documento` int NOT NULL,
  `primerNombre` varchar(25) NOT NULL,
  `primerApellido` varchar(25) NOT NULL,
  `correo` varchar(35) NOT NULL,
  `password` varchar(200) NOT NULL,
  `idRol` int NOT NULL,
  PRIMARY KEY (`identificador`),
  FOREIGN KEY (`idRol`) REFERENCES `rol` (`identificador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `categorias` (
  `identificador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,

  PRIMARY KEY (`identificador`)
);

INSERT INTO `categorias` (`nombre`) VALUES
('Femenino'),
('Masculino'),
('Electrónicos'),
('Joyería');

CREATE TABLE `estadoProducto` (
  `identificador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`identificador`)
);

INSERT INTO `estadoProducto` (`nombre`) VALUES
('disponible'),
('no disponible');


CREATE TABLE `productos` (
  `identificador` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `precio` int NOT NULL,
  `categoria_identificador` int NOT NULL,
  `image` varchar(200) NOT NULL,
  `estadoProducto_identificador` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`identificador`),
  FOREIGN KEY (`categoria_identificador`) REFERENCES `categorias` (`identificador`),
  FOREIGN KEY (`estadoProducto_identificador`) REFERENCES `estadoProducto` (`identificador`),
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`identificador`)
);


ALTER TABLE productos
ADD COLUMN imagenOpcional VARCHAR(255);

ALTER TABLE productos
ADD COLUMN urlImagen VARCHAR(255);

ALTER TABLE productos
DROP COLUMN image;
