'use strict';
const {

    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cumplido extends Model {

        static associate(models) {
            Cumplido.belongsTo(models.Comision, { as: "comisiones", foreignKey: "comisiones_id" });
        }
    };
    Cumplido.init({
        fecha_envio: DataTypes.DATE,
        fecha_confirmacion: DataTypes.DATE,
        informacion_complementaria: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "No puede ser mayor de  255 caracteres"
                }
            }
        },
        correos: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Cumplido',
        tableName: 'cumplidos',
    });
    return Cumplido;
};