//Mostrar todos en ShowAllDocsCumpl
module.exports = {

    async show(req, res, next) {

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
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    },
    async update(req, res, next) {
        let idUser = req.cumplidos.comisiones.usuarios_id;
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
        let idUser = req.cumplidos.comisiones.usuarios_id;
        let idAuth = req.usuario.id;

        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else if (idUser === idAuth && (req.finalEstado === 'SOLICITADA' || req.finalEstado === 'RECHAZADA DECANATO')) {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización!\n Solo puedes eliminarla si el estado en que se encuentra es: SOLICITADA o RECHAZADA COORDINACIÓN' })
        }
    },
}