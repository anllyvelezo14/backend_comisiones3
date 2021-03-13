module.exports = {

    create(req, res, next) {
        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización!' })
        }
    },
    update(req, res, next) {
        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización!' })
        }
    },
    delete(req, res, next) {
        if (req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización!' })
        }
    },
}