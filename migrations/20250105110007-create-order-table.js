"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ["CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
        defaultValue: "CONFIRMED",
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable("OrderItems", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable("OrderItems");
   await queryInterface.dropTable("Orders");
  },
};
