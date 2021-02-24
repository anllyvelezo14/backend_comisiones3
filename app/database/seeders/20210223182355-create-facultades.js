'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let facultades= [
      {centro_de_costo: 254, nombre: 'ciencias exactas', descripcion: 'ciencias' },
      {centro_de_costo: 259, nombre: 'humanidades', descripcion: 'shjdsuc' },
      {centro_de_costo: 245, nombre: 'ingenieria', descripcion: 'hfuef' },
      {centro_de_costo: 254, nombre: 'idiomas', descripcion: 'hzdjswdf' },
      {centro_de_costo: 255, nombre: 'medicina', descripcion: 'sbchf' },
      {centro_de_costo: 235, nombre: 'eduacion', descripcion: 'sbchfbvjrg' }
    ];
     await queryInterface.bulkInsert('facultades', facultades, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('facultades', null, {});
     
  }
};