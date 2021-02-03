'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Documento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // DOCUMENTO ESTA EN UNA COMISION
            Documento.belongsTo(models.Comision, { as: "comision" });
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