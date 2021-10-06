'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('comisiones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fecha_inicio: {
                allowNull: true,
                type: Sequelize.DATE
            },
            fecha_fin: {
                allowNull: true,
                type: Sequelize.DATE
            },
            fecha_resolucion: {
                type: Sequelize.DATE
            },
            resolucion: {
                type: Sequelize.STRING(45)
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
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('comisiones');
    }
};