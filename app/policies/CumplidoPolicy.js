const found = (req) => {
    let temArray = [];
    let isMine = false;

    req.usuario.comisiones.forEach(comisiones => {
        temArray.push(comisiones.id)
    });

    for (const i in temArray) {
        if (temArray[i] === req.cumplidos.comisiones_id) {
            isMine = true;
            console.log(temArray[i], req.cumplidos.comisiones_id);
        }
    }
    return isMine;
};

module.exports = {

    show(req, res, next) {
        if (found(req) || req.usuario.roles.nombre === 'ADMIN') {
            next();
        } else {
            res.status(401).json({ msg: 'No estas autorizado para ver esta página!' })
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