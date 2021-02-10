const { all } = require("../routes");

const { Rol } = require('../models/index')

module.exports = {

    async all(req, res) {
        let roles = await Rol.findAll({
            include: "usuarios"
        });
        res.json(roles);
    },
    async show(req, res) {
        let rol = await Rol.findByPk(req.params.id);

        if (!rol) {
            res.status(404).json({ msg: "Rol no encontrado!" });
        } else {
            res.json(rol);
        }
    }

}