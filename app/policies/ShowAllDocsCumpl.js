//Para mostrar todos los Documentos y Cumplidos
module.exports = {

    async showAll(req, res, next) {

        let rolAuth = req.usuario.roles.nombre;

        if (rolAuth === 'ADMIN' || rolAuth === 'VICERRECTORIA') {
            next();

        } else if (rolAuth === 'COORDINACION') {
            const depAuth = req.usuario.departamentos.nombre
            req.where = { '$comisiones.usuarios.departamentos.nombre$': depAuth };
            next();

        } else if (rolAuth === 'DECANATURA') {
            const facAuth = req.usuario.departamentos.facultad.nombre
            req.where = { '$comisiones.usuarios.departamentos.facultad.nombre$': facAuth };
            next();

        } else {
            const idAuth = req.usuario.id
            req.where = { '$comisiones.usuarios.id$': idAuth };
            next();

        }
    }
}