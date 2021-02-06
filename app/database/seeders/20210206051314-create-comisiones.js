'use strict';

//const { TipoSolicitud } = require('../../models/index')

module.exports = {
    //se ejecuta al hacer la siembra
    up: async(queryInterface, Sequelize) => {

        //let tipos_solicitud = await TipoSolicitud.findAll();

        let comisiones = [{
                lugar: "DC",
                idioma: "ingles",
                justificacion: "---",
                resolucion: "bla",
                respuesta_devolucion: "bla",
                created_at: "2000-01-01",
                fecha_actualizacion: "2021-01-01",
                tipos_solicitud_id: 1
            },
            {
                lugar: "New York",
                idioma: "ingles",
                justificacion: "---",
                resolucion: "bla",
                respuesta_devolucion: "bla",
                created_at: "2000-01-01",
                fecha_actualizacion: "2021-01-01",
                tipos_solicitud_id: 1
            }
        ];

        return await queryInterface.bulkInsert('comisiones', comisiones, {});

    },
    //se ejecuta al deshacer la siembra
    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('comisiones', null, {});
    }
};