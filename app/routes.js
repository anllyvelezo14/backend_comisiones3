const expres = require('express');
const router = expres.Router();

//Middlerwares
// const auth = require('./middlerwares/auth');


//POLICIES
// const ComisionPolicy = require('./policies/ComisionPolicy');
// const DocumentoPolicy = require('./policies/DocumentoPolicy')
// const CumplidoPolicy = require('./policies/CumplidoPolicy');
// const TipoSolicitudPolicy = require('./policies/TipoSolicitudPolicy');
// const EstadoPolicy = require('./policies/EstadoPolicy');
// const UsuariosPolicy = require('./policies/UsuariosPolicy');
// const ShowAllDocsCumpl = require('./policies/ShowAllDocsCumpl');
// const ComisionHasEstadoPolicy = require('./policies/ComisionHasEstadoPolicy');

//CONTROLLERS
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
const ComisionHasEstadoController = require('./controllers/ComisionHasEstadoController');
const FileController = require('./controllers/FileController');


//HOME
router.get('/', (req, res) => res.json({ hola: "mundo" }));


//GET
router.get('/api/comisiones', ComisionController.all);
router.get('/api/documentos');
router.get('/api/cumplidos');
router.get('/api/estados');
router.get('/api/comisiones-estados');
router.get('/api/tipos-solicitud');
router.get('/api/usuarios');
router.get('/api/facultades');
router.get('/api/roles');
router.get('/api/departamentos');

//GET BY ID
router.get('/api/comisiones/:id');
router.get('/api/documentos/:id');
router.get('/api/cumplidos/:id');
router.get('/api/tipos-solicitud/:id');
router.get('/api/estados/:id');
router.get('/api/comisiones-estados/:id');
router.get('/api/usuarios/:id');
router.get('/api/facultades/:id');
router.get('/api/roles/:id')
router.get('/api/departamentos/:id');

//GET NAME
router.get('/api/tipos-solicitud/:nombre');


//CREATE
router.post('/api/comisiones');
router.post('/api/documentos');
router.post('/api/cumplidos');
router.post('/api/tipos-solicitud');
router.post('/api/estados');
router.post('/api/comisiones-estados');//, ComisionHasEstadoController.findComisionbyId);
router.post('/api/usuarios');
//router.post('/api/facultades', auth, FacultadController.create);
//router.post('/api/departamentos', auth, DepartamentoController.create);



//UPDATE
router.patch('/api/comisiones/:id');
router.patch('/api/documentos/:id');
router.patch('/api/cumplidos/:id');
router.patch('/api/tipos-solicitud/:id');
router.patch('/api/estados/:id');
//router.patch('/api/comisiones-estados/:id', auth, ComisionHasEstadoController.update);
router.patch('/api/usuarios/:id');
//router.patch('/api/facultades/:id', auth, FacultadController.update);
//router.patch('/api/departamentos/:id', auth, DepartamentoController.update);


//DELETE
router.delete('/api/comisiones/:id');
router.delete('/api/documentos/:id');
router.delete('/api/cumplidos/:id');
router.delete('/api/tipos-solicitud/:id');
router.delete('/api/estados/:id');
router.delete('/api/comisiones-estados/:id');
//router.delete('/api/facultades/:id', auth, FacultadController.delete);
//router.delete('/api/departamentos/:id', auth, DepartamentoController.delete);


//Desactive and active users
router.patch('/api/usuarios/desactive/:id');
router.patch('/api/usuarios/active/:id');

// UPLOAD AND DOWNLOAD FILES
router.post("/upload");
router.get("/files");
router.get("/files/:name");


//Registro y login
router.post('/api/signin');
router.post('/api/signup');
//router.post('/api/recuperar-contrasena', AuthController.changePassword);
router.patch('/api/recuperar-contrasena')


module.exports = router;