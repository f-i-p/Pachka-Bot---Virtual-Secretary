const { Schedule } = require('../db/models');
const cron = require('node-cron');
const axios = require('axios');

const frequencyToCron = (frequency) => {
    switch (frequency) {
      case 'every 5 seconds': return '*/5 * * * * *';
      case 'every 30 seconds': return '*/30 * * * * *';
      case 'hourly': return '0 * * * *';
      case 'daily': return '0 0 * * *';
      case 'monthly': return '0 0 1 * *';
      case 'yearly': return '0 0 1 1 *';
      default: throw new Error(`Unsupported frequency: ${frequency}`);
    }
  };

const sendUserMessage = async (message) => {
  const webhookUrl = "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY";
  const messageData = {
    message: {
      content: message,
      files: [],
    },
  };

  try {
    const response = await axios.post(webhookUrl, messageData);
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const scheduleTasks = async () => {
  const tasks = await Schedule.findAll();

  tasks.forEach(task => {
    try {
      const cronExpression = frequencyToCron(task.frequency);
      cron.schedule(cronExpression, async () => {
        await sendUserMessage(task.message);
        const nextRunDate = new Date();
        switch (task.frequency) {
          case 'every 5 seconds': nextRunDate.setSeconds(nextRunDate.getSeconds() + 5); break;
          case 'every 30 seconds': nextRunDate.setSeconds(nextRunDate.getSeconds() + 30); break;
          case 'hourly': nextRunDate.setHours(nextRunDate.getHours() + 1); break;
          case 'daily': nextRunDate.setDate(nextRunDate.getDate() + 1); break;
          case 'monthly': nextRunDate.setMonth(nextRunDate.getMonth() + 1); break;
          case 'yearly': nextRunDate.setFullYear(nextRunDate.getFullYear() + 1); break;
        }

        await task.update({ next_run_date: nextRunDate });
        console.log(`Next run for "${task.message}" scheduled at ${nextRunDate}`);
      });
    } catch (error) {
      console.error(`Failed to schedule task "${task.message}":`, error);
    }
  });
};

module.exports = scheduleTasks
