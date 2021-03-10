const { Estado, Comision, Usuario, Departamento, Facultad } = require('../models/index')

module.exports = {

    async find(req, res, next) {
        let estados = await Estado.findByPk(req.params.id, {
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

        if (!estados) {
            res.status(404).json({ msg: "Estado no encontrado!" });
        } else {
            req.estados = estados;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.estados);
    },

    //SHOW ALL
    async all(req, res) {
        let estados = await Estado.findAll({
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
        res.json(estados);
    },

    //CREATE
    async create(req, res) {
        const estados = await Estado.build({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,

        });
        await estados.save().then(function(newestados) {
            console.log(newestados);
            res.status(201).send({
                status: 201,
                message: 'El estado se creó con éxito!'
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
        Estado.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newestados) {
            console.log(newestados);
            res.status(201).send({
                status: 201,
                message: 'El estado se actualizó con éxito!'
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
        req.estados.destroy().then(estados => {
            res.json({ msg: "El Estado ha sido eliminado!" })
        })

    },
}