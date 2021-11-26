//Servidor de Express
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const { sequelize } = require('./models/index');
const createinitial = require('./middlerwares/Createinitial');
var fileRoutes = require('./file');

// PUERTO
const PORT = process.env.PORT || 3000;

// MIDDLEWARE - para rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// conectar api con frontend
app.use(cors());


app.use(bodyParser.json());

//RUTAS
app.use(require('./routes'));

// UPLOAD
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader( 'Authorization', 'Bearer key',)
    next();
  });
app.use('/file',fileRoutes);

//Arrancar el Servidor
app.listen(PORT, () => {
    console.log(`La app arrancó en http://localhost:${PORT}`);

    sequelize.sync({ force: false }) // true: elimina tablas
        .then(async() => {
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