'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "image",{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "NA"
    }),
      await queryInterface.addColumn("Products", "description", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "NA"
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "image"),
      await queryInterface.removeColumn("Products", "description");
  },
};
