// models/Playlist.js
const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User'); // Import User model

class Playlist extends Model {}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // Reference to the User model
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'playlist'
  }
);

module.exports = Playlist;
