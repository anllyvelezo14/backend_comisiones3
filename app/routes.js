const expres = require('express');
const router = expres.Router();

//Middlerwares
const auth = require('./middlerwares/auth');

//IMPORTAR CONTROLLERS
const AuthController = require('../app/controllers/AuthController');
const ComisionController = require('./controllers/ComisionController');
const DocumentoController = require('./controllers/DocumentoController');
const CumplidoController = require('./controllers/CumplidoController');
const EstadoController = require('./controllers/EstadoController');
const TipoSolicitudController = require('./controllers/TipoSolicitudController');

//HOME
router.get('/', (req, res) => res.json({ hola: "mundo" }));

//GET
router.get('/api/comisiones', ComisionController.all);
router.get('/api/documentos', DocumentoController.all);
router.get('/api/cumplidos', CumplidoController.all);
router.get('/api/estados', EstadoController.all);
router.get('/api/tipos-solicitud', TipoSolicitudController.all);

//GET BY ID
router.get('/api/cumplidos/:id', CumplidoController.show);
router.get('/api/comisiones/:id', ComisionController.show);


//CREATE
router.post('/api/cumplidos', CumplidoController.create);
router.post('/api/comisiones', ComisionController.create);

//UPDATE
router.patch('/api/cumplidos/:id', CumplidoController.update);
router.patch('/api/comisiones/:id', ComisionController.update);

//Registro y login
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

module.exports = router;