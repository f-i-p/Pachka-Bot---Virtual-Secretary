"use strict";
const { hashSync } = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Workspaces",
      [
        {
          name: "Тестовое пространство",
          userId: 1,
          hashAccessToken: "KEs9gC6k31cOKc-7iFIZZP4MvtQ3nKs5VbslLzVTXZ0",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Workspaces", null, {});
  },
};
