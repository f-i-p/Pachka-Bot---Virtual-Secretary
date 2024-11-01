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
          time: "09:00",
          message: "Продолжать изучать React",
          frequency: "каждые 30 секунд",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Вторник",
          time: "12:30",
          message: "Сходить на обед",
          frequency: "каждые 30 секунд",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Среда",
          time: "14:00",
          message: "Не забыть про стендап",
          frequency: "ежедневно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Среда",
          time: "12:30",
          message: "Занятие по английскому",
          frequency: "ежемесячно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Вторник",
          time: "12:30",
          message: "Сходить на ужин",
          frequency: "ежедневно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Пятница",
          time: "14:30",
          message: "Прерваться на 3 минутки",
          frequency: "ежедневно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Понедельник",
          time: "12:30",
          message: "Пересмотреть лекцию",
          frequency: "ежедневно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Среда",
          time: "19:30",
          message: "Пора завершить рабочий день",
          frequency: "ежедневно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          channelId: 1,
          dayOfWeek: "Пятница",
          time: "17:00",
          message: "Сходить на выпускной третьей фазы",
          frequency: "ежегодно",
          next_run_date: new Date(),
          webhookUrl:
            "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY",
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
