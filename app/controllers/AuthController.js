const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig')

module.exports = {

    //login
    async signIn(req, res) {

        let { email, contrasena } = req.body;

        await Usuario.findOne({
            where: {
                email: email
            }
        }).then(usuario => {
            if (!usuario) {
                res.status(404).json({
                    msg: "Email o contraseña incorrectos"
                })
            } else {

                if (bcrypt.compareSync(contrasena, usuario.contrasena)) {

                    //token
                    let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        usuario: usuario,
                        token: token,
                    })

                } else {
                    res.status(401).json({
                        msg: "Email o contraseña incorrectos"
                    })
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        });

    },

    // Registro
    signUp(req, res) {
        let contrasena = bcrypt.hashSync(req.body.contrasena, Number.parseInt(authConfig.rounds));
        console.log(req.body);
        Usuario.create({
            tipo_identificacion: req.body.tipoidentificacion,
            identificacion: req.body.identificacion,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: contrasena,
            roles_id: req.body.rol,
            departamentos_id: req.body.departamentos
        }).then(usuario => {
            let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            /* res.json({
                usuario: usuario,
                token: token
            }); */

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
        });
    },

    // Olvidó contraseña
    async forgotPassword(req, res) {

        let { email } = req.body;

        await Usuario.findOne({
            where: {
                email: email
            }
        }).then(usuario => {
            if (usuario) {

                //token
                let token = jwt.sign({ usuario: usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                let linkVerificacion = `http://localhost:3000/api/recuperar-contrasena/${token}`
                res.json({
                    usuario: usuario,
                    token: token,
                })



            }
        }).catch(err => {
            res.json("Verifica la bandeja de entrada de tu email");
        });
    },

}