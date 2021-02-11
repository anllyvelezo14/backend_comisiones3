'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('documentos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nombre: {
                allowNull: false,
                type: Sequelize.STRING(45)
            },
            es_anexo: {
                type: Sequelize.BOOLEAN
            },
            es_cumplido: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('documentos');
    }
};