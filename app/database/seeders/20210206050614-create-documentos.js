'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        let documentos = [
            { nombre: "xfile", es_anexo: 0, es_cumplido: 0, comisiones_id: 1 },
            { nombre: "xfile-2", es_anexo: 1, es_cumplido: 0, comisiones_id: 1 }
        ];

        return await queryInterface.bulkInsert('documentos', documentos, {});


    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('documentos', null, {});
    }
};