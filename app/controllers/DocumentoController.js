const { all } = require("../routes");

const { Documento } = require('../models/index')

module.exports = {

    async all(req, res) {
        let documentos = await Documento.findAll({
            include: {
                association: "comision"
            }
        });
        res.json(documentos);
    }
}