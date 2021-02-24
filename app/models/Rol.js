'use strict'
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rol extends Model {
        static associate(models) {
            //Un rol tiene muchos usuarios
            Rol.hasMany(models.Usuario, { as: "usuarios", foreignKey: "roles_id" });
        }
    };
    Rol.init({
        nombre: {
            type: DataTypes.STRING,
            //allowNull: false,
            validate: {
                /* notNull: {
                    msg: "Debe añadir un nombre"
                }, */
                len: {
                    args: [0, 15],
                    msg: "El nombre no puede superar los 15 caracteres"
                },
                /* isAlpha: {
                    args: true,
                    msg: "El nombre solo puede contener letras"
                } */
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            //allowNull: false,
            validate: {
                /* notNull: {
                    msg: "Debe añadir una descripción"
                }, */
                len: {
                    args: [0, 255],
                    msg: "La descripción no puede superar los 255 caracteres"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Rol',
        tableName: 'roles',
        //timestamps: true,
        //createdAt: true,
        //updatedAt: 'fecha_actualizacion',
    });
    return Rol;
};