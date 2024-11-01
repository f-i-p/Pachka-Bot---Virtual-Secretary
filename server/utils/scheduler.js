const { Schedule } = require('../db/models')
const cron = require('node-cron')
const axios = require('axios')

const frequencyToCron = (frequency) => {
    switch (frequency) {
        case 'каждые 5 секунд':
            return '*/5 * * * * *'
        case 'каждые 30 секунд':
            return '*/30 * * * * *'
        case 'каждый час':
            return '0 * * * *'
        case 'ежедневно':
            return '0 0 * * *'
        case 'ежемесячно':
            return '0 0 1 * *'
        case 'ежегодно':
            return '0 0 1 1 *'
        default:
            throw new Error(`Неподдерживаемая частота: ${frequency}`)
    }
}

const sendUserMessage = async (message) => {
    const webhookUrl =
        'https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY'
    const messageData = {
        message,
    }

    try {
        const response = await axios.post(webhookUrl, messageData)
        console.log('Сообщение отправлено:', response.data)
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error)
    }
}

const scheduleTasks = async () => {
    const tasks = await Schedule.findAll()

    tasks.forEach((task) => {
        try {
            const cronExpression = frequencyToCron(task.frequency)
            cron.schedule(cronExpression, async () => {
                await sendUserMessage(task.message)
                const nextRunDate = new Date()
                switch (task.frequency) {
                    case 'каждые 5 секунд':
                        nextRunDate.setSeconds(nextRunDate.getSeconds() + 5)
                        break
                    case 'каждые 30 секунд':
                        nextRunDate.setSeconds(nextRunDate.getSeconds() + 30)
                        break
                    case 'каждый час':
                        nextRunDate.setHours(nextRunDate.getHours() + 1)
                        break
                    case 'ежедневно':
                        nextRunDate.setDate(nextRunDate.getDate() + 1)
                        break
                    case 'ежемесячно':
                        nextRunDate.setMonth(nextRunDate.getMonth() + 1)
                        break
                    case 'ежегодно':
                        nextRunDate.setFullYear(nextRunDate.getFullYear() + 1)
                        break
                }

                await task.update({ next_run_date: nextRunDate })
                console.log(
                    `Следующий запуск для задачи "${task.message}" запланирован на ${nextRunDate}`
                )
            })
        } catch (error) {
            console.error(`Ошибка планировщика задачи "${task.message}":`, error)
        }
    })
}

module.exports = scheduleTasks
