'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ComisionHasEstado extends Model {

    };
    ComisionHasEstado.init({
        createdAt: {
            type: DataTypes.DATE,
        }
    }, {
        sequelize,
        modelName: 'ComisionHasEstado',
        tableName: 'comisiones_has_estados',
        timestamps: true,
        updatedAt: 'fecha_actualizacion',
    });
    return ComisionHasEstado;
};