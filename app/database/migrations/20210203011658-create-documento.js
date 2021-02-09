'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Documentos', {
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
            },
            // comision_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         models: "comisiones",
            //         key: "id"
            //     },
            //     onDelete: "CASCADE"
            // }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Documentos');
    }
};