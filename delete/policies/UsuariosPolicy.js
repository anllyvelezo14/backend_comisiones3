module.exports = {

    async all(req, res, next) {

        if (req.usuario.roles.nombre === "VICERRECTORIA") {
            req.where = { 'estado': 1 };
            next();
        } else if (req.usuario.roles.nombre === "DECANATURA") {
            const facultad = req.usuario.departamentos.facultad
            req.where = { 'estado': 1, '$departamentos.facultad.nombre$': facultad.nombre };
            next();
        } else if (req.usuario.roles.nombre === "COORDINACION") {
            const departamento = req.usuario.departamentos
            req.where = { 'estado': 1, '$departamentos.nombre$': departamento.nombre };
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    },

    async create(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'USUARIO') {
            res.status(401).json({ msg: 'Debes ser administrador para registrar usuarios' })
        } else {
            next();
        }
    },


    async show(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        let idUser = req.user.id;
        let idAuth = req.usuario.id;

        let depAuth = req.usuario.departamentos_id; //depto del autenticado
        let depUser = req.user.departamentos_id; //depto del usuario de la comision

        let facAuth = req.usuario.departamentos.facultades_id;
        let facUser = req.user.departamentos.facultades_id;

        if (idUser === idAuth || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION') || (facAuth === facUser && rolAuth === 'DECANATURA')) {
            next();

        } else {
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    }

};