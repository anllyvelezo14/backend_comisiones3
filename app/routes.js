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
const ComisionHasEstado = require('./controllers/ComisionHasEstadoController');
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
router.get('/api/comisiones-estados', ComisionHasEstado.all);
router.get('/api/tipos-solicitud', TipoSolicitudController.all);
router.get('/api/usuarios', UsuarioController.all);
router.get('/api/facultades', FacultadController.all);
router.get('/api/roles', RolController.all);
router.get('/api/departamentos', DepartamentoController.all);

//GET BY ID
router.get('/api/comisiones/:id', ComisionController.show);
router.get('/api/documentos/:id', DocumentoController.show);
router.get('/api/cumplidos/:id', CumplidoController.show);
router.get('/api/tipos-solicitud/:id', TipoSolicitudController.show);
router.get('/api/estados/:id', EstadoController.show);
router.get('/api/comisiones-estados/:id', ComisionHasEstado.show);
router.get('/api/usuarios/:id', UsuarioController.show);
router.get('/api/facultades/:id', FacultadController.show);
router.get('/api/roles/:id', RolController.show);
router.get('/api/departamentos/:id', DepartamentoController.show);

//GET NAME
router.get('/api/tipos-solicitud/:nombre', TipoSolicitudController.showName);


//CREATE
router.post('/api/comisiones', ComisionController.create);
router.post('/api/documentos', DocumentoController.create);
router.post('/api/cumplidos', CumplidoController.create);
router.post('/api/tipos-solicitud', TipoSolicitudController.create);
router.post('/api/estados', EstadoController.create);
//router.post('/api/comisiones-estados', ComisionHasEstado.create);
router.post('/api/usuarios', UsuarioController.create);
router.post('/api/facultades', FacultadController.create);
router.post('/api/departamentos', DepartamentoController.create);

//UPDATE
router.patch('/api/comisiones/:id', ComisionController.update);
router.patch('/api/documentos/:id', DocumentoController.update);
router.patch('/api/cumplidos/:id', CumplidoController.update);
router.patch('/api/tipos-solicitud/:id', TipoSolicitudController.update);
router.patch('/api/estados/:id', EstadoController.update);
//router.patch('/api/comisiones-estados/:id', ComisionHasEstado.update);
router.patch('/api/usuarios/:id', UsuarioController.update);
router.patch('/api/facultades/:id', FacultadController.update);
router.patch('/api/departamentos/:id', DepartamentoController.update);

//Registro y login
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

//Delete
router.delete('/api/comisiones/:id', ComisionController.delete);
router.delete('/api/documentos/:id', DocumentoController.delete);
router.delete('/api/cumplidos/:id', CumplidoController.delete);
router.delete('/api/tipos-solicitud/:id', TipoSolicitudController.delete);
router.delete('/api/estados/:id', EstadoController.delete);
//router.delete('/api/comisiones-estados/:id', ComisionHasEstado.delete);
router.delete('/api/usuarios/:id', UsuarioController.delete);
router.delete('/api/facultades/:id', FacultadController.delete);
router.delete('/api/departamentos/:id', DepartamentoController.delete);


module.exports = router;