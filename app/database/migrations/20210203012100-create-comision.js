'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_inicio: {
        type: Sequelize.DATE
      },
      fecha_fin: {
        type: Sequelize.DATE
      },
      fecha_resolucion: {
        type: Sequelize.DATE
      },
      resolucion: {
        type: Sequelize.STRING
      },
      respuesta_devolucion: {
        type: Sequelize.STRING
      },
      justificacion: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      lugar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comisions');
  }
};