const expres = require('express');
const router = expres.Router();

//IMPORTAR CONTROLLERS
const ComisionController = require('./controllers/ComisionController');
const DocumentoController = require('./controllers/DocumentoController');
const CumplidoController = require('./controllers/CumplidoController');
const EstadoController = require('./controllers/EstadoController');
const TipoSolicitudController = require('./controllers/TipoSolicitudController');

//HOME
router.get('/', (req, res) => res.json({ hola: "mundo" }));

//COMISIONES GET
router.get('/comisiones', ComisionController.all);
router.get('/documentos', DocumentoController.all);
router.get('/cumplidos', CumplidoController.all);
router.get('/estados', EstadoController.all);
router.get('/tipos-solicitud', TipoSolicitudController.all);

module.exports = router;