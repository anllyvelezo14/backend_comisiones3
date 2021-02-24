'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {

        static associate(models) {
            //Un usuario tiene muchas comisiones
            Usuario.hasMany(models.Comision, { as: "comisiones", foreignKey: "usuarios_id" });

            // //Un usuario tiene un rol y un departamento
            Usuario.belongsTo(models.Rol, { as: "roles", foreignKey: "roles_id", targetKey: "id" });
            Usuario.belongsTo(models.Departamento, { as: "departamentos", foreignKey: "departamentos_id", targetKey: "id" });
        }
    };
    Usuario.init({
        tipo_identificacion: {
            type: DataTypes.STRING,
            validation: {
                len: {
                    args: [0, 5],
                    msg: "No puede ser mayor a 5 caracteres"
                }
            }
        },

        identificacion: {
            type: DataTypes.INTEGER,
            validation: {
                isInt: {
                    args: true,
                    msg: "La identificación debe contener solo números"
                },
                len: {
                    args: [0, 12],
                    msg: "no puede contener más de 12 dígitos"
                },
                min: {
                    args: 0,
                    msg: "La identificación debe contener solo dígitos"
                },
            }
        },

        nombre: {
            type: DataTypes.STRING,
            /* allowNull: false, */
            validation: {
                /* notNull: {
                    msg: "Debe añadir un nombre"
                }, */
                isAlpha: {
                    args: true,
                    msg: "El nombre solo puede contener letras"
                },
                len: {
                    args: [1, 30],
                    msg: "El nombre no puede contener más de 30 caracteres"
                }
            }
        },

        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notNull: {
                    msg: "Debe añadir un apellido"
                },
                isAlpha: {
                    args: true,
                    msg: "El apellido solo puede contener letras"
                },
                len: {
                    args: [0, 30],
                    msg: "El apellido no puede contener más de 30 caracteres"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 100],
                    msg: "El correo debe contener menos de 100 caracteres"
                },
                isEmail: {
                    args: true,
                    msg: "El campo debe ser un correo valido"
                },

            }
        },
        // 1 si esta activo 0 si no
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notNull: {
                    msg: "Debe añadir una contraseña"
                },
                len: {
                    args: [4, 100],
                    msg: "La contraseña debe contener entre 4 y 100 caracteres"
                }
            }
        }

    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true,
        createdAt: true,
        updatedAt: 'fecha_actualizacion',
    });

    return Usuario;
};