const { Departamento, Comision, Usuario, Documento, Facultad, ComisionHasEstado, Estado } = require('../models/index')
const fs = require("fs");
const path = require("path");

module.exports = {

    //SHOW ALL
    async all(req, res) {

        let documentos = await Documento.findAll({
            where: req.where,
            include: [{
                model: Comision,
                as: 'comisiones',
                attributes: ["id", "createdAt"],
                include: [{
                    model: Usuario,
                    as: 'usuarios',
                    attributes: ["nombre", "apellido", "identificacion", "email"],
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

                }]
            }]
        });
        res.json(documentos);
    },

    //FIND ID
    async find(req, res, next) {

        let documentos = await Documento.findByPk(req.params.id, {
            include: [{
                model: Comision,
                as: 'comisiones',
                attributes: ["id", "createdAt", "usuarios_id"],
                include: [{
                    model: ComisionHasEstado,
                    as: "intermediate_comisiones",
                    attributes: ["id"],
                    include: [{
                        model: Estado,
                        as: "intermediate_estados",
                        attributes: ["nombre"],
                    }]
                }, {
                    model: Usuario,
                    as: 'usuarios',
                    attributes: ["nombre", "apellido", "identificacion", "email", "departamentos_id"],
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

                }]
            }]
        });

        if (!documentos) {
            res.status(404).json({ msg: `El Documento ${req.params.id} no ha sido encontrado!` });
        } else {
            req.documentos = documentos;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.sendFile(path.join(`/${__dirname}/../assets/tmp/${req.documentos.nombre}`));
    },

    //CREATE
    async create(req, res) {
        //const documentos = await 
        Documento.create({
            nombre: req.file.originalname,
            //es_anexo: req.file.es_anexo,
            //es_cumplido: req.file.es_cumplido,
            //enviado: req.file.enviado,
            //comisiones_id: req.body.comisiones_id,
            data: fs.readFileSync(
                __basedir + "/assets/uploads/" + req.file.filename
              ),
        }).then((doc) => {
            fs.writeFileSync(
              __basedir + "/assets/tmp/" + doc.nombre, doc.data
            );
            return res.send(`EL documento se ha subido con éxito`);
        })
        // await documentos.save().then(function(newdocumento) {
        //     console.log(newdocumento);
        //     res.status(201).send({
        //         status: 201,
        //         message: `El Documento ${newdocumento.id} se creó con éxito!`
        //     })
        // })
        .catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 400,
                message: error.message
            });
        })
    },

    //FIND: ULTIMO ESTADO DE LA COMISION
    async estadoComision(req, res, next) {

        let size = Object.keys(req.documentos.comisiones.intermediate_comisiones).length
        let finalEstado = req.documentos.comisiones.intermediate_comisiones[size - 1].dataValues.intermediate_estados.dataValues.nombre;
        req.finalEstado = finalEstado;
        next();
    },

    //UPDATE
    async update(req, res) {

        Documento.update({
            //nombre: req.body.nombre,
            //es_anexo: req.body.es_anexo,
            // es_cumplido: req.body.es_cumplido,
            // enviado: req.body.enviado,
            comisiones_id: req.comision

        }, 
        // {
        //     where: {
        //         id: req.params.id,
        //     }
        // }
        ).then(
        //     function(newdocumento) {
        //     console.log(newdocumento);
        //     res.status(201).send({
        //         status: 201,
        //         message: `El Documento ${req.params.id} se actualizó con éxito!`
        //     });
        // }
        ).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 400,
                message: error.message
            });
        });
    },

    //DELETE
    async delete(req, res) {

        req.documentos.destroy().then(documentos => {
            res.json({ msg: `El Documento ${documentos.id} ha sido eliminado!` })
        })

    },

}