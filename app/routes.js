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
const DepartamentoController = require('./controllers/DepartamentoController');
const UsuarioController = require('./controllers/UsuarioController');
const RolController = require('./controllers/RolController');
const FacultadController = require('./controllers/FacultadController');

//HOME
router.get('/', (req, res) => res.json({ hola: "mundo" }));

//GET
router.get('/api/comisiones', ComisionController.all);
router.get('/api/documentos', DocumentoController.all);
router.get('/api/cumplidos', CumplidoController.all);
router.get('/api/estados', EstadoController.all);
router.get('/api/tipos-solicitud', TipoSolicitudController.all);
router.get('/api/usuarios', UsuarioController.all);
router.get('/api/facultades', FacultadController.all);
router.get('/api/roles', RolController.all);
router.get('/api/departamentos', DepartamentoController.all);

//GET BY ID
router.get('/api/cumplidos/:id', CumplidoController.show);
router.get('/api/comisiones/:id', ComisionController.show);
router.get('/api/usuarios/:id', UsuarioController.show);
router.get('/api/facultades/:id', FacultadController.show);
router.get('/api/roles/:id', RolController.show);
router.get('/api/departamentos/:id', DepartamentoController.show);


//CREATE
router.post('/api/cumplidos', CumplidoController.create);
router.post('/api/comisiones', ComisionController.create);
router.post('/api/usuarios', UsuarioController.create);
router.post('/api/facultades', FacultadController.create);
router.post('/api/departamentos', DepartamentoController.create);

//UPDATE
router.patch('/api/cumplidos/:id', CumplidoController.update);
router.patch('/api/comisiones/:id', ComisionController.update);
router.patch('/api/usuarios/:id', UsuarioController.update);
router.patch('/api/facultades/:id', FacultadController.update);
router.patch('/api/departamentos/:id', DepartamentoController.update);

//Registro y login
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

//Delete

router.delete('/api/usuarios/:id', UsuarioController.delete);
router.delete('/api/facultades/:id', FacultadController.delete);
router.delete('/api/departamentos/:id', DepartamentoController.delete);


module.exports = router;