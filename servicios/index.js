const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  // port:"3306",
  password: "111019As",
  database: "cambalaches",
};


app.get('/', (req, res) => {
  res.send('¡Este es un endpoint vacío!');
});


app.post("/registro", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    console.log("Datos del cuerpo de la solicitud:", req.body);

    const {
      primerNombre,
      primerApellido,
      tipo_documento,
      correo,
      documento,
      password,

    } = req.body;

    const passwordEncriptado = await bcrypt.hash(password, 10);
    console.log("Contraseña encriptada:", passwordEncriptado);


    const sql = `INSERT INTO usuarios (tipo_documento , documento, primerNombre, primerApellido, correo, password, idRol)
             VALUES (?, ?, ?, ?, ?, ?, ?)`;

             await connection.execute(sql, [
              tipo_documento,
              documento,
              primerNombre,
              primerApellido,
              correo,
              passwordEncriptado,
              2, // Este es el idRol, se establece en 2
            ]);

    console.log("Usuario creado exitosamente");



    connection.end();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error al insertar el registro:", error);
    res.status(500).json({ error: "Error al insertar el registro" });
  }
});

app.post("/login", async (req, res) => {
  console.log('entra');
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { correo, password } = req.body;

    const [rows] = await connection.execute("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const usuario = rows[0];

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const userInfo = {
      identificador: usuario.identificador,
      primerNombre: usuario.primerNombre,
      primerApellido: usuario.primerApellido,
      correo: usuario.correo,
    };

    connection.end();
    res.status(200).json({ message: "Inicio de sesión exitoso", idRol: usuario.idRol, userInfo: userInfo });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
