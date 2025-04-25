// models/index.js
const User = require('./User');
const Playlist = require('./playlist');
const Track = require('./track');

// A user can have many playlists
User.hasMany(Playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A playlist belongs to a user
Playlist.belongsTo(User, {
  foreignKey: 'user_id'
});

// A playlist can have many tracks
Playlist.hasMany(Track, {
  foreignKey: 'playlist_id',
  onDelete: 'CASCADE'
});

// A track belongs to a playlist
Track.belongsTo(Playlist, {
  foreignKey: 'playlist_id'
});

module.exports = { User, Playlist, Track };
