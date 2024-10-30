'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Workspace extends Model {
        static associate(models) {
            Workspace.belongsTo(models.User, { foreignKey: 'userId' })
            Workspace.hasMany(models.Channel, { foreignKey: 'workspaceId' })
        }
    }
    Workspace.init(
        {
            name: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            hashAccessToken: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Workspace',
        }
    )
    return Workspace
}
