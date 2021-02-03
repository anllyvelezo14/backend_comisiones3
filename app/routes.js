const expres = require('express');
const router = expres.Router();

//IMPORTAR CONTROLLERS
const ComisionController = require('./controllers/ComisionController');
const DocumentoController = require('./controllers/DocumentoController');

//HOME
router.get('/', (req, res) => res.json({ hola: "mundo" }));

//COMISIONES GET
router.get('/comisiones', ComisionController.all)
router.get('/documentos', DocumentoController.all)

module.exports = router;