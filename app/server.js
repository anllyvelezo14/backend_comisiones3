//Servidor de Express
const express = require('express');
const app = express();
const { sequelize } = require('./models/index')

//PUERTO
const PORT = process.env.PORT || 3000;

//MIDDLEWARE - para rellear el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//RUTAS
app.use(require('./routes'));

//Arrancar el Servidor
app.listen(PORT, () => {
    console.log(`La app arrancó en http://localhost:${PORT}`);

    sequelize.sync({ force: true }).then(() => {
        console.log("Se ha establecido la conexión");
    });
    sequelize.authenticate().then(() => {
        console.log('Estas conectado a la BD');
    })
    process.on('warning', (warning) => {
        console.warn(warning.name); // Print the warning name
        console.warn(warning.message); // Print the warning message
        console.warn(warning.stack); // Print the stack trace
    });

});