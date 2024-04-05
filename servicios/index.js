const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
