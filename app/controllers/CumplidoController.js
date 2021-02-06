const { all } = require("../routes");

const { Cumplido } = require('../models/index')

module.exports = {

    async all(req, res) {
        let cumplidos = await Cumplido.findAll({
            include: {
                association: "comisiones"
            }
        });
        res.json(cumplidos);
    }
}