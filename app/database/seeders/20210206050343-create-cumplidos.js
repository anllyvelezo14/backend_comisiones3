'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let cumplidos = [
            { fecha_envio: '2001-01-01', fecha_confirmacion: '2001-01-01', correos: "@udea.edu.co", comisiones_id: 1 },
        ];

        return await queryInterface.bulkInsert('cumplidos', cumplidos, {});

    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('cumplidos', null, {});
    }
};