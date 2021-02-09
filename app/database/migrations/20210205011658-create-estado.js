'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('estados', {
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
            descripcion: {
                type: Sequelize.STRING(255)
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('estados');
    }
};