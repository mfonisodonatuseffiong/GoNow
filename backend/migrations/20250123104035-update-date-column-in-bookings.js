module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update existing records to set a default date value
    await queryInterface.sequelize.query(`
      UPDATE "Bookings" SET "date" = NOW() WHERE "date" IS NULL;
    `);

    // Change the column to NOT NULL
    await queryInterface.changeColumn('Bookings', 'date', {
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Bookings', 'date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
