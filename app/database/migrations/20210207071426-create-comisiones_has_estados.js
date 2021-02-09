'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('comisiones_has_estados', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATE
            }
            // comision_id: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: "comsiones",
            //         key: "id"
            //     }
            // },
            // estado_id: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: "estados",
            //         key: "id"
            //     },
            //     createdAt: {
            //         type: Sequelize.DATE
            //     },
            // },

        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('comisiones_has_estados');
    }
};