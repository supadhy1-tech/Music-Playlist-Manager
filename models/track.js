// models/Track.js
const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Playlist = require('./playlist');

class Track extends Model {}

Track.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // in seconds
      allowNull: false,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Playlist,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'track',
  }
);

module.exports = Track;
