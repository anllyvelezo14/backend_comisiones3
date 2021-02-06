'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Estado extends Model {

        static associate(models) {
            Estado.belongsToMany(models.Comision, { through: "comisiones_has_estados" });
        }
    };
    Estado.init({
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Estado',
        tableName: 'estados',
    });
    return Estado;
};