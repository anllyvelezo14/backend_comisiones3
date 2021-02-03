'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comision extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            //Una comision tiene muchos documentos 
            Comision.hasMany(models.Documento, { as: "documentos" });
        }
    };
    Comision.init({
        fecha_inicio: DataTypes.DATE,
        fecha_fin: DataTypes.DATE,
        fecha_resolucion: DataTypes.DATE,
        resolucion: DataTypes.STRING,
        respuesta_devolucion: DataTypes.STRING,
        justificacion: DataTypes.STRING,
        idioma: DataTypes.STRING,
        lugar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comision',
        tableName: 'comisiones',
        timestamps: true,
        createdAt: true,
        updatedAt: 'fecha_actualizacion',
    });
    return Comision;
};