const { all } = require("../routes");

const { Comision } = require('../models/index')

module.exports = {

    async all(req, res) {
        let comsiones = await Comision.findAll({
            include: ["cumplidos", "documentos", "tipos_solicitud"]
        });
        res.json(comsiones);
    },
    //SHOW ID
    async show(req, res) {
        let comision = await Comision.findByPk(req.params.id, {
            include: ["cumplidos", "documentos", "tipos_solicitud"]
        });

        if (!comision) {
            res.status(404).json({ msg: "Comision no encontrada!" });
        } else {
            res.json(comision);
        }
    },

    //CREATE
    async create(req, res) {
        const comision = await Comision.build({
            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            fecha_resolucion: req.body.fecha_resolucion,
            resolucion: req.body.resolucion,
            respuesta_devolucion: req.body.respuesta_devolucion,
            justificacion: req.body.justificacion,
            idioma: req.body.idioma,
            lugar: req.body.lugar,
            fecha_actualizacion: req.body.fecha_actualizacion,
            tipos_solicitud_id: req.body.tipos_solicitud_id,
            //include: "tipos_solicitud"
        });
        await comision.save()
        if (!comision) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'La comision se creó con éxito!'
        });
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const comision = Comision.update({

            fecha_inicio: req.body.fecha_inicio,
            fecha_fin: req.body.fecha_fin,
            fecha_resolucion: req.body.fecha_resolucion,
            resolucion: req.body.resolucion,
            respuesta_devolucion: req.body.respuesta_devolucion,
            justificacion: req.body.justificacion,
            idioma: req.body.idioma,
            lugar: req.body.lugar,
            fecha_actualizacion: req.body.fecha_actualizacion,
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!comision) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Comision actualizada con éxito!'
        });
    },

    //DELETE
    async delete(req, res) {
        let comision = await Comision.findByPk(req.params.id);

        if (!comision) {
            res.status(404).json({ msg: "Comision no encontrada!" });
        } else {
            comision.destroy().then(comision => {
                res.json({ msg: "La Comision ha sido eliminada!" })
            })
        }
    },
}