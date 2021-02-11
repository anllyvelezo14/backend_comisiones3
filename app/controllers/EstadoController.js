const { all } = require("../routes");

const { Estado } = require('../models/index')

module.exports = {

    //SHOW ALL
    async all(req, res) {
        let estados = await Estado.findAll();
        res.json(estados);
    },

    //SHOW ID
    async show(req, res) {
        let estados = await Estado.findByPk(req.params.id);

        if (!estados) {
            res.status(404).json({ msg: "Estado no encontrado!" });
        } else {
            res.json(estados);
        }
    },

    //CREATE
    async create(req, res) {
        const estados = await Estado.build({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
        });
        await estados.save()
        if (!Estado) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'El Estado se creó con éxito!'
        });
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const estados = Estado.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!estados) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Estado actualizado con éxito!'
        });
    },

    //DELETE
    async delete(req, res) {
        let estados = await Estado.findByPk(req.params.id);

        if (!estados) {
            res.status(404).json({ msg: "Estado no encontrado!" });
        } else {
            estados.destroy().then(estados => {
                res.json({ msg: "El Estado ha sido eliminado!" })
            })
        }
    },
}