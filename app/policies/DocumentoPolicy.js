module.exports = {

    async show(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;
        let idUser = req.documentos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;
        let depAuth = req.usuario.departamentos_id;
        let depUser = req.documentos.comisiones.usuarios.departamentos_id;
        let facAuth = req.usuario.departamentos.facultades_id;
        let facUser = req.documentos.comisiones.usuarios.departamentos.facultades_id;


        if (idUser === idAuth || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION') || (facAuth === facUser && rolAuth === 'DECANATURA')) {
            next();

        } else {
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    },

    async update(req, res, next) {
        let idUser = req.documentos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;

        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else if (idUser === idAuth && req.vistoBueno.length === 0) {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización! \n Si tu comisión tiene el VISTO BUENO, no puedes modificarla' })
        }
    },

    async delete(req, res, next) {
        let idUser = req.documentos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;

        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else if (idUser === idAuth && req.vistoBueno.length === 0) {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización!\n Si tu comisión tiene el VISTO BUENO, no puedes eliminarla' })
        }
    },
}