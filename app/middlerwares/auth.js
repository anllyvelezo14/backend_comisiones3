const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');
const { Usuario, Rol, Departamento, Facultad, Comision, Documento, Cumplido } = require('../models/index')

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
                            attributes: ["id", "nombre"]
                        }, {
                            model: Departamento,
                            as: 'departamentos',
                            attributes: ["id", "nombre", "facultades_id"],
                            include: [{
                                model: Facultad,
                                as: 'facultad',
                                attributes: ["id", "nombre"],
                            }]

                        }, {
                            model: Comision,
                            as: "comisiones",
                            attributes: ["id", "usuarios_id"],
                            include: [{
                                model: Documento,
                                association: "documentos",
                                attributes: ["id", "comisiones_id"],
                                include: [{
                                    model: Comision,
                                    association: "comisiones",
                                    attributes: ["id"],
                                    include: [{
                                        model: Usuario,
                                        association: "usuarios",
                                        attributes: ["id"],
                                        include: [{
                                            model: Departamento,
                                            association: "departamentos",
                                            attributes: ["id", "nombre"],

                                        }]

                                    }]

                                }]

                            }, {
                                model: Cumplido,
                                association: 'cumplidos',
                                attributes: ["id", "comisiones_id"],
                            }]
                        }

                    ]

                }).then(usuario => {
                    req.usuario = usuario;
                    // console.log(usuario.roles.nombre);
                    // console.log('facultad user:', usuario.departamentos.facultad.id);
                    // console.log('depto user: ', usuario.departamentos);
                    // console.log('comisiones del user:', usuario.comisiones);
                    // console.log('documentos del user: ', usuario.comisiones[0].dataValues.documentos);
                    //console.log('cumplidos del user: ', usuario.comisiones.dataValues.cumplidos);
                    next();
                })
            }

        })
    }
}