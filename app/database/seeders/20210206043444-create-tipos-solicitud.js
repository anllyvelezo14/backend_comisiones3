'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        let tipos_solicitud = [
            { nombre: "Permiso", descripcion: "permisos" },
            { nombre: "Comision", descripcion: "viaje" }
        ];

        return await queryInterface.bulkInsert('tipos_solicitud', tipos_solicitud, {});

    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('tipos_solicitud', null, {});
    }
};