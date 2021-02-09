'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Estado extends Model {

        static associate(models) {
            Estado.belongsToMany(models.Comision, { as: "comision", through: "comisiones_has_estados", foreignKey: "estados_id" });
        }
    };
    Estado.init({
        nombre: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "No puede ser mayor de 45 caracteres"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "No puede ser mayor de 255 caracteres"
                }
            }
        },
    }, {
        sequelize,
        modelName: 'Estado',
        tableName: 'estados',
    });
    return Estado;
};