'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Workspace, { foreignKey: 'userId' })
        }
    }
    User.init(
        {
            email: DataTypes.STRING,
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            workspaceId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User',
        }
    )
    return User
}
