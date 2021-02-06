const { all } = require("../routes");

const { Comision } = require('../models/index')

module.exports = {

    async all(req, res) {
        let comsiones = await Comision.findAll({
            include: ["cumplidos", "documentos", "tipos_solicitud"]
        });
        res.json(comsiones);
    }
}