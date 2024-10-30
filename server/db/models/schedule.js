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
            time: DataTypes.DATE,
            message: DataTypes.STRING,
            frequency: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Schedule',
        }
    )
    return Schedule
}
