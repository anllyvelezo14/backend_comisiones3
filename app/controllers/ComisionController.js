const { all } = require("../routes");
const { Comision, TipoSolicitud, Usuario, Departamento, Documento, Cumplido, Estado } = require('../models/index')
var Sequelize = require('sequelize');
const { or } = Sequelize.Op;
const { Op } = require("sequelize");



module.exports = {

    async find(req, res, next) {
        let comision = await Comision.findByPk(req.params.id, {
            include: [{
                model: Usuario,
                as: "usuarios",
                attributes: ["nombre"]

            }, "cumplidos", "documentos", "tipos_solicitud", "estados"]
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

        let comision = await Comision.findAll({
            where: {
                usuarios_id: {
                    [Op.in]: req.user,
                }
            },
            include: [{
                    model: TipoSolicitud,
                    as: "tipos_solicitud",
                    attributes: ["nombre"]
                }, {
                    model: Usuario,
                    as: "usuarios",
                    attributes: ["nombre"],
                    include: [{
                        model: Departamento,
                        as: 'departamentos',
                        attributes: ["nombre"]
                    }]
                }, {
                    model: Documento,
                    as: "documentos",
                    attributes: ["id", "nombre", "es_anexo"]
                }, {
                    model: Cumplido,
                    as: "cumplidos",
                    attributes: ["id", "fecha_envio", "fecha_confirmacion"]
                },
                "estados"
            ]
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
            res.status(201).send({
                status: 201,
                message: 'La Comisión se creó con éxito!'
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

        //const id = req.params.id;
        Comision.update({

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
            res.status(201).send({
                status: 201,
                message: 'La Comisión se actualizó con éxito!'
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
        req.comision.destroy().then(comision => {
            res.json({ msg: "La Comisión ha sido eliminada!" })
        });

    },

}