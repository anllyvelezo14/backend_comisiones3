module.exports = {

    async showAll(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {
            next();

        } else if (rolAuth === 'COORDINACION') {
            const depAuth = req.usuario.departamentos.id //departamento del autenticado
            console.log(depAuth);
            req.where = { '$usuarios.estado$': 1, '$usuarios.departamentos.id$': depAuth };
            next();

        } else if (rolAuth === 'DECANATURA') {
            const facAuth = req.usuario.departamentos.facultad.id
            req.where = { '$usuarios.estado$': 1, '$usuarios.departamentos.facultad.id$': facAuth };
            next();

        } else {
            res.json(req.usuario.comisiones);
        }
    },

    async show(req, res, next) {

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
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    },

    async create(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'USUARIO') {
            next();
        } else {
            res.status(401).json({ msg: 'Debes autenticarte con tu email personal para crear solicitudes' })
        }
    },


    async update(req, res, next) {
        let idUser = req.comisiones.usuarios_id;
        let idAuth = req.usuario.id;

        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else if (idUser === idAuth && (req.finalEstado === 'SOLICITADA' || req.finalEstado === 'RECHAZADA DECANATO')) {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización! \n Solo puedes editarla si el estado en que se encuentra es: SOLICITADA o RECHAZADA COORDINACIÓN' })
        }
    },

    async delete(req, res, next) {
        let idUser = req.comisiones.usuarios_id;
        let idAuth = req.usuario.id;

        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else if (idUser === idAuth && (req.finalEstado === 'SOLICITADA' || req.finalEstado === 'RECHAZADA DECANATO')) {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización! \n Solo puedes eliminarla si el estado en que se encuentra es: SOLICITADA o RECHAZADA COORDINACIÓN' })
        }
    },
}