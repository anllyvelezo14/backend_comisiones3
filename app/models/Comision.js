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

            // //Una comision tiene pertenece a un tipo de solicitud y a un usuario
            Comision.belongsTo(models.TipoSolicitud, { as: "tipos_solicitud", foreignKey: "tipos_solicitud_id" });
            Comision.belongsTo(models.Usuario, { as: "usuario" , foreignKey: "usuario_id"})

            // //Muchas comisiones tienen muchos estados 
            Comision.belongsToMany(models.Estado, { as: "estados", through: "comisiones_has_estados", foreignKey: "comisiones_id" });
        }
    };
    Comision.init({
        fecha_inicio: DataTypes.DATE,

        fecha_fin: DataTypes.DATE,

        fecha_resolucion: DataTypes.DATE,

        resolucion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "No puede ser mayor de 45 caracteres"
                }
            }
        },
        respuesta_devolucion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 255],
                    msg: "No puede ser mayor de 255 caracteres"
                }
            }
        },

        justificacion: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 300],
                    msg: "No puede ser mayor de 300 caracteres"
                }
            }
        },

        idioma: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "No puede ser mayor de 45 caracteres"
                }
            }
        },
        lugar: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 45],
                    msg: "No puede ser mayor de 45 caracteres"
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