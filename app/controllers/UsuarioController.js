// const { all } = require("../routes");

const send = require('../middlerwares/email');

const { Usuario, Rol, Departamento, Comision, Facultad } = require('../models/index');
const RolController = require("./RolController");
const { username } = require("../../config/database");

module.exports = {

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
    //SHOW ID
    async show(req, res) {
        let usuario = req.usuarioid
        if (!usuario) {
            res.status(404).json({ msg: "Usuario no encontrado!" });
        } else {
            res.json(usuario);
        }
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