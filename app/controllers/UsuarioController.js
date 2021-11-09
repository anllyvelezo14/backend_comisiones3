const authConfig = require('../../config/authConfig');
const send = require('../middlerwares/email');
const bcrypt = require('bcrypt');

const { Usuario, Rol, Departamento, Facultad } = require('../models/index');


module.exports = {

    // SHOW ALL
    async all(req, res) {
        let usuarios = await Usuario.findAll({
            where: req.where,
            include: [{
                    model: Rol,
                    as: "roles",
                    attributes: ["nombre"]
                }, {
                    model: Departamento,
                    as: 'departamentos',
                    attributes: ["nombre"],
                    include: [{
                        model: Facultad,
                        as: 'facultad',
                        attributes: ["nombre"]
                    }]

                },
                "comisiones"
            ]
        });
        res.json(usuarios);
        //console.log(usuarios[0].dataValues.departamentos.facultad.nombre);
        //console.log(req.where);
    },

    //SHOW BY ID
    async find(req, res, next) {

        let user = await Usuario.findByPk(req.params.id, {
            include: [{
                    model: Rol,
                    as: "roles",
                    attributes: ["nombre"]
                }, {
                    model: Departamento,
                    as: 'departamentos',
                    attributes: ["id", "nombre", "facultades_id"],
                    include: [{
                        model: Facultad,
                        as: 'facultad',
                        attributes: ["nombre"],
                    }]

                },
                "comisiones"
            ]
        });

        if (!user) {
            res.status(404).json({ msg: "Usuario no encontrado!" });
        } else {
            req.user = user;
            next();
        }
    },


    //SHOW ID
    async show(req, res) {
        res.json(req.user);
    },

    //CREATE
    async create(req, res, next) {

        let contrasena = bcrypt.hashSync(req.body.contrasena, +authConfig.rounds);

        const usuario = await Usuario.build({
            tipo_identificacion: req.body.tipo_identificacion,
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: contrasena,
            departamentos_id: req.body.departamentos_id,
            roles_id: req.body.roles_id,
            estado: 1,
            dia_disponible: 3,

        })

        await usuario.save()
            .then(function(newusuario) {
                //console.log(newusuario);
                res.status(201).send({
                    status: 201,
                    message: `¡El usuario  ${newusuario.id} se regristró con éxito!`
                });
            })
            .catch(function(error) {
                console.log(error.message);
                return res.status(400).send({
                    status: 400,
                    message: error.message
                });
            })
        req.usuario = usuario;
        next();
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const usuario = Usuario.update({

            tipo_identificacion: req.body.tipo_identificacion,
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!usuario) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Usuario actualizado con éxito!'
        });
        not = {
            email: "raquijuan12@gmail.com",
            subject: "prueba",
            text: "<b>Esto es uan prueba!</b>"
        };
        send.sendMail(not);
    },

    //DELETE
    async desactive(req, res) {
        const usuario = await Usuario.update({
            estado: 0
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!usuario) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Usuario desactivado satisfactoriamente!'
        });
    },

    async active(req, res) {
        const usuario = await Usuario.update({
            estado: 1
        }, {
            where: {
                id: req.params.id,
            }
        });
        if (!usuario) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'Usuario activado satisfactoriamente!'
        });
    },
}