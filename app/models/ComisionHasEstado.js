'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ComisionHasEstado extends Model {

        static associate(models) {
            //Una comision tiene muchos documentos, cumplidos
            ComisionHasEstado.belongsTo(models.Estado, { as: "intermediate_estados", foreignKey: "estados_id", targetKey: "id" });
            ComisionHasEstado.belongsTo(models.Comision, { as: "intermediate_comisiones", foreignKey: "comisiones_id", targetKey: "id" });
        }

    };
    ComisionHasEstado.init({
        observacion: {
            type: DataTypes.STRING,
            defaultValue: 'Su solicitud está siendo evaluada'
        }
    }, {
        sequelize,
        modelName: 'ComisionHasEstado',
        tableName: 'comisiones_has_estados',
        timestamps: true, 
        createdAt: true,
        updatedAt: 'fecha_actualizacion',
    });
    return ComisionHasEstado;
};