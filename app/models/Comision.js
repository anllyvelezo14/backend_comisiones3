'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comision extends Model {

        static associate(models) {
            //Una comision tiene muchos documentos, cumplidos
            Comision.hasMany(models.Documento, { as: "documentos", foreignKey: "comision_id" });
            Comision.hasMany(models.Cumplido, { as: "cumplidos", foreignKey: "comision_id" });

            //Una comision tiene pertenece a un tipo de solicitud
            Comision.belongsTo(models.TipoSolicitud, { as: "tipos_solicitud", foreignKey: "tipos_solicitud_id" });

            //Muchas comisiones tienen muchos estados 
            Comision.belongsToMany(models.Estado, { through: "comisiones_has_estados" });
        }
    };
    Comision.init({
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        fecha_resolucion: DataTypes.DATE,
        resolucion: DataTypes.STRING,
        respuesta_devolucion: DataTypes.STRING,
        justificacion: DataTypes.STRING,
        idioma: DataTypes.STRING,
        lugar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comision',
        tableName: 'comisiones',
        timestamps: true,
        createdAt: true,
        updatedAt: 'fecha_actualizacion',
    });
    return Comision;
};