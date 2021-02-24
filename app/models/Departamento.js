'use strict'
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Departamento extends Model {
        static associate(models) {
            //Un departamento tiene muchos usuarios
            Departamento.hasMany(models.Usuario, { as: "usuarios", foreignKey: "departamentos_id" });
            //un departamento pertenece a una facultad
            Departamento.belongsTo(models.Facultad, { as: "facultad", foreignKey: "facultades_id" });
        }
    };
    Departamento.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Debe añadir un nombre"
                },
                len: {
                    args: [0, 45],
                    msg: "El nombre no puede superar los 45 caracteres"
                },
                isAlpha: {
                    args: true,
                    msg: "El nombre solo puede contener letras"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Debe añadir una descripción"
                },
                len: {
                    args: [0, 45],
                    msg: "La descripción no puede superar los 45 caracteres"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Departamento',
        tableName: 'departamento',
        // timestamps: true,
        // createdAt: true,
        // updatedAt: 'fecha_actualizacion',
    });
    return Departamento;
};