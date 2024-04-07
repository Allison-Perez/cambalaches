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
  port:"3306",
  password: "",
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
              2,
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

// INFORMACION PERFIL


app.get('/api/obtener-usuario', async (req, res) => {
    console.log('entra');
  const correo = req.query.correo;
  console.log(correo);
  const sql = `SELECT primerNombre, primerApellido, correo, password FROM usuarios WHERE correo = ?`;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(sql, [correo]);

    await connection.end();
    if (rows.length === 1) {
      const usuario = rows[0];
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario: ' + error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});


// SUBIR PRODUCTOS

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extname);
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ storage: storage });

app.post("/productos", upload.single('imagenOpcional'), async (req, res) => {
  try {
    const { titulo, descripcion, precio, categoria_identificador, estadoProducto_identificador } = req.body;
    const correoUsuario = req.body.correo;
    let urlImagen = '';

    if (!correoUsuario) {
      return res.status(400).json({ error: "El campo 'correo' es obligatorio" });
    }

    const sqlUsuario = `SELECT identificador FROM usuarios WHERE correo = ?`;
    const connectionUsuario = await mysql.createConnection(dbConfig);
    const [rowsUsuario] = await connectionUsuario.execute(sqlUsuario, [correoUsuario]);
    await connectionUsuario.end();

    if (rowsUsuario.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const idUsuario = rowsUsuario[0].identificador;

    if (req.file) {
      urlImagen = 'http://localhost:3000/' + req.file.path;
    } else {
      urlImagen = 'http://localhost:3000/uploads/Chica_Chaqueta_Azul.jpeg';
    }

    const connection = await mysql.createConnection(dbConfig);

    if (titulo && descripcion && idUsuario) {
      const sql = `INSERT INTO productos (titulo, descripcion, precio, categoria_identificador, estadoProducto_identificador, idUsuario, urlImagen, imagenOpcional)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      await connection.execute(sql, [titulo, descripcion, precio, categoria_identificador, estadoProducto_identificador, idUsuario, urlImagen, null]);

      connection.end();

      res.status(201).json({ message: "Producto publicado correctamente" });
    } else {
      res.status(400).json({ error: "Faltan campos obligatorios para crear el producto" });
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
