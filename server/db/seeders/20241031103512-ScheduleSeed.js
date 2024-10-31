"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Schedules",
      [
        {
          channelId: 1,
          dayOfWeek: "Понедельник",
          time: "11:30",
          message: "Hi everyone",
          frequency: "Ежедневно",
          next_run_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Вторник",
          time: "12:00",
          message: "what's up",
          frequency: "Ежемесячно",
          next_run_date: new Date(),
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
