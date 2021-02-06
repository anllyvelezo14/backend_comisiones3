const { all } = require("../routes");

const { Estado } = require('../models/index')

module.exports = {

    async all(req, res) {
        let estados = await Estado.findAll();
        res.json(estados);
    }
}