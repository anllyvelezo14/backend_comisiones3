module.exports = {
    async showAll(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {
            next();

        } else if (rolAuth === 'COORDINACION') {
            const depAuth = req.usuario.departamentos.id
            req.where = { '$intermediate_comisiones.usuarios.departamentos.id$': depAuth };
            next();

        } else if (rolAuth === 'DECANATURA') {
            const facAuth = req.usuario.departamentos.facultad.id
            req.where = { '$intermediate_comisiones.usuarios.departamentos.facultad.id$': facAuth };
            next();

        } else {
            const idAuth = req.usuario.id
            req.where = { '$intermediate_comisiones.usuarios.id$': idAuth };
            next();
        }
    },
    async show(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;
        let idUser = req.comisiones_has_estados.intermediate_comisiones.usuarios_id;
        let idAuth = req.usuario.id;
        let depAuth = req.usuario.departamentos_id;
        let depUser = req.comisiones_has_estados.intermediate_comisiones.usuarios.departamentos_id;
        let facAuth = req.usuario.departamentos.facultades_id;
        let facUser = req.comisiones_has_estados.intermediate_comisiones.usuarios.departamentos.facultades_id;

        if (idUser === idAuth || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION') || (facAuth === facUser && rolAuth === 'DECANATURA')) {
            next();

        } else {
            res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
        }
    },

    async create(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || rolAuth === 'DECANATURA' || rolAuth === 'COORDINACION') {
            next();
        } else {
            res.status(401).json({ msg: 'No tienes Autorización!' })
        }
    },
    async update(req, res, next) {
        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || rolAuth === 'DECANATURA' || rolAuth === 'COORDINACION') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    async delete(req, res, next) {
        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || rolAuth === 'DECANATURA') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}