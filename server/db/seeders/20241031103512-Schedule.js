"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Schedules",
      [
        {
          channelId: 0,
          dayOfWeek: "Понедельник",
          time: new Date(),
          message: "Hi everyone",
          frequency: "Ежедневно",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 0,
          dayOfWeek: "Вторник",
          time: new Date(),
          message: "what's up",
          frequency: "Ежемесячно",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};
