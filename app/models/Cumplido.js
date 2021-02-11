'use strict';
const {

    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cumplido extends Model {

        static associate(models) {
            Cumplido.belongsTo(models.Comision, { as: "comisiones", foreignKey: "comisiones_id", targetKey: "id" });
        }
    };
    Cumplido.init({
        fecha_envio: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "La fecha de envío no debe estar en blanco!"
                }
            }
        },
        fecha_confirmacion: {
            type: DataTypes.DATE,
        },
        informacion_complementaria: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "La  informacion complementaria no puede ser mayor de  255 caracteres"
                }
            }
        },
        correos: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Los correos no debe estar en blanco!"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Cumplido',
        tableName: 'cumplidos',
    });
    return Cumplido;
};