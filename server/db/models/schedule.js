'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        static associate(models) {
            Schedule.belongsTo(models.Channel, { foreignKey: 'channelId' })
        }
    }
    Schedule.init(
        {
            channelId: DataTypes.INTEGER,
            dayOfWeek: DataTypes.STRING,
            time: DataTypes.STRING,
            message: DataTypes.STRING,
            frequency: DataTypes.STRING,
            next_run_date: DataTypes.DATE // надо для работы расписаний
        },
        {
            sequelize,
            modelName: 'Schedule',
        }
    )
    return Schedule
}
