const expres = require('express');
const router = expres.Router();

//Middlerwares
const auth = require('./middlerwares/auth');

//POLICIES
const ComisionPolicy = require('./policies/ComisionPolicy');
const DocumentoPolicy = require('./policies/DocumentoPolicy')
const CumplidoPolicy = require('./policies/CumplidoPolicy')

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
router.get('/api/comisiones', auth, ComisionController.all);
router.get('/api/documentos', auth, DocumentoController.all);
router.get('/api/cumplidos', auth, CumplidoController.all);
router.get('/api/estados', auth, EstadoController.all);
router.get('/api/comisiones-estados', auth, ComisionHasEstado.all);
router.get('/api/tipos-solicitud', auth, TipoSolicitudController.all);
router.get('/api/usuarios', auth, UsuarioController.all);
router.get('/api/facultades', auth, FacultadController.all);
router.get('/api/roles', auth, RolController.all);
router.get('/api/departamentos', auth, DepartamentoController.all);

//GET BY ID
router.get('/api/comisiones/:id', auth, ComisionController.find, ComisionPolicy.show, ComisionController.show);
router.get('/api/documentos/:id', auth, DocumentoController.find, DocumentoPolicy.show, DocumentoController.show);
router.get('/api/cumplidos/:id', auth, CumplidoController.find, CumplidoPolicy.show, CumplidoController.show);
router.get('/api/tipos-solicitud/:id', auth, TipoSolicitudController.find, TipoSolicitudController.show);
router.get('/api/estados/:id', auth, EstadoController.find, EstadoController.show);
router.get('/api/comisiones-estados/:id', auth, ComisionHasEstado.show);
router.get('/api/usuarios/:id', auth, UsuarioController.show);
router.get('/api/facultades/:id', auth, FacultadController.show);
router.get('/api/roles/:id', auth, RolController.show);
router.get('/api/departamentos/:id', auth, DepartamentoController.show);

//GET NAME
router.get('/api/tipos-solicitud/:nombre', auth, TipoSolicitudController.showName);


//CREATE
router.post('/api/comisiones', auth, ComisionController.create);
router.post('/api/documentos', auth, DocumentoController.create);
router.post('/api/cumplidos', auth, CumplidoController.create);
router.post('/api/tipos-solicitud', auth, TipoSolicitudController.create);
router.post('/api/estados', auth, EstadoController.create);
//router.post('/api/comisiones-estados', auth,ComisionHasEstado.create);
router.post('/api/usuarios', auth, UsuarioController.create);
router.post('/api/facultades', auth, FacultadController.create);
router.post('/api/departamentos', auth, DepartamentoController.create);

//UPDATE
router.patch('/api/comisiones/:id', auth, ComisionController.find, ComisionPolicy.update, ComisionController.update);
router.patch('/api/documentos/:id', auth, DocumentoController.find, DocumentoPolicy.update, DocumentoController.update);
router.patch('/api/cumplidos/:id', auth, CumplidoController.find, CumplidoPolicy.update, CumplidoController.update);
router.patch('/api/tipos-solicitud/:id', auth, TipoSolicitudController.find, TipoSolicitudController.update);
router.patch('/api/estados/:id', auth, EstadoController.find, EstadoController.update);
//router.patch('/api/comisiones-estados/:id', auth,ComisionHasEstado.update);
router.patch('/api/usuarios/:id', auth, UsuarioController.update);
router.patch('/api/facultades/:id', auth, FacultadController.update);
router.patch('/api/departamentos/:id', auth, DepartamentoController.update);

//Delete
router.delete('/api/comisiones/:id', auth, ComisionController.find, ComisionPolicy.delete, ComisionController.delete);
router.delete('/api/documentos/:id', auth, DocumentoController.find, DocumentoPolicy.delete, DocumentoController.delete);
router.delete('/api/cumplidos/:id', auth, CumplidoController.find, CumplidoPolicy.delete, CumplidoController.delete);
router.delete('/api/tipos-solicitud/:id', auth, TipoSolicitudController.find, TipoSolicitudController.delete);
router.delete('/api/estados/:id', auth, EstadoController.find, EstadoController.delete);
//router.delete('/api/comisiones-estados/:id', auth,ComisionHasEstado.delete);
router.delete('/api/usuarios/:id', auth, UsuarioController.delete);
router.delete('/api/facultades/:id', auth, FacultadController.delete);
router.delete('/api/departamentos/:id', auth, DepartamentoController.delete);

//Registro y login
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);


module.exports = router;