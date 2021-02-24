'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ComisionHasEstado extends Model {

        static associate(models) {
            //Una comision tiene muchos documentos, cumplidos
            //ComisionHasEstado.belongsTo(models.Estados, { as: "comisiones_has_estados", foreignKey: "estados_id", targetKey: "id" });
            //ComisionHasEstado.belongsTo(models.Comisiones, { as: "comisiones_has_estados", foreignKey: "comisiones_id", targetKey: "id" });
        }

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