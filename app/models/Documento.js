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
            validate: {
                len: {
                    args: [0, 45],
                    msg: "El nombre no puede ser mayor de 45 caracteres"
                },
                notNull: {
                    msg: "El nombre no debe estar en blanco!"
                }
            }
        },
        es_anexo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Debe verificar si es un anexo"
                }
            }
        },
        es_cumplido: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Debe verificar si es un cumplido"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Documento',
        tableName: 'documentos',
    });
    return Documento;
};