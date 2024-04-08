const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const { log } = require("console");
const { clearScreenDown } = require("readline");
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


app.get('/api/categorias', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM categorias');
    connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la lista de categorías:', error);
    res.status(500).json({ error: 'Error al obtener la lista de categorías' });
  }
});

app.get('/api/estadoProducto', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM estadoProducto');
    connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la lista de estadoProducto:', error);
    res.status(500).json({ error: 'Error al obtener la lista de estadoProducto' });
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
    let { correo } = req.body
    correo = correo.replace(/['"]+/g, '');

    const { titulo, descripcion, precio, categoria, estado } = req.body;
    let urlImagen = '';

    if (!correo) {
      console.log("El campo 'correo' es obligatorio");
      return res.status(400).json({ error: "El campo 'correo' es obligatorio" });
    }

    const sqlUsuario = `SELECT identificador FROM usuarios WHERE correo = ?`;
    const connectionUsuario = await mysql.createConnection(dbConfig);
    const [rowsUsuario] = await connectionUsuario.execute(sqlUsuario, [correo]);
    await connectionUsuario.end();

    if (rowsUsuario.length === 0) {
      console.log('Usuario no encontrado');
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
      console.log('Insertando producto en la base de datos...');
      const sql = `INSERT INTO productos (titulo, descripcion, precio, categoria_identificador, estadoProducto_identificador, idUsuario, urlImagen, imagenOpcional)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      await connection.execute(sql, [titulo, descripcion, precio, categoria, estado, idUsuario, urlImagen, null]);

      connection.end();


      console.log('Producto creado correctamente');
      res.status(201).json({ message: "Producto publicado correctamente" });
    } else {
      console.log('Faltan campos obligatorios para crear el producto');
      res.status(400).json({ error: "Faltan campos obligatorios para crear el producto" });
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM usuarios');
    connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
  }
});

// TRAER MIS PRODUCTOS SEGUN USUARIO

app.get('/api/obtenerProductos/:correo', async (req, res) => {
  try {
    const correo = req.params.correo.replace(/"/g, '');
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT g.*, u.primerNombre, u.primerApellido, cat.nombre AS categoria, est.nombre AS estado
    FROM productos g
    JOIN usuarios u ON g.idUsuario = u.identificador
    JOIN categorias cat ON g.categoria_identificador = cat.identificador
    JOIN estadoProducto est ON g.estadoProducto_identificador = est.identificador
    WHERE correo = ?`;


    const [rows] = await connection.execute(sql, [correo]);
    console.log('Correo recibido:', correo);


    connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las productos por correo:', error);
    res.status(500).json({ error: 'Error al obtener las productos por correo' });
  }
});

// TRAER TODOS LOS PRODUCTOS

app.get('/obtenerProductos', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
      SELECT g.*, u.primerNombre, u.primerApellido, cat.nombre AS categoria, est.nombre AS estado
      FROM productos g
      JOIN usuarios u ON g.idUsuario = u.identificador
      JOIN categorias cat ON g.categoria_identificador = cat.identificador
      JOIN estadoProducto est ON g.estadoProducto_identificador = est.identificador`;

    const [rows] = await connection.execute(sql);
    connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/api/productos-categoria', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const sqlQuery = `
      SELECT
          c.nombre AS categoria,
          COUNT(*) AS cantidad_productos
      FROM
          productos p
      JOIN
          categorias c ON p.categoria_identificador = c.identificador
      GROUP BY
          c.nombre
      ORDER BY
          cantidad_productos DESC;
    `;

    const [rows] = await connection.execute(sqlQuery);

    connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los productos por categoría:', error);
    res.status(500).json({ error: 'Error al obtener los productos por categoría' });
  }
});


app.get('/api/productos-estado', async (req, res) => {
  try {

    const connection = await mysql.createConnection(dbConfig);

    const sqlQuery = `
      SELECT
          ep.nombre AS estado,
          COUNT(*) AS cantidad_productos
      FROM
          productos p
      JOIN
          estadoProducto ep ON p.estadoProducto_identificador = ep.identificador
      GROUP BY
          ep.nombre;
    `;

    const [rows] = await connection.execute(sqlQuery);

    connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los productos por estado:', error);
    res.status(500).json({ error: 'Error al obtener los productos por estado' });
  }
});

app.get('/api/productos-por-usuario', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const sqlQuery = `
      SELECT u.primerNombre, COUNT(*) AS cantidad_productos
      FROM usuarios u
      JOIN productos p ON u.identificador = p.idUsuario
      GROUP BY u.primerNombre
      ORDER BY cantidad_productos DESC;
    `;

    const [rows] = await connection.execute(sqlQuery);

    connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los productos por usuario:', error);
    res.status(500).json({ error: 'Error al obtener los productos por usuario' });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    console.log('entra')
    const idProducto = req.params.id;
    console.log(idProducto);
    const { titulo, descripcion, precio, categoria_identificador, estadoProducto_identificador } = req.body;

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM productos WHERE identificador = ?', [idProducto]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar el producto en la base de datos
    const updateQuery = `UPDATE productos
                         SET titulo = ?, descripcion = ?, precio = ?, categoria_identificador = ?, estadoProducto_identificador = ?
                         WHERE identificador = ?`;
    const updateValues = [titulo, descripcion, precio, categoria_identificador, estadoProducto_identificador, idProducto];

    const connectionUpdate = await mysql.createConnection(dbConfig);
    await connectionUpdate.execute(updateQuery, updateValues);
    await connectionUpdate.end();

    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

app.delete('/api/productos/:identificador', async (req, res) => {
  try {
    const identificadorProducto = req.params.identificador;

    // Verificar si el producto existe
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM productos WHERE identificador = ?', [identificadorProducto]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Eliminar el producto de la base de datos
    const deleteQuery = 'DELETE FROM productos WHERE identificador = ?';
    const connectionDelete = await mysql.createConnection(dbConfig);
    await connectionDelete.execute(deleteQuery, [identificadorProducto]);
    await connectionDelete.end();

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

