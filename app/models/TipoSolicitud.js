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
            allowNull: false,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "El nombre no puede ser mayor de 45 caracteres!",
                },
                notNull: {
                    msg: "El nombre no debe estar en blanco!"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "La descripción no puede ser mayor de 255 caracteres"
                },
                notNull: {
                    msg: "La descripción no debe estar en blanco!"
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