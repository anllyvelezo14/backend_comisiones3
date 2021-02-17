'use strict';

//const { TipoSolicitud } = require('../../models/index')

module.exports = {
    //se ejecuta al hacer la siembra
    up: async(queryInterface, Sequelize) => {

        //let tipos_solicitud = await TipoSolicitud.findAll();

        let comisiones = [{
                created_at: '2002-02-20',
                fecha_actualizacion: '2002-02-20',
                fecha_inicio: '2002-02-20',
                fecha_fin: '2002-02-20',
                fecha_resolucion: '2002-02-20',
                lugar: "DC",
                idioma: "ingles",
                justificacion: "---",
                resolucion: "bla",
                respuesta_devolucion: "bla",
                tipos_solicitud_id: 1
            },
            {
                created_at: '2002-02-20',
                fecha_actualizacion: '2002-02-20',
                fecha_inicio: '2002-02-20',
                fecha_fin: '2002-02-20',
                fecha_resolucion: '2002-02-20',
                lugar: "New York",
                idioma: "ingles",
                justificacion: "---",
                resolucion: "bla",
                respuesta_devolucion: "bla",
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