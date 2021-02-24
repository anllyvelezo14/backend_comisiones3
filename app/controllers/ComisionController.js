const { all } = require("../routes");

const { Comision } = require('../models/index')
const Sequelize = require('sequelize');
const { or, and, gt, lt } = Sequelize.Op;

module.exports = {

    async find(req, res, next) {
        let comision = await Comision.findByPk(req.params.id, {
            include: ["cumplidos", "documentos", "tipos_solicitud", "estados", "usuarios"]
        });

        if (!comision) {
            res.status(404).json({ msg: "Comisión no encontrada!" });
        } else {
            req.comision = comision;
            next();
        }
    },

    //SHOW ALL
    async all(req, res) {

        //comision: autenticado
        let comision = await Comision.findAll({
            include: ["cumplidos", "documentos", "tipos_solicitud", "estados", "usuarios"]
        });

        res.json(comision);
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.comision);
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
            usuarios_id: req.body.usuarios_id,
        })
        await comision.save().then(function(newcomision) {
            console.log(newcomision);
            res.status(200).send({
                status: 200,
                message: 'La Comisión se creó con éxito!'
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
            tipos_solicitud_id: req.body.tipos_solicitud_id,
            usuarios_id: req.body.usuarios_id,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newcomision) {
            console.log(newcomision);
            res.status(200).send({
                status: 200,
                message: 'La Comisión se actualizó con éxito!'
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
        req.comision.destroy().then(comision => {
            res.json({ msg: "La Comisión ha sido eliminada!" })
        });

    },

}