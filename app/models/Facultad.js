'use strict'
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Facultad extends Model {
        static associate(models) {
            //Una facultad tiene muchas dependencias
            Facultad.hasMany(models.Departamento, { as: "departamentos", foreignKey: "facultades_id" });

        }
    };
    Facultad.init({
        centro_de_costo: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    args: true,
                    msg: "La identificación debe contener solo números"
                },

                len: {
                    args: [0, 8],
                    msg: "Este valor no puede tener más de 8 dígitos"
                },
                mencero(value) {
                    if (value < 0) {
                        throw new Error("La identificación debe contener solo números")
                    }

                }
            }
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Debe añadir un nombre"
                },
                len: {
                    args: [0, 50],
                    msg: "El nombre no puede superar los 50 caracteres"
                },
                
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
                    args: [0, 255],
                    msg: "La descripción no puede superar los 255 caracteres"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Facultad',
        tableName: 'facultades',
        // timestamps: true,
        // createdAt: true,
        // updatedAt: 'fecha_actualizacion',
    });

    // Facultad.sync();
    // Facultad.findAll()
    // .then(facultad => {
    //     if (facultad.length === 0) {
    //         Facultad.create([
    //             {centro_de_costo: 254, nombre: 'ciencias exactas', descripcion: 'ciencias' },
    //             {centro_de_costo: 259, nombre: 'idiomas', descripcion: 'shjdsuc' },
    //             {centro_de_costo: 245, nombre: 'bienestar', descripcion: 'hfuef' },
    //             {centro_de_costo: 254, nombre: 'ingenieria', descripcion: 'hzdjswdf' },
    //             {centro_de_costo: 255, nombre: 'salud', descripcion: 'sbchf' },
    //             {centro_de_costo: 235, nombre: 'eduacion', descripcion: 'sbchfbvjrg' }
    //           ]);
    //     }
    // });
    return Facultad;
};