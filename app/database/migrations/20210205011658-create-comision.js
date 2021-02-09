'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Comisiones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha_inicio: {
                allowNull: false,
                type: Sequelize.DATE
            },
            fecha_fin: {
                allowNull: false,
                type: Sequelize.DATE
            },
            fecha_resolucion: {
                type: Sequelize.DATE
            },
            resolucion: {
                type: Sequelize.STRING(45)
            },
            respuesta_devolucion: {
                type: Sequelize.STRING(255)
            },
            justificacion: {
                allowNull: false,
                type: Sequelize.STRING(300)
            },
            idioma: {
                type: Sequelize.STRING(45)
            },
            lugar: {
                type: Sequelize.STRING(45)
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            // tipoSolicitud_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         models: "tipos_solicitud",
            //         key: "id"
            //     },
            //     onDelete: "CASCADE"
            // }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Comisiones');
    }
};