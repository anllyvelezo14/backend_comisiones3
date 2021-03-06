const { Departamento, Usuario, Comision } = require('../models/index');
const { Op } = require("sequelize");


async function find(departamento) {

    //busca los usuarios en los departamentos de la facultad del autenticado
    let user = await Usuario.findAll({
        raw: true,
        attributes: ["id"],
        where: {
            departamentos_id: {
                [Op.in]: departamento
            }
        }
    });
    return user
}

module.exports = {

    async showAll(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {

            next();

        } else if (rolAuth === 'COORDINACION') {

            let depAuth = req.usuario.departamentos_id;

            //usuarios en el departamento del autenticado
            let user = await find([depAuth]);


            //Se envian los usuarios al controlador de comisiones
            req.user = user.map(a => a.id)
            next();


        } else if (rolAuth === 'DECANATURA') {

            prueba = { 'estado': 1, '$departamentos.facultad.nombre$': req.usuario.departamentos.facultad.nombre };


            let deptoAuth = await Departamento.findByPk(req.usuario.departamentos_id);

            //facultad del autenticado
            let facAuth = deptoAuth.facultades_id;

            //departamentos de la facultad del autenticado
            let deptoUser = await Departamento.findAll({
                raw: true,
                attributes: ["id"],
                where: {
                    facultades_id: facAuth,
                }
            });

            let user = await find(deptoUser.map(a => a.id))

            //Se envian los usuarios al controlador de comisiones
            req.user = user.map(a => a.id)
            next();

        } else {
            console.log('usuario id: ', req.usuario.id);
            req.user = [req.usuario.id]
            next();
            //res.json(req.usuario.comisiones);
        }
    },

    async show(req, res, next) {

        // comision.usuarios_id viene del controller (por ruta), 
        //usuario.roles y usuario.id vienen del auth.js

        let rolAuth = req.usuario.roles.nombre;
        let idUser = req.comision.usuarios_id;
        let idAuth = req.usuario.id;
        let depAuth = req.usuario.departamentos_id; //depto del autenticado
        let depUser = req.comision.usuarios.departamentos_id; //depto del usuario de la comision


        if (idAuth === idUser || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION')) {
            next();

        } else {
            let deptoUser = await Departamento.findByPk(req.comision.usuarios.departamentos_id);
            let deptoAuth = await Departamento.findByPk(req.usuario.departamentos_id);

            let facAuth = deptoAuth.facultades_id;
            let facUser = deptoUser.facultades_id;

            if (facAuth == facUser && rolAuth === 'DECANATURA') {
                next();

            } else {

                res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
            }

        }
    },
    update(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    delete(req, res, next) {
        if (req.usuario.id === req.comision.usuarios_id || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}