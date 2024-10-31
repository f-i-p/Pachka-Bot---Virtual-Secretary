// scheduler.js
const cron = require('node-cron')
const { Schedule } = require('../db/models')
// const { sendMessage } = require('./helpers/apiHelper'); - хелпер от Леры

const startSchedules = async () => {
    const schedules = await Schedule.findAll()

    schedules.forEach((schedule) => {
        const { channelId, dayOfWeek, time, message, frequency } = schedule
        const [hour, minute] = time.split(':')

        let cronExpression

        if (frequency === 'weekly') {
            cronExpression = `${minute} ${hour} * * ${dayOfWeek}`
        } else if (frequency === 'monthly') {
            cronExpression = `${minute} ${hour} 1 * *`
        } else {
            return
        }

        cron.schedule(
            cronExpression,
            () => {
                //   sendMessage(channelId, message);
                console.log(channelId, message)
                updateNextRunDate(schedule)
            },
            {
                timezone: 'Europe/Moscow',
            }
        )

        console.log(
            `Scheduled message: "${message}" for frequency: "${frequency}"`
        )
    })
}

const updateNextRunDate = async (schedule) => {
    const now = new Date()
    schedule.next_run_date = now
    await schedule.save()
}

module.exports = { startSchedules }
