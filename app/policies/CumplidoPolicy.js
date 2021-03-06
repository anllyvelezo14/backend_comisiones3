module.exports = {

    showAll(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {
            next();

        } else if (rolAuth === 'COORDINACION') {
            const depAuth = req.usuario.departamentos.nombre
            req.where = { '$comisiones.usuarios.departamentos.nombre$': depAuth };
            next();

        } else if (rolAuth === 'DECANATURA') {
            const facAuth = req.usuario.departamentos.facultad.nombre
            req.where = { '$comisiones.usuarios.departamentos.facultad.nombre$': facAuth };
            next();

        } else {
            const idAuth = req.usuario.id
            req.where = { '$comisiones.usuarios.id$': idAuth };
            next();

        }
    },

    show(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;
        let idUser = req.cumplidos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;
        let depAuth = req.usuario.departamentos_id;
        let depUser = req.cumplidos.comisiones.usuarios.departamentos_id;
        let facAuth = req.usuario.departamentos.facultades_id;
        let facUser = req.cumplidos.comisiones.usuarios.departamentos.facultades_id;


        if (idUser === idAuth || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION') || (facAuth === facUser && rolAuth === 'DECANATURA')) {
            next();

        } else {
            res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
        }
    },
    update(req, res, next) {
        let idUser = req.documentos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;
        if (idUser === idAuth || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    delete(req, res, next) {
        let idUser = req.documentos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;
        if (idUser === idAuth || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}