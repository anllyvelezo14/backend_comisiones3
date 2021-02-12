const { all } = require("../routes");

const { Usuario } = require('../models/index')

module.exports = {

    async all(req, res) {
        let usuarios = await Usuario.findAll({
            include: ["comision", "rol", "departamento"]
        });
        res.json(usuarios);
    },
    //SHOW ID
    async show(req, res) {
        let usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            res.status(404).json({ msg: "Usuario no encontrado!" });
        } else {
            res.json(usuario);
        }
    },

    //CREATE
    async create(req, res) {
        const usuario = await Usuario.build({
            tipo_idetificacion: req.body.tipo_idetificacion,
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: req.body.contrasena

        });
        res.json(usuario);
        await usuario.save()
        if (!usuario) {
            return res.status(200).send({
                status: 404,
                message: 'No se encontraron datos'
            });
        }
        res.status(200).send({
            status: 200,
            message: 'El usuario se creó con éxito!'
        });
    },

    //UPDATE
    async update(req, res) {
        const id = req.params.id;
        const usuario = Usuario.update({

            tipo_idetificacion: req.body.tipo_idetificacion,
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
    },

    //DELETE
    async delete(req, res) {
        let usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            res.status(404).json({ msg: "Usuario no encontrado!" });
        } else {
            usuario.destroy().then(usuario => {
                res.json({ msg: "El Usuario ha sido eliminado!" })
            })
        }
    },
}