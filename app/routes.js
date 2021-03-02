const expres = require('express');
const router = expres.Router();

//Middlerwares
const auth = require('./middlerwares/auth');

//POLICIES
const ComisionPolicy = require('./policies/ComisionPolicy');
const DocumentoPolicy = require('./policies/DocumentoPolicy')
const CumplidoPolicy = require('./policies/CumplidoPolicy');
const TipoSolicitudPolicy = require('./policies/TipoSolicitudPolicy');
const EstadoPolicy = require('./policies/EstadoPolicy');

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
router.get('/api/comisiones', auth, ComisionPolicy.showAll, ComisionController.all);
router.get('/api/documentos', auth, DocumentoController.all);
router.get('/api/cumplidos', auth, CumplidoController.all);
router.get('/api/estados', auth, EstadoController.all);
router.get('/api/comisiones-estados', auth, ComisionHasEstado.all);
router.get('/api/tipos-solicitud', auth, TipoSolicitudController.all);
router.get('/api/usuarios', UsuarioController.all);
router.get('/api/facultades', FacultadController.all);
router.get('/api/roles', RolController.all);
router.get('/api/departamentos', DepartamentoController.all);

//GET BY ID
router.get('/api/comisiones/:id', auth, ComisionController.find, ComisionPolicy.show, ComisionController.show);
router.get('/api/documentos/:id', auth, DocumentoController.find, DocumentoPolicy.show, DocumentoController.show);
router.get('/api/cumplidos/:id', auth, CumplidoController.find, CumplidoPolicy.show, CumplidoController.show);
router.get('/api/tipos-solicitud/:id', auth, TipoSolicitudController.find, TipoSolicitudController.show);
router.get('/api/estados/:id', auth, EstadoController.find, EstadoController.show);
router.get('/api/comisiones-estados/:id', auth, ComisionHasEstado.show);
router.get('/api/usuarios/:id', UsuarioController.show);
router.get('/api/facultades/:id', FacultadController.show);
router.get('/api/roles/:id', RolController.show);
router.get('/api/departamentos/:id', DepartamentoController.show);

//GET NAME
router.get('/api/tipos-solicitud/:nombre', auth, TipoSolicitudController.showName);