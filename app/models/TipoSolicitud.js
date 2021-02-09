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
        nombre: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "No puede ser mayor de 45 caracteres"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "No puede ser mayor de 255 caracteres"
                }
            }
        },
    }, {
        sequelize,
        modelName: 'TipoSolicitud',
        tableName: 'tipos_solicitud'
    });
    return TipoSolicitud;
};