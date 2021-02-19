// comision.usuarios_id viene del controller (por ruta), 
//usuario.roles y usuario.id vienen del auth.js
module.exports = {

    // showAll(req, res, next) {
    //     if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {
    //         next();

    //     } else {
    //         res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
    //     }
    // },

    show(req, res, next) {

        //FALTA QUE DECANATURA PUEDA VER LOS DE LA MISMA FACULTAD
        let rolAuth = req.usuario.roles.nombre;
        let idUser = req.comision.usuarios_id;
        let idAuth = req.usuario.id;
        let depAuth = req.usuario.departamentos_id;
        let depUser = req.comision.usuarios.departamentos_id;

        if (idAuth === idUser || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION')) {

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