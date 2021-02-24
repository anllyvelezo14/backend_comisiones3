'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Estado extends Model {

        static associate(models) {
            //Estado.hasMany(models.ComisionHasEstados, { as: "comisiones_has_estados", foreignKey: "estados_id" });

            Estado.belongsToMany(models.Comision, { as: "comisiones", through: "comisiones_has_estados", foreignKey: "estados_id", targetKey: "id" });
        }
    };
    Estado.init({
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
        descripcion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "La descripción no puede ser mayor de 255 caracteres"
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