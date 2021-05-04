const { Comision, TipoSolicitud, Usuario, Departamento, Facultad, Documento, Cumplido, Estado, ComisionHasEstado } = require('../models/index');
const { Op } = require("sequelize");

module.exports = {

    //SHOW ALL
    async all(req, res) {

        let comisiones = await Comision.findAll({
            where: req.where,
            include: [{
                    model: TipoSolicitud,
                    as: "tipos_solicitud",
                    attributes: ["nombre"]
                }, {
                    model: Documento,
                    as: "documentos",
                    attributes: ["id", "nombre", "es_anexo"]
                }, {
                    model: Cumplido,
                    as: "cumplidos",
                    attributes: ["id", "fecha_envio", "fecha_confirmacion"]
                }, {
                    model: Usuario,
                    as: 'usuarios',
                    attributes: ["nombre", "apellido", "identificacion", "email", "estado"],
                    include: [{
                        model: Departamento,
                        as: 'departamentos',
                        attributes: ["nombre"],
                        include: [{
                            model: Facultad,
                            as: "facultad",
                            attributes: ["nombre"],
                        }]
                    }]
                },
                {
                    model: ComisionHasEstado,
                    as: "intermediate_comisiones",
                    attributes: ["createdAt", "fecha_actualizacion"],
                    include: [{
                        model: Estado,
                        as: "intermediate_estados",
                        attributes: ["nombre"],
                    }]
                }
            ]
        });

        res.json(comisiones);
    },

    //FIND By ID
    async find(req, res, next) {
        let comisiones = await Comision.findByPk(req.params.id, {
            include: [{
                model: TipoSolicitud,
                as: "tipos_solicitud",
                attributes: ["nombre"]
            }, {
                model: Documento,
                as: "documentos",
                attributes: ["id", "nombre", "es_anexo"]
            }, {
                model: Cumplido,
                as: "cumplidos",
                attributes: ["id", "fecha_envio", "fecha_confirmacion"]
            }, {
                model: Usuario,
                as: 'usuarios',
                attributes: ["nombre", "apellido", "identificacion", "email", "estado", "departamentos_id"],
                include: [{
                    model: Departamento,
                    as: 'departamentos',
                    attributes: ["nombre", "facultades_id"],
                    include: [{
                        model: Facultad,
                        as: "facultad",
                        attributes: ["nombre"],
                    }]
                }]
            }, {
                model: ComisionHasEstado,
                as: "intermediate_comisiones",
                attributes: ["createdAt", "fecha_actualizacion"],
                include: [{
                    model: Estado,
                    as: "intermediate_estados",
                    attributes: ["id", "nombre"],
                }]
            }, ]
        });


        if (!comisiones) {
            res.status(404).json({ msg: `¡La Comisión ${req.params.id} no ha sido encontrada! ` });
        } else {
            req.comisiones = comisiones;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.comisiones);
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
            //console.log(newcomision);
            res.status(201).send({
                status: 201,
                message: `¡La Comisión  ${newcomision.id} se creó con éxito!`
            });
        }).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 400,
                message: error.message
            });
        })

    },

    //FIND VISTO BUENO
    async vistobueno(req, res, next) {

        let idAuth = req.usuario.id;
        let vistoBueno = await Comision.findAll({
            where: {
                '$usuarios.id$': idAuth,
                '$intermediate_comisiones.intermediate_estados.nombre$': {
                    [Op.in]: ['VISTO BUENO', 'DEVUELTA']
                }
            },
            include: [{
                model: ComisionHasEstado,
                as: "intermediate_comisiones",
                include: [{
                    model: Estado,
                    as: "intermediate_estados",
                    attributes: ["nombre"],
                }]
            }, {
                model: Usuario,
                as: 'usuarios',
                attributes: ["id"],
            }]
        });

        req.vistoBueno = vistoBueno;
        next();
    },

    //UPDATE
    async update(req, res) {
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
            res.status(201).send({
                status: 201,
                message: `¡La Comisión ${req.params.id} se actualizó con éxito!`
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
        req.comisiones.destroy().then(comision => {
            res.json({ msg: `¡La Comisión ${comision.id} ha sido eliminada!` })
        });

    },

}