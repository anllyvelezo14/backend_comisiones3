// const { all } = require("../routes");

const { Rol, Usuario } = require('../models/index');
const UsuarioController = require("./UsuarioController");

module.exports = {

    async all(req, res) {
        let roles = await Rol.findAll();
        res.json(roles);
    },
    async show(req, res) {
        let rol = await Rol.findByPk(req.params.id, {
            attributes: ["nombre"],
            include: {
                model: Usuario,
                as: 'usuarios',
                attributes: ["nombre", "apellido", "email"]
            }
        });

        if (!rol) {
            res.status(404).json({ msg: "Rol no encontrado!" });
        } else {
            res.json(rol);
        }
    }

}