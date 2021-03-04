'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let roles= [
      {nombre: 'ESTUDIANTE', descripcion: 'toda la U' },
      {nombre: 'DECANATURA', descripcion: 'facultad' },
      {nombre: 'VICERRECTORIA', descripcion: 'administrativos' },
      {nombre: 'PROFESOR', descripcion: 'toda la U' },
      {nombre: 'COORDINACION', descripcion: 'departamento' },
      {nombre: 'ADMIN', descripcion: 'plataforma' }
    ];
     await queryInterface.bulkInsert('roles', roles, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('roles', null, {});
     
  }
};
