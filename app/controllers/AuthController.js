const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig')

module.exports = {

    //login
    signIn(req, res) {

        let { email, contrasena } = req.body;

        Usuario.findOne({
            where: {
                email: email
            }
        }).then(usuario => {
            if (!usuario) {
                res.status(404).json({
                    msg: "Email o contraseña incorrectos"
                })
            } else {
                if (contrasena == Usuario.contrasena) {
                    //falta encriptar

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
    //registro
    signUp(req, res) {

    },
}