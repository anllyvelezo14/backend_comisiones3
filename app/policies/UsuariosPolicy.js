const { find } = require('../controllers/ComisionController');
const { Usuario, Rol, Departamento, Facultad } = require('../models/index');

module.exports = {

    async all(req, res, next) {
        console.log(req.usuario.roles.nombre);
        if (req.usuario.roles.nombre === "DECANATURA") {
            const facultad = req.usuario.departamentos.facultad
            req.where = { 'estado': 1, '$departamentos.facultad.nombre$': facultad.nombre };
            next();
        } else if (req.usuario.roles.nombre === "COORDINACION") {
            const departamento = req.usuario.departamentos
            req.where = { 'estado': 1, '$departamentos.nombre$': departamento.nombre };
            next();
        } else if (req.usuario.roles.nombre === "VICERRECTORIA") {
            req.where = { 'estado': 1 };
            next();

        } else {
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    },
    async show(req, res, next) {
        req.usuarioid = await Usuario.findByPk(req.params.id, {
            include: [{
                    model: Rol,
                    as: "roles",
                    attributes: ["nombre"]
                }, {
                    model: Departamento,
                    as: 'departamentos',
                    attributes: ["nombre"],
                    include: [{
                        model: Facultad,
                        as: 'facultad',
                        attributes: ["nombre"],
                    }]

                },
                "comisiones"
            ]
        });
        if (req.usuario.id === req.params.id) {
            next();
        } else if (req.usuario.roles.nombre === "DECANATURA") {
            if (req.usuario.departamentos.facultad.nombre === req.usuarioid.departamentos.facultad.nombre) {
                next();
            } else {
                res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
            }

        } else if (req.usuario.roles.nombre === "COORDINACION") {
            if (req.usuario.departamentos.nombre === req.usuarioid.departamentos.nombre) {
                next();
            } else {
                res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
            }

        } else if (req.usuario.roles.nombre === "VICERRECTORIA") {
            next();
        } else {
            res.status(401).json({ msg: '¡No tienes autorización para ver esta página!' })
        }
    }

};