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
        let cumplidos = await Cumplido.findByPk(req.params.id, {
            include: {
                association: "comisiones"
            }
        });

        if (!cumplidos) {
            res.status(404).json({ msg: "Cumplido no encontrado!" });
        } else {
            res.json(cumplidos);
        }
    },

    //CREATE
    async create(req, res) {
        const cumplidos = await Cumplido.build({
            fecha_envio: req.body.fecha_envio,
            fecha_confirmacion: req.body.fecha_confirmacion,
            informacion_complementaria: req.body.informacion_complementaria,
            correos: req.body.correos,
            comisiones_id: req.body.comisiones_id,
        });
        await cumplidos.save()
        if (!cumplidos) {
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
        const cumplidos = Cumplido.update({
            fecha_envio: req.body.fecha_envio,
            fecha_confirmacion: req.body.fecha_confirmacion,
            informacion_complementaria: req.body.informacion_complementaria,
            correos: req.body.correos,
            comisiones_id: req.body.comisiones_id,
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!cumplidos) {
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
        let cumplidos = await Cumplido.findByPk(req.params.id);

        if (!cumplidos) {
            res.status(404).json({ msg: "Cumplido no encontrado!" });
        } else {
            cumplidos.destroy().then(cumplidos => {
                res.json({ msg: "El cumplido ha sido eliminado!" })
            })
        }
    },

}