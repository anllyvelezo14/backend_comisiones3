'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        let estados = [
            { nombre: "ok", descripcion: "blabla" }
        ];

        return await queryInterface.bulkInsert('estados', estados, {});

    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('estados', null, {});
    }
};