'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let departamentos= [
      {nombre: 'fisica', descripcion: 'shfduswfhe', facultades_id: 1 },
      {nombre: 'quimica', descripcion: 'dfhewgvev', facultades_id: 2},
      {nombre: 'bienestar', descripcion: 'djvhrjv', facultades_id: 3 },
      {nombre: 'biologia', descripcion: 'asbvd', facultades_id: 4 },
      {nombre: 'idiomas', descripcion: 'ddjvherjvr', facultades_id: 5 },
      {nombre: 'administracion', descripcion: 'huehv', facultades_id: 6 }
    ];
     await queryInterface.bulkInsert('departamento', departamentos, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('departamento', null, {});
     
  }
};
