'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TipoSolicitud extends Model {

        static associate(models) {
            TipoSolicitud.hasMany(models.Comision, { as: "comisiones", foreignKey: "tipos_solicitud_id" });
        }
    };
    TipoSolicitud.init({
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'TipoSolicitud',
        tableName: 'tipos_solicitud'
    });
    return TipoSolicitud;
};