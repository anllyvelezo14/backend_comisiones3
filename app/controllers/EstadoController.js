const { Estado } = require('../models/index')

module.exports = {

    async find(req, res, next) {
        let estados = await Estado.findByPk(req.params.id);

        if (!estados) {
            res.status(404).json({ msg: `Estado ${req.params.id} no encontrado!` });
        } else {
            req.estados = estados;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.estados);
    },

    //SHOW ALL
    async all(req, res) {
        let estados = await Estado.findAll();
        res.json(estados);
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
                message: `El estado ${newestados.nombre} se creó con éxito!`
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
        Estado.update({
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
                message: `El estado ${req.body.nombre} se actualizó con éxito!`
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
            res.json({ msg: `El Estado ${estados.nombre} ha sido eliminado!` })
        })

    },
}