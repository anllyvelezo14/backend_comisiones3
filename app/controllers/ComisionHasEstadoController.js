const { ComisionHasEstado, Comision, Usuario, Departamento, Facultad, Estado } = require('../models/index');


module.exports = {

    //SHOW ALL
    async all(req, res) {

        let comisiones_has_estados = await ComisionHasEstado.findAll({
            where: req.where,
            include: [{
                model: Comision,
                as: "intermediate_comisiones",
                attributes: ["id", "createdAt", "fecha_actualizacion"],
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
            }, {
                model: Estado,
                as: "intermediate_estados",
                attributes: ["nombre", "descripcion"]
            }]
        });

        res.json(comisiones_has_estados);
    },

    //FIND By ID
    async find(req, res, next) {
        let comisiones_has_estados = await ComisionHasEstado.findByPk(req.params.id, {
            include: [{
                model: Comision,
                as: "intermediate_comisiones",
                attributes: ["id", "createdAt", "fecha_actualizacion", "usuarios_id"],
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
            }, {
                model: Estado,
                as: "intermediate_estados",
                attributes: ["nombre", "descripcion"]
            }]
        });

        if (!comisiones_has_estados) {
            res.status(404).json({ msg: `No existe la asociación ${req.params.id} entre Estado - Comisión` });
        } else {
            req.comisiones_has_estados = comisiones_has_estados;
            next();
        }
    },

    //SHOW ID
    async show(req, res) {
        res.json(req.comisiones_has_estados);
    },

    //CREATE
    async create(req, res) {
        const comisiones_has_estados = await ComisionHasEstado.build({
            createdAt: req.body.createdAt,
            fecha_actualizacion: req.body.fecha_actualizacion,
            comisiones_id: req.body.comisiones_id,
            estados_id: req.body.estados_id
        })


        await comisiones_has_estados.save().then(function(newcomisiones_has_estados) {
            res.status(201).send({
                status: 201,
                message: `El estado ${newcomisiones_has_estados.estados_id} para la comisión ${newcomisiones_has_estados.comisiones_id} se creó con éxito!`
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
        ComisionHasEstado.update({
            createdAt: req.body.createdAt,
            fecha_actualizacion: req.body.fecha_actualizacion,
            comisiones_id: req.body.comisiones_id,
            estados_id: req.body.estados_id
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function(newcomisiones_has_estados) {
            res.status(201).send({
                status: 201,
                message: `El estado ${newcomisiones_has_estados.estados_id} para la comisión ${newcomisiones_has_estados.comisiones_id} se creó con éxito!`
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
        req.comisiones_has_estados.destroy().then(comisiones_has_estados => {
            res.json({ msg: `El estado ${comisiones_has_estados.estados_id} para la comisión ${comisiones_has_estados.comisiones_id} se creó con éxito!` })
        });

    },

    // CREAR COMISIÓN SOLICITADA
    async createSolicitada(req, res) {
        const comisiones_has_estados = await ComisionHasEstado.build({
            createdAt: '2021-09-01T21:13:19.000Z',
            fecha_actualizacion: '2021-09-01T21:13:19.000Z',
            comisiones_id: req.comision.id,
            estados_id: 1
        })
        console.log(comisiones_has_estados);

        await comisiones_has_estados.save().then(function(newcomisiones_has_estados) {
            res.status(201).send({
                status: 201,
                message: `El estado ${newcomisiones_has_estados.estados_id} para la comisión ${newcomisiones_has_estados.comisiones_id} se creó con éxito!`
            });
        }).catch(function(error) {
            console.log(error.message);
            return res.status(400).send({
                status: 400,
                message: error.message
            });
        })
    }
}