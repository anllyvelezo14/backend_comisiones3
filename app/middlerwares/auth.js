const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');
const { Usuario,Rol,Departamento,Facultad } = require('../models/index')

module.exports = (req, res, next) => {

    //console.log(req.headers);

    if (!req.headers.authorization) {
        //console.log(req.headers.authorization)
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {
        //comprobar validez del token:
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if (err) {
                res.status(500).json({ msg: "Ocurrió un problema al decodificar el token", err });
            } else {
                //decoded: payload en signIn
                //console.log(decoded);

                Usuario.findByPk(decoded.usuario.id, {
                    include: [{
                        model: Rol,
                        as: "roles",
                        attributes: ["nombre"]
                    },{
                        model: Departamento,
                        as: 'departamentos',
                        attributes: ["nombre"],
                        include: [{
                            model: Facultad,
                            as: 'facultad',
                            attributes: ["nombre"],
                        }]
        
                    },
                    "comisiones"
                    ]
                }).then(usuario => {
                    req.usuario = usuario;
                    //console.log(usuario.roles, usuario.comisiones);
                    next();
                })
            }

        })
    }
}