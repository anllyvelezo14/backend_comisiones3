const { all } = require("../routes");

const { Documento } = require('../models/index')

module.exports = {

    //SHOW ALL
    async all(req, res) {
        let documentos = await Documento.findAll({
            include: {
                association: "comisiones"
            }
        });
        res.json(documentos);
    },

    //SHOW ID
    async show(req, res) {
        let documentos = await Documento.findByPk(req.params.id, {
            include: {
                association: "comisiones"
            }
        });

        if (!documentos) {
            res.status(404).json({ msg: "Documento no encontrado!" });
        } else {
            res.json(documentos);
        }
    },

    //CREATE
    async create(req, res) {
        const documentos = await Documento.build({
            nombre: req.body.nombre,
            es_anexo: req.body.es_anexo,
            es_cumplido: req.body.es_cumplido,
            comisiones_id: req.body.comisiones_id,
        });
        await documentos.save().then(function(newdocumento) {
            console.log(newdocumento);
            res.status(200).send({
                status: 200,
                message: 'El Documento se creó con éxito!'
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
        const documentos = Documento.update({
            nombre: req.body.nombre,
            es_anexo: req.body.es_anexo,
            es_cumplido: req.body.es_cumplido,
            comisiones_id: req.body.comisiones_id,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newdocumento) {
            console.log(newdocumento);
            res.status(200).send({
                status: 200,
                message: 'El Documento se actualizó con éxito!'
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
        let documentos = await Documento.findByPk(req.params.id);

        if (!documentos) {
            res.status(404).json({ msg: "Documento no encontrado!" });
        } else {
            documentos.destroy().then(documentos => {
                res.json({ msg: "El Documento ha sido eliminado!" })
            })
        }
    },

}