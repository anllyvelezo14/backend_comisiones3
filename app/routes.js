const expres = require('express');
const router = expres.Router();

//Middlerwares
<<<<<<< HEAD
const auth = require('./middlerwares/auth');
const upload = require('./middlerwares/upload');
=======
// const auth = require('./middlerwares/auth');

>>>>>>> d1410144e3310d9b67fd23d9d6a86556bce65f54

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
<<<<<<< HEAD
router.get('/api/comisiones/:id', auth, ComisionController.find, ComisionPolicy.show, ComisionController.show);
router.get('/api/cumplidos/:id', auth, CumplidoController.find, CumplidoPolicy.show, CumplidoController.show);
router.get('/api/tipos-solicitud/:id', auth, TipoSolicitudController.find, TipoSolicitudController.show);
router.get('/api/estados/:id', auth, EstadoController.find, EstadoController.show);
router.get('/api/comisiones-estados/:id', auth, ComisionHasEstadoController.find, ComisionHasEstadoPolicy.show, ComisionHasEstadoController.show);
router.get('/api/usuarios/:id', auth, UsuarioController.find, UsuariosPolicy.show, UsuarioController.show);
router.get('/api/facultades/:id', auth, FacultadController.show);
router.get('/api/roles/:id', auth, RolController.show)
router.get('/api/departamentos/:id', auth, DepartamentoController.show);
=======
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
>>>>>>> d1410144e3310d9b67fd23d9d6a86556bce65f54

//GET NAME
router.get('/api/tipos-solicitud/:nombre');


//CREATE
<<<<<<< HEAD
router.post('/api/comisiones', auth, ComisionPolicy.create, ComisionController.create, ComisionHasEstadoController.createSolicitada);
router.post('/api/cumplidos', auth, CumplidoController.create);
router.post('/api/tipos-solicitud', auth, TipoSolicitudPolicy.create, TipoSolicitudController.create);
router.post('/api/estados', auth, EstadoPolicy.create, EstadoController.create);
router.post('/api/comisiones-estados', auth, ComisionHasEstadoPolicy.create, ComisionHasEstadoController.create); //, ComisionHasEstadoController.findComisionbyId);
router.post('/api/usuarios', auth, UsuariosPolicy.create, UsuarioController.create);
=======
router.post('/api/comisiones');
router.post('/api/documentos');
router.post('/api/cumplidos');
router.post('/api/tipos-solicitud');
router.post('/api/estados');
router.post('/api/comisiones-estados');//, ComisionHasEstadoController.findComisionbyId);
router.post('/api/usuarios');
>>>>>>> d1410144e3310d9b67fd23d9d6a86556bce65f54
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
<<<<<<< HEAD
//router.post("/upload", auth, FileController.upload);
router.post("/upload", auth, upload.single("file"), DocumentoController.create)
router.get('/api/documentos/:id', auth, DocumentoController.find, DocumentoPolicy.show, DocumentoController.show);
//router.get("/files",auth, FileController.getListFiles);
// router.get("/files/:name",auth, FileController.download);
=======
router.post("/upload");
router.get("/files");
router.get("/files/:name");
>>>>>>> d1410144e3310d9b67fd23d9d6a86556bce65f54


//Registro y login
router.post('/api/signin');
router.post('/api/signup');
//router.post('/api/recuperar-contrasena', AuthController.changePassword);
router.patch('/api/recuperar-contrasena')


module.exports = router;