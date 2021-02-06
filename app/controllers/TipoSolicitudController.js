const { all } = require("../routes");

const { TipoSolicitud } = require('../models/index')

module.exports = {

    async all(req, res) {
        let tipos_solicitud = await TipoSolicitud.findAll({
            include: "comisiones"
        });
        res.json(tipos_solicitud);
    }
}