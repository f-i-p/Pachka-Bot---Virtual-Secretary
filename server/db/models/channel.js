'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Channel extends Model {
        static associate(models) {
            Channel.belongsTo(models.Workspace, { foreignKey: 'workspaceId' })
            Channel.hasMany(models.Schedule, { foreignKey: 'channelId' })
        }
    }
    Channel.init(
        {
            title: DataTypes.STRING,
            workspaceId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Channel',
        }
    )
    return Channel
}
