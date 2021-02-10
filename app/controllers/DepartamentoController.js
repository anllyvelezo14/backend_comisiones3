const { all } = require("../routes");

const { Departamento } = require('../models/index')

module.exports = {

    async all(req, res) {
        let departamentos = await Departamento.findAll({
            include: ["usuarios", "facultad"]
        });
        res.json(departamentos);
    },
    //SHOW ID
    async show(req, res) {
        let departamento = await Departamento.findByPk(req.params.id);

        if (!departamento) {
            res.status(404).json({ msg: "Departamento no encontrado!" });
        } else {
            res.json(departamento);
        }
    },

    //CREATE
    async create(req, res) {
        const departamento = await Departamento.build({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });
        await departamento.save()
        if (!departamento) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'El departamento se creó con éxito!'
        });
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const departamento = Departamento.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!departamento) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Departamento actualizado con éxito!'
        });
    },

    //DELETE
    async delete(req, res) {
        let departamento = await Departamento.findByPk(req.params.id);

        if (!departamento) {
            res.status(404).json({ msg: "Departamento no encontrado!" });
        } else {
            departamento.destroy().then(departamento => {
                res.json({ msg: "El Departamento ha sido eliminado!" })
            })
        }
    },
}