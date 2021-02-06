'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let cumplidos = [
            { correos: "@udea.edu.co", comision_id: 1 },
        ];

        return await queryInterface.bulkInsert('cumplidos', cumplidos, {});

    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('cumplidos', null, {});
    }
};