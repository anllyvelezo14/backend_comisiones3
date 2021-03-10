const { Departamento, Comision, Usuario, Documento, Facultad } = require('../models/index')


module.exports = {

    //FIND ID
    async find(req, res, next) {

        let documentos = await Documento.findByPk(req.params.id, {
            include: [{
                model: Comision,
                as: 'comisiones',
                attributes: ["id", "createdAt", "usuarios_id"],
                include: [{
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
            res.status(404).json({ msg: "Documento no encontrado!" });
        } else {
            req.documentos = documentos;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.documentos);
    },

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

    //CREATE
    async create(req, res) {
        const documentos = await Documento.build({
            nombre: req.body.nombre,
            es_anexo: req.body.es_anexo,
            es_cumplido: req.body.es_cumplido,
            enviado: req.body.enviado,
            comisiones_id: req.body.comisiones_id,
        });
        await documentos.save().then(function(newdocumento) {
            console.log(newdocumento);
            res.status(201).send({
                status: 201,
                message: 'El Documento se creó con éxito!'
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
        Documento.update({
            nombre: req.body.nombre,
            es_anexo: req.body.es_anexo,
            es_cumplido: req.body.es_cumplido,
            enviado: req.body.enviado,
            comisiones_id: req.body.comisiones_id,

        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newdocumento) {
            console.log(newdocumento);
            res.status(201).send({
                status: 201,
                message: 'El Documento se actualizó con éxito!'
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

        req.documentos.destroy().then(documentos => {
            res.json({ msg: "El Documento ha sido eliminado!" })
        })

    },

}