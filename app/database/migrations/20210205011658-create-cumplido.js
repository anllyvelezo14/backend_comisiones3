'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('cumplidos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha_envio: {
                allowNull: false,
                type: Sequelize.DATE
            },
            fecha_confirmacion: {
                allowNull: false,
                type: Sequelize.DATE
            },
            informacion_complementaria: {
                type: Sequelize.STRING(255)
            },
            correos: {
                allowNull: false,
                type: Sequelize.STRING(255)
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('cumplidos');
    }
};