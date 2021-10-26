'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comision extends Model {

        static associate(models) {
            //Una comision tiene muchos documentos, cumplidos
            Comision.hasMany(models.Documento, { as: "documentos", foreignKey: "comisiones_id" });
            Comision.hasMany(models.Cumplido, { as: "cumplidos", foreignKey: "comisiones_id" });

            // //Una comision pertenece a un tipo de solicitud y a un usuario
            Comision.belongsTo(models.TipoSolicitud, { as: "tipos_solicitud", foreignKey: "tipos_solicitud_id", targetKey: "id" });
            Comision.belongsTo(models.Usuario, { as: "usuarios", foreignKey: "usuarios_id", targetKey: "id" })

            // //Muchas comisiones tienen muchos estados 
            Comision.hasMany(models.ComisionHasEstado, { as: "intermediate_comisiones", foreignKey: "comisiones_id" });
        }
    };

    Comision.init({
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: true,
            //defaultValue: '2021-09-01T21:13:19.000Z'
            // validate: {
            //     notEmpty: {
            //         msg: "La fecha de inicio no debe estar en blanco!"
            //     }
            // }
        },

        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true,
            //defaultValue: '2021-09-01T21:13:19.000Z'
            // validate: {
            //     notEmpty: {
            //         msg: "La fecha de finalización no debe estar en blanco!"
            //     }
            // }
        },

        fecha_resolucion: DataTypes.DATE,

        resolucion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "La resolución No puede ser mayor de 45 caracteres"
                }
            }
        },

        justificacion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 300],
                    msg: "La justificación no puede ser mayor de 300 caracteres"
                },
                notEmpty: {
                    msg: "La justificación no debe estar en blanco!"
                }
            }
        },

        idioma: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "El idioma no puede ser mayor de 45 caracteres"
                }
            }
        },
        lugar: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "El lugar no puede ser mayor de 45 caracteres"
                }
            }
        }

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