const { Departamento, Comision, Usuario, Cumplido, Facultad } = require('../models/index')


module.exports = {

    //FIND ID
    async find(req, res, next) {
        let cumplidos = await Cumplido.findByPk(req.params.id, {
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

        if (!cumplidos) {
            res.status(404).json({ msg: "Cumplido no encontrado!" });
        } else {

            req.cumplidos = cumplidos;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.cumplidos);
    },

    //SHOW ALL
    async all(req, res) {
        let cumplidos = await Cumplido.findAll({
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
        res.json(cumplidos);
    },

    //CREATE
    async create(req, res) {
        const cumplidos = await Cumplido.build({
            fecha_envio: req.body.fecha_envio,
            fecha_confirmacion: req.body.fecha_confirmacion,
            informacion_complementaria: req.body.informacion_complementaria,
            correos: req.body.correos,
            enviado: req.body.enviado,
            comisiones_id: req.body.comisiones_id,
        });
        await cumplidos.save().then(function(newcumplidos) {
            console.log(newcumplidos);
            res.status(201).send({
                status: 201,
                message: 'El cumplido se creó con éxito!'
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
        Cumplido.update({
            fecha_envio: req.body.fecha_envio,
            fecha_confirmacion: req.body.fecha_confirmacion,
            informacion_complementaria: req.body.informacion_complementaria,
            correos: req.body.correos,
            enviado: req.body.enviado,
            comisiones_id: req.body.comisiones_id,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newcumplidos) {
            console.log(newcumplidos);
            res.status(201).send({
                status: 201,
                message: 'El cumplido se actualizó con éxito!'
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

        req.cumplidos.destroy().then(cumplidos => {
            res.json({ msg: "El cumplido ha sido eliminado!" })
        })

    },

}