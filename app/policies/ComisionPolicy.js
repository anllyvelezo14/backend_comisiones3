const { Usuario } = require('../models/index');

module.exports = {

    show(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id || req.usuario.roles.nombre === 'ADMIN') {
            // usuario.roles del auth.js
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
        }
    },
    update(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id) {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    delete(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id) {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}