const { Departamento, Comision } = require('../models/index')


module.exports = {

    async show(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;
        let depAuth = req.usuario.departamentos_id;
        let depUser = req.documentos.comisiones.usuarios.departamentos_id;
        let idUser = req.documentos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;

        if (idUser == idAuth || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION')) {
            next();
        } else {
            let deptoUser = await Departamento.findByPk(req.documentos.comisiones.usuarios.departamentos_id);
            let deptoAuth = await Departamento.findByPk(req.usuario.departamentos_id);

            let facAuth = deptoAuth.facultades_id;
            let facUser = deptoUser.facultades_id;

            if (facAuth == facUser && rolAuth === 'DECANATURA') {
                next();

            } else {
                res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
            }

        }
    },
    update(req, res, next) {
        if (found(req) || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    delete(req, res, next) {
        if (found(req) || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}