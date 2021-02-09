const { all } = require("../routes");

const { Cumplido } = require('../models/index');

module.exports = {

    //SHOW ALL
    async all(req, res) {
        let cumplidos = await Cumplido.findAll({
            include: {
                association: "comisiones"
            }
        });
        res.json(cumplidos);
    },

    //SHOW ID
    async show(req, res) {
        let cumplido = await Cumplido.findByPk(req.params.id);

        if (!cumplido) {
            res.status(404).json({ msg: "Cumplido no encontrado!" });
        } else {
            res.json(cumplido);
        }
    },

    //CREATE
    async create(req, res) {
        const cumplido = await Cumplido.build({
            fecha_envio: req.body.fecha_envio,
            fecha_confirmacion: req.body.fecha_confirmacion,
            informacion_complementaria: req.body.informacion_complementaria,
            correos: req.body.correos,
        });
        await cumplido.save()
        if (!cumplido) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'El cumplido se creó con éxito!'
        });
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const cumplido = Cumplido.update({
            fecha_envio: req.body.fecha_envio,
            fecha_confirmacion: req.body.fecha_confirmacion,
            informacion_complementaria: req.body.informacion_complementaria,
            correos: req.body.correos,
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!cumplido) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Cumplido actualizado con éxito!'
        });
    },

    //DELETE
    async delete(req, res) {
        let cumplido = await Cumplido.findByPk(req.params.id);

        if (!cumplido) {
            res.status(404).json({ msg: "Cumplido no encontrado!" });
        } else {
            cumplido.destroy().then(cumplido => {
                res.json({ msg: "El cumplido ha sido eliminado!" })
            })
        }
    },

}