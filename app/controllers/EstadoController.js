const { all } = require("../routes");

const { Estado } = require('../models/index')

module.exports = {

    async find(req, res, next) {
        let estados = await Estado.findByPk(req.params.id, {
            include: {
                association: "comisiones"
            }
        });

        if (!estados) {
            res.status(404).json({ msg: "Estado no encontrado!" });
        } else {
            req.estados = estados;
            next();
        }
    },

    //SHOW ALL
    async all(req, res) {
        let estados = await Estado.findAll({
            include: {
                association: "comisiones"
            }
        });
        res.json(estados);
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.estados);
    },

    //CREATE
    async create(req, res) {
        const estados = await Estado.build({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,

        });
        await estados.save().then(function(newestados) {
            console.log(newestados);
            res.status(201).send({
                status: 201,
                message: 'El estado se creó con éxito!'
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
        const id = req.params.id;
        const estados = Estado.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newestados) {
            console.log(newestados);
            res.status(201).send({
                status: 201,
                message: 'El estado se actualizó con éxito!'
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
        req.estados.destroy().then(estados => {
            res.json({ msg: "El Estado ha sido eliminado!" })
        })

    },
}