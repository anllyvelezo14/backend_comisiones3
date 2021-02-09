'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Documento extends Model {

        static associate(models) {
            // Un documento pertenece a una comision
            Documento.belongsTo(models.Comision, { as: "comisiones", foreignKey: "comisiones_id" });
        }
    };
    Documento.init({
        nombre: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "No puede ser mayor de 45 caracteres"
                }
            }
        },
        es_anexo: DataTypes.BOOLEAN,
        es_cumplido: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Documento',
        tableName: 'documentos',
    });
    return Documento;
};