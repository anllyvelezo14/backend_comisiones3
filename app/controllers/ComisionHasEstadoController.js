const { all } = require("../routes");

const { ComisionHasEstados } = require('../models/index');

//const { Estado } = require('../models/index');

module.exports = {
    //SHOW ALL
    async all(req, res) {
        let comisiones_has_estados = await ComisionHasEstados.findAll({
            include: {
                association: "estados"
            }
        });
        res.json(comisiones_has_estados);
    },
    //SHOW ID
    async show(req, res) {
        let comisiones_has_estados = await ComisionHasEstados.findByPk(req.params.id, {
            include: {
                association: "estados"
            }
        });

        if (!comisiones_has_estados) {
            res.status(404).json({ msg: "Comisiones-Estados no encontrada!" });
        } else {
            res.json(comisiones_has_estados);
        }
    },
}

// const { ComisionHasEstado } = require('../models/index');

// module.exports = {

//     //SHOW ALL
//     async all(req, res) {
//         let comisiones_has_estados = await ComisionHasEstado.findAll({
//             include: {
//                 association: ["comisiones", "estados"]
//             }
//         });
//         res.json(comisiones_has_estados);
//     },

//     //SHOW ID
//     async show(req, res) {
//         let comisiones_has_estados = await ComisionHasEstado.findByPk(req.params.id, {
//             include: {
//                 association: ["comisiones", "estados"]
//             }
//         });

//         if (!comisiones_has_estados) {
//             res.status(404).json({ msg: "Comisiones-Estados no encontrada!" });
//         } else {
//             res.json(comisiones_has_estados);
//         }
//     },

//     //CREATE
//     async create(req, res) {
//         const comisiones_has_estados = await ComisionHasEstado.build({
//             comisiones_id: req.body.comisiones_id,
//             estados_id: req.body.estados_id,
//         });
//         await comisiones_has_estados.save()
//         if (!comisiones_has_estados) {
//             return res.status(200).send({
//                 status: 404,
//                 message: 'No se encontraron datos'
//             });
//         }
//         res.status(200).send({
//             status: 200,
//             message: 'El Comisiones-Estados se creó con éxito!'
//         });
//     },

//     //UPDATE
//     async update(req, res) {
//         const id = req.params.id;
//         const comisiones_has_estados = ComisionHasEstado.update({
//             comisiones_id: req.body.comisiones_id,
//             estados_id: req.body.estados_id,
//         }, {
//             where: {
//                 id: req.params.id,
//             }
//         });
//         if (!comisiones_has_estados) {
//             return res.status(200).send({
//                 status: 404,
//                 message: 'No se encontraron datos'
//             });
//         }
//         res.status(200).send({
//             status: 200,
//             message: 'Comisiones-Estados actualizada con éxito!'
//         });
//     },

//     //DELETE
//     async delete(req, res) {
//         let comisiones_has_estados = await ComisionHasEstado.findByPk(req.params.id);

//         if (!comisiones_has_estados) {
//             res.status(404).json({ msg: "Comision-Estado no encontrada!" });
//         } else {
//             comisiones_has_estados.destroy().then(comisiones_has_estados => {
//                 res.json({ msg: "El Comision-Estado ha sido eliminada!" })
//             })
//         }
//     },

// }