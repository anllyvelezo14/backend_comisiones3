'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let roles= [
      {nombre: 'estudiante', descripcion: 'toda la U' },
      {nombre: 'decano', descripcion: 'facultad' },
      {nombre: 'secretario', descripcion: 'administrativos' },
      {nombre: 'profesor', descripcion: 'toda la U' },
      {nombre: 'coordinador', descripcion: 'departamento' },
      {nombre: 'administrador', descripcion: 'plataforma' }
    ];
     await queryInterface.bulkInsert('roles', roles, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('roles', null, {});
     
  }
};
