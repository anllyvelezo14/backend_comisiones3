'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Documento extends Model {

        static associate(models) {
            // Un documento pertenece a una comision
            Documento.belongsTo(models.Comision, { as: "comisiones", foreignKey: "comisiones_id", targetKey: "id" });
        }
    };
    Documento.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // es_anexo: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true,
        //     validate: {
        //         notEmpty: {
        //             msg: "Debe verificar si es un anexo"
        //         }
        //     }
        // },
        data: {
            // Binary Large Objects: para almacenar datos de gran tamaño que cambian de forma dinámica en las BD
            type: DataTypes.BLOB("long"),
        },
    }, {
        sequelize,
        modelName: 'Documento',
        tableName: 'documentos',
    });
    return Documento;
};