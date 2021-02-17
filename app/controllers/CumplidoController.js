const { all } = require("../routes");

const { Cumplido } = require('../models/index');

module.exports = {

    async find(req, res, next) {
        let cumplidos = await Cumplido.findByPk(req.params.id, {
            include: {
                association: "comisiones"
            }
        });

        if (!cumplidos) {
            res.status(404).json({ msg: "Cumplido no encontrado!" });
        } else {

            req.cumplidos = cumplidos;
            next();
        }
    },

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
        res.json(req.cumplidos);
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
        await cumplidos.save().then(function(newcumplidos) {
            console.log(newcumplidos);
            res.status(200).send({
                status: 200,
                message: 'El cumplido se creó con éxito!'
            });
        }).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 404,
                message: error.message
            });
        })
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
        }).then(function(newcumplidos) {
            console.log(newcumplidos);
            res.status(200).send({
                status: 200,
                message: 'El cumplido se actualizó con éxito!'
            });
        }).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 404,
                message: error.message
            });
        });
    },

    //DELETE
    async delete(req, res) {

        req.cumplidos.destroy().then(cumplidos => {
            res.json({ msg: "El cumplido ha sido eliminado!" })
        })

    },

}