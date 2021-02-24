const { Departamento } = require('../models/index')

const found = (req) => {
    let temArray = [];
    let isMine = false;

    // comision.usuarios_id viene del controller (por ruta)
    // usuario.roles y cumplidos.comisiones_id vienen del auth.js        
    req.usuario.comisiones.forEach(comisiones => {
        temArray.push(comisiones.id)
    });
    if (temArray.find(element => element === req.cumplidos.comisiones_id)) {
        isMine = true;
    }
    return isMine;
};

module.exports = {

    async show(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;
        let depAuth = req.usuario.departamentos_id;
        let depUser = req.cumplidos.comisiones.usuarios.departamentos_id;

        if (found(req) || rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA' || (depUser === depAuth && rolAuth === 'COORDINACION')) {
            next();
        } else {
            let deptoUser = await Departamento.findByPk(req.cumplidos.comisiones.usuarios.departamentos_id);
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
        if (found(req) || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
    delete(req, res, next) {
        if (found(req) || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado!' })
        }
    },
}