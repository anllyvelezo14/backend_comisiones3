const { Departamento, Usuario, Comision } = require('../models/index');

module.exports = {

    async showAll(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {

            next();

        } else if (rolAuth === 'COORDINACION') {

            const depAuth = req.usuario.departamentos.nombre
            req.where = { '$usuarios.departamentos.nombre$': depAuth };
            next();


        } else if (rolAuth === 'DECANATURA') {

            const facAuth = req.usuario.departamentos.facultad.nombre
            req.where = { '$usuarios.departamentos.facultad.nombre$': facAuth };
            next();

        } else {
            res.json(req.usuario.comisiones);
        }
    },

    show(req, res, next) {

        // comision.usuarios_id viene del controller (por ruta), 
        //usuario.roles y usuario.id vienen del auth.js

        let rolAuth = req.usuario.roles.nombre;
        let idUser = req.comisiones.usuarios_id;
        let idAuth = req.usuario.id;
        let depAuth = req.usuario.departamentos_id; //depto del autenticado
        let depUser = req.comisiones.usuarios.departamentos_id; //depto del usuario de la comision
        let facAuth = req.usuario.departamentos.facultades_id;
        let facUser = req.comisiones.usuarios.departamentos.facultades_id;

        if (idUser === idAuth || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION') || (facAuth === facUser && rolAuth === 'DECANATURA')) {
            next();

        } else {
            res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
        }
    },
    update(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    delete(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}