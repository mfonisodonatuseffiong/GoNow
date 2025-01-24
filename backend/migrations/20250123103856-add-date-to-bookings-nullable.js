module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookings', 'date', {
      type: Sequelize.DATE,
      allowNull: true // Allow null values temporarily
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Bookings', 'date');
  }
};
