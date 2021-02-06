'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Documento extends Model {

        static associate(models) {
            // Un documento pertenece a una comision
            Documento.belongsTo(models.Comision, { as: "comisiones", foreignKey: "comision_id" });
        }
    };
    Documento.init({
        nombre: DataTypes.STRING,
        es_anexo: DataTypes.BOOLEAN,
        es_cumplido: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Documento',
        tableName: 'documentos',
    });
    return Documento;
};