// const { all } = require("../routes");

const { Facultad, Departamento, Usuario } = require('../models/index')

module.exports = {

    async all(req, res) {
        let facultades = await Facultad.findAll({
            include: {
                model: Departamento,
                as: "departamentos",
                attributes: ["nombre"],
                include: {
                    model: Usuario,
                    as: "usuarios",
                    attributes: ["nombre", "apellido", "email"]
                }
            }
        });
        res.json(facultades);
    },
    async show(req, res) {
        let facultad = await Facultad.findByPk(req.params.id, {
            include: {
                model: Departamento,
                as: "departamentos",
                attributes: ["nombre"],
                include: {
                    model: Usuario,
                    as: "usuarios",
                    attributes: ["nombre", "apellido", "email"]
                }
            }
        });

        if (!facultad) {
            res.status(404).json({ msg: "Facultad no encontrado!" });
        } else {
            res.json(facultad);
        }
    },
    /*
    //CREATE
    async create(req, res) {
        const facultad = await Facultad.build({
            centro_de_costo: req.body.centro_de_costo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });
        await facultad.save()
        if (!facultad) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'La facultad se creó con éxito!'
        });
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const facultad = Facultad.update({
            centro_de_costo: req.body.centro_de_costo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!facultad) {
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
        let facultad = await Facultad.findByPk(req.params.id);

        if (!facultad) {
            res.status(404).json({ msg: "Departamento no encontrado!" });
        } else {
            facultad.destroy().then(facultad => {
                res.json({ msg: "La facultad ha sido eliminada!" })
            })
        }
    },
    */
}