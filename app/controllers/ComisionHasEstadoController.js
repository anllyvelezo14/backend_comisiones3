const { ComisionHasEstado } = require('../models/index');


module.exports = {

    //SHOW ALL
    async all(req, res) {

        let comisiones_has_estados = await ComisionHasEstado.findAll({
            include: ["intermediate_comisiones", "intermediate_estados"]
        });

        res.json(comisiones_has_estados);
    },
    //SHOW ID
    async show(req, res) {
        let comisiones_has_estados = await ComisionHasEstado.findByPk(req.params.id, {
            include: ["intermediate_estados", "intermediate_comisiones"]
        });

        if (!comisiones_has_estados) {
            res.status(404).json({ msg: "Comisión sin Estados!" });
        } else {
            res.json(comisiones_has_estados);
        }
    },

    //CREATE
    async create(req, res) {
        const comisiones_has_estados = await ComisionHasEstado.build({
            createdAt: req.body.createdAt,
            fecha_actualizacion: req.body.fecha_actualizacion,
            comisiones_id: req.body.comisiones_id,
            estados_id: req.body.estados_id
        })
        await comisiones_has_estados.save().then(function(newcomisiones_has_estados) {
            res.status(201).send({
                status: 201,
                message: 'El estado para la comisión se creó con éxito!'
            });
        }).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 400,
                message: error.message
            });
        })

    },

    //UPDATE
    async update(req, res) {
        ComisionHasEstado.update({
            createdAt: req.body.createdAt,
            fecha_actualizacion: req.body.fecha_actualizacion,
            comisiones_id: req.body.comisiones_id,
            estados_id: req.body.estados_id
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newcomisiones_has_estados) {
            res.status(201).send({
                status: 201,
                message: 'El estado para la comisión  se actualizó con éxito!'
            });
        }).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 400,
                message: error.message
            });
        });
    },

    //DELETE
    async delete(req, res) {
        req.comisiones_has_estadoses.destroy().then(comisiones_has_estados => {
            res.json({ msg: "El estado para la comisión ha sido eliminado!" })
        });

    },
}